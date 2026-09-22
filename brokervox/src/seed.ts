
import type { Carrier, Conversation, DeskEvent, DeskState, LaneBook, Load } from "./domain";

const lanes: LaneBook[] = [
  { id: "dal-atl", origin: "Dallas, TX", dest: "Atlanta, GA", equipment: "van", miles: 780, rpmSell: 2.55, rpmBuy: 2.15, fuelPerMile: 0.38, notes: "Joe's home lane. Daily." },
  { id: "dfw-chi", origin: "Fort Worth, TX", dest: "Chicago, IL", equipment: "van", miles: 920, rpmSell: 2.40, rpmBuy: 2.05, fuelPerMile: 0.36, notes: "Retail inbound." },
  { id: "hou-mem", origin: "Houston, TX", dest: "Memphis, TN", equipment: "reefer", miles: 570, rpmSell: 2.85, rpmBuy: 2.40, fuelPerMile: 0.40, notes: "Food-grade only." },
  { id: "okc-dal", origin: "Oklahoma City, OK", dest: "Dallas, TX", equipment: "flatbed", miles: 210, rpmSell: 3.10, rpmBuy: 2.55, fuelPerMile: 0.42, notes: "Steel / pipe." },
  { id: "dal-lax", origin: "Dallas, TX", dest: "Los Angeles, CA", equipment: "van", miles: 1435, rpmSell: 2.20, rpmBuy: 1.85, fuelPerMile: 0.34, notes: "Long-haul. Watch extra stop." },
  { id: "sat-dal", origin: "San Antonio, TX", dest: "Dallas, TX", equipment: "van", miles: 275, rpmSell: 2.70, rpmBuy: 2.20, fuelPerMile: 0.35, notes: "Same-day cover if posted before 10." },
  { id: "dal-mci", origin: "Dallas, TX", dest: "Kansas City, MO", equipment: "van", miles: 500, rpmSell: 2.45, rpmBuy: 2.05, fuelPerMile: 0.36, notes: "Backhaul friendly." },
];

