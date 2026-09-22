# Operator prompt pack — The Dallas Play House

Use these **after** an MCP client is connected to `https://rubyvox.com/mcp` and authorized (ChatGPT Developer Mode connector, Claude custom connector, Cursor, or JetBrains AI Assistant).

JetBrains AI Assistant setup (MCP server JSON, agent hand-off, first prompt): see [jetbrains-setup.md](jetbrains-setup.md).

Visit scheduling lives on one Google Calendar, **The Playbook**: setup and prompts in [playbook-calendar.md](playbook-calendar.md). Tool scans go in [research/](research/).

## How RubyVox and JetBrains fit together

**The integration mechanism.** RubyVox exposes its agent controls over MCP at `https://rubyvox.com/mcp`. JetBrains AI Assistant is an MCP client. The setup guide wires them together in three steps:

1. **Bridge.** AI Assistant launches `mcp-remote` through npx, which turns RubyVox's remote HTTP endpoint into a local MCP server the IDE can talk to. Node 20+ is the only dependency.
2. **Auth.** The first chat opens a RubyVox login in the browser. After that, the IDE holds an authorized session, so the agent UUID is the only thing you paste into prompts.
3. **Discovery.** RubyVox does not publish a static tool catalog. The IDE learns the available verbs at runtime, which is why every prompt in this pack opens with "discover tools first, do not invent tool names."

The optional `acp.json` step passes the same server through to Junie, Claude Agent, and Codex, so agentic runs inside the IDE can call RubyVox too, not just the chat panel.

**What each side brings.**

- **RubyVox** is the phone-side operator. It answers calls for The Dallas Play House, captures leads, takes messages, books slots, and sends follow-up texts. It holds the live state: who called, when, what they asked.
- **JetBrains AI Assistant** is the desk-side operator. It gives you a place you already sit all day, with model choice, chat history, and the ability to run the same prompts in an agent loop. It brings no telephony of its own.

**How they complement each other.**

- **One workspace, no tab switching.** The daily standup, lead pulls, and follow-up drafts below run from the IDE chat instead of a separate dashboard.
- **Guardrails live in this prompt pack.** The identity block pins the agent by UUID, forbids invented tools, and blocks voice or copy edits unless asked. JetBrains executes those rules; RubyVox enforces what the account is actually allowed to do.
- **Human-in-the-loop by default.** Texts are drafted and shown before sending. Bookings stop if the tool is not discovered. The IDE's chat makes that review step natural.
- **Agents extend it.** With the ACP pass-through, Junie or Claude Agent can chain steps, such as pull last week's callers, then draft one text per unbooked caller, all under the same MCP session.

**Limits worth knowing.**

- The caller page URL is for callers only. It is not an integration surface.
- Tool names are whatever RubyVox exposes at runtime. The only documented verbs are the ones named above: list, update, and manage agents, pull leads, text a caller, book a slot.

Always pin the agent. RubyVox does not publish a static tool catalog; the client discovers tools at runtime. Only use verbs RubyVox documents: list / update / manage agents, pull leads, text a caller, book a slot.

## Go-live checklist

Status as of 2026-09-21.

**Verified**

- [x] Claude can book, move, and cancel visits on The Playbook (primary calendar of `dibsonprivatebanking@gmail.com`).
- [x] Prompt pack, JetBrains setup, calendar guide, and tool scan are on `main`.

**Needed before a real caller books, in order**

1. [ ] **RubyVox writes to The Playbook.** Link the Google account in the RubyVox dashboard, then run the confirm prompt in [playbook-calendar.md](playbook-calendar.md) from JetBrains. If booking is not a discovered tool, the phone side cannot schedule and this is the blocker.
2. [ ] **JetBrains connects to RubyVox.** Add the server JSON from [jetbrains-setup.md](jetbrains-setup.md), finish the browser login, run the identity block below, and record the tool names it discovers.
3. [ ] **Time zone.** Set the Google account to Central (Settings → General → Time zone). It was on UTC at setup.
4. [ ] **One real end-to-end call.** Call (888) 402-3220, ask for a visit, confirm it appears on The Playbook with the `Visit — ` prefix, name, and phone. Reschedule it from JetBrains and confirm the caller gets the text.

