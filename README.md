# CEFR Result Audit

Professional diagnostic platform for English learners to audit their CEFR progress.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Features

- **30 Professional Questions** in Uzbek language
- **4 Diagnostic Blocks**: Goals, Learning System, Skills, Psychology
- **Smart Scoring Engine**: Calculates consistency, risk, and skill distribution
- **Personalized Report**: Daily plan, timeline, and top blockers
- **PDF Export**: Print-ready report output
- **Animated UX**: Framer Motion powered transitions

## 🏗 Project Structure

```
/app
  /page.tsx         # Landing page
  /audit/page.tsx   # Survey flow
  /report/page.tsx  # Results dashboard
/components
  /ui               # Shadcn components
  /audit            # Survey components
  /report           # Report components
/lib
  /content.ts       # All 30 questions (Uzbek)
  /scoring.ts       # Scoring logic
  /store.ts         # Zustand state
  /types.ts         # TypeScript interfaces
```

## ⚙️ Customization

### Adding/Editing Questions
Edit `lib/content.ts`. Each question has:
- `id`: Unique identifier
- `text`: Question text (Uzbek)
- `type`: 'choice' | 'scale' | 'text'
- `block`: 'A' | 'B' | 'C' | 'D'
- `options`: Answer choices

### Adjusting Scoring Weights
Edit `lib/scoring.ts` to modify:
- Consistency calculation
- Psychology risk factors
- Blocker detection rules
- Timeline estimation

## 🛠 Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Shadcn/UI
- Framer Motion
- Zustand

## 📄 License

MIT
