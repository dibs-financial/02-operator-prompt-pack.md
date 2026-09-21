# The Playbook — visit calendar

One Google Calendar, named **The Playbook**, is the single place visits to The Dallas Play House are scheduled and rescheduled. RubyVox books into it. You and JetBrains read and move things on it.

## 1. Create the calendar (once, about 3 minutes)

1. Open [calendar.google.com](https://calendar.google.com) signed in as the account that owns the RubyVox agent.
2. Left rail → **Other calendars** → **+** → **Create new calendar**.
3. Name: `The Playbook`. Description: `Visits to The Dallas Play House. Booked by RubyVox, managed by the operator.` Time zone: America/Chicago.
4. **Create calendar**.
5. Open its settings → **Integrate calendar**. Copy the **Calendar ID** (looks like `…@group.calendar.google.com`). Keep it; the prompts below pin to it.
6. Under **Share with specific people**, add any staff who will move visits, with **Make changes to events**.

Do not use your primary calendar for this. Visits stay on their own shelf so RubyVox never sees or touches personal events.

## 2. Connect it to RubyVox

RubyVox does not publish a static integration list. In the RubyVox dashboard for agent `542e1ccb-c597-4dd1-bdeb-7f0236ca59cd`, look for the booking or calendar setting and point it at **The Playbook** by its Calendar ID. If the dashboard offers only a primary-calendar link, ask RubyVox support how to target a secondary calendar before going live.

Then confirm from JetBrains AI Chat:

```
On The Dallas Play House (542e1ccb-c597-4dd1-bdeb-7f0236ca59cd), what calendar
does booking write to? Name it. If it is not "The Playbook", stop and tell me.
```

## 3. Connect it to Claude (optional)

To let Claude create, move, and cancel visits directly, add the Google Calendar connector in claude.ai → Settings → Connectors, then enable it in the chat. Until that is on, Claude can only draft the change and you apply it.

## 4. Scheduling prompts

Book a visit:

```
On The Dallas Play House, book a visit for {NAME} ({PHONE}) on {DAY} at {TIME}
on The Playbook calendar. Title: "Visit — {NAME}". Duration 60 min.
Put the caller's phone and how they heard about us in the description.
Confirm what the caller will receive (SMS / email / calendar invite).
If booking is not a discovered tool, stop and tell me.
```

Reschedule a visit:

```
On The Playbook, move {NAME}'s visit from {OLD DAY/TIME} to {NEW DAY/TIME}.
Keep the title and description. Show me the before/after and wait for yes.
After I say yes, text the caller the new time from agent
542e1ccb-c597-4dd1-bdeb-7f0236ca59cd and show me the draft first.
```

Cancel a visit:

```
Cancel {NAME}'s visit on {DAY} on The Playbook. Do not delete history;
mark it cancelled if the tool supports that. Draft a courtesy text; wait for yes.
```

Today's board:

```
Show every visit on The Playbook for today and tomorrow: time, name, phone,
booked by RubyVox or by hand, confirmed yes/no. One line each.
```

Open slots for a caller:

```
On The Playbook, list open 60-minute slots for the next 7 days between
10:00 and 18:00 America/Chicago. Group by day. No slots outside those hours.
```

## Rules for this calendar

- Every visit carries the caller's name and phone in the event. No anonymous holds.
- RubyVox books; a human confirms any reschedule before the caller is texted.
- Nothing personal goes on The Playbook. Nothing about a visit goes on the primary calendar.
- The caller page `https://rubyvox.com/a/542e1ccb-c597-4dd1-bdeb-7f0236ca59cd` may go in the confirmation text. It never goes in a calendar integration setting.
