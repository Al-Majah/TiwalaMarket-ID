import * as StellarSdk from '@stellar/stellar-sdk';
export const stellarConfig = { network: process.env.NEXT_PUBLIC_STELLAR_NETWORK ?? 'testnet', caip2: process.env.NEXT_PUBLIC_STELLAR_CAIP2 ?? 'stellar:testnet', rpcUrl: process.env.NEXT_PUBLIC_STELLAR_RPC_URL ?? 'https://soroban-testnet.stellar.org', horizonUrl: process.env.NEXT_PUBLIC_STELLAR_HORIZON_URL ?? 'https://horizon-testnet.stellar.org', networkPassphrase: StellarSdk.Networks.TESTNET };
export function rpcServer(){ return new StellarSdk.rpc.Server(stellarConfig.rpcUrl); }
export function horizonServer(){ return new StellarSdk.Horizon.Server(stellarConfig.horizonUrl); }
export async function getLatestLedgerSnapshot(){ const rpc = rpcServer(); const ledger = await rpc.getLatestLedger(); return { sequence: ledger.sequence, protocolVersion: ledger.protocolVersion, network: stellarConfig.caip2 }; }
