# AZ-900 Flashcard Coach

> **Unofficial study tool.** Not affiliated with, endorsed by, or sponsored by Microsoft. No Microsoft logos are used.

Flashcards for the Microsoft Azure Fundamentals (AZ-900) exam that learn from your mistakes: the cards you keep missing come back sooner.

Built for the **#1MillionDevs Vibe Coding Hackathon (AZ-900 edition)**, challenge: **Flashcard Coach**.

**Live demo:** _add your deployed link here_

## The problem

Learners preparing for AZ-900 meet a lot of similar-sounding terms (region vs availability zone, LRS vs ZRS vs GRS, IaaS vs PaaS). Rereading notes doesn't show which ones you actually forget. This app tracks that for you and drills those first.

## Features

- 36 original flashcards across the three AZ-900 skill areas: cloud concepts, Azure architecture and services, and management and governance
- Flip cards with a rating after each one: Again, Hard, Good, Easy (keyboard: Space to flip, 1-4 to rate)
- Spaced repetition: easy cards return after longer gaps, missed cards return within the session and again soon after
- **Fix my weak spots** mode that prioritises the cards you miss most
- Dashboard with due cards, mastered cards, per-topic progress and a ranked "trouble cards" list
- Session summary listing the topics to revisit
- Progress saved in your browser (localStorage), no account needed
- Works on mobile, supports dark mode, respects reduced-motion settings

## How the coaching works

Each card stores an ease factor, an interval, a repetition count and a lapse count. The scheduler is a simplified SM-2 style algorithm:

| Rating | Effect |
|---|---|
| Again | Interval resets, lapse count +1, ease factor drops, card is requeued a few cards later and due again in 10 minutes |
| Hard | Short interval growth, ease factor drops slightly |
| Good | 1 day, then 3 days, then interval × ease factor |
| Easy | Longer jump (3 days first, then interval × ease × 1.3), ease factor rises |

A card counts as **mastered** once its interval reaches 21 days. **Weak-spot mode** picks up to 10 cards with the most lapses (lowest ease as tie-breaker) and mixes in a few due cards.

## Content policy

- Every card is written in original wording, based on the topics in the public [AZ-900 study guide and skills outline on Microsoft Learn](https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/).
- It contains **no real exam questions** and no brain-dump material.
- Always verify details against Microsoft Learn before sitting the exam.

## Tech

Plain HTML, CSS and JavaScript, split across three files. No build step, no dependencies, no backend.

| File | Purpose |
|---|---|
| `index.html` | Page structure |
| `style.css` | Styling, dark mode, card flip animation |
| `app.js` | Flashcards, spaced repetition scheduler, UI logic |

## Run locally

Open `index.html` in a browser. Or serve the folder:

```bash
python3 -m http.server 8000
```

## Deploy

- **GitHub Pages:** repo Settings → Pages → deploy from the `main` branch, root folder
- **Netlify or Vercel:** import the repo; no build command needed

## Roadmap

- Cloud-synced progress with accounts (Supabase)
- More cards, and cards in Kiswahili and other local languages
- AI-generated explanations for the cards a learner keeps failing
- Other certifications (AWS Cloud Practitioner, AZ-104, Security+)

## Credits

Built with AI-assisted coding (Claude) for the #1MillionDevs Vibe Coding Hackathon.

## License

MIT
