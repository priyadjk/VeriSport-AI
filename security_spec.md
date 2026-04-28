# Security Specification: VeriSport AI

## Data Invariants
1. A provenance record must have a valid owner ID matching the authenticated publisher.
2. Blockchain transactions IDs are immutable after creation.
3. Piracy alerts are system-generated (only admins or service accounts can create).
4. Authenticity scores must be between 0 and 100.

## The Dirty Dozen Payloads (Rejection Targets)
1. **Identity Theft**: User A tries to create a provenance record claiming User B is the owner.
2. **Score Inflation**: User tries to update an authenticity score to 500%.
3. **Transaction Poisoning**: Injecting 2MB of junk HTML into the blockchainTx field.
4. **History Erasure**: User tries to change their own `createdAt` timestamp.
5. **Unauthorized Takedown**: Non-authenticated user tries to register a piracy alert.
6. **Status Hijacking**: Changing a "MINTED" record back to "PENDING" unauthorized.
7. **Cross-Tenant Read**: User A tries to list piracy alerts intended for League B.
8. **Null ID**: Creating a record with an empty string as a document ID.
9. **Future Dating**: Setting a `createdAt` timestamp to 2050.
10. **Shadow Fields**: Adding a `hiddenVerified: true` field not in the schema.
11. **PII Leak**: Storing cleartext email in the mediaTitle field.
12. **Mass Deletion**: Attempting a collection-wide delete on records.

## Test Runner Logic
The `firestore.rules.test.ts` will verify REJECT on all of the above.
