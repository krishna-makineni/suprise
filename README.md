# It's Always Us ❤️
### *A Private, Handcrafted Romantic Website for Amrutha*

---

> "If I could choose again, in every lifetime, in every version of this world, I would still find my way to you. Always us. Always you. ❤️"

**It's Always Us** is a bespoke, cinematic, and deeply personal romantic website designed specifically for **Amrutha**, created with all his heart by **Chinni Krishna Preetam**. 

Designed mobile-first and tailored for the **iPhone 16 Pro** (Safari / Camera QR scanner), the site blends modern editorial design with a nostalgic handwritten love-letter aesthetic.

---

## 🌹 Key Features & Chapters

1. **Screen 1: The Sealed Love Letter (Welcome Experience)**
   - Interactive 3D opening envelope with a gold heart wax seal.
   - Dedicated badge: *"For My Favorite Person ❤️ — Amrutha"*.
   - Smooth opening transition revealing the main experience + Skip Intro option.
   - Ambient floating hearts, rose petals, and champagne sparkles.

2. **Screen 2: Our Story ("It Was Always You")**
   - Elegant vertical relationship timeline with glowing icon markers.
   - Fully editable milestones: First Met, First Meaningful Conversation, Favorite Memory, Moments That Made Me Smile, What I Love Most About Her, and Dreams for the Future.

3. **Screen 3: Our Memories (Scrapbook Polaroid Gallery)**
   - Realistic Polaroid photo cards with natural scrapbooking tilts and washi-tape accents.
   - Interactive full-screen touch Lightbox with swipe gestures on iPhone, keyboard arrows on desktop, and caption notes.
   - Graceful fallback if any custom image path is missing.

4. **Screen 4: The Perfect Match Game ("The Love Game 🎮❤️")**
   - Interactive couple memory card match game (12 cards / 6 pairs) with 3D flip animations and romantic sound effects (synthesized soft chimes via Web Audio API).
   - Live Love Score tracker (base points + efficiency bonus), Moves counter, and live Timer.
   - **Game Completion Reveal**: Confetti shower, trophy animation, final score summary, and a heartfelt romantic message:
     *"Amrutha, you won my whole heart long before this game even started! No matter how many cards or chances life gives, you and I will always be the perfect match. I love you more and more with every single beat of my heart! ❤️"*
   - "Play Again & Beat Score" button to replay anytime.

5. **Screen 5: Reasons I Love You ("A Thousand Little Reasons")**
   - 14+ editable heartfelt reasons presented as sleek glass cards.
   - Interactive *"One More Reason ❤️"* button that cycles through reasons without repeating.
   - Unlocked counter tracker with celebratory confetti shower upon unlocking all reasons.

6. **Screen 6: Music & Atmosphere**
   - Dockable romantic vinyl disc floating audio player.
   - Play/pause toggle, scrubbable progress bar, current time indicator, and mute toggle.
   - Pre-loaded with a gentle, calming music box chime melody.
   - iOS Safari compliant (never autoplays before user gesture).

7. **Screen 7: The Hidden Surprise**
   - Sealed gift box with prompt: *"I saved one more thing for you..."*.
   - Tap-to-unwrap animation triggering a burst of romantic confetti.
   - Unlocks a personal romantic promise.
   - **Secret Easter Egg**: Tapping the tiny heart in the footer 3 times triggers an exclusive secret whisper toast!

8. **Screen 8: The Final Moment & Proposal**
   - Deep burgundy/midnight cinematic backdrop with soft glowing particles.
   - Poetic declaration and customizable question: *"Will you keep making beautiful memories with me?"*.
   - Two loving buttons: *"Always ❤️"* and *"A thousand times yes 💌"*.
   - Grand fireworks celebration and loving affirmation card upon selection.
   - Smooth *"Replay Experience ✨"* button.

9. **QR Code & Printable Card System**
   - 1024x1024 high-resolution PNG (`public/assets/qr-code.png`) and vector SVG (`public/assets/qr-code.svg`).
   - Ready-to-print luxury physical card (`public/printable-qr-card.html`) with gold borders, *"SCAN TO OPEN MY HEART ❤️"*, and iPhone camera scanning instructions.
   - In-app preview modal accessible from the bottom-left floating button.

---

## 🛠️ Technology Stack

- **React 19** with **Vite** (Fast, modern, zero-bloat)
- **Tailwind CSS v3** (Custom ivory, blush, dusty rose, deep burgundy, and champagne gold tokens)
- **Framer Motion** (Fluid micro-interactions, spring transitions, and 3D envelope fold)
- **Lucide React** (Refined romantic iconography)
- **Canvas Confetti** (Custom celebratory heart & gold particle bursts)
- **QRCode & JSQR** (High-precision QR code generation & automated decode verification)

---

## 🚀 Running Locally

