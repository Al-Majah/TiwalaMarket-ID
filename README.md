# TiwalaMarket ID

Verified seller identity MVP for e-commerce platforms, seller badges, immutable reputation, and escrow-supported buyer protection.

## Problem

Online buyers often cannot verify whether a seller is real, licensed, reputable, or linked to previous fraud reports before sending payment.

## MVP Goal

TiwalaMarket ID provides a practical seller verification console and API shape for marketplaces that want verifiable seller status and fraud-risk lookups.

## Core Features

- Seller verification queue with category, region, status, and reputation details
- Searchable verification workspace for marketplace operators
- Seller onboarding form for business permit and marketplace URL
- Verification API for seller badge checks
- Agentic payment quote endpoint for paid seller-risk data access
- Soroban contract with seller record issuance, status updates, nullifiers, and escrow-ready SAC transfer support

## Stellar Design

- Network: Stellar Testnet by default
- Asset model: PHPC or USDC escrow settlement through SAC
- Contract: `contracts/SellerIdentityEscrow`
- Agentic payments: x402-style paid risk API for platforms and automated agents
- Standards: SEP-0010, SEP-0041, SEP-0048, x402 exact payment
- Privacy path: seller can prove verified-business status without exposing full tax records or owner PII

## Run Locally

```powershell
npm install
npm run dev
```

## Build

```powershell
npm run build
```

## Test Contract

```powershell
cd contracts/SellerIdentityEscrow
cargo test
```

## Environment

Use `.env.example` to configure Stellar RPC, asset contract, contract ID, and x402 facilitator settings.
