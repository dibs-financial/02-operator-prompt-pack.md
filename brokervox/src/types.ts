export type {
  Accessorial,
  CallIntent,
  Carrier,
  Conversation,
  DeskEvent,
  DeskState,
  Equipment,
  Invoice,
  LaneBook,
  Load,
  LoadStatus,
  RateCon,
  Stop,
  VetStatus,
} from "./domain";

export {
  EQUIP_LABEL,
  STATUS_LABEL,
  laneKey,
  margin,
  rpm,
} from "./domain";

export type ViewId =
  | "floor"
  | "inbox"
  | "loads"
  | "carriers"
  | "rates"
  | "track"
  | "exceptions"
  | "docs";
