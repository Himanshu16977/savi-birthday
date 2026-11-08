# Savi's Magical First Birthday 🌸✨

A premium, fully responsive, interactive first birthday surprise website crafted for **Savi Gangwar**.

## 🎨 Theme & Palette
- **Design Theme:** Magical Fairy Garden
- **Color Palette:**
  - 🌸 **Pastel Pink** (`#ffd0e0`, `#ff7fa7`) — Sweetness, Warmth & Giggles
  - 🪻 **Dreamy Lavender** (`#e5d7f7`, `#9b6bd5`) — Whimsy, Dreams & Magic
  - 🩵 **Baby Blue** (`#c5e5fa`, `#64baee`) — Serenity, Hope & Wonder
  - 🕊️ **Cream White** (`#fffaf3`, `#f5eee0`) — Innocence, Purity & Light
  - ✨ **Soft Gold** (`#f8dc81`, `#dfb76c`) — Royal Princess Crown & Sparkles

## 🛠️ Tech Stack
- **Framework:** React 19 + Vite 6
- **Styling:** Tailwind CSS with custom fairytale color tokens, animations, and gradients
- **Motion & Physics:** Framer Motion & Canvas Confetti
- **Audio Synthesis:** Web Audio API (procedural music-box lullaby for *"Twinkle Twinkle Little Star"*, zero external assets needed)
- **Local Persistence:** Browser IndexedDB (photo storage) & LocalStorage (wishes guestbook)
- **Icons:** Lucide React
- **Typography:** Playfair Display, Dancing Script, and Plus Jakarta Sans

---

## 🌟 Interactive Features & Sections

1. **Magical Welcome Gate (`WelcomeExperience.jsx`)**:
   - Golden sparkle explosion on clicking *"Enter the Fairy World"*.
   - Fluttering multi-scale fairy butterflies flying across the screen.
   - Animated waving fairy wand casting golden stardust.
   - Revealing message *"A Magical Celebration Begins For Savi!"*.
   - Gentle blur transition and smooth scroll to the main birthday section.

2. **Main Birthday Hero Section (`HeroSection.jsx`)**:
   - Main Heading: *"Happy 1st Birthday, Savi Gangwar! 🎂"*
   - Supporting Text: *"One year of smiles, one year of happiness, and a lifetime of love."*
   - Princess-style typography & royal invitation badge.
   - Animated 3-tier birthday cake illustration with interactive flickering candle.
   - Pink and lavender floating balloons on left & right with swaying ribbons.
   - Floating hearts & fairy butterflies.
   - Golden sparkling background with ambient stars.
   - Action Button: *"Celebrate With Savi ❤️"* triggering a stardust confetti cascade.
   - Compact live countdown timer calculating days, hours, minutes, and seconds.

3. **12 Months of Wonder Storybook (`MilestoneTimeline.jsx`)**:
   - Month 1 to Month 12 milestone progression.
   - Dual-mode viewer: **Storybook Reader** (single month focus) & **Full Journey Grid** (overview of all 12 cards).
   - Milestone photos, recorded baby weights, sweet obsessions, and emotional prose.

4. **Savi's Enchanted World (`BabyStats.jsx`)**:
   - 8 interactive infographic cards: Height (74 cm), Weight (9.4 kg), 6 Pearly Teeth, Favorite Tune (*Twinkle Twinkle*), Favorite Snack (*Sweet Banana Mash*), Bedtime Buddy (*Bun-Bun*), Special Superpower (*Instant Heart-Melter*), and Current Mission (*Walking Everywhere!*).

5. **Playful Baby Trivia Quiz (`SaviQuiz.jsx`)**:
   - 4-question cute interactive quiz with instant fun-fact reveals.
   - Certificate badge (*"Certified Fairy Godparent! 👑"*) and confetti showers.

6. **Make a Wish & Blow the 1st Candle (`CakeSmashWish.jsx`)**:
   - Interactive candle extinguishing game with gentle smoke animation, sound chimes, confetti blast, and relight button.

7. **"Our Little Fairy's Beautiful Moments" Polaroid Gallery (`MemoryGallery.jsx`)**:
   - Realistic Polaroid-style photo cards with washi tape accents and subtle tilted angles.
   - **Photo Upload Feature**: Supports **JPG, JPEG, PNG, and WebP** images.
   - **Persistent Storage**: Saved in device browser **IndexedDB** so photos stay preserved across sessions.
   - Full-screen lightbox with keyboard arrow navigation (`ArrowLeft`, `ArrowRight`, `Escape`).
   - Optional handwritten captions and heart reaction counter.

8. **Fairy Floral Photo Booth (`PhotoBooth.jsx`)**:
   - Upload any photo and choose between 3 fairytale frames (Fairy Blossom, Royal Golden Crown, Enchanted Lavender).
   - Instant single-click download of the composite keepsake image using HTML5 Canvas.

9. **Letters of Love (`LettersOfLove.jsx`)**:
   - Keepsake letters from Mommy (Priya), Daddy (Rishabh), Dadu & Dadi, and Nanu & Nani.

10. **Celebration Venue & Party Details (`PartyDetails.jsx`)**:
    - Venue details & dress code color swatches.
    - **Add to Calendar**: Generates and downloads a `.ics` calendar invitation file.
    - **Get Directions**: Direct link to map directions.
    - **Digital RSVP Form**: Guest count selector, attendance choice, and instant confirmation modal.
    - **Schedule of Events**: 6-stage itinerary timeline.

11. **Personalized Keepsake VIP Pass (`KeepsakePass.jsx`)**:
    - Generates a personalized VIP Fairyland Pass with the guest's name, wax seal, and print/save option.

12. **The Enchanted Wishes Wall (`WishesWall.jsx`)**:
    - Interactive guestbook with fairytale stickers (👑, 🌸, ✨, 💖, 🦄, 🦋, 🎂, 🍼).
    - Persists guest wishes in `localStorage`.

13. **Thoughtful Gifts & Blessings (`GiftBlessings.jsx`)**:
    - Reminds guests that presence & prayers are the greatest gift, with ideas like bringing a childhood storybook.

14. **Ambient Music Box Lullaby & Floating Wand**:
    - Floating music player pill with procedural audio synthesis for *"Twinkle Twinkle Little Star"*.
    - Floating magic wand button for instant stardust confetti.
    - Interactive cursor stardust trail (`StardustTrail.jsx`).

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build
```
*(Production build verified with Vite & Tailwind CSS: 0 errors).*