**Decide before launch**

- [ ] Visit hours and length. Prompts assume 10:00 to 18:00 Central, 60 minutes.
- [ ] Confirmation and reminder texts. Check whether RubyVox sends them after a booking. If not, see [research/](research/) for the reminder-layer options.
- [ ] Who moves visits. Anyone besides the owner needs "make changes to events" on the calendar.
- [ ] Safety rails. Paste the hard rules block at the bottom of this file into the RubyVox agent's own instructions, not only into chat sessions.

**Open, not blocking**

- [ ] The cancel prompt says "mark cancelled"; the Claude connector deletes. Change the wording or accept delete.
- [ ] No RubyVox doc for calendar integration was found by search. Ask support whether it can bind a Gmail primary calendar.

## Identity block (paste first, every new chat)

```
You are operating my RubyVox voice agent via MCP.

Agent name: The Dallas Play House
Agent UUID: 542e1ccb-c597-4dd1-bdeb-7f0236ca59cd
Caller page: https://rubyvox.com/a/542e1ccb-c597-4dd1-bdeb-7f0236ca59cd
Phone: (888) 402-3220
MCP: https://rubyvox.com/mcp

Before doing anything else:
1. Discover available RubyVox tools.
2. Confirm you can see this agent by name or UUID.
3. Reply with the agent’s current status and the tool names you actually have.
4. Do not invent tools. If a tool is missing, say so.
5. Do not give legal, medical, or financial advice through the agent.
6. Do not change voice, knowledge, or public copy unless I explicitly ask.
```

## Discovery

```
List my RubyVox agents. Highlight The Dallas Play House
(542e1ccb-c597-4dd1-bdeb-7f0236ca59cd). Show status, phone, and last activity if available.
```

```
What actions can you take on agent 542e1ccb-c597-4dd1-bdeb-7f0236ca59cd right now?
Name each discovered tool and a one-line description. No guesses.
```

## Leads and recaps

```
Pull leads and call recaps for The Dallas Play House
(542e1ccb-c597-4dd1-bdeb-7f0236ca59cd) from the last 7 days.
For each: when, caller name if known, last topic, booking yes/no, any phone/email captured.
Flag anything that looks like an emergency or a request for a human.
```

```
Who called The Dallas Play House today? Summarize each conversation in two sentences.
Do not dump raw transcripts unless I ask.
```

## Follow-up SMS / text

```
On agent 542e1ccb-c597-4dd1-bdeb-7f0236ca59cd, text the most recent caller who left a number.
Message: “Thanks for calling The Dallas Play House — here’s the link we mentioned: https://rubyvox.com/a/542e1ccb-c597-4dd1-bdeb-7f0236ca59cd”
Show me the draft and wait for yes before sending.
```

```
Draft (do not send) a follow-up text to anyone who called The Dallas Play House
in the last 48 hours, asked about booking, and did not complete a booking.
One text per person, under 240 characters.
```

## Booking

```
On The Dallas Play House, show open booking slots for the next 7 days.
If someone named {NAME} asked for {DAY}, book the soonest slot that fits
and confirm what the caller will receive (SMS / email / calendar).
If booking is not a discovered tool, stop and tell me.
```

## Agent copy / knowledge (only when you mean to edit)

```
Show the current public blurb and knowledge sources for
The Dallas Play House (542e1ccb-c597-4dd1-bdeb-7f0236ca59cd).
Do not edit yet.
```

```
Update The Dallas Play House public blurb to:
“Books appointments, answers questions, fields calls, and points people
to seller content 24/7.”
Keep voice, phone, and knowledge sources unchanged. Confirm the diff.
```

## Daily operator standup

```
Dallas Play House standup for the last 24 hours:
- call count
- bookings created
- messages taken
- unanswered / failed calls if visible
- anything I should handle myself
Keep it to one screen.
```

## Safety rails to add to any long session

```
Hard rules for this agent:
- Never claim to be a lawyer, clinic, or government office.
- Never collect SSNs, A-numbers, government IDs, or payment card numbers.
- If a caller asks for legal/immigration/medical advice, say you will take a message for the owner.
- If a caller is in crisis, tell them to contact local emergency services; then notify me.
```
