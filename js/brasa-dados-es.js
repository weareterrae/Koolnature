/* EKOOLOGY — Base de conocimiento de la brasa
   Temperaturas internas, puntos y tiempos a nivel profesional.
   Fuentes: práctica de chefs (ThermoWorks/Serious Eats/Steak School) + seguridad USDA.
   Este archivo alimenta la Estación del Chef y el asistente Chef Kool. */

window.BRASA = {

  /* Puntos de la carne roja (vacuno, cordero) — temperatura interna FINAL.
     tirar = retirar de la parrilla ~3°C antes: el reposo completa (carryover). */
  pontos: [
    { id: "bleu",       nome: "Bleu (sellado)",   final: "46–49 °C", tirar: 45, cor: "#9B1B30", descricao: "Costra fina, interior casi crudo, morado y fresco. Solo para piezas de calidad extrema." },
    { id: "mal",        nome: "Poco hecho",       final: "50–52 °C", tirar: 48, cor: "#C0392B", descricao: "Centro rojo vivo, caliente. Máxima jugosidad, textura tierna." },
    { id: "medio-mal",  nome: "Al punto ★",       final: "54–57 °C", tirar: 52, cor: "#D35D45", descricao: "El punto de los chefs: rosado caliente, grasa derritiéndose, jugos al máximo. ★ Recomendado." },
    { id: "medio",      nome: "Medio hecho",      final: "60–63 °C", tirar: 58, cor: "#C97A5A", descricao: "Centro rosa pálido, jugos claros. Equilibrio entre jugosidad y cocción." },
    { id: "medio-bem",  nome: "Casi hecho",       final: "65–68 °C", tirar: 63, cor: "#A57C5B", descricao: "Solo un hilo de rosa. Pierde jugosidad, se compensa con salsa o mantequilla." },
    { id: "bem",        nome: "Muy hecho",        final: "71 °C +",  tirar: 69, cor: "#8A6A52", descricao: "Sin rosa. Cocción total; la pieza arriesga secarse, usa cortes con grasa." },
  ],

  /* Temperaturas internas por proteína — objetivo del chef vs seguridad oficial (USDA). */
  proteinas: [
    { grupo: "🐟 Pescado y marisco", itens: [
      { nome: "Pescado blanco grande (lubina, mero, dorada)", alvo: "55–57 °C", tirar: "54 °C", seguranca: "USDA: 63 °C", descanso: "3–5 min", nota: "NUNCA superar los 57 °C: por encima el pescado se seca. Se abre en lascas con el tenedor pero aún brilla." },
      { nome: "Salmón / trucha", alvo: "50–52 °C (medio)", tirar: "49 °C", seguranca: "USDA: 63 °C", descanso: "3 min", nota: "A 52 °C queda sedoso y húmedo; a 60 °C ya lo ha perdido todo." },
      { nome: "Atún (sellado)", alvo: "43–46 °C (poco hecho)", tirar: "42 °C", seguranca: "USDA: 63 °C", descanso: "2 min", nota: "Sellar 1 min por cada lado en brasa muy fuerte; centro crudo como sashimi." },
      { nome: "Bacalao fresco / lomos altos", alvo: "55 °C", tirar: "53 °C", seguranca: "USDA: 63 °C", descanso: "4 min", nota: "Las lascas se separan en pétalos, señal de punto perfecto." },
      { nome: "Gambas / langostinos", alvo: "49–52 °C", tirar: "48 °C", seguranca: "63 °C", descanso: "—", nota: "Opaco y en forma de C = listo. En forma de O (cerrado) = ya se pasó." },
      { nome: "Sardina / jurel", alvo: "punto visual", tirar: "—", seguranca: "—", descanso: "—", nota: "El pescado pequeño se mide a ojo: la piel se despega y el ojo se vuelve opaco. 3–4 min por lado, brasa fuerte." },
      { nome: "Pulpo (precocido)", alvo: "textura", tirar: "—", seguranca: "—", descanso: "—", nota: "La temperatura no manda: 3–4 min por lado en brasa fuerte hasta que las puntas chisporroteen." },
    ]},
    { grupo: "🥩 Vacuno y cordero", itens: [
      { nome: "Chuletón / entrecot / picanha", alvo: "54–57 °C (al punto ★)", tirar: "52 °C", seguranca: "USDA: 63 °C + 3 min", descanso: "5–10 min", nota: "Piezas gruesas (5 cm+): sellar fuerte y terminar en indirecto. El termómetro es ley." },
      { nome: "Hamburguesa (carne picada)", alvo: "71 °C — siempre", tirar: "69 °C", seguranca: "USDA: 71 °C", descanso: "3 min", nota: "La carne picada NO se come rosada: el picado esparce bacterias por todo el interior." },
      { nome: "Cordero (chuletas, pierna)", alvo: "54–57 °C (al punto)", tirar: "52 °C", seguranca: "USDA: 63 °C + 3 min", descanso: "8 min", nota: "La grasa del cordero pide brasa media: se derrite sin quemarse." },
    ]},
    { grupo: "🐖 Cerdo", itens: [
      { nome: "Lomo / chuletas / presa", alvo: "62–63 °C (rosado)", tirar: "60 °C", seguranca: "USDA: 63 °C + 3 min", descanso: "5 min", nota: "El cerdo moderno se come rosado: 63 °C es seguro Y jugoso. 71 °C es el pasado de seco." },
      { nome: "Secreto ibérico / panceta fina", alvo: "63–65 °C", tirar: "62 °C", seguranca: "USDA: 63 °C", descanso: "3 min", nota: "La grasa infiltrada protege: brasa fuerte, 3–4 min por lado." },
      { nome: "Costillar (low & slow)", alvo: "88–92 °C", tirar: "88 °C", seguranca: "63 °C (seguridad), ¡pero espera!", descanso: "10 min", nota: "A 63 °C es seguro pero duro: el colágeno solo se deshace a 88–92 °C. Paciencia = carne que se cae del hueso." },
      { nome: "Chorizo / longaniza", alvo: "68–71 °C", tirar: "67 °C", seguranca: "71 °C", descanso: "—", nota: "Pinchar antes para que no reviente; brasa media, girando." },
    ]},
    { grupo: "🍗 Aves", itens: [
      { nome: "Pollo — pechuga", alvo: "72–74 °C", tirar: "71 °C", seguranca: "USDA: 74 °C", descanso: "5 min", nota: "Las aves no tienen puntos: 74 °C es ley. Por debajo hay riesgo; muy por encima es serrín." },
      { nome: "Pollo — muslo y contramuslo", alvo: "80–85 °C", tirar: "79 °C", seguranca: "USDA: 74 °C", descanso: "5 min", nota: "La carne oscura queda MEJOR por encima de los 80 °C: el colágeno se derrite y se suelta del hueso." },
      { nome: "Pollo a la brasa abierto (entero)", alvo: "74 °C en la pechuga / 80 °C en el muslo", tirar: "72 °C", seguranca: "USDA: 74 °C", descanso: "8 min", nota: "Mide en los dos sitios, sin tocar el hueso. Indirecto 35–45 min + directo al final." },
      { nome: "Pato — pechuga", alvo: "58–60 °C (rosado)", tirar: "56 °C", seguranca: "USDA: 74 °C", descanso: "5 min", nota: "Los chefs sirven el magret rosado; la opción conservadora es 74 °C." },
    ]},
  ],

  /* Reglas de oro del termómetro */
  termometro: [
    "Pincha en el punto más grueso de la pieza, sin tocar hueso ni grasa: siempre mienten al alza.",
    "Retira la pieza de la parrilla 2–4 °C ANTES del objetivo: el calor residual (carryover) completa el resto durante el reposo.",
    "Las piezas pequeñas suben +2–3 °C en el reposo; las piezas grandes (pollo entero, pieza de vacuno) suben +4–6 °C.",
    "El reposo no es opcional: 5–10 min bajo papel de aluminio suelto redistribuye los jugos. Cortar enseguida = jugos en la tabla.",
    "Un termómetro de sonda instantánea cuesta 15–30 € y convierte a cualquier aficionado en maestro. Es LA inversión.",
  ],

  /* Tiempos orientativos (brasa bien formada, ceniza blanca) — completan la temperatura, no la sustituyen */
  tempos: [
    { grupo: "🐟 Pescado y marisco", itens: [
      { nome: "Sardinas", brasa: "Fuerte", tempo: "6–8 min", min: 7 },
      { nome: "Dorada / lubina (~500 g)", brasa: "Media", tempo: "16–20 min", min: 18 },
      { nome: "Jureles", brasa: "Fuerte", tempo: "8–10 min", min: 9 },
      { nome: "Pulpo (precocido)", brasa: "Fuerte", tempo: "6–8 min", min: 7 },
      { nome: "Calamares", brasa: "Fuerte", tempo: "4–6 min", min: 5 },
      { nome: "Gambas (con cáscara)", brasa: "Fuerte", tempo: "4–6 min", min: 5 },
      { nome: "Bacalao (lomo alto)", brasa: "Media", tempo: "20–25 min", min: 22 },
    ]},
    { grupo: "🥩 Carne", itens: [
      { nome: "Picanha (filetes de 3 cm)", brasa: "Media-fuerte", tempo: "8–10 min", min: 9 },
      { nome: "Entrecot (2,5 cm)", brasa: "Fuerte", tempo: "6–8 min", min: 7 },
      { nome: "Chuletón (5 cm)", brasa: "Fuerte + indirecto", tempo: "20–30 min", min: 25 },
      { nome: "Costillar", brasa: "Media (indirecto)", tempo: "40–50 min", min: 45 },
      { nome: "Pollo a la brasa abierto", brasa: "Media (indirecto)", tempo: "35–45 min", min: 40 },
      { nome: "Secreto ibérico", brasa: "Fuerte", tempo: "6–8 min", min: 7 },
      { nome: "Chorizo / longaniza", brasa: "Media", tempo: "10–12 min", min: 11 },
      { nome: "Pinchos (2 cm)", brasa: "Media-fuerte", tempo: "10–12 min", min: 11 },
    ]},
    { grupo: "🌽 Verduras", itens: [
      { nome: "Espárragos", brasa: "Media", tempo: "4–6 min", min: 5 },
      { nome: "Maíz (mazorca)", brasa: "Media", tempo: "12–15 min", min: 13 },
      { nome: "Pimientos enteros", brasa: "Fuerte", tempo: "15–20 min", min: 18 },
      { nome: "Calabacín / berenjena (1 cm)", brasa: "Media", tempo: "6–8 min", min: 7 },
      { nome: "Champiñones portobello", brasa: "Media", tempo: "8–10 min", min: 9 },
      { nome: "Patata (precocida, por la mitad)", brasa: "Media", tempo: "10–12 min", min: 11 },
      { nome: "Piña (rodajas)", brasa: "Media", tempo: "6–8 min", min: 7 },
    ]},
  ],
};
