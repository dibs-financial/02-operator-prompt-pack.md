# The Playbook — visit calendar

**The Playbook** is the primary Google Calendar of `dibsonprivatebanking@gmail.com`. It is the single place visits to The Dallas Play House are scheduled and rescheduled. RubyVox books into it. You, JetBrains, and Claude read and move things on it.

Decision on 2026-09-21: use the primary calendar rather than a separate secondary calendar. Calendar ID is the account address itself.

## 1. Calendar settings (once)

1. Open [calendar.google.com](https://calendar.google.com) as `dibsonprivatebanking@gmail.com`.
2. Settings → General → **Time zone** → set to **(GMT-05:00) Central Time — Chicago**. The account was on UTC at setup, which shifts every visit by five or six hours in the RubyVox dashboard.
3. Settings → Settings for my calendars → the primary calendar → **Share with specific people**: add any staff who will move visits, with **Make changes to events**.

Because this is the primary calendar, personal events and visits share one shelf. Every visit title starts with `Visit — ` so it can be filtered and so RubyVox and the prompts below never touch anything else.

## 2. Connect it to RubyVox

RubyVox does not publish a static integration list. In the RubyVox dashboard for agent `542e1ccb-c597-4dd1-bdeb-7f0236ca59cd`, look for the booking or calendar setting and link the Google account `dibsonprivatebanking@gmail.com`, primary calendar.

Then confirm from JetBrains AI Chat:

```
On The Dallas Play House (542e1ccb-c597-4dd1-bdeb-7f0236ca59cd), what calendar
does booking write to? Name the account. If it is not dibsonprivatebanking@gmail.com,
stop and tell me.
```

## 3. Claude access (done 2026-09-21)

The Google Calendar connector is connected in claude.ai for this account and verified: Claude created a test visit, moved it, and deleted it on the primary calendar. Claude can book, reschedule, cancel, and list visits directly. If a new session reports "insufficient scope", reconnect the connector and tick the calendar permissions on Google's consent screen.

## 4. Scheduling prompts

Book a visit:

```
On The Dallas Play House, book a visit for {NAME} ({PHONE}) on {DAY} at {TIME}
on The Playbook (dibsonprivatebanking@gmail.com). Title: "Visit — {NAME}". Duration 60 min.
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
- Every visit title starts with `Visit — `. Prompts and RubyVox only touch events with that prefix.
- The caller page `https://rubyvox.com/a/542e1ccb-c597-4dd1-bdeb-7f0236ca59cd` may go in the confirmation text. It never goes in a calendar integration setting.
