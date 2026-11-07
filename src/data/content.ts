/**
 * All the words and photos for Kuzz's birthday surprise.
 * Edit captions / notes here — everything on the page reads from this file.
 */

export const NAME = 'Kuzz';

export const INVITE_TEASER_IMG = '/photos/invite-teaser.jpeg';
export const INVITE_LOVE_NOTE_IMG = '/photos/invite-love-note.jpeg';
export const HERO_IMG = '/photos/him-jerusalem.jpeg';

export interface Photo {
  id: string;
  src: string;
  title: string;
  caption: string;
  /** CSS object-position so faces stay in frame when cropped */
  focus?: string;
  rotationDeg: number;
  backNote: string;
}

/** Solo photos of the birthday boy */
export const HIM_PHOTOS: Photo[] = [
  {
    id: 'him-jerusalem',
    src: '/photos/him-jerusalem.jpeg',
    title: 'Now in Israel',
    caption: 'Old stone streets, same handsome smile',
    focus: '50% 25%',
    rotationDeg: -2,
    backNote: 'New country, new adventures — and I am cheering for you from every mile away.',
  },
  {
    id: 'him-kandy',
    src: '/photos/him-kandy-temple.jpeg',
    title: 'Peaceful Heart',
    caption: 'Temple day in Kandy 🤍',
    focus: '35% 40%',
    rotationDeg: 1.5,
    backNote: 'Your calm, kind heart is the thing I fall for again and again.',
  },
  {
    id: 'him-car',
    src: '/photos/him-blue-car.jpeg',
    title: 'Mr. Cool',
    caption: 'Leaning on the blue car like a model',
    focus: '50% 45%',
    rotationDeg: -1,
    backNote: 'Okay, I admit it… you looked way too good in this one. 😌',
  },
  {
    id: 'him-road',
    src: '/photos/him-hill-road.jpeg',
    title: 'Main Character',
    caption: 'Hill-country roads & big dreams',
    focus: '50% 55%',
    rotationDeg: 2,
    backNote: 'Every road you take, I hope it leads you to everything you wish for — and back to me.',
  },
];

/** Couple photos */
export const US_PHOTOS: Photo[] = [
  {
    id: 'us-sunset',
    src: '/photos/us-sunset.jpeg',
    title: 'Golden Hour, Golden Us',
    caption: 'Sunset by the sea 🌅',
    focus: '55% 40%',
    rotationDeg: -2.5,
    backNote: 'That evening the sky was beautiful, but I was only looking at you.',
  },
  {
    id: 'us-car',
    src: '/photos/us-car-ride.jpeg',
    title: 'Co-Pilot for Life',
    caption: 'Road trips & silly talks 🚗',
    focus: '50% 45%',
    rotationDeg: 2,
    backNote: 'Any road is my favourite road when you are driving and I am in the seat next to you.',
  },
  {
    id: 'us-beach',
    src: '/photos/us-beach-tree.jpeg',
    title: 'Sea Breeze Smiles',
    caption: 'Blue water, yellow tee, happy hearts 🌊',
    focus: '55% 45%',
    rotationDeg: -1.5,
    backNote: 'Take me back to this beach — the sun, the wind, and you being you.',
  },
  {
    id: 'us-white',
    src: '/photos/us-white-shirt.jpeg',
    title: 'My Favourite Shoulder',
    caption: 'Leaning on you, always 🤍',
    focus: '45% 45%',
    rotationDeg: 2.5,
    backNote: 'This is my safe place. Right here, next to you.',
  },
  {
    id: 'us-amphi',
    src: '/photos/us-amphitheatre.jpeg',
    title: 'Standing Together',
    caption: 'Blue skies & your arm around me ☁️',
    focus: '50% 62%',
    rotationDeg: -2,
    backNote: 'Side by side, whatever comes. That is us.',
  },
  {
    id: 'us-mall',
    src: '/photos/us-mall.jpeg',
    title: 'Just Us, Being Us',
    caption: 'Late walks & cheesy selfies ✨',
    focus: '50% 40%',
    rotationDeg: 1.5,
    backNote: 'Ordinary days turn into my favourite memories when they have you in them.',
  },
];

export interface LoveReason {
  id: number;
  title: string;
  note: string;
  emoji: string;
}

export const LOVE_REASONS: LoveReason[] = [
  {
    id: 1,
    title: 'Your Big, Kind Heart',
    note: 'The way you care, check in on me and make me feel like the most cherished person alive.',
    emoji: '💗',
  },
  {
    id: 2,
    title: 'Your Strength',
    note: 'How hard you work every day, facing every challenge with courage. I am endlessly proud of you.',
    emoji: '💪',
  },
  {
    id: 3,
    title: 'My Safe Place',
    note: 'Even through a phone screen, your voice calms me and gives me peace like nowhere else.',
    emoji: '🏡',
  },
  {
    id: 4,
    title: 'That Smile',
    note: 'When you laugh, your whole face lights up — it turns any grey day into sunshine.',
    emoji: '☀️',
  },
  {
    id: 5,
    title: 'Love Without Borders',
    note: 'Over 5,000 km between Sri Lanka and Israel, and still our bond grows stronger every sunrise.',
    emoji: '✈️',
  },
  {
    id: 6,
    title: 'Our Future',
    note: 'Every dream we talk about late at night, every plan we make — I want every tomorrow with you.',
    emoji: '🌙',
  },
];

/** The handwritten love note (same words as the scrapbook card) */
export const LETTER = {
  sticker: 'Same sky… Different country… Still you, always in my heart ♡',
  headline: 'Happy Birthday',
  subhead: 'to my favourite person ♡',
  paragraphs: [
    "Another year, another chapter of the amazing you. I'm so grateful to have you in my life — your kindness, your strength, your big heart and the way you always make me feel safe, loved and so special. ♡",
    "Even though you're far away in Israel, you're always so close in my heart. Distance means nothing when someone means everything. I'm so proud of you, of everything you do and of the beautiful future we're building together. ♡",
    'May this year bring you good health, happiness, success and all the dreams your heart holds. Keep shining, my love. ♡',
  ],
  signoff: 'Happy Birthday, Kuzz ♡',
  signoffSub: '— Love you so much ♡',
  quote: 'My love knows no borders ♡',
};

/** Pre-filled WhatsApp reply he can send back */
export const WHATSAPP_REPLY_TEXT =
  'I just opened my birthday surprise 🥹❤️ Thank you, my love! I love you so much 💌';
