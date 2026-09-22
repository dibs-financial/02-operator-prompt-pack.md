// All site copy lives here. Components render it; they do not own words.
// BrokerVox: voice communication between a trucking business and its trucks.
// No invented prices: Starter is $0, Fleet is "Talk to us", Enterprise is "Custom".

export const links = {
  getStarted: "https://rubyvox.com/create",
  pricing: "#pricing",
  github: "https://github.com/dibs-financial/brokervox",
} as const;

export const brand = {
  name: "BrokerVox",
  tagline: "Voice communication for trucking fleets",
  parent: "DIBS",
  city: "Dallas",
  year: 2026,
} as const;

export const nav = [
  { label: "What it handles", href: "#desks" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export const hero = {
  eyebrow: "Voice communication for trucking fleets",
  title: ["One line between", "your office", "and your trucks."],
  body:
    "BrokerVox is the voice line between a trucking business and its drivers. Drivers call in from the road, dispatch sends updates out, and every check-in, load change, and delay is captured in writing. Built for fleets that run on the phone.",
  primary: { label: "Get started", href: links.getStarted },
  secondary: { label: "See pricing", href: links.pricing },
} as const;

export const captureCard = {
  title: "Driver check-in",
  subtitle: "What the line records on every call from a truck",
  fields: ["Driver and unit", "Current location", "Load and reference", "Status", "ETA", "Delays or issues", "Hours remaining", "Callback needed"],
  outcome: "Logged to dispatch with the transcript.",
} as const;

export const stats = [
  { value: "24/7", label: "Line is open" },
  { value: "1", label: "Number for the whole fleet" },
  { value: "Every call", label: "Written down" },
  { value: "0", label: "Missed check-ins" },
] as const;

export const desks = {
  eyebrow: "What it handles",
  title: "Every call between the office and the road.",
  body: "The line does the phone work dispatch used to do by hand, and it writes everything down.",
  items: [
    {
      key: "checkin",
      name: "Driver check-ins",
      body: "Drivers call one number. The line takes location, status, and ETA, and logs it against the load.",
    },
    {
      key: "dispatch",
      name: "Dispatch updates",
      body: "Send a load change, a new stop, or a new appointment to a driver by voice, then confirm they got it.",
    },
    {
      key: "assign",
      name: "Load assignments",
      body: "Read the driver the pickup, delivery, commodity, and reference. Capture their confirmation.",
    },
    {
      key: "exception",
      name: "Delays and exceptions",
      body: "Breakdowns, detention, weather, missed appointments. Flagged to dispatch the moment they come in.",
    },
  ],
} as const;

export const how = {
  eyebrow: "How it works",
  title: "Live in an afternoon.",
  steps: [
    {
      n: "01",
      title: "Set up the line",
      body: "Create your BrokerVox line with your company name, your dispatch hours, and who gets alerts.",
    },
    {
      n: "02",
      title: "Add your trucks",
      body: "Drivers, units, and the phone numbers they call from. The line knows who is calling.",
    },
    {
      n: "03",
      title: "Give drivers the number",
      body: "One number for check-ins, questions, and problems. It picks up on the first ring, every time.",
    },
    {
      n: "04",
      title: "Run the fleet from the log",
      body: "Dispatch sees every call in writing, with the transcript, and steps in only when it matters.",
    },
  ],
} as const;

export const features = {
  eyebrow: "What the line does",
  title: "It works the phone. Dispatch runs the fleet.",
  items: [
    {
      title: "Takes every check-in",
      body: "Location, status, ETA, and issues, in the order dispatch would ask. No call goes to voicemail.",
    },
    {
      title: "Transcript after every call",
      body: "Who called, what they said, what changed. Two sentences and the full text.",
    },
    {
      title: "Reaches drivers by voice",
      body: "Dispatch sends an update out. The line calls the driver, reads it, and records the confirmation.",
    },
    {
      title: "Escalates what matters",
      body: "A breakdown or a missed appointment goes straight to a person, with the context attached.",
    },
    {
      title: "Texts the driver back",
      body: "Confirmations, addresses, and reference numbers as a text, so nothing is written on a napkin.",
    },
    {
      title: "Your company on the line",
      body: "The line answers with your name. Drivers hear their own office, not a vendor.",
    },
  ],
} as const;

export const pricing = {
  eyebrow: "Pricing",
  title: "One line to start. The whole fleet when you are ready.",
  tiers: [
    {
      name: "Starter",
      price: "$0",
      period: "",
      body: "One line, a handful of trucks, and the call log.",
      bullets: ["One line", "Shared number", "Transcripts", "Community support"],
      cta: { label: "Get started", href: links.getStarted },
      featured: false,
    },
    {
      name: "Fleet",
      price: "Talk to us",
      period: "",
      body: "Your own number, your drivers, your dispatch rules.",
      bullets: ["Your own number", "Driver and unit roster", "Outbound updates to drivers", "Escalation to dispatch", "Onboarding with DIBS"],
      cta: { label: "Talk to us", href: links.getStarted },
      featured: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      body: "Multiple terminals, one log. Shared rules, shared reporting.",
      bullets: ["Multiple lines", "Terminal routing", "Shared transcripts", "Dedicated contact"],
      cta: { label: "Talk to us", href: links.getStarted },
      featured: false,
    },
  ],
  footnote: "No prices are listed that we have not agreed with you. Fleet and Enterprise are scoped on a call.",
} as const;

export const faq = {
  eyebrow: "FAQ",
  title: "Straight answers.",
  items: [
    {
      q: "Is BrokerVox a carrier, a broker, or a load board?",
      a: "No. BrokerVox is the communication line between a trucking business and its own trucks. It does not move freight, hold authority, or match loads.",
    },
    {
      q: "Does it replace dispatch?",
      a: "No. It takes the phone work off dispatch and writes it down. People still make the decisions.",
    },
    {
      q: "What happens on a call it cannot handle?",
      a: "It hands the call to a person on your team, with the driver, the load, and the transcript attached.",
    },
    {
      q: "Does it work with drivers who are not in the roster?",
      a: "Yes. It takes the call, asks for name and unit, and flags the unknown number to dispatch.",
    },
    {
      q: "Where does the line run?",
      a: "On RubyVox. You set up and manage the line there, and BrokerVox supplies the trucking setup.",
    },
    {
      q: "Who is behind it?",
      a: "DIBS, in Dallas. BrokerVox is a DIBS product.",
    },
  ],
} as const;

export const cta = {
  title: "Put your fleet on one line.",
  body: "Set up BrokerVox, give your drivers the number, and run the day from the call log.",
  primary: { label: "Get started", href: links.getStarted },
  secondary: { label: "See pricing", href: links.pricing },
} as const;

export const footer = {
  line: `© ${brand.year} ${brand.name}. A ${brand.parent} product. ${brand.city}.`,
  disclaimer:
    "BrokerVox is a communication line for trucking businesses. It is not a carrier, a freight broker, or a load board.",
  links: [
    { label: "Get started", href: links.getStarted },
    { label: "GitHub", href: links.github },
  ],
} as const;
