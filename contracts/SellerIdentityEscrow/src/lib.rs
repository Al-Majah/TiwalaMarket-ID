#![no_std]
use soroban_sdk::{contract, contractevent, contractimpl, contracttype, token::Client as TokenClient, Address, BytesN, Env};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct MvpRecord { pub owner: Address, pub subject_hash: BytesN<32>, pub payload_hash: BytesN<32>, pub amount: i128, pub status: u32, pub issued_ledger: u32, pub revoked_ledger: u32 }

#[contracttype]
#[derive(Clone)]
pub enum DataKey { Admin, Record(BytesN<32>), Consent(BytesN<32>, Address), Nullifier(BytesN<32>) }

#[contractevent(topics = ["issued"])]
pub struct Issued { pub record_id: BytesN<32>, pub owner: Address, pub payload_hash: BytesN<32> }

#[contractevent(topics = ["status"])]
pub struct StatusChanged { pub record_id: BytesN<32>, pub status: u32 }

#[contract]
pub struct SellerIdentityEscrow;

#[contractimpl]
impl SellerIdentityEscrow {
    pub fn __constructor(env: Env, admin: Address) { env.storage().instance().set(&DataKey::Admin, &admin); }
    pub fn issue_record(env: Env, owner: Address, record_id: BytesN<32>, subject_hash: BytesN<32>, payload_hash: BytesN<32>, amount: i128) -> MvpRecord {
        owner.require_auth();
        let record = MvpRecord { owner: owner.clone(), subject_hash, payload_hash: payload_hash.clone(), amount, status: 1, issued_ledger: env.ledger().sequence(), revoked_ledger: 0 };
        env.storage().persistent().set(&DataKey::Record(record_id.clone()), &record);
        env.storage().persistent().extend_ttl(&DataKey::Record(record_id.clone()), 17280, 518400);
        Issued { record_id, owner, payload_hash }.publish(&env);
        record
    }
    pub fn verify_record(env: Env, record_id: BytesN<32>) -> Option<MvpRecord> { env.storage().persistent().get(&DataKey::Record(record_id)) }
    pub fn update_status(env: Env, record_id: BytesN<32>, status: u32) -> MvpRecord {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();
        let mut record: MvpRecord = env.storage().persistent().get(&DataKey::Record(record_id.clone())).unwrap();
        record.status = status;
        if status == 9 { record.revoked_ledger = env.ledger().sequence(); }
        env.storage().persistent().set(&DataKey::Record(record_id.clone()), &record);
        StatusChanged { record_id, status }.publish(&env);
        record
    }
    pub fn grant_consent(env: Env, subject: Address, record_id: BytesN<32>, verifier: Address) { subject.require_auth(); env.storage().temporary().set(&DataKey::Consent(record_id, verifier), &true); }
    pub fn register_nullifier(env: Env, subject: Address, nullifier: BytesN<32>) { subject.require_auth(); if env.storage().persistent().has(&DataKey::Nullifier(nullifier.clone())) { panic!("nullifier already used") } env.storage().persistent().set(&DataKey::Nullifier(nullifier), &true); }
    pub fn transfer_asset(env: Env, from: Address, to: Address, asset_contract: Address, amount: i128) { from.require_auth(); let token = TokenClient::new(&env, &asset_contract); token.transfer(&from, &to, &amount); }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{testutils::Address as _, Env};
    #[test]
    fn issues_and_verifies_record() {
        let env = Env::default();
        env.mock_all_auths();
        let admin = Address::generate(&env);
        let owner = Address::generate(&env);
        let contract_id = env.register(SellerIdentityEscrow, (&admin,));
        let client = SellerIdentityEscrowClient::new(&env, &contract_id);
        let record_id = BytesN::from_array(&env, &[1; 32]);
        let subject_hash = BytesN::from_array(&env, &[2; 32]);
        let payload_hash = BytesN::from_array(&env, &[3; 32]);
        client.issue_record(&owner, &record_id, &subject_hash, &payload_hash, &100);
        let stored = client.verify_record(&record_id).unwrap();
        assert_eq!(stored.status, 1);
    }
}