const carriers: Carrier[] = [
  { id: "c1", name: "Red River Express", mc: "MC-744211", dot: "2448901", phone: "214-555-0144", email: "dispatch@redriverexpress.example", equipment: ["van"], preferredLanes: ["Dallas, TX→Atlanta, GA", "Dallas, TX→Kansas City, MO"], city: "Dallas", state: "TX", insuranceExpiry: "2027-03-12", authority: "active", cargoLimit: 100000, vet: "book", vetNotes: "On the book. 18 months, no claims.", onTimePct: 96, lastHaul: "2026-09-19" },
  { id: "c2", name: "Peachline Carrier Co", mc: "MC-812330", dot: "3011220", phone: "404-555-0172", email: "ops@peachline.example", equipment: ["van"], preferredLanes: ["Dallas, TX→Atlanta, GA"], city: "Atlanta", state: "GA", insuranceExpiry: "2026-12-01", authority: "active", cargoLimit: 100000, vet: "book", vetNotes: "Headhaul partner. Prefers Friday pickups.", onTimePct: 93, lastHaul: "2026-09-18" },
  { id: "c3", name: "Northstar Van Lines", mc: "MC-655019", dot: "1988443", phone: "312-555-0190", email: "night@northstarvan.example", equipment: ["van"], preferredLanes: ["Fort Worth, TX→Chicago, IL"], city: "Joliet", state: "IL", insuranceExpiry: "2027-01-20", authority: "active", cargoLimit: 250000, vet: "book", vetNotes: "High cargo limit. Good for retail.", onTimePct: 91, lastHaul: "2026-09-17" },
  { id: "c4", name: "Gulf Cold Freight", mc: "MC-901288", dot: "3321099", phone: "713-555-0118", email: "reef@gulfcold.example", equipment: ["reefer"], preferredLanes: ["Houston, TX→Memphis, TN"], city: "Houston", state: "TX", insuranceExpiry: "2026-11-04", authority: "active", cargoLimit: 150000, vet: "book", vetNotes: "Food-grade reefers. Temp printouts on file.", onTimePct: 97, lastHaul: "2026-09-20" },
  { id: "c5", name: "Prairie Iron Transport", mc: "MC-577140", dot: "1677201", phone: "405-555-0166", email: "flat@prairieiron.example", equipment: ["flatbed", "stepdeck"], preferredLanes: ["Oklahoma City, OK→Dallas, TX"], city: "Oklahoma City", state: "OK", insuranceExpiry: "2027-06-01", authority: "active", cargoLimit: 100000, vet: "book", vetNotes: "Straps/tarps. No oversize without human.", onTimePct: 94, lastHaul: "2026-09-16" },
  { id: "c6", name: "Westfork Logistics", mc: "MC-448201", dot: "1400888", phone: "323-555-0133", email: "la@westfork.example", equipment: ["van"], preferredLanes: ["Dallas, TX→Los Angeles, CA"], city: "Ontario", state: "CA", insuranceExpiry: "2026-10-22", authority: "active", cargoLimit: 100000, vet: "pending", vetNotes: "First load with DIBS. Human must confirm COI + authority packet.", onTimePct: 88, lastHaul: "—" },
  { id: "c7", name: "Two Lane Cowboys", mc: "MC-219004", dot: "988211", phone: "806-555-0102", email: "dispatch@twolanecowboys.example", equipment: ["van", "flatbed"], preferredLanes: ["San Antonio, TX→Dallas, TX"], city: "Lubbock", state: "TX", insuranceExpiry: "2026-09-30", authority: "active", cargoLimit: 100000, vet: "flagged", vetNotes: "Insurance expires in 9 days. Joe will not tender.", onTimePct: 84, lastHaul: "2026-08-02" },
  { id: "c8", name: "Ghost MC Holdings", mc: "MC-000111", dot: "111", phone: "800-555-0199", email: "book@ghostmc.example", equipment: ["van"], preferredLanes: ["Dallas, TX→Atlanta, GA"], city: "Miami", state: "FL", insuranceExpiry: "2025-01-01", authority: "inactive", cargoLimit: 0, vet: "blocked", vetNotes: "Double-broker pattern. Blocked. Escalate if they call.", onTimePct: 0, lastHaul: "—" },
  { id: "c9", name: "Metroplex Night Vans", mc: "MC-790441", dot: "2881900", phone: "972-555-0188", email: "nights@metroplexvans.example", equipment: ["van"], preferredLanes: ["Dallas, TX→Atlanta, GA", "San Antonio, TX→Dallas, TX"], city: "Irving", state: "TX", insuranceExpiry: "2027-04-18", authority: "active", cargoLimit: 100000, vet: "book", vetNotes: "After-hours cover. Answers Joe at 2am.", onTimePct: 95, lastHaul: "2026-09-21" },
];

function stop(name: string, city: string, state: string, zip: string, a: string, b: string, notes?: string) {
  return { name, city, state, zip, windowStart: a, windowEnd: b, notes };
}

