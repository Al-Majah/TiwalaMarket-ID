export type MvpRecord = { id: string; name: string; primary: string; region: string; status: string; amount: string; hash: string; fields: readonly string[] };
export type ProjectConfig = typeof project;
export const project = {
  "logo": {"mark":"TM","symbol":"verified","label":"Verified seller mark"},
  "title": "Verified Digital Identity Marketplace for E-Commerce",
  "product": "TiwalaMarket ID",
  "subtitle": "Seller verification, immutable reputation, escrow proof, and marketplace badge verification.",
  "impact": "Buyers can verify sellers before paying, reducing fake stores and counterfeit listings.",
  "problem": "E-commerce fraud thrives because buyers cannot verify seller identity, business records, or reputation integrity.",
  "accent": "#4f46e5",
  "asset": "Escrow settlement in PHPC or USDC via SAC",
  "rail": "x402 paid seller risk API for platforms and agents",
  "contract": "SellerIdentityEscrow",
  "users": [
    "Seller",
    "Buyer",
    "Marketplace operator",
    "Dispute reviewer"
  ],
  "metrics": [
    {
      "value": "QR",
      "label": "seller badge proof"
    },
    {
      "value": "100%",
      "label": "immutable reviews"
    },
    {
      "value": "24h",
      "label": "escrow dispute window"
    }
  ],
  "features": [
    "Seller business and tax verification",
    "Blockchain verified seller badge",
    "Immutable buyer review hash",
    "Escrow until delivery confirmation",
    "Counterfeit and dispute evidence log"
  ],
  "workflow": [
    {
      "title": "Verify seller",
      "body": "Seller submits business evidence and links marketplace accounts."
    },
    {
      "title": "Display badge",
      "body": "Buyer scans seller QR to confirm status and reputation."
    },
    {
      "title": "Hold escrow",
      "body": "Payment is locked until buyer confirms goods or dispute expires."
    },
    {
      "title": "Record review",
      "body": "Review hash is appended and cannot be deleted by seller."
    }
  ],
  "records": [
    {
      "id": "SEL-QC-4410",
      "name": "Luna Gadgets",
      "primary": "Electronics",
      "region": "Quezon City",
      "status": "Verified",
      "amount": "4.8 reputation",
      "hash": "090f4b9c2a7e1d6a0b3c8d9e2f5a1b7c0d3e4f6a8b9c1d2e3f4a5b6c7d8e9",
      "fields": [
        "Luna Gadgets",
        "Electronics",
        "Quezon City",
        "4.8 reputation"
      ]
    },
    {
      "id": "SEL-CEB-9302",
      "name": "Cebu Handcrafts",
      "primary": "Home goods",
      "region": "Cebu",
      "status": "Verified",
      "amount": "128 sales",
      "hash": "091f4b9c2a7e1d6a0b3c8d9e2f5a1b7c0d3e4f6a8b9c1d2e3f4a5b6c7d8e9",
      "fields": [
        "Cebu Handcrafts",
        "Home goods",
        "Cebu",
        "128 sales"
      ]
    },
    {
      "id": "SEL-MNL-5803",
      "name": "Metro Sneaker Hub",
      "primary": "Fashion",
      "region": "Manila",
      "status": "Flagged",
      "amount": "Counterfeit review",
      "hash": "092f4b9c2a7e1d6a0b3c8d9e2f5a1b7c0d3e4f6a8b9c1d2e3f4a5b6c7d8e9",
      "fields": [
        "Metro Sneaker Hub",
        "Fashion",
        "Manila",
        "Counterfeit review"
      ]
    }
  ],
  "action": {
    "submit": "Verify seller",
    "field1": "Business name",
    "field2": "TIN or permit",
    "field3": "Marketplace URL",
    "success": "Seller verification started."
  },
  "standards": [
    "SEP-0010 seller wallet authentication",
    "SEP-0041 escrow token transfers",
    "SEP-0048 seller registry interface",
    "x402 exact payment for platform risk lookups"
  ],
  "zk": "Seller can prove verified-business status to buyers without exposing full tax records or owner PII.",
  "agentic": true
} as const;
