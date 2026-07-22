/* EKOOLOGY — Fire knowledge base (ENGLISH)
   Internal temperatures, doneness and times at a professional level.
   Sources: chefs' practice (ThermoWorks/Serious Eats/Steak School) + USDA food safety.
   Feeds the Chef's Station and the Chef Kool assistant on /en/ pages. */

window.BRASA = {

  /* Red-meat doneness (beef, lamb) — FINAL internal temperature.
     tirar = pull off the grill ~3°C earlier: resting completes it (carryover). */
  pontos: [
    { id: "bleu",       nome: "Bleu (seared)",   final: "46–49 °C", tirar: 45, cor: "#9B1B30", descricao: "Thin crust, nearly raw centre, purple and cool. Only for exceptional cuts." },
    { id: "mal",        nome: "Rare",            final: "50–52 °C", tirar: 48, cor: "#C0392B", descricao: "Bright red, warm centre. Maximum juiciness, tender texture." },
    { id: "medio-mal",  nome: "Medium-rare ★",   final: "54–57 °C", tirar: 52, cor: "#D35D45", descricao: "The chefs' choice: warm pink, fat melting, juices at their peak. ★ Recommended." },
    { id: "medio",      nome: "Medium",          final: "60–63 °C", tirar: 58, cor: "#C97A5A", descricao: "Pale-pink centre, clear juices. A balance of juiciness and doneness." },
    { id: "medio-bem",  nome: "Medium-well",     final: "65–68 °C", tirar: 63, cor: "#A57C5B", descricao: "Just a thread of pink. Loses juiciness — make up for it with sauce or butter." },
    { id: "bem",        nome: "Well done",       final: "71 °C +",  tirar: 69, cor: "#8A6A52", descricao: "No pink. Fully cooked; the cut risks drying out — use well-marbled pieces." },
  ],

  /* Internal temperatures by protein — chef's target vs official (USDA) safety. */
  proteinas: [
    { grupo: "🐟 Fish & seafood", itens: [
      { nome: "Large white fish (sea bass, grouper, sea bream)", alvo: "55–57 °C", tirar: "54 °C", seguranca: "USDA: 63 °C", descanso: "3–5 min", nota: "NEVER go past 57 °C — above that the fish dries out. It flakes with a fork but still glistens." },
      { nome: "Salmon / trout", alvo: "50–52 °C (medium)", tirar: "49 °C", seguranca: "USDA: 63 °C", descanso: "3 min", nota: "At 52 °C it is silky and moist; by 60 °C it has lost everything." },
      { nome: "Tuna (seared)", alvo: "43–46 °C (rare)", tirar: "42 °C", seguranca: "USDA: 63 °C", descanso: "2 min", nota: "Sear 1 min per side over the hottest embers; raw sashimi-style centre." },
      { nome: "Fresh cod / thick steaks", alvo: "55 °C", tirar: "53 °C", seguranca: "USDA: 63 °C", descanso: "4 min", nota: "The flakes separate like petals — the sign of a perfect point." },
      { nome: "Shrimp / prawns", alvo: "49–52 °C", tirar: "48 °C", seguranca: "63 °C", descanso: "—", nota: "Opaque and C-shaped = done. O-shaped (curled shut) = overdone." },
      { nome: "Sardines / mackerel", alvo: "visual cue", tirar: "—", seguranca: "—", descanso: "—", nota: "Small fish are judged by eye: skin lifts away and the eye turns opaque. 3–4 min/side, hot embers." },
      { nome: "Octopus (pre-cooked)", alvo: "texture", tirar: "—", seguranca: "—", descanso: "—", nota: "Temperature doesn't rule here: 3–4 min/side over hot embers until the tips crisp up." },
    ]},
    { grupo: "🥩 Beef & lamb", itens: [
      { nome: "Steak / rib steak / picanha", alvo: "54–57 °C (medium-rare ★)", tirar: "52 °C", seguranca: "USDA: 63 °C + 3 min", descanso: "5–10 min", nota: "Thick cuts (5 cm+): sear hard, finish over indirect heat. The thermometer is the law." },
      { nome: "Burger (minced meat)", alvo: "71 °C — always", tirar: "69 °C", seguranca: "USDA: 71 °C", descanso: "3 min", nota: "Minced meat is NEVER eaten pink: grinding spreads bacteria through the middle." },
      { nome: "Lamb (chops, leg)", alvo: "54–57 °C (medium-rare)", tirar: "52 °C", seguranca: "USDA: 63 °C + 3 min", descanso: "8 min", nota: "Lamb fat calls for medium embers — it melts without burning." },
    ]},
    { grupo: "🐖 Pork", itens: [
      { nome: "Loin / chops / pluma", alvo: "62–63 °C (blush pink)", tirar: "60 °C", seguranca: "USDA: 63 °C + 3 min", descanso: "5 min", nota: "Modern pork is eaten pink: 63 °C is safe AND juicy. 71 °C is the dried-out past." },
      { nome: "Secretos / thin belly cuts", alvo: "63–65 °C", tirar: "62 °C", seguranca: "USDA: 63 °C", descanso: "3 min", nota: "The marbled fat protects it — hot embers, 3–4 min/side." },
      { nome: "Pork ribs (low & slow)", alvo: "88–92 °C", tirar: "88 °C", seguranca: "63 °C (safety) — but wait!", descanso: "10 min", nota: "At 63 °C it is safe but tough: collagen only surrenders at 88–92 °C. Patience = meat falling off the bone." },
      { nome: "Chouriço / sausage", alvo: "68–71 °C", tirar: "67 °C", seguranca: "71 °C", descanso: "—", nota: "Prick before grilling so it doesn't burst; medium heat, keep turning." },
    ]},
    { grupo: "🍗 Poultry", itens: [
      { nome: "Chicken — breast", alvo: "72–74 °C", tirar: "71 °C", seguranca: "USDA: 74 °C", descanso: "5 min", nota: "Poultry has no doneness levels: 74 °C is the law. Below is a risk; far above is sawdust." },
      { nome: "Chicken — thigh & leg", alvo: "80–85 °C", tirar: "79 °C", seguranca: "USDA: 74 °C", descanso: "5 min", nota: "Dark meat is BETTER above 80 °C — collagen melts and it releases from the bone." },
      { nome: "Spatchcock chicken (whole)", alvo: "74 °C breast / 80 °C thigh", tirar: "72 °C", seguranca: "USDA: 74 °C", descanso: "8 min", nota: "Measure in both places, without touching bone. Indirect 35–45 min + direct at the end." },
      { nome: "Duck — breast", alvo: "58–60 °C (pink)", tirar: "56 °C", seguranca: "USDA: 74 °C", descanso: "5 min", nota: "Chefs serve magret pink; the conservative option is 74 °C." },
    ]},
  ],

  /* Golden rules of the thermometer */
  termometro: [
    "Probe the thickest part of the cut, avoiding bone and fat — they always lie upwards.",
    "Pull the meat off the grill 2–4 °C BEFORE the target: residual heat (carryover) finishes the job while it rests.",
    "Small cuts climb +2–3 °C while resting; large pieces (whole chicken, beef joints) climb +4–6 °C.",
    "Resting is not optional: 5–10 min under loose foil redistributes the juices. Cut straight away = juices on the board.",
    "An instant-read probe thermometer costs €15–30 and turns any amateur into a master. It is THE investment.",
  ],

  /* Indicative times (well-formed embers, white ash) — they complement the temperature, never replace it */
  tempos: [
    { grupo: "🐟 Fish & seafood", itens: [
      { nome: "Sardines", brasa: "Hot", tempo: "6–8 min", min: 7 },
      { nome: "Sea bream / sea bass (~500 g)", brasa: "Medium", tempo: "16–20 min", min: 18 },
      { nome: "Mackerel", brasa: "Hot", tempo: "8–10 min", min: 9 },
      { nome: "Octopus (pre-cooked)", brasa: "Hot", tempo: "6–8 min", min: 7 },
      { nome: "Squid", brasa: "Hot", tempo: "4–6 min", min: 5 },
      { nome: "Shrimp (shell on)", brasa: "Hot", tempo: "4–6 min", min: 5 },
      { nome: "Cod (thick steak)", brasa: "Medium", tempo: "20–25 min", min: 22 },
    ]},
    { grupo: "🥩 Meat", itens: [
      { nome: "Picanha (3 cm slices)", brasa: "Medium-hot", tempo: "8–10 min", min: 9 },
      { nome: "Sirloin steak (2.5 cm)", brasa: "Hot", tempo: "6–8 min", min: 7 },
      { nome: "Rib steak (5 cm)", brasa: "Hot + indirect", tempo: "20–30 min", min: 25 },
      { nome: "Pork ribs", brasa: "Medium (indirect)", tempo: "40–50 min", min: 45 },
      { nome: "Spatchcock chicken", brasa: "Medium (indirect)", tempo: "35–45 min", min: 40 },
      { nome: "Pork secretos", brasa: "Hot", tempo: "6–8 min", min: 7 },
      { nome: "Chouriço / sausage", brasa: "Medium", tempo: "10–12 min", min: 11 },
      { nome: "Skewers (2 cm)", brasa: "Medium-hot", tempo: "10–12 min", min: 11 },
    ]},
    { grupo: "🌽 Vegetables", itens: [
      { nome: "Asparagus", brasa: "Medium", tempo: "4–6 min", min: 5 },
      { nome: "Corn on the cob", brasa: "Medium", tempo: "12–15 min", min: 13 },
      { nome: "Whole peppers", brasa: "Hot", tempo: "15–20 min", min: 18 },
      { nome: "Courgette / aubergine (1 cm)", brasa: "Medium", tempo: "6–8 min", min: 7 },
      { nome: "Portobello mushrooms", brasa: "Medium", tempo: "8–10 min", min: 9 },
      { nome: "Potato (parboiled, halved)", brasa: "Medium", tempo: "10–12 min", min: 11 },
      { nome: "Pineapple (rings)", brasa: "Medium", tempo: "6–8 min", min: 7 },
    ]},
  ],
};

/* English UI labels for the Chef's Station (estacao-mestre.js) */
window.BRASA_TXT = {
  pontoAria: "Choose your doneness",
  tempFinal: "final internal temperature",
  tirarA: "Pull it off the grill at",
  tirarB: "— resting completes the rest.",
  cabTemp: ["Cut", "Chef's target", "Pull at", "Official safety", "Rest", "Master's note"],
  cabTempo: ["Item", "Embers", "Total time"],
  cronometrar: "⏱ Time it",
  relogio: "Ember clock",
  iniciar: "Start",
  virar: "🔄 Flip! (mark halfway)",
  repor: "Reset",
  dica: "Pick a time — or use the ⏱ button on any table row. At 50% we remind you to flip; the alarm rings at the end.",
  horaVirar: "🔄 Time to flip!",
  pronto: "🔥 It's ready!",
  retomar: "Resume",
  pausa: "Pause",
  virado: "🔄 Flipped — nice!",
};