const loads: Load[] = [
  {
    id: "L-4412", ref: "DIBS-4412", status: "inquiry", equipment: "van", commodity: "Retail cartons",
    weightLbs: 34000, miles: 780,
    pickup: stop("Acme DC", "Dallas", "TX", "75212", "2026-09-22T08:00:00", "2026-09-22T16:00:00"),
    delivery: stop("Peach Retail", "Atlanta", "GA", "30318", "2026-09-23T07:00:00", "2026-09-23T15:00:00"),
    shipper: "Acme Distribution", consignee: "Peach Retail",
    sellRate: null, buyRate: null, fuel: 0, accessorials: [],
    carrierId: null, posted: false, needsHuman: false,
    createdAt: "2026-09-21T21:14:00", pickupAt: "2026-09-22T08:00:00", deliverBy: "2026-09-23T15:00:00",
  },
  {
    id: "L-4413", ref: "DIBS-4413", status: "qualified", equipment: "van", commodity: "Appliance parts",
    weightLbs: 28600, miles: 780,
    pickup: stop("North Yard", "Dallas", "TX", "75207", "2026-09-22T10:00:00", "2026-09-22T18:00:00"),
    delivery: stop("East Point DC", "Atlanta", "GA", "30344", "2026-09-23T08:00:00", "2026-09-23T16:00:00"),
    shipper: "Summit Appliance", consignee: "East Point DC",
    sellRate: 1989, buyRate: null, fuel: 296, accessorials: [],
    carrierId: null, posted: true, needsHuman: false,
    createdAt: "2026-09-21T18:40:00", pickupAt: "2026-09-22T10:00:00", deliverBy: "2026-09-23T16:00:00",
  },
  {
    id: "L-4408", ref: "DIBS-4408", status: "covering", equipment: "van", commodity: "Dry grocery",
    weightLbs: 41200, miles: 780,
    pickup: stop("DIBS Crossdock", "Dallas", "TX", "75247", "2026-09-22T06:00:00", "2026-09-22T12:00:00"),
    delivery: stop("South Fulton Foods", "Atlanta", "GA", "30336", "2026-09-23T06:00:00", "2026-09-23T12:00:00"),
    shipper: "DIBS Freight Book", consignee: "South Fulton Foods",
    sellRate: 1989, buyRate: 1677, fuel: 296, accessorials: [],
    carrierId: null, posted: true, needsHuman: false,
    createdAt: "2026-09-21T09:12:00", pickupAt: "2026-09-22T06:00:00", deliverBy: "2026-09-23T12:00:00",
  },
  {
    id: "L-4399", ref: "DIBS-4399", status: "in_transit", equipment: "van", commodity: "Packaged goods",
    weightLbs: 36500, miles: 780,
    pickup: stop("West Dallas Shed", "Dallas", "TX", "75212", "2026-09-21T07:00:00", "2026-09-21T15:00:00"),
    delivery: stop("Cobb Distribution", "Atlanta", "GA", "30080", "2026-09-22T08:00:00", "2026-09-22T16:00:00"),
    shipper: "Acme Distribution", consignee: "Cobb Distribution",
    sellRate: 1989, buyRate: 1677, fuel: 296, accessorials: [],
    carrierId: "c1", driver: "Ray Morales", driverPhone: "214-555-0147", trailer: "RR-441",
    posted: true, needsHuman: false,
    createdAt: "2026-09-20T16:02:00", pickupAt: "2026-09-21T07:00:00", deliverBy: "2026-09-22T16:00:00",
  },
  {
    id: "L-4388", ref: "DIBS-4388", status: "dispatched", equipment: "van", commodity: "Furniture kits",
    weightLbs: 22000, miles: 920,
    pickup: stop("Alliance DC", "Fort Worth", "TX", "76177", "2026-09-22T09:00:00", "2026-09-22T17:00:00"),
    delivery: stop("Elk Grove DC", "Chicago", "IL", "60007", "2026-09-24T07:00:00", "2026-09-24T15:00:00"),
    shipper: "Summit Appliance", consignee: "Elk Grove DC",
    sellRate: 2208, buyRate: 1886, fuel: 331, accessorials: [],
    carrierId: "c3", driver: "Dee Patel", driverPhone: "312-555-0194", trailer: "NS-220",
    posted: true, needsHuman: false,
    createdAt: "2026-09-21T11:20:00", pickupAt: "2026-09-22T09:00:00", deliverBy: "2026-09-24T15:00:00",
  },
  {
    id: "L-4371", ref: "DIBS-4371", status: "pod_pending", equipment: "reefer", commodity: "Chilled protein",
    weightLbs: 39800, miles: 570,
    pickup: stop("Gulf Cold Dock 3", "Houston", "TX", "77029", "2026-09-20T04:00:00", "2026-09-20T10:00:00", "34°F"),
    delivery: stop("Memphis Foods", "Memphis", "TN", "38118", "2026-09-21T05:00:00", "2026-09-21T11:00:00"),
    shipper: "Gulf Packing", consignee: "Memphis Foods",
    sellRate: 1625, buyRate: 1368, fuel: 228, accessorials: [{ code: "LUM", label: "Lumper", amount: 150, status: "approved" }],
    carrierId: "c4", driver: "Chris Nguyen", driverPhone: "713-555-0120", trailer: "GC-19",
    posted: true, needsHuman: false,
    createdAt: "2026-09-19T14:00:00", pickupAt: "2026-09-20T04:00:00", deliverBy: "2026-09-21T11:00:00",
  },
  {
    id: "L-4360", ref: "DIBS-4360", status: "invoiced", equipment: "flatbed", commodity: "Steel pipe",
    weightLbs: 44000, miles: 210,
    pickup: stop("OKC Rail Spur", "Oklahoma City", "OK", "73121", "2026-09-18T07:00:00", "2026-09-18T15:00:00", "Tarps required"),
    delivery: stop("Trinity Yard", "Dallas", "TX", "75215", "2026-09-18T16:00:00", "2026-09-18T22:00:00"),
    shipper: "Prairie Steel", consignee: "Trinity Yard",
    sellRate: 651, buyRate: 536, fuel: 88, accessorials: [{ code: "TARP", label: "Tarp", amount: 50, status: "approved" }],
    carrierId: "c5", driver: "Will Hart", driverPhone: "405-555-0167",
    posted: true, needsHuman: false,
    createdAt: "2026-09-17T10:11:00", pickupAt: "2026-09-18T07:00:00", deliverBy: "2026-09-18T22:00:00",
  },
  {
    id: "L-4418", ref: "DIBS-4418", status: "exception", equipment: "van", commodity: "Electronics",
    weightLbs: 18000, miles: 1435,
    pickup: stop("Las Colinas Hub", "Dallas", "TX", "75039", "2026-09-22T12:00:00", "2026-09-22T20:00:00"),
    delivery: stop("Commerce Warehouse", "Los Angeles", "CA", "90040", "2026-09-25T08:00:00", "2026-09-25T16:00:00"),
    shipper: "Acme Distribution", consignee: "Commerce Warehouse",
    sellRate: 3157, buyRate: 2655, fuel: 488, accessorials: [],
    carrierId: "c6", posted: true, needsHuman: true,
    humanReason: "First-time carrier. Authority packet + COI not confirmed. Possible high-value freight.",
    createdAt: "2026-09-21T20:02:00", pickupAt: "2026-09-22T12:00:00", deliverBy: "2026-09-25T16:00:00",
  },
  {
    id: "L-4419", ref: "DIBS-4419", status: "exception", equipment: "van", commodity: "Unknown / caller would not say",
    weightLbs: 42000, miles: 780,
    pickup: stop("Unverified lot", "Dallas", "TX", "75200", "2026-09-22T00:00:00", "2026-09-22T23:00:00"),
    delivery: stop("Cash lot", "Atlanta", "GA", "30300", "2026-09-23T00:00:00", "2026-09-23T23:00:00"),
    shipper: "Unknown caller", consignee: "Unknown",
    sellRate: null, buyRate: null, fuel: 0, accessorials: [],
    carrierId: "c8", posted: false, needsHuman: true,
    humanReason: "Ghost MC Holdings called offering to cover. Blocked carrier. Possible double-broker.",
    createdAt: "2026-09-21T21:40:00", pickupAt: "2026-09-22T00:00:00", deliverBy: "2026-09-23T23:00:00",
  },
  {
    id: "L-4355", ref: "DIBS-4355", status: "closed", equipment: "van", commodity: "Paper goods",
    weightLbs: 40000, miles: 500,
    pickup: stop("DIBS Crossdock", "Dallas", "TX", "75247", "2026-09-16T08:00:00", "2026-09-16T16:00:00"),
    delivery: stop("KC Grocery", "Kansas City", "MO", "64101", "2026-09-17T08:00:00", "2026-09-17T16:00:00"),
    shipper: "DIBS Freight Book", consignee: "KC Grocery",
    sellRate: 1225, buyRate: 1025, fuel: 180, accessorials: [],
    carrierId: "c1", posted: true, needsHuman: false,
    createdAt: "2026-09-15T11:00:00", pickupAt: "2026-09-16T08:00:00", deliverBy: "2026-09-17T16:00:00",
  },
  {
    id: "L-4420", ref: "DIBS-4420", status: "quoting", equipment: "van", commodity: "Empty totes",
    weightLbs: 12000, miles: 275,
    pickup: stop("SAT Pool", "San Antonio", "TX", "78219", "2026-09-22T07:00:00", "2026-09-22T15:00:00"),
    delivery: stop("DIBS Crossdock", "Dallas", "TX", "75247", "2026-09-22T16:00:00", "2026-09-22T22:00:00"),
    shipper: "Hill Country Pack", consignee: "DIBS Freight Book",
    sellRate: 743, buyRate: null, fuel: 96, accessorials: [],
    carrierId: null, posted: true, needsHuman: false,
    createdAt: "2026-09-21T19:30:00", pickupAt: "2026-09-22T07:00:00", deliverBy: "2026-09-22T22:00:00",
  },
  {
    id: "L-4401", ref: "DIBS-4401", status: "delivered", equipment: "van", commodity: "Retail cartons",
    weightLbs: 33000, miles: 780,
    pickup: stop("Acme DC", "Dallas", "TX", "75212", "2026-09-19T08:00:00", "2026-09-19T16:00:00"),
    delivery: stop("Peach Retail", "Atlanta", "GA", "30318", "2026-09-20T08:00:00", "2026-09-20T16:00:00"),
    shipper: "Acme Distribution", consignee: "Peach Retail",
    sellRate: 1989, buyRate: 1677, fuel: 296, accessorials: [{ code: "DET", label: "Detention", amount: 75, status: "pending" }],
    carrierId: "c2", driver: "Marcus Bell", driverPhone: "404-555-0178",
    posted: true, needsHuman: true, humanReason: "Carrier billed $75 detention. Joe will not approve accessorials over $50 without a human.",
    createdAt: "2026-09-18T13:22:00", pickupAt: "2026-09-19T08:00:00", deliverBy: "2026-09-20T16:00:00",
  },
];

