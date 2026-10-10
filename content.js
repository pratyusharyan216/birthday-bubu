/* ============================================================
   ✏️  EDIT THIS FILE — everything on the website comes from here.
   You don't need to touch any other file.

   Photos → put them in the /photos folder, then write the file name below.
   Song   → put an .mp3 in the /music folder, then write the file name below.
   ============================================================ */

window.BIRTHDAY = {
  // Her name (or what you call her)
  name: "Bubu",

  // Romantic line above her name on the envelope
  envelopeLine: "for my favourite person in the whole world,",

  // Names that change on the envelope, one after another — the last one stays
  envelopeNames: ["Bubu", "Betu", "Cutipie", "Nirjala"],

  // Her real name — gets its own fancy slide
  fullName: "Nirjala",
  nameLine: "the most beautiful name I know",
  // One word/line for each letter of her name (N-I-R-J-A-L-A)
  nameLetters: [
    "Naturally beautiful",
    "Irreplaceable",
    "Radiant, always",
    "Joy of my life",
    "Adorable",
    "Lovely, inside and out",
    "All mine 💕",
  ],

  // Your name, for signing the letter
  from: "Pratyush",

  // Her birthday (YYYY-MM-DD). Shows a countdown until the day,
  // and "It's your birthday today!" on the day itself.
  birthday: "2026-10-11",

  // The main song — plays from the moment she opens the envelope
  song: {
    file: "music/song.mp3",
    title: "Our Song",
    artist: "Artist name",
  },

  // OPTIONAL: a different song while she reads the notes / looks at photos.
  // Leave file as "" to just keep the main song playing there.
  notesSong:  { file: "", title: "", artist: "" },
  photosSong: { file: "", title: "", artist: "" },

  // Short line under the big "Happy Birthday"
  tagline: "To the girl who makes every ordinary day feel like a celebration.",

  // ---------- Cupid slide: every arrow that hits the heart shows the next line ----------
  cupidTitle: "Cupid only needed one arrow",
  cupidSubtitle: "Tap the heart, my love — every arrow carries something I feel for you",
  cupidLines: [
    "The first arrow was the day I saw you — I never stood a chance.",
    "You are the poem I never knew how to write.",
    "In a world full of people, my heart only ever looks for you.",
    "If I had a flower for every time you made me smile, I'd walk in a garden forever.",
    "You're not just my love — you're my home.",
    "Every heartbeat of mine quietly says your name… Nirjala.",
    "I'd choose you — in every lifetime, in every world, every single time.",
  ],

  // ---------- Little notes (she taps each one to open it) ----------
  notesTitle: "Whispers from my heart",
  notesSubtitle: "Folded with love, sealed with a kiss — open them one by one 💌",
  notes: [
    { front: "Open when you need a smile", back: "Remember the way you laughed so hard you snorted? I think about it every time I'm having a bad day. You're my favourite sound." },
    { front: "Things I love about you", back: "Your kindness. The way you scrunch your nose. How you always save me the last bite. Literally everything." },
    { front: "A promise", back: "I'll always bring snacks, always hold your hand in crowds, and always choose you. Every single day." },
    { front: "Why today matters", back: "Today the world got you. And somehow, I got lucky enough to be the one standing next to you." },
    { front: "A secret", back: "I knew I was in love with you way before I said it. I was just too nervous to say it out loud." },
    { front: "For later", back: "Save this one for the next time we fight: I'm sorry, I love you, let's get food. 🍕" },
  ],

  // ---------- Photo & video gallery ----------
  // file = name of the photo OR video inside the /photos folder.
  // Videos work too — just use the video's name, e.g. "photos/dance.mp4"
  // (use .mp4 so it plays on every phone; keep each video under ~50 MB).
  photosTitle: "You, through my eyes",
  photosSubtitle: "Every frame of you is my favourite view — tap to see it closer 📸",
  photos: [
    { file: "photos/1.jpg", caption: "My girl at Victoria Memorial 🤍" },
    { file: "photos/2.jpg", caption: "Main character energy ✨" },
    { file: "photos/3.jpg", caption: "Two beautiful views, one frame" },
    { file: "photos/4.jpg", caption: "Mirror selfie queen 📸" },
    { file: "photos/5.jpg", caption: "Kolkata looked good, you looked better" },
    { file: "photos/6.jpg", caption: "Red looks so good on you ❤️" },
    { file: "photos/7.jpg", caption: "Hair flip, heart skip 💓" },
  ],

  // ---------- Memories timeline ----------
  // photo is optional (it can also be a video, e.g. "photos/clip.mp4") — delete it if you don't want one
  memories: [
    { date: "The day we met", title: "Hello, you", text: "I still remember what you were wearing and how I couldn't stop looking at you.", photo: "photos/1.jpg" },
    { date: "Our first date", title: "Nervous & happy", text: "I practised what to say for an hour and then forgot all of it the second I saw you." },
    { date: "First trip together", title: "Getting lost, together", text: "Wrong turns, bad maps and the best day ever.", photo: "photos/2.jpg" },
    { date: "Today", title: "Your birthday", text: "And I get to celebrate you. Here's to many, many more." },
  ],

  // ---------- The big letter at the end ----------
  // Each item is a paragraph.
  letter: [
    "My dearest Bubu,",
    "Happy birthday, my love. I wanted to make you something that you can come back to whenever you want — a little corner of the internet that is only yours.",
    "Thank you for being my best friend, my safe place, and my favourite person to do absolutely nothing with. You make my life softer, brighter and so much funnier.",
    "I hope this year gives you everything you've been wishing for, and I promise to be right there for all of it.",
    "I love you, today and always.",
  ],

  // Shown after she blows out the candles
  wishMessage: "Your wish is sent to the universe ✨ I hope every bit of it comes true.",

  // Video that plays after she blows out the candles.
  // Put the video in the /photos folder with this name (use .mp4, under ~50 MB).
  // Leave as "" for no video.
  wishVideo: "photos/wish.mp4",
};
