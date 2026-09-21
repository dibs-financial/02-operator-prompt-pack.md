# Operator prompt pack — The Dallas Play House

Use these **after** an MCP client is connected to `https://rubyvox.com/mcp` and authorized (ChatGPT Developer Mode connector, Claude custom connector, Cursor, or JetBrains AI Assistant).

Always pin the agent. RubyVox does not publish a static tool catalog; the client discovers tools at runtime. Only use verbs RubyVox documents: list / update / manage agents, pull leads, text a caller, book a slot.

## Identity block (paste first, every new chat)

```
You are operating my RubyVox voice agent via MCP.

Agent name: The Dallas Play House
Agent UUID: 542e1ccb-c597-4dd1-bdeb-7f0236ca59cd
Caller page: https://rubyvox.com/a/542e1ccb-c597-4dd1-bdeb-7f0236ca59cd
Phone: (509) 808-8801
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
