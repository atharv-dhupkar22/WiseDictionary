# 📚 WordWise — AI Dictionary

**WordWise** is not just another dictionary. It’s a **beautifully human-crafted AI-powered chatbot** designed to help users discover meanings, pronunciations, parts of speech, example usages, and synonyms of **any word in any language or complexity**.

Unlike typical AI interfaces, WordWise blends **intentional UI/UX design** with **powerful backend intelligence** to deliver a more thoughtful and delightful learning experience.

---

## ✨ Features

### 🎨 Thoughtfully Designed Interface
- **Brand Identity**: Renamed to `WordWise` with a friendly tagline.
- **Color Palette**: Uses an elegant **Indigo & Slate** color scheme for a clean, authentic look.
- **Typography**: Professionally selected `Inter` font for superior readability.
- **Chat Bubble Design**: Asymmetrical, rounded chat bubbles (`rounded-br-md`, `rounded-tl-md`) for a conversational feel.
- **Custom Icons**: Uses a `#` (Hash) icon instead of typical bots.

### 📘 Human-Like Dictionary Experience
- **Numbered Definitions**: Clear and structured layout (e.g., `1.`, `2.`).
- **Part of Speech Sections**: Custom color-coded containers.
- **Example Highlighting**: Amber-colored left borders for natural focus.
- **Natural Language**: Uses `Similar:` instead of `Synonyms:` for a more conversational tone.
- **Personality-Rich Responses**: Friendly, informal, and helpful AI replies.

### 🌐 Global Dictionary Access
- **Multi-Source Support**:
  - Primary: [Free Dictionary API](https://dictionaryapi.dev/)
  - Backup: [WordsAPI](https://www.wordsapi.com/)
  - Fallback: Local DB for instant access to common words.
- **Multi-Language Support**: Search for words in multiple languages!

### 🧠 Smart Features
- **Retry Logic**: Automatically switches sources on failure.
- **Error Handling**: Clean fallbacks with meaningful messages.
- **Optimized Responses**: Limits definitions and synonyms for better UX.
- **Caching**: Instant results for frequently searched words.
- **Connection Status Messages**: Real-time updates for offline issues.

---

## 🚀 Live Preview

🔗 ![Screenshot 2025-06-29 131924](https://github.com/user-attachments/assets/2abb89e2-0356-43fe-8735-0330df146cf5)


---

## 🛠️ Tech Stack

- **Frontend**: React.js + Tailwind CSS
- **APIs**:
  - [Free Dictionary API](https://dictionaryapi.dev/)
  - [WordsAPI](https://www.wordsapi.com/)
- **Icons**: Heroicons, Custom SVGs
- **Font**: Inter via Google Fonts

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/wordwise.git
cd wordwise
npm install
npm run dev




