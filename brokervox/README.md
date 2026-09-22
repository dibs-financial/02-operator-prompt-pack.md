# BrokerVox Freight Desk

Joe’s working desk. Automates about **90%** of a freight broker’s daily grind from the book. A licensed human keeps the other 10%.

This is a voice + workflow layer. It is **not** a brokerage, carrier, FMCSA system of record, or DAT terminal.

## The 90% Joe runs

1. Answer the line (talk page / overflow / SMS)
2. Qualify the load (lane, equipment, weight, windows, commodity)
3. Quote **only** from the lane book
4. Post to the desk board
5. Match carriers on the book (equipment + lane + vet)
6. Issue a rate confirmation
7. Dispatch + check-calls + ETA relay
8. POD chase
9. Invoice the shipper from the load record
10. After-hours coverage

## The 10% Joe parks

- Cargo claims and refusals
- Credit / collections past terms
- First-time carrier packet (W-9, COI holder, broker-carrier agreement)
- Authority inactive or insurance inside 14 days
- Hazmat, oversized, or commodity not in the book
- Double-broker / identity fraud flags
- Rate outside the book band

## Run

```bash
npm install
npm run dev
```

Open the Floor. Hit **Joe next** on a load to watch it walk the state machine.

Demo book: Dallas–Atlanta dry van and six more DFW lanes. Seeded conversations include “Need a dry van Friday”, “Where is my load?”, and a blocked MC.

## Stack

Vite + React 18 + TypeScript. In-memory store. No backend. Swap `engine.ts` adapters later for RubyVox voice, FMCSA SAFER, DAT/Truckstop, and a real TMS.

A DIBS desk product. Dallas.
