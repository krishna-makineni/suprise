/**
 * ============================================================================
 * "IT'S ALWAYS US ❤️" — CENTRAL PERSONALIZATION & STORY CONFIGURATION
 * ============================================================================
 * 
 * Edit this file to customize names, memories, dates, photos, and messages.
 * Everything on the romantic website reads dynamically from here!
 */

export const loveStoryConfig = {
  // --------------------------------------------------------------------------
  // 1. COUPLE NAMES
  // --------------------------------------------------------------------------
  // Her name as displayed across titles, letters, and badges
  girlfriendName: "Amrutha", // You can change to "Amruthaa" or any pet name ("Ammu ❤️")
  
  // Your name as displayed in the sign-offs and footers
  partnerName: "Chinni Krishna Preetam",

  // Optional: The date your journey or relationship began (YYYY-MM-DD or readable string)
  // If set, an anniversary countdown / days-together badge can display gracefully
  relationshipStartDate: "2023-11-18", // [EDITABLE PLACEHOLDER: Enter your actual date e.g. "2023-10-15"]
  anniversaryLabel: "Days of loving you",

  // --------------------------------------------------------------------------
  // 2. WELCOME SCREEN (SCREEN 1)
  // --------------------------------------------------------------------------
  welcome: {
    badge: "A PRIVATE LETTER FOR",
    title: "For My Favorite Person ❤️",
    subtitle: "A little world I made just for you.",
    envelopeHint: "Tap the seal to unlock",
    openButtonText: "Open My Heart",
    skipButtonText: "Skip Intro",
  },

  // --------------------------------------------------------------------------
  // 3. OUR STORY TIMELINE (SCREEN 2)
  // --------------------------------------------------------------------------
  story: {
    heading: "It Was Always You.",
    subheading: "A small collection of my love, memories, and promises.",
    introText: "From the very first moment our paths crossed, you turned ordinary days into something extraordinary. Here are some of the quiet chapters that mean the entire world to me.",
    // Cards displayed on the timeline. All dates and descriptions are editable placeholders.
    timeline: [
      {
        id: 1,
        title: "The Day We First Met",
        date: "The beginning of everything", // [EDITABLE: e.g. "September 14th, 2023"]
        tag: "Where It Began",
        icon: "Sparkles",
        description: "I didn't know it back then, but that was the exact moment my life began taking its favorite turn. Seeing you for the first time felt like hearing a song I never knew I had been searching for.",
      },
      {
        id: 2,
        title: "Our First Meaningful Conversation",
        date: "Hours felt like minutes", // [EDITABLE]
        tag: "Connection",
        icon: "MessageCircleHeart",
        description: "The time we sat and talked without looking at the clock. Sharing thoughts, laughing effortlessly, and realizing how safe and natural it felt just being myself around you.",
      },
      {
        id: 3,
        title: "Our Favorite Memory",
        date: "Etched in my heart forever", // [EDITABLE]
        tag: "Core Memory",
        icon: "Camera",
        description: "That day everything felt so easy and peaceful. Just you, me, and the feeling that as long as you're smiling beside me, there is nowhere else on earth I'd rather be.",
      },
      {
        id: 4,
        title: "A Moment That Made Me Smile",
        date: "Pure happiness", // [EDITABLE]
        tag: "Your Light",
        icon: "Smile",
        description: "The way your eyes crinkle when you genuinely laugh, or how you get excited talking about the things you adore. Every single time you smile, it melts away any stress I ever had.",
      },
      {
        id: 5,
        title: "What I Love Most About You",
        date: "Every single day",
        tag: "My Favorite Qualities",
        icon: "HeartHandshake",
        description: "Your gentleness, your sincerity, your thoughtfulness, and the rare warmth you carry into every room. You don't just make me happy — you make me want to be the best version of myself.",
      },
      {
        id: 6,
        title: "Our Dreams for the Future",
        date: "To all the tomorrows ahead",
        tag: "Forever & Always",
        icon: "Compass",
        description: "Every trip we have yet to take, every quiet sunset we will watch together, every celebration and every simple home-cooked dinner. I want every season of life with you.",
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 4. MEMORIES GALLERY (SCREEN 3)
  // --------------------------------------------------------------------------
  // To replace with your actual photos:
  // Place your images in `public/assets/memories/` (e.g. photo1.jpg, photo2.jpg)
  // and update the `image` paths below!
  memories: {
    heading: "Moments Captured in Time",
    subheading: "Polaroids from my heart — click or tap any memory to see it up close.",
    items: [
      {
        id: 1,
        title: "Golden Sunlight & That Flower 🌺",
        date: "Sun-kissed afternoons",
        caption: "The sun was bright, but your smile was ten times brighter. Looking at you with that little flower in your hair made my whole heart pause.",
        image: "/assets/memories/amrutha-sunshine.jpeg",
        rotation: "-2deg",
      },
      {
        id: 2,
        title: "Brighter Than All The Lights ✨",
        date: "Magical evening vibes",
        caption: "A thousand fairy lights were glowing around us, but honestly, all I could look at were your sparkling eyes. You are effortlessly stunning, Amrutha.",
        image: "/assets/memories/amrutha-fairylights.jpeg",
        rotation: "2.5deg",
      },
      {
        id: 3,
        title: "My Peaceful Safe Place 🤍",
        date: "Quiet, effortless moments",
        caption: "This is my absolute favorite version of you — relaxed, natural, and completely yourself. With you, even doing nothing feels like everything.",
        image: "/assets/memories/amrutha-cozy.jpeg",
        rotation: "-1.5deg",
      },
      {
        id: 4,
        title: "That Adorable Laugh 🎥",
        date: "Unfiltered pure joy",
        caption: "Every time you laugh like this, it plays on loop in my mind all day long. Nobody brings me more genuine happiness than you.",
        image: "/assets/memories/amrutha-video-1.mp4",
        rotation: "3deg",
      },
      {
        id: 5,
        title: "Every Second With You 💫",
        date: "Captured in my heart",
        caption: "I wish I could freeze time whenever we are together. There is an unmatched warmth in your presence that I never want to leave.",
        image: "/assets/memories/amrutha-video-2.mp4",
        rotation: "-2.5deg",
      },
      {
        id: 6,
        title: "Always Us, Forever ❤️",
        date: "To a lifetime of this",
        caption: "Out of every beautiful thing in this world, having you beside me will always be my greatest blessing.",
        image: "/assets/memories/amrutha-video-3.mp4",
        rotation: "1.8deg",
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 5. ROMANTIC LOVE GAME (SCREEN 4)
  // --------------------------------------------------------------------------
  game: {
    heading: "The Perfect Match Game 🎮❤️",
    subheading: "Tap the cards to find our matching tokens. Complete the game to unlock a special love message and your love score!",
    instructions: "Match all 6 pairs in the fewest moves possible!",
    completionTitle: "You Won My Heart! 🏆💖",
    // Heartfelt love message displayed alongside her game score
    loveYouMessage: "Amrutha, you won my whole heart long before this game even started! No matter how many cards or chances life gives, you and I will always be the perfect match. I love you more and more with every single beat of my heart! ❤️",
    signoff: "Forever your biggest fan & lover,",
    author: "Chinni Krishna Preetam",
    // 6 romantic card pairs (12 cards)
    cardPairs: [
      { id: 'heart', name: 'Infinite Love', icon: 'Heart', note: 'You have my whole heart' },
      { id: 'coffee', name: 'Morning Coffee', icon: 'Coffee', note: 'Warm cozy talks with you' },
      { id: 'stars', name: 'Starlit Sky', icon: 'Sparkles', note: 'My brightest constellation' },
      { id: 'rose', name: 'Blush Rose', icon: 'Flower2', note: 'Gentle, pure & radiant' },
      { id: 'camera', name: 'Polaroids', icon: 'Camera', note: 'Our sweetest memories' },
      { id: 'ring', name: 'Forever Promise', icon: 'Crown', note: 'Always you in every lifetime' },
    ],
  },

  // --------------------------------------------------------------------------
  // 5B. LOVE LETTER ARCHIVE (OPTIONAL READING)
  // --------------------------------------------------------------------------
  loveLetter: {
    heading: "Things I Don't Always Know How to Say",
    paperHeader: "A LETTER FROM MY HEART",
    dateStamp: "Today & Every Day",
    paragraphs: [
      "Dearest Amrutha,",
      "Sometimes, life gets so loud and busy that I forget to stop and tell you the things that truly matter most. I wanted to build this private little sanctuary so you always have a place to come whenever you need to be reminded of how deeply, endlessly loved you are.",
      "Thank you for being my peace. In a world full of rush and noise, talking to you feels like arriving home after a long journey. Thank you for your patience with me, for your sweet laughter that brightens even the dullest afternoons, and for the way you make the simplest everyday moments feel like treasures.",
      "I love how comfortable we are together. I love who I am when I am with you — more hopeful, more confident, and genuinely happier. You inspire me with your kindness, your resilience, and the quiet grace you carry.",
      "Whatever this life brings — through busy days, quiet evenings, adventures, and everyday routines — please remember that I am standing right beside you, cheering for you, admiring you, and holding your hand.",
      "Thank you for choosing to walk through this life with me.",
    ],
    signoff: "Forever and always yours,",
    author: "Chinni Krishna Preetam",
  },

  // --------------------------------------------------------------------------
  // 6. REASONS I LOVE YOU (SCREEN 5)
  // --------------------------------------------------------------------------
  reasons: {
    heading: "A Thousand Little Reasons",
    subheading: "Tap the button below to discover another reason why you have my whole heart.",
    buttonText: "One More Reason ❤️",
    counterLabel: "Reasons unlocked",
    list: [
      "Your smile makes even the most ordinary days feel like a celebration.",
      "I love how you make little, everyday moments feel so magical and special.",
      "You are the very first person I want to share good news and funny stories with.",
      "I love the person I get to be whenever I am around you.",
      "The gentle and considerate way you treat the people around you.",
      "How safe, calm, and grounded I feel whenever I hear your voice.",
      "Your genuine laugh when something is truly funny — it is my absolute favorite sound in the world.",
      "The way you remember tiny details about things that matter to me.",
      "Your strength and quiet resilience, even on days when things are challenging.",
      "How easily we can talk for hours, or sit in peaceful silence without it ever feeling awkward.",
      "The warmth and kindness in your eyes every time you look at me.",
      "Because with you, loving feels effortless, pure, and true.",
      "How passionate and caring you become when talking about things you love.",
      "Because in a world of billions of people, you are the only one my heart chose.",
    ],
  },

  // --------------------------------------------------------------------------
  // 7. MUSIC & ATMOSPHERE (SCREEN 6)
  // --------------------------------------------------------------------------
  music: {
    trackTitle: "Our Romantic Melody",
    artist: "A gentle soundtrack for us",
    // Replace with your own MP3 or audio file in `public/assets/audio/`
    audioSrc: "/assets/audio/romantic-melody.wav",
    // User must click play before audio plays (Safari & mobile compliant)
    autoPlayPrompt: "Play our song",
  },

  // --------------------------------------------------------------------------
  // 8. THE HIDDEN SURPRISE (SCREEN 7)
  // --------------------------------------------------------------------------
  surprise: {
    teaserBadge: "A SECRET ENVELOPE",
    teaserPrompt: "I saved one more thing for you...",
    tapHint: "Tap to unwrap this little secret",
    title: "My Heart's Secret Promise 💌",
    message: "No matter how many years go by, no matter what mountains or valleys we navigate, I promise to choose you every single morning. I promise to listen to you, to protect your peace, to celebrate your victories as if they were my own, and to love you more tomorrow than I do today.",
    easterEggHint: "P.S. Tap the tiny heart at the very bottom of the page 3 times for a secret whisper...",
    easterEggMessage: "🌸 You found the secret whisper! Just a reminder: You are the best thing that ever happened to me, Amrutha.",
  },

  // --------------------------------------------------------------------------
  // 9. THE FINAL MOMENT (SCREEN 8)
  // --------------------------------------------------------------------------
  finalMoment: {
    quoteLines: [
      "If I could choose again,",
      "in every lifetime,",
      "in every version of this world,",
      "I would still find my way to you.",
    ],
    highlight: "Always us. Always you. ❤️",
    question: "Will you keep making beautiful memories with me?",
    button1: "Always ❤️",
    button2: "A thousand times yes 💌",
    affirmationTitle: "You have my whole heart, Amrutha! 💍✨",
    affirmationText: "Here's to endless memories, laughter, adventures, and a lifetime of love with you.",
    footerSignoff: "Made with all my heart, just for you.",
    author: "Chinni Krishna Preetam",
    replayButton: "Replay Experience ✨",
  },

  // --------------------------------------------------------------------------
  // 10. PRODUCTION URL & QR CODE CONFIGURATION
  // --------------------------------------------------------------------------
  // Set your final Vercel or Netlify HTTPS URL here.
  // The QR generator script reads directly from this variable!
  productionUrl: "https://suprise-kohl-psi.vercel.app",
};
