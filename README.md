# AZ-900 Flashcard Coach

> **Unofficial study tool.** Not affiliated with, endorsed by, or sponsored by Microsoft. No Microsoft logos are used.

Flashcards for the Microsoft Azure Fundamentals (AZ-900) exam that learn from your mistakes: the cards you keep missing come back sooner.

Built for the **#1MillionDevs Vibe Coding Hackathon (AZ-900 edition)**, challenge: **Flashcard Coach**.

## The problem

Learners preparing for AZ-900 meet a lot of similar-sounding terms (region vs availability zone, LRS vs ZRS vs GRS, IaaS vs PaaS). Rereading notes doesn't show which ones you actually forget. This app tracks that for you and drills those first.

## Features

- 36 original flashcards covering cloud concepts, Azure architecture and services, and management and governance; some cards include everyday analogies
- Choose a topic or study across all topics. Due-card sessions select up to 20 cards in random order.
- Flip each card to reveal its answer, then rate it **Again**, **Hard**, **Good**, or **Easy**. Use **Space** or **Enter** to flip and **1–4** to rate.
- Spaced repetition schedules cards based on your ratings. Cards rated Again return later in the same session and become due again after 10 minutes.
- **Fix my weak spots** prioritises up to 10 cards with the most lapses, then adds up to 3 other due cards.
- Dashboard shows due and mastered counts, mastered-card progress by topic, and up to 8 trouble cards ranked by how often they were missed.
- Session summary reports your ratings and lists missed cards with their topics to revisit.
- Progress is stored in this browser on this device using `localStorage`; no account or server is required. Use **Reset progress** to clear it.
- Responsive layout, automatic dark mode based on your system preference, and reduced-motion support.

## How the coaching works

Each card stores an ease factor, an interval, a repetition count, a lapse count and its next due time. The scheduler is a simplified SM-2-style algorithm:

| Rating | Scheduling effect |
|---|---|
| Again | Resets the interval and repetition count, adds a lapse, lowers the ease factor, requeues the card after a few cards in the current session, and makes it due again in 10 minutes |
| Hard | Grows the interval by about 20% (at least 1 day) and lowers the ease factor slightly |
| Good | Schedules 1 day after the first successful rating, 3 days after the second, then multiplies the interval by the ease factor |
| Easy | Schedules 3 days after the first Easy rating, then multiplies the interval by the ease factor and 1.3; the ease factor rises |

A card counts as **mastered** once its interval reaches 21 days. **Weak-spot mode** breaks ties by selecting the lower-ease card first. Cards are filtered by the selected topic in both study modes.

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