1. Open your terminal in the project directory:
   ```bash
   cd c:\Users\chinn\OneDrive\Desktop\apisi
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser at:
   ```
   http://localhost:5173/
   ```

---

## 📸 How to Add Your Real Photos

1. Export your favorite photos of you and Amrutha in JPG, PNG, or WebP format.
2. Place them into the `public/assets/memories/` folder.
   You can either replace the existing placeholder files with the same names:
   - `sunset.jpg`
   - `coffee.jpg`
   - `starlit-sky.jpg`
   - `vintage-letter.jpg`
   - `roadtrip.jpg`
   - `fairylights.jpg`
   Or add new files (e.g., `amrutha-beach.jpg`, `dinner-date.jpg`).
3. Open [`src/data/loveStory.js`](file:///c:/Users/chinn/OneDrive/Desktop/apisi/src/data/loveStory.js) and update the `image` paths, dates, and captions under `memories.items`.

---

## 🎵 How to Add Your Music

1. Obtain an audio file (e.g., your couple song or instrumental acoustic track) in `.mp3` or `.wav` format.
2. Place the audio file in `public/assets/audio/` (for example: `public/assets/audio/our-song.mp3`).
3. In [`src/data/loveStory.js`](file:///c:/Users/chinn/OneDrive/Desktop/apisi/src/data/loveStory.js), update the `music` section:
   ```javascript
   music: {
     trackTitle: "Your Song Name",
     artist: "Artist Name",
     audioSrc: "/assets/audio/our-song.mp3",
   }
   ```
*Note: If the audio file is omitted or fails to load, the music player gracefully disables without throwing any errors.*

---

## ✍️ How to Customize Names, Letters & Messages

All content is managed in a single, well-documented configuration file:
👉 [`src/data/loveStory.js`](file:///c:/Users/chinn/OneDrive/Desktop/apisi/src/data/loveStory.js)

In this file, you can easily change:
- **`girlfriendName`**: e.g., `"Amrutha"` or `"Amruthaa"`
- **`partnerName`**: e.g., `"Chinni Krishna Preetam"`
- **`relationshipStartDate`**: e.g., `"2023-11-18"`
- **`story.timeline`**: Your personal dates, locations, and milestone descriptions.
- **`loveLetter.paragraphs`**: Your heartfelt words.
- **`reasons.list`**: The specific little things you love about her.
- **`surprise.message`**: Your secret promise.
- **`finalMoment.question`** & proposal text.
- **`productionUrl`**: Your deployed Vercel domain.

---

## 🌐 Deploying to Vercel (Step-by-Step)

### Option A: Using Vercel CLI (Fastest)

1. Open PowerShell or terminal in the project folder:
   ```bash
   npm install -g vercel
   ```
2. Log in and deploy:
   ```bash
   vercel
   ```
3. Follow the quick terminal prompts (press Enter to accept default settings).
4. For production deployment:
   ```bash
   vercel --prod
   ```
5. Copy your live URL (e.g., `https://its-always-us-amrutha.vercel.app`).

### Option B: Using GitHub & Vercel Dashboard

1. Initialize a Git repository and commit your code:
   ```bash
   git init
   git add .
   git commit -m "It's Always Us romantic website for Amrutha"
   ```
2. Push the repository to your private or public GitHub account.
3. Visit [vercel.com](https://vercel.com) and click **"Add New Project"**.
4. Import your GitHub repository.
5. Vercel will automatically detect **Vite** and configure the build command (`npm run build`) and output directory (`dist`).
6. Click **Deploy**.

---

## 📱 Regenerating the QR Code After Deployment

Once you have your final live HTTPS domain from Vercel:

1. Open [`src/data/loveStory.js`](file:///c:/Users/chinn/OneDrive/Desktop/apisi/src/data/loveStory.js) and update:
   ```javascript
   productionUrl: "https://your-deployed-domain.vercel.app",
   ```
2. Run the QR generator script in terminal:
   ```bash
   npm run generate:qr
   ```
   *(Or pass the URL directly: `node scripts/generate-qr.js https://your-domain.vercel.app`)*
3. Verify the decoded QR code destination:
   ```bash
   npm run verify:qr
   ```
4. Find your generated deliverables:
   - High-Res PNG: `public/assets/qr-code.png`
   - Vector SVG: `public/assets/qr-code.svg`
   - Printable Luxury Card: `public/printable-qr-card.html`
5. Open `public/printable-qr-card.html` in your browser and click **"Print / Save Card as PDF"** to print on high-quality textured cardstock!

---

## 📱 iPhone 16 Pro Compatibility Checklist

- [x] **Viewport target**: Tailored for 402 CSS pixels portrait width.
- [x] **Safe Areas**: Implements `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` for notch/dynamic island & home indicator.
- [x] **Dynamic Viewport**: Uses `min-h-[100dvh]` to account for Safari's collapsible address bar.
- [x] **Touch Ergonomics**: All interactive elements have at least 44×44 CSS-pixel tap targets.
- [x] **Gestures**: Supports swipe navigation in the memory photo lightbox.
- [x] **Accessibility**: Respects `prefers-reduced-motion` to tone down animations.
- [x] **No Horizontal Overflow**: Guaranteed 0 horizontal scrollbar across all responsive widths (320px, 375px, 390px, 402px, 430px, 768px, 1440px).

---

Made with ❤️ by Chinni Krishna Preetam for Amrutha.
