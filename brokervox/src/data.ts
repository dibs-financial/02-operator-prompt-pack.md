// All site copy lives here. Components render it; they do not own words.
// No invented prices: Starter is $0, Desk is "Talk to us", Floor is "Custom".

export const links = {
  talkToJoe: "https://rubyvox.com/a/791cc6bc-1326-4345-a13a-c4e3d7069b39",
  createDesk: "https://rubyvox.com/create",
  github: "https://github.com/dibs-financial/brokervox",
} as const;

export const brand = {
  name: "BrokerVox",
  tagline: "AI voice desk for brokers",
  parent: "DIBS",
  city: "Dallas",
  year: 2026,
} as const;

export const nav = [
  { label: "Desks", href: "#desks" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export const hero = {
  eyebrow: "AI voice desk for brokers",
  title: ["Answers the line.", "Qualifies the lead.", "Books the meeting."],
  body:
    "BrokerVox picks up every call to your desk, asks the questions you would ask, and puts the meeting on your calendar with a transcript. Built for working brokers. Not a brokerage.",
  primary: { label: "Talk to Joe", href: links.talkToJoe },
  secondary: { label: "Build a desk", href: links.createDesk },
  note: "Joe is a live freight desk run by DIBS. Call it, ask it anything a shipper would.",
} as const;

export const deskCard = {
  name: "Joe",
  role: "Freight desk",
  owner: "DIBS · Dallas",
  status: "Live",
  intro: "Try the desk. Tap a question or open the line.",
  chips: [
    "I have a load out of Dallas Thursday.",
    "What lanes do you cover?",
    "Do you run reefer?",
    "Can you get me a rate?",
  ],
  open: { label: "Open the Joe line", href: links.talkToJoe },
} as const;

export const stats = [
  { value: "24/7", label: "On the line" },
  { value: "5", label: "Desk types" },
  { value: "1", label: "Number, one voice" },
  { value: "Every call", label: "Transcribed to you" },
] as const;

export const desks = {
  eyebrow: "Desk types",
  title: "One desk for each kind of broker.",
  body: "Each desk knows the questions that matter in its trade and the ones it must never answer.",
  items: [
    {
      key: "real-estate",
      name: "Real estate",
      body: "Buyer or seller, area, timeline, pre-approval. Books the showing or the listing call.",
    },
    {
      key: "mortgage",
      name: "Mortgage",
      body: "Purchase or refi, price range, timeline. Books the application call. Never quotes a rate.",
    },
    {
      key: "insurance",
      name: "Insurance",
      body: "Line of coverage, renewal date, current carrier. Books the review. Never binds coverage.",
    },
    {
      key: "freight",
      name: "Freight",
      body: "Origin, destination, equipment, pickup window. Hands the load to your dispatcher.",
    },
    {
      key: "m-and-a",
      name: "M&A",
      body: "Buy side or sell side, industry, size range. Books the intro. Nothing else is discussed on the line.",
    },
  ],
} as const;

export const how = {
  eyebrow: "How it works",
  title: "Live in an afternoon.",
  steps: [
    {
      n: "01",
      title: "Pick a desk",
      body: "Choose your trade. The desk arrives with the right questions and the right guardrails.",
    },
    {
      n: "02",
      title: "Give it your rules",
      body: "Your name, your hours, your calendar, what to say, and what to hand to a human.",
    },
    {
      n: "03",
      title: "Forward the line",
      body: "Point your number at the desk, or give out the new one. It picks up on the first ring.",
    },
    {
      n: "04",
      title: "Take the meeting",
      body: "The booking lands on your calendar. The transcript lands in your inbox.",
    },
  ],
} as const;

export const features = {
  eyebrow: "What a desk does",
  title: "It works the phone. You work the deal.",
  items: [
    {
      title: "Qualifies, then books",
      body: "Asks the questions you would ask, then puts a real slot on your calendar.",
    },
    {
      title: "Transcript after every call",
      body: "Who called, what they asked, what was booked. Two sentences and the full text.",
    },
    {
      title: "Knows what not to say",
      body: "No rates, no advice, no binding. It takes a message for you instead.",
    },
    {
      title: "Hands off to a human",
      body: "Anything outside its lane goes to you or your team, with the context attached.",
    },
    {
      title: "Texts the caller back",
      body: "Confirmation, your link, or a follow-up. Drafted for you to approve first.",
    },
    {
      title: "Your voice, your name",
      body: "The desk speaks for your shop. Callers hear your brokerage, not a vendor.",
    },
  ],
} as const;

export const pricing = {
  eyebrow: "Pricing",
  title: "Start on Joe's line. Grow into your own.",
  tiers: [
    {
      name: "Starter",
      price: "$0",
      period: "",
      body: "Call the Joe desk, then build one of your own on RubyVox.",
      bullets: ["One desk", "Shared number", "Transcripts", "Community support"],
      cta: { label: "Build a desk", href: links.createDesk },
      featured: false,
    },
    {
      name: "Desk",
      price: "Talk to us",
      period: "",
      body: "One broker, one number, your rules, your calendar.",
      bullets: ["Your own number", "Calendar booking", "Follow-up texts", "Hand-off to a human", "Onboarding with DIBS"],
      cta: { label: "Talk to Joe", href: links.talkToJoe },
      featured: true,
    },
    {
      name: "Floor",
      price: "Custom",
      period: "",
      body: "Many desks, one team. Shared rules, shared reporting.",
      bullets: ["Multiple desks", "Team routing", "Shared transcripts", "Dedicated contact"],
      cta: { label: "Talk to Joe", href: links.talkToJoe },
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
      q: "Is BrokerVox a brokerage?",
      a: "No. BrokerVox is a voice layer for brokers. It is not a broker-dealer, RIA, lender, carrier, or insurer, and it does not hold a license in any of those trades.",
    },
    {
      q: "Does the desk give advice or quote prices?",
      a: "No. It qualifies the caller and books the meeting. Rates, coverage, valuations, and advice stay with you.",
    },
    {
      q: "What happens on a call it cannot handle?",
      a: "It takes a message, tells the caller you will follow up, and sends you the transcript with the context attached.",
    },
    {
      q: "Who is Joe?",
      a: "Joe is the live freight desk DIBS runs in Dallas. It is the fastest way to hear what a desk sounds like before you build your own.",
    },
    {
      q: "Where does the desk run?",
      a: "On RubyVox. You build and manage the desk there, and BrokerVox supplies the trade-specific setup for brokers.",
    },
    {
      q: "Who is behind it?",
      a: "DIBS, in Dallas. BrokerVox is a DIBS desk product.",
    },
  ],
} as const;

export const cta = {
  title: "Hear it before you buy it.",
  body: "Call the Joe desk. Ask it something a shipper would. Then build one for your trade.",
  primary: { label: "Talk to Joe", href: links.talkToJoe },
  secondary: { label: "Build a desk", href: links.createDesk },
} as const;

export const footer = {
  line: `© ${brand.year} ${brand.name}. A ${brand.parent} desk product. ${brand.city}.`,
  disclaimer:
    "BrokerVox is a voice layer. It is not a broker-dealer, RIA, lender, carrier, or insurer.",
  links: [
    { label: "Talk to Joe", href: links.talkToJoe },
    { label: "Build a desk", href: links.createDesk },
    { label: "GitHub", href: links.github },
  ],
} as const;