const conversations: Conversation[] = [
  {
    id: "C-90", at: "2026-09-21T21:14:00", from: "Acme night clerk", role: "shipper", intent: "book",
    line: "Talk page",
    transcript: "CALLER: Need a dry van Friday Dallas to Atlanta, 34,000, retail cartons, pickup after eight.\nJOE: Dallas to Atlanta dry van Friday. 34,000 pounds, cartons. Window after 08:00 at Acme DC?\nCALLER: Yes. Same consignee as last week, Peach Retail.\nJOE: On the book. I will qualify and send a rate. Not covering until a truck on the book answers.",
    extracted: { origin: "Dallas, TX", dest: "Atlanta, GA", equipment: "van", commodity: "Retail cartons", weightLbs: 34000, when: "Friday", loadRef: "L-4412" },
    loadId: "L-4412", nextStep: "Qualify + quote from lane book", resolved: false,
  },
  {
    id: "C-91", at: "2026-09-21T21:18:00", from: "Ray Morales", role: "carrier", intent: "status",
    line: "Overflow",
    transcript: "CALLER: This is Ray on Red River, where is my load?\nJOE: DIBS-4399, Dallas to Atlanta. You picked West Dallas Shed at 07:12. Last ping McAlester, OK. ETA Cobb Distribution tomorrow 09:40.\nCALLER: Copy. Rolling.",
    extracted: { loadRef: "L-4399", mc: "MC-744211" },
    loadId: "L-4399", nextStep: "Logged check-call. No human needed.", resolved: true,
  },
  {
    id: "C-92", at: "2026-09-21T21:40:00", from: "Unknown — Ghost MC", role: "carrier", intent: "capacity",
    line: "Talk page",
    transcript: "CALLER: I can cover Dallas Atlanta tonight cheap. MC-000111.\nJOE: That MC is blocked on this desk. I will not tender. A human will call you back if we owe you an explanation. We do not.",
    extracted: { origin: "Dallas, TX", dest: "Atlanta, GA", equipment: "van", mc: "MC-000111" },
    loadId: "L-4419", nextStep: "Escalated. Blocked carrier / double-broker pattern.", resolved: false,
  },
  {
    id: "C-93", at: "2026-09-21T19:28:00", from: "Hill Country Pack", role: "shipper", intent: "rate",
    line: "Talk page",
    transcript: "CALLER: Rate check San Antonio to Dallas, empty totes, van, today.\nJOE: Book says $743 sell on 275 miles. I can post and cover if a book truck is empty in SAT.\nCALLER: Send it.",
    extracted: { origin: "San Antonio, TX", dest: "Dallas, TX", equipment: "van", commodity: "Empty totes", weightLbs: 12000, loadRef: "L-4420" },
    loadId: "L-4420", nextStep: "Quote sent. Waiting on cover.", resolved: false,
  },
  {
    id: "C-94", at: "2026-09-21T20:04:00", from: "Westfork night dispatch", role: "carrier", intent: "book",
    line: "SMS",
    transcript: "CALLER: We can take the LA load. First time with you.\nJOE: First-time carrier. I parked the tender. A human has to confirm your packet before I send a rate con.",
    extracted: { dest: "Los Angeles, CA", mc: "MC-448201", loadRef: "L-4418" },
    loadId: "L-4418", nextStep: "Human confirms first-time carrier packet.", resolved: false,
  },
];

