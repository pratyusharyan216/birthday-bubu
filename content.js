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
    "All mine 💙",
  ],

  // Your name, for signing the letter
  from: "Pratyush",

  // Her birthday (YYYY-MM-DD). Shows a countdown until the day,
  // and "It's your birthday today!" on the day itself.
  birthday: "2026-10-11",

  // The main song — plays from the moment she opens the envelope.
  // "start" is optional: the second the song begins from (0 = from the very beginning).
  song: {
    file: "music/tum-se-hi.mp3",
    title: "Tum Se Hi",
    artist: "Mohit Chauhan · Jab We Met",
    start: 0,
  },

  // A different song on the Cupid slide, the notes slide and the photos slide.
  // Leave file as "" to just keep the main song playing there.
  cupidSong:  { file: "music/pehli-nazar-mein.mp3", title: "Pehli Nazar Mein", artist: "Atif Aslam · Race", start: 0 },
  notesSong:  { file: "music/pal.mp3", title: "Pal", artist: "Arijit Singh & Shreya Ghoshal · Jalebi", start: 0 },
  photosSong: { file: "music/kaun-tujhe.mp3", title: "Kaun Tujhe", artist: "Palak Muchhal · M.S. Dhoni", start: 0 },

  // Short line under the big "Happy Birthday"
  tagline: "To the girl who makes every ordinary day feel like a celebration.",

  // ---------- Cupid slide: every arrow that hits the heart shows the next line ----------
  cupidTitle: "Cupid only needed one arrow",
  cupidSubtitle: "Tap the heart, my love — every arrow carries something I feel for you",
  // Text on the button: first one shows before the first arrow, then it changes
  // after every arrow. The last one stays.
  cupidButtons: [
    "Let my heart find yours 💙",
    "Fall for me once more 💙",
    "Another arrow, another promise 💙",
    "Steal my heart again 💙",
    "Love me a little more 💙",
    "One more piece of my heart 💙",
    "Once more, my love 💙",
    "Again and again, forever 💙",
  ],
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
  notesSubtitle: "Folded with love, sealed with a kiss — open them one by one 💙",
  notes: [
    { front: "Open when you need a smile", back: "Remember our evenings at Sandisk? After the most exhausting days we would just sit there and talk about anything and everything — laughing, fighting over the silliest things, and then laughing all over again. Whenever you need a smile, go back there in your heart. I am still sitting right beside you." },
    { front: "Things I love about you", back: "Your kindness. Your honesty. Your softness. That little ring on your nose. Your voice. Your company. Your touch. Your warmth. I could go on forever — I love every single thing that makes you, you." },
    { front: "A promise", back: "I'll always bring snacks, always hold your hand in crowds, and always choose you. Every single day." },
    { front: "Why today matters", back: "Today the world got you. And somehow, I got lucky enough to be the one standing next to you." },
    { front: "Our journey", back: "Remember going home for the holidays, and coming back to college again — the same train, side by side? The crowd, the noise, the long hours… none of it mattered, because I had you next to me. Those were never just train rides. I used to wait for the holidays just for that journey with you. And I would happily travel every road of this life the same way." },
    { front: "For later", back: "Save this one for the next time we fight: I'm sorry, I love you, let's get food. 🍕" },
    { front: "Open when you miss me", back: "Close your eyes and count to three. I'm already thinking of you — I always am. Distance never stood a chance against us." },
    { front: "My forever wish", back: "To grow old with you, laugh at the same silly things, and still hold your hand like it's the very first time." },
  ],

  // ---------- Photo & video gallery ----------
  // file = name of the photo OR video inside the /photos folder.
  // Videos work too — just use the video's name, e.g. "photos/dance.mp4"
  // (use .mp4 so it plays on every phone; keep each video under ~50 MB).
  photosTitle: "You, through my eyes",
  photosSubtitle: "Every frame of you is my favourite view — tap to see it closer 📸",
  photos: [
    { file: "photos/26.jpg", caption: "This face. Every single day, please 💙" },
    { file: "photos/22.jpg", caption: "This smile is my whole world" },
    { file: "photos/9.jpg",  caption: "My lady in red, under a sky of lights ✨" },
    { file: "photos/20.jpg", caption: "Grace, wrapped in a saree 💙" },
    { file: "photos/2.jpg",  caption: "Main character energy ✨" },
    { file: "photos/24.jpg", caption: "Lost in a book — and I'm lost in you 📖" },
    { file: "photos/13.jpg", caption: "A little colour, a lot of magic" },
    { file: "photos/28.jpg", caption: "My sunshine, in yellow" },
    { file: "photos/15.jpg", caption: "A whole sunset behind you, and I only saw you" },
    { file: "photos/6.jpg",  caption: "Red looks so good on you 💙" },
    { file: "photos/12.jpg", caption: "Even the mirror can't look away" },
    { file: "photos/25.jpg", caption: "Paris can wait — I already have my view" },
    { file: "photos/3.jpg",  caption: "Two beautiful views, one frame" },
    { file: "photos/23.jpg", caption: "Princess mode: on 👑" },
    { file: "photos/27.jpg", caption: "You make a quiet bench look like a postcard" },
    { file: "photos/16.jpg", caption: "City lights can't compete with you" },
    { file: "photos/10.jpg", caption: "Simple, and still stunning" },
    { file: "photos/5.jpg",  caption: "Kolkata looked good, you looked better" },
    { file: "photos/18.jpg", caption: "Mirror, mirror… it's always her" },
    { file: "photos/29.jpg", caption: "Twirl for me, always 💙" },
    { file: "photos/21.jpg", caption: "Windy day, wild heart" },
    { file: "photos/4.jpg",  caption: "Mirror selfie queen 📸" },
    { file: "photos/7.jpg",  caption: "Hair flip, heart skip 💙" },
  ],

  // ---------- Memories timeline ----------
  // photo is optional (it can also be a video, e.g. "photos/clip.mp4") — delete it if you don't want one
  memories: [
    { date: "Once upon a time", title: "A little star arrived", text: "Long before I knew you, the world already had its cutest girl. Look at those eyes — nothing has changed.", photo: "photos/8.jpg" },
    { date: "Where we began", title: "You, me and a bunch of flowers", text: "Flowers in your hands, and my whole heart already in your pocket.", photo: "photos/14.jpg" },
    { date: "Kolkata days", title: "The city and my favourite view", text: "The monument was beautiful. I was busy looking at you.", photo: "photos/1.jpg" },
    { date: "Just us", title: "My favourite place is next to you", text: "No filter, no plan — just you leaning on me, and everything feeling right.", photo: "photos/19.jpg" },
    { date: "Under a sky of lights", title: "Hand in hand", text: "A thousand lights above us, and I only wanted to hold your hand a little longer.", photo: "photos/17.jpg" },
    { date: "That night", title: "The way you look at me", text: "Everything around us was glowing, and still you were the brightest thing there.", photo: "photos/30.jpg" },
    { date: "With our people", title: "Surrounded by smiles", text: "A room full of happy faces — and mine was the happiest, because you were beside me.", photo: "photos/11.jpg" },
    { date: "Today", title: "Your birthday", text: "And I get to celebrate you. Here's to this year, and every year after it, together." },
  ],

  // ---------- The big letter at the end ----------
  // Each item is a paragraph.
  letter: [
    "My dearest Bubu,",
    "Happy birthday, my love. I wanted to make you something you can come back to whenever you want — a little corner of the world that is only yours.",
    "Thank you for being my best friend, my safe place, and my favourite person to do absolutely nothing with. You make my life softer, brighter and so much funnier.",
    "If I could give you one thing, it would be the chance to see yourself through my eyes — only then would you know how special you are to me.",
    "You are my today and all of my tomorrows. On my loudest days and my quietest nights, it is always you my heart comes home to.",
    "I can't promise that every day will be perfect. But I promise to hold your hand through all of them, to choose you again every morning, and to love you a little more than I did the day before.",
    "I hope this year gives you everything you have been wishing for — and I will be right there beside you for all of it.",
    "I love you, Nirjala. Today, tomorrow, and for every birthday still to come.",
  ],

  // Shown after she blows out the candles
  wishMessage: "Your wish is sent to the universe ✨ I hope every bit of it comes true.",

  // Videos that play after she blows out the candles, one after another, in this order.
  // Put them in the /video folder (use .mp4, under ~50 MB each). Leave the list empty for no video.
  wishVideos: ["video/wish.mp4", "video/wish2.mp4"],
};
