// All site copy lives here. Components render it; they do not own words.
// Freight only. No invented prices: Starter is $0, Desk is "Talk to us", Floor is "Custom".

export const links = {
  createDesk: "https://rubyvox.com/create",
  pricing: "#pricing",
  github: "https://github.com/dibs-financial/brokervox",
} as const;

export const brand = {
  name: "BrokerVox",
  tagline: "AI voice desk for freight brokers",
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
  eyebrow: "AI voice desk for freight brokers",
  title: ["Answers the line.", "Qualifies the load.", "Hands it to dispatch."],
  body:
    "BrokerVox answers every call to your freight desk, captures origin, destination, equipment, and pickup window, and delivers the load to your dispatcher with a full transcript. Built for working freight brokers. Not a carrier, not a brokerage.",
  primary: { label: "Build a desk", href: links.createDesk },
  secondary: { label: "See pricing", href: links.pricing },
} as const;

export const captureCard = {
  title: "Load capture",
  subtitle: "What the desk records on every shipper call",
  fields: ["Origin", "Destination", "Commodity and weight", "Equipment", "Pickup window", "Delivery window", "Reference number", "Caller and callback"],
  outcome: "Delivered to dispatch with the transcript.",
} as const;

export const stats = [
  { value: "24/7", label: "On the line" },
  { value: "1", label: "Number, one voice" },
  { value: "Every call", label: "Transcribed to you" },
  { value: "0", label: "Rates quoted by the desk" },
] as const;

export const desks = {
  eyebrow: "What it handles",
  title: "Every call a freight desk gets.",
  body: "The desk works the phone the way your best dispatcher would on a good day, and it never gives a rate.",
  items: [
    {
      key: "shipper",
      name: "Shipper calls",
      body: "Origin, destination, commodity, weight, equipment, pickup and delivery windows. Logged and handed to you.",
    },
    {
      key: "carrier",
      name: "Carrier calls",
      body: "MC number, truck location, equipment, availability. Matches against your open loads and takes a message.",
    },
    {
      key: "tracking",
      name: "Check calls",
      body: "Where is my load. It takes the reference, confirms what you have shared, and flags anything late.",
    },
    {
      key: "rates",
      name: "Rate requests",
      body: "Captures the lane and the ask. Never quotes. Tells the caller you will come back with a number.",
    },
  ],
} as const;

export const how = {
  eyebrow: "How it works",
  title: "Live in an afternoon.",
  steps: [
    {
      n: "01",
      title: "Create the desk",
      body: "Start from the BrokerVox freight setup on RubyVox. It arrives with the right questions and the right limits.",
    },
    {
      n: "02",
      title: "Give it your rules",
      body: "Your name, your lanes, your equipment, your hours, and what goes straight to dispatch.",
    },
    {
      n: "03",
      title: "Forward the line",
      body: "Point your number at the desk, or give out the new one. It picks up on the first ring.",
    },
    {
      n: "04",
      title: "Cover the load",
      body: "The details land in your inbox with the transcript. You quote it and move it.",
    },
  ],
} as const;

export const features = {
  eyebrow: "What a desk does",
  title: "It works the phone. You move the freight.",
  items: [
    {
      title: "Qualifies every load",
      body: "Asks the questions your dispatcher would ask, in the order they would ask them.",
    },
    {
      title: "Transcript after every call",
      body: "Who called, what they need, when it ships. Two sentences and the full text.",
    },
    {
      title: "Never quotes a rate",
      body: "Rates stay with you. The desk captures the lane and says you will call back.",
    },
    {
      title: "Hands off to dispatch",
      body: "Anything urgent goes to you or your team right away, with the context attached.",
    },
    {
      title: "Texts the caller back",
      body: "Confirmation, your link, or a follow-up. Drafted for you to approve first.",
    },
    {
      title: "Your name on the line",
      body: "The desk speaks for your brokerage. Callers hear your shop, not a vendor.",
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
      body: "Build a single freight desk on RubyVox and hear it on your own line.",
      bullets: ["One desk", "Shared number", "Transcripts", "Community support"],
      cta: { label: "Build a desk", href: links.createDesk },
      featured: false,
    },
    {
      name: "Desk",
      price: "Talk to us",
      period: "",
      body: "One broker, one number, your lanes, your rules.",
      bullets: ["Your own number", "Load capture to your inbox", "Follow-up texts", "Hand-off to dispatch", "Onboarding with DIBS"],
      cta: { label: "Talk to us", href: links.createDesk },
      featured: true,
    },
    {
      name: "Floor",
      price: "Custom",
      period: "",
      body: "Many desks, one brokerage. Shared rules, shared reporting.",
      bullets: ["Multiple desks", "Team routing", "Shared transcripts", "Dedicated contact"],
      cta: { label: "Talk to us", href: links.createDesk },
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
      q: "Is BrokerVox a freight brokerage or a carrier?",
      a: "No. BrokerVox is a voice layer for freight brokers. It does not hold freight authority, it does not move loads, and it does not contract with shippers or carriers.",
    },
    {
      q: "Does the desk quote rates?",
      a: "No. It captures the lane and the ask, tells the caller you will come back with a number, and sends you the details.",
    },
    {
      q: "What happens on a call it cannot handle?",
      a: "It takes a message, tells the caller you will follow up, and sends you the transcript with the context attached.",
    },
    {
      q: "Where does the desk run?",
      a: "On RubyVox. You build and manage the desk there, and BrokerVox supplies the freight setup.",
    },
    {
      q: "Who is behind it?",
      a: "DIBS, in Dallas. BrokerVox is a DIBS desk product.",
    },
  ],
} as const;

export const cta = {
  title: "Put a desk on your line.",
  body: "Build a BrokerVox freight desk, forward your number, and take the next call from your inbox.",
  primary: { label: "Build a desk", href: links.createDesk },
  secondary: { label: "See pricing", href: links.pricing },
} as const;

export const footer = {
  line: `© ${brand.year} ${brand.name}. A ${brand.parent} desk product. ${brand.city}.`,
  disclaimer:
    "BrokerVox is a voice layer for freight brokers. It is not a carrier, a freight brokerage, or a load board.",
  links: [
    { label: "Build a desk", href: links.createDesk },
    { label: "GitHub", href: links.github },
  ],
} as const;
