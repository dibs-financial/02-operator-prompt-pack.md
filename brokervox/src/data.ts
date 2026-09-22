// All site copy lives here. Components render it; they do not own words.
// BrokerVox automates 90% of a freight broker's job. The broker keeps the 10%.
// No invented prices: Starter is $0, Desk is "Talk to us", Floor is "Custom".

export const links = {
  getStarted: "https://rubyvox.com/create",
  pricing: "#pricing",
  github: "https://github.com/dibs-financial/brokervox",
} as const;

export const brand = {
  name: "BrokerVox",
  tagline: "Automates 90% of a freight broker's job",
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
  eyebrow: "Freight broker automation",
  title: ["Runs 90% of a", "freight broker's day.", "You keep the 10%."],
  body:
    "BrokerVox takes the shipper's load, calls carriers to cover it, sends the rate confirmation, runs the check calls with the truck, chases the proof of delivery, and writes every step down. You take the calls that need a broker: the rate, the close call on a carrier, the relationship.",
  primary: { label: "Get started", href: links.getStarted },
  secondary: { label: "See pricing", href: links.pricing },
} as const;

export const captureCard = {
  title: "One load, start to finish",
  subtitle: "What the desk does on its own once a shipper calls",
  fields: [
    "Load taken from the shipper",
    "Carriers called on the lane",
    "Load covered at your rate",
    "Rate confirmation sent and signed",
    "Check calls run with the driver",
    "Delays flagged to you",
    "Delivered, proof of delivery collected",
    "Ready to invoice",
  ],
  outcome: "Every step logged, with the transcripts.",
} as const;

export const stats = [
  { value: "90%", label: "Of the broker's day handled" },
  { value: "10%", label: "Decisions only a broker makes" },
  { value: "24/7", label: "Shipper and carrier lines open" },
  { value: "Every call", label: "Written down" },
] as const;

export const desks = {
  eyebrow: "What it handles",
  title: "The broker's job, minus the parts that need a broker.",
  body: "Everything below is phone calls and paperwork. The desk does them the way a good broker would, and it never sets the rate.",
  items: [
    {
      key: "intake",
      name: "Shipper intake",
      body: "Takes the load call. Origin, destination, commodity, weight, equipment, pickup and delivery windows, reference. Logged and ready to cover.",
    },
    {
      key: "sourcing",
      name: "Carrier sourcing",
      body: "Calls carriers on the lane, confirms equipment and availability, and offers the load at the rate you set.",
    },
    {
      key: "paperwork",
      name: "Rate confirmations",
      body: "Sends the rate con, collects the signature, and files it against the load. Same for the carrier packet.",
    },
    {
      key: "tracking",
      name: "Check calls and tracking",
      body: "Calls the driver at pickup, in transit, and at delivery. Location, status, ETA, logged every time.",
    },
    {
      key: "exception",
      name: "Delays and exceptions",
      body: "Detention, breakdowns, missed appointments, rejected freight. Flagged to you the moment they come in, with the context.",
    },
    {
      key: "billing",
      name: "Delivery and billing prep",
      body: "Collects the proof of delivery, matches it to the rate con, and marks the load ready to invoice.",
    },
  ],
} as const;

export const how = {
  eyebrow: "How it works",
  title: "Live in an afternoon.",
  steps: [
    {
      n: "01",
      title: "Set up the desk",
      body: "Your brokerage, your lanes, your carriers, your rate limits, and who gets escalations.",
    },
    {
      n: "02",
      title: "Forward the lines",
      body: "Point your shipper line and your carrier line at the desk, or give out new numbers. It picks up on the first ring.",
    },
    {
      n: "03",
      title: "Loads move on their own",
      body: "Intake, cover, paperwork, check calls, delivery. Each step lands in your log as it happens.",
    },
    {
      n: "04",
      title: "You take the 10%",
      body: "The rate. The carrier that is a close call. The shipper who wants to hear from you. That is your day now.",
    },
  ],
} as const;

