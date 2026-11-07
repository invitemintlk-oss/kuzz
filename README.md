# 💌 A Birthday Surprise for Kuzz

A cute, mobile-first birthday surprise page: a sealed envelope → invitation card → his photos, our photos (flip for secret notes), the love letter, six "why I love you" envelopes, a cake to blow out, and a WhatsApp reply button.

## Edit the words / photos
- All text, captions and back-of-photo notes: `src/data/content.ts`
- Photos live in `public/photos/` (`him-*.jpeg` = his photos, `us-*.jpeg` = couple photos, `invite-*.jpeg` = the invitation designs)

## Run locally
```
npm install
npm run dev        # http://localhost:3000
```

## Put it online (get a link to send)
```
npm run build      # creates the dist/ folder
```
Then either:
- **Netlify Drop** – open https://app.netlify.com/drop and drag the `dist` folder in. You get a link instantly.
- **Vercel** – `npx vercel --prod` from this folder.
