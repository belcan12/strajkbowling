# Strajk Bowling 🎳

En bokningsapp för bowlinghallen Strajk Bowling i Bromölla.

Appen är mobilanpassad och designad efter den givna Figma-skissen, med fokus på en layout som motsvarar ungefär iPhone 14 Pro Max (ca 430px bredd).

---

## Teknik

- React
- TypeScript
- Vite
- CSS (ingen UI-ramverk, custom styling enligt skiss)

---

## Funktionalitet / kravkoppling

### Booking-vy

- Användaren kan:
  - välja datum och tid
  - ange antal spelare
  - ange antal banor
- Vid antal spelare dyker formulärfält upp för:
  - skostorlek per spelare
- Skickar en booking request till backend (via `/api/booking` → Vite-proxy i `vite.config.ts`).

### Confirmation-vy

- Visar bekräftelse efter lyckad bokning:
  - datum + tid (when)
  - antal spelare (people)
  - antal banor (lanes)
  - bokningsnummer (id från API:t)
  - totalpris (price):
    - 120 kr / person
    - 100 kr / bana
    - priset räknas på serversidan

### Meny

- Hamburgermeny uppe till vänster.
- Vid klick öppnas en overlay-meny med:
  - BOOKING
  - CONFIRMATION (endast klickbar efter att en bokning finns).

Felhantering (instabil server)

- Om backend svarar med fel (t.ex. ungefär var femte gång) visas ett tydligt felmeddelande för användaren.
- Nätverksfel (Failed to fetch) hanteras separat med ett användarvänligt meddelande.

---

## Validering (VG-krav)

I `BookingView.tsx` finns validering i funktionen `validate()`:

- Antal skor vs antal spelare:
  - `shoes.length` måste matcha `people`
  - alla skofält måste vara ifyllda
  - skostorlekar måste vara siffror
- Max 4 spelare per bana:
  - max antal spelare = `lanes * 4`
  - om användaren försöker ha fler spelare än tillåtet visas ett felmeddelande
- Grundvalidering:
  - datum och tid måste vara valda
  - minst 1 spelare
  - minst 1 bana

Dessutom hjälper plus-knappen i sko-sektionen till att hålla antal spelare och skor synkade i UI:t.

---

## Så kör du projektet lokalt

1. Klona repot:

   ```bash
   git clone https://github.com/belcan12/strajkbowling.git
   cd strajkbowling

2. Installera dependencies:

   npm install

3. Starta dev-servern:

   npm run dev

4. Öppna den URL som Vite visar ( http://localhost:5173).

Vite är konfigurerat i `vite.config.ts` att proxya API-anrop till:

- GET /api/key → https://731xy9c2ak.execute-api.eu-north-1.amazonaws.com/key
- POST /api/booking → https://731xy9c2ak.execute-api.eu-north-1.amazonaws.com/booking

---

## Responsivitet

- Gränssnittet är byggt för mobilvy.
- Layouten är anpassad till ungefär iPhone 14 Pro Max-bredd för att ligga nära Figma-skissen.