const events: DeskEvent[] = [
  { id: "e1", at: "2026-09-21T21:14:00", kind: "inbound", actor: "joe", text: "Answered Acme night clerk. Built L-4412 from the talk page.", loadId: "L-4412" },
  { id: "e2", at: "2026-09-21T21:18:00", kind: "check_call", actor: "joe", text: "Ray Morales check-call. McAlester. On time.", loadId: "L-4399" },
  { id: "e3", at: "2026-09-21T21:40:00", kind: "escalated", actor: "joe", text: "Blocked Ghost MC Holdings. Did not tender.", loadId: "L-4419" },
  { id: "e4", at: "2026-09-21T09:40:00", kind: "quoted", actor: "joe", text: "Quoted DIBS-4408 off Dallas–Atlanta book $2.55 sell / $2.15 buy.", loadId: "L-4408" },
  { id: "e5", at: "2026-09-21T07:12:00", kind: "pickup", actor: "carrier", text: "Picked West Dallas Shed. Rolling.", loadId: "L-4399" },
  { id: "e6", at: "2026-09-21T11:44:00", kind: "rate_con", actor: "joe", text: "Rate con issued to Northstar on DIBS-4388.", loadId: "L-4388" },
  { id: "e7", at: "2026-09-21T05:20:00", kind: "pod", actor: "system", text: "Delivery confirmed Memphis Foods. POD image missing.", loadId: "L-4371" },
];

export function seedState(): DeskState {
  return {
    loads,
    carriers,
    lanes,
    conversations,
    events,
    rateCons: [
      { id: "RC-4388", loadId: "L-4388", carrierId: "c3", issuedAt: "2026-09-21T11:44:00", buyRate: 1886, terms: "Net 30 from POD. No detention unless shipper signs.", signed: true },
      { id: "RC-4399", loadId: "L-4399", carrierId: "c1", issuedAt: "2026-09-20T16:40:00", buyRate: 1677, terms: "Net 30 from POD.", signed: true },
    ],
    invoices: [
      { id: "INV-4360", loadId: "L-4360", shipper: "Prairie Steel", amount: 701, issuedAt: "2026-09-19T09:00:00", status: "sent" },
      { id: "INV-4355", loadId: "L-4355", shipper: "DIBS Freight Book", amount: 1225, issuedAt: "2026-09-18T10:00:00", status: "paid" },
    ],
  };
}

export const initialState = seedState;
export const seed = seedState();
export const JOE_URL =
  "https://rubyvox.com/a/791cc6bc-1326-4345-a13a-c4e3d7069b39";
export const CREATE_URL = "https://rubyvox.com/create";