export const features = {
  eyebrow: "Where the line is drawn",
  title: "What stays with the broker.",
  items: [
    {
      title: "The rate",
      body: "You set it. The desk carries it to carriers and shippers and never moves it on its own.",
    },
    {
      title: "The close calls",
      body: "A carrier that almost qualifies, a shipper who wants an exception. Those come to you with the file attached.",
    },
    {
      title: "The relationships",
      body: "The desk works under your name. When a customer wants their broker, the call is handed to you, not held.",
    },
    {
      title: "Transcript after every call",
      body: "Who called, what was said, what changed. Two sentences and the full text, on every load.",
    },
    {
      title: "Texts on your behalf",
      body: "Confirmations, addresses, reference numbers, and follow-ups as text, drafted for your approval when you want it.",
    },
    {
      title: "Your brokerage on the line",
      body: "Shippers and carriers hear your company. Not a vendor, not a bot name.",
    },
  ],
} as const;

export const pricing = {
  eyebrow: "Pricing",
  title: "One desk to start. A floor when you need it.",
  tiers: [
    {
      name: "Starter",
      price: "$0",
      period: "",
      body: "One desk, a few loads, and the full log. See it run before you commit.",
      bullets: ["One desk", "Shared number", "Transcripts", "Community support"],
      cta: { label: "Get started", href: links.getStarted },
      featured: false,
    },
    {
      name: "Desk",
      price: "Talk to us",
      period: "",
      body: "One broker, your own numbers, your lanes, your carriers, your rules.",
      bullets: ["Your own shipper and carrier numbers", "Carrier sourcing on your lanes", "Rate confirmations and packets", "Check calls and tracking", "Escalation to you", "Onboarding with DIBS"],
      cta: { label: "Talk to us", href: links.getStarted },
      featured: true,
    },
    {
      name: "Floor",
      price: "Custom",
      period: "",
      body: "Many desks, one brokerage. Shared carriers, shared rules, shared reporting.",
      bullets: ["Multiple desks", "Team routing", "Shared carrier base", "Shared transcripts", "Dedicated contact"],
      cta: { label: "Talk to us", href: links.getStarted },
      featured: false,
    },
  ],
  footnote: "No prices are listed that we have not agreed with you. Desk and Floor are scoped on a call.",
} as const;

export const faq = {
  eyebrow: "FAQ",
  title: "Straight answers.",
  items: [
    {
      q: "Is BrokerVox a freight brokerage?",
      a: "No. It works inside your brokerage, under your authority and your name. It does not hold authority, contract freight, or take a margin.",
    },
    {
      q: "Does it set or negotiate rates?",
      a: "No. You set the rate and the limits. The desk carries your number to carriers and shippers and brings anything outside the limits back to you.",
    },
    {
      q: "What is the 10% I keep?",
      a: "Pricing, the carrier decisions that are close calls, exceptions, and the customers who want to hear from their broker. Everything that is judgment, not phone work.",
    },
    {
      q: "What happens on a call it cannot handle?",
      a: "It hands the call to you or your team with the shipper, the load, the carrier, and the transcript attached.",
    },
    {
      q: "Where does it run?",
      a: "On RubyVox. You set up and manage the desk there, and BrokerVox supplies the freight brokerage setup.",
    },
    {
      q: "Who is behind it?",
      a: "DIBS, in Dallas. BrokerVox is a DIBS product.",
    },
  ],
} as const;

export const cta = {
  title: "Give the desk the 90%.",
  body: "Set up BrokerVox, forward your lines, and spend your day on the calls that make the money.",
  primary: { label: "Get started", href: links.getStarted },
  secondary: { label: "See pricing", href: links.pricing },
} as const;

export const footer = {
  line: `© ${brand.year} ${brand.name}. A ${brand.parent} product. ${brand.city}.`,
  disclaimer:
    "BrokerVox is automation for freight brokerages. It is not a freight broker, a carrier, or a load board, and it does not hold authority.",
  links: [
    { label: "Get started", href: links.getStarted },
    { label: "GitHub", href: links.github },
  ],
} as const;
