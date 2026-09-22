/** BrokerVox Freight Desk domain.
 *  Voice layer + working-desk OS. Not a brokerage, carrier, or FMCSA system of record.
 */

export type Equipment = "van" | "reefer" | "flatbed" | "stepdeck";

export type LoadStatus =
  | "inquiry"
  | "qualified"
  | "quoting"
  | "booked"
  | "covering"
  | "covered"
  | "dispatched"
  | "in_transit"
  | "delivered"
  | "pod_pending"
  | "invoiced"
  | "closed"
  | "exception"
  | "dead";

export type CallIntent =
  | "status"
  | "capacity"
  | "rate"
  | "book"
  | "pod"
  | "accessorial"
  | "other";

export type VetStatus = "book" | "pending" | "flagged" | "blocked";

export type EventKind =
  | "inbound"
  | "qualified"
  | "quoted"
  | "booked"
  | "matched"
  | "vetted"
  | "rate_con"
  | "dispatched"
  | "check_call"
  | "pickup"
  | "in_transit"
  | "delivered"
  | "pod"
  | "invoiced"
  | "exception"
  | "escalated"
  | "note";

export type Stop = {
  name: string;
  city: string;
  state: string;
  zip: string;
  windowStart: string;
  windowEnd: string;
  notes?: string;
};

export type Accessorial = {
  code: "DET" | "LAY" | "LUM" | "TONU" | "HAZ" | "LIFT" | "TARP";
  label: string;
  amount: number;
  status: "quoted" | "approved" | "denied" | "pending";
};

export type DeskEvent = {
  id: string;
  at: string;
  kind: EventKind;
  actor: "joe" | "human" | "carrier" | "shipper" | "system";
  text: string;
  loadId?: string;
};

export type LaneBook = {
  id: string;
  origin: string;
  dest: string;
  equipment: Equipment;
  miles: number;
  rpmSell: number;
  rpmBuy: number;
  fuelPerMile: number;
  notes: string;
};

export type Carrier = {
  id: string;
  name: string;
  mc: string;
  dot: string;
  phone: string;
  email: string;
  equipment: Equipment[];
  preferredLanes: string[];
  city: string;
  state: string;
  insuranceExpiry: string;
  authority: "active" | "inactive";
  cargoLimit: number;
  vet: VetStatus;
  vetNotes: string;
  onTimePct: number;
  lastHaul: string;
};

export type Load = {
  id: string;
  ref: string;
  status: LoadStatus;
  equipment: Equipment;
  commodity: string;
  weightLbs: number;
  pieces?: number;
  miles: number;
  pickup: Stop;
  delivery: Stop;
  shipper: string;
  consignee: string;
  sellRate: number | null;
  buyRate: number | null;
  fuel: number;
  accessorials: Accessorial[];
  carrierId: string | null;
  driver?: string;
  driverPhone?: string;
  trailer?: string;
  posted: boolean;
  needsHuman: boolean;
  humanReason?: string;
  createdAt: string;
  pickupAt: string;
  deliverBy: string;
};

export type Conversation = {
  id: string;
  at: string;
  from: string;
  role: "shipper" | "carrier" | "unknown";
  intent: CallIntent;
  line: string;
  transcript: string;
  extracted: Partial<{
    origin: string;
    dest: string;
    equipment: Equipment;
    commodity: string;
    weightLbs: number;
    when: string;
    mc: string;
    loadRef: string;
  }>;
  loadId: string | null;
  nextStep: string;
  resolved: boolean;
};

export type RateCon = {
  id: string;
  loadId: string;
  carrierId: string;
  issuedAt: string;
  buyRate: number;
  terms: string;
  signed: boolean;
};

export type Invoice = {
  id: string;
  loadId: string;
  shipper: string;
  amount: number;
  issuedAt: string;
  status: "draft" | "sent" | "paid";
};

export type DeskState = {
  loads: Load[];
  carriers: Carrier[];
  lanes: LaneBook[];
  conversations: Conversation[];
  events: DeskEvent[];
  rateCons: RateCon[];
  invoices: Invoice[];
};

export const STATUS_LABEL: Record<LoadStatus, string> = {
  inquiry: "Inquiry",
  qualified: "Qualified",
  quoting: "Quoting",
  booked: "Booked",
  covering: "Covering",
  covered: "Covered",
  dispatched: "Dispatched",
  in_transit: "In transit",
  delivered: "Delivered",
  pod_pending: "POD pending",
  invoiced: "Invoiced",
  closed: "Closed",
  exception: "Exception",
  dead: "Dead",
};

export const EQUIP_LABEL: Record<Equipment, string> = {
  van: "Dry van",
  reefer: "Reefer",
  flatbed: "Flatbed",
  stepdeck: "Step deck",
};

export function margin(load: Load): number | null {
  if (load.sellRate == null || load.buyRate == null) return null;
  return load.sellRate - load.buyRate;
}

export function rpm(amount: number | null, miles: number): number | null {
  if (amount == null || miles <= 0) return null;
  return amount / miles;
}

export function laneKey(originCity: string, destCity: string): string {
  return `${originCity.trim().toLowerCase()}→${destCity.trim().toLowerCase()}`;
}
