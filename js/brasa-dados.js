/* EKOOLOGY — Base de conhecimento da brasa
   Temperaturas internas, pontos e tempos ao nível profissional.
   Fontes: prática de chefs (ThermoWorks/Serious Eats/Steak School) + segurança USDA.
   Este ficheiro alimenta a Estação do Chef e o assistente Chef Kool. */

window.BRASA = {

  /* Pontos da carne vermelha (vaca, borrego) — temperatura interna FINAL.
     tirar = tirar da grelha ~3°C antes: o descanso completa (carryover). */
  pontos: [
    { id: "bleu",       nome: "Bleu (selado)",   final: "46–49 °C", tirar: 45, cor: "#9B1B30", descricao: "Crosta fina, interior quase cru, roxo e fresco. Só para peças de qualidade extrema." },
    { id: "mal",        nome: "Mal passado",     final: "50–52 °C", tirar: 48, cor: "#C0392B", descricao: "Centro vermelho vivo, quente. Máxima suculência, textura macia." },
    { id: "medio-mal",  nome: "Médio-mal ★",     final: "54–57 °C", tirar: 52, cor: "#D35D45", descricao: "O ponto dos chefs: rosado quente, gordura a derreter, sucos no máximo. ★ Recomendado." },
    { id: "medio",      nome: "Médio",           final: "60–63 °C", tirar: 58, cor: "#C97A5A", descricao: "Centro rosa-pálido, sucos claros. Equilíbrio entre suculência e cozedura." },
    { id: "medio-bem",  nome: "Médio-bem",       final: "65–68 °C", tirar: 63, cor: "#A57C5B", descricao: "Só um fio de rosa. Perde suculência — compensa com molho ou manteiga." },
    { id: "bem",        nome: "Bem passado",     final: "71 °C +",  tirar: 69, cor: "#8A6A52", descricao: "Sem rosa. Cozedura total; peça arrisca secar — usa cortes com gordura." },
  ],

  /* Temperaturas internas por proteína — alvo do chef vs segurança oficial (USDA). */
  proteinas: [
    { grupo: "🐟 Peixe e marisco", itens: [
      { nome: "Peixe branco grande (robalo, garoupa, dourada)", alvo: "55–57 °C", tirar: "54 °C", seguranca: "USDA: 63 °C", descanso: "3–5 min", nota: "NUNCA passar dos 57 °C — acima disso o peixe seca. Lasca com o garfo mas ainda brilha." },
      { nome: "Salmão / truta", alvo: "50–52 °C (médio)", tirar: "49 °C", seguranca: "USDA: 63 °C", descanso: "3 min", nota: "A 52 °C fica sedoso e húmido; a 60 °C já perdeu tudo." },
      { nome: "Atum (selado)", alvo: "43–46 °C (raro)", tirar: "42 °C", seguranca: "USDA: 63 °C", descanso: "2 min", nota: "Selar 1 min de cada lado em brasa fortíssima; centro cru como sashimi." },
      { nome: "Bacalhau fresco / postas altas", alvo: "55 °C", tirar: "53 °C", seguranca: "USDA: 63 °C", descanso: "4 min", nota: "As lascas separam-se em pétalas — sinal de ponto perfeito." },
      { nome: "Camarão / gamba", alvo: "49–52 °C", tirar: "48 °C", seguranca: "63 °C", descanso: "—", nota: "Opaco e em C = pronto. Em O (fechado) = já passou." },
      { nome: "Sardinha / carapau", alvo: "ponto visual", tirar: "—", seguranca: "—", descanso: "—", nota: "Peixe pequeno mede-se à vista: pele descola e olho opaco. 3–4 min/lado, brasa forte." },
      { nome: "Polvo (pré-cozido)", alvo: "textura", tirar: "—", seguranca: "—", descanso: "—", nota: "A temperatura não manda: 3–4 min/lado em brasa forte até as pontas estalarem." },
    ]},
    { grupo: "🥩 Vaca e borrego", itens: [
      { nome: "Bife / costeletão / picanha", alvo: "54–57 °C (médio-mal ★)", tirar: "52 °C", seguranca: "USDA: 63 °C + 3 min", descanso: "5–10 min", nota: "Peças altas (5 cm+): selar forte e acabar em indireto. O termómetro é lei." },
      { nome: "Hambúrguer (carne picada)", alvo: "71 °C — sempre", tirar: "69 °C", seguranca: "USDA: 71 °C", descanso: "3 min", nota: "Carne picada NÃO se come rosada: a moagem espalha bactérias pelo interior." },
      { nome: "Borrego (costeletas, perna)", alvo: "54–57 °C (médio-mal)", tirar: "52 °C", seguranca: "USDA: 63 °C + 3 min", descanso: "8 min", nota: "A gordura do borrego pede brasa média — derrete sem arder." },
    ]},
    { grupo: "🐖 Porco", itens: [
      { nome: "Lombo / costeletas / pluma", alvo: "62–63 °C (rosado)", tirar: "60 °C", seguranca: "USDA: 63 °C + 3 min", descanso: "5 min", nota: "Porco moderno come-se rosado: 63 °C é seguro E suculento. 71 °C é o passado a seco." },
      { nome: "Secretos / entremeada fina", alvo: "63–65 °C", tirar: "62 °C", seguranca: "USDA: 63 °C", descanso: "3 min", nota: "A gordura entremeada protege — brasa forte, 3–4 min/lado." },
      { nome: "Entrecosto (low & slow)", alvo: "88–92 °C", tirar: "88 °C", seguranca: "63 °C (segurança) — mas espera!", descanso: "10 min", nota: "Aos 63 °C é seguro mas rijo: o colagénio só se desfaz aos 88–92 °C. Paciência = carne a cair do osso." },
      { nome: "Chouriço / linguiça", alvo: "68–71 °C", tirar: "67 °C", seguranca: "71 °C", descanso: "—", nota: "Furar antes para não rebentar; média, a rodar." },
    ]},
    { grupo: "🍗 Aves", itens: [
      { nome: "Frango — peito", alvo: "72–74 °C", tirar: "71 °C", seguranca: "USDA: 74 °C", descanso: "5 min", nota: "Aves não têm pontos: 74 °C é lei. Abaixo é risco; muito acima é serradura." },
      { nome: "Frango — coxa e perna", alvo: "80–85 °C", tirar: "79 °C", seguranca: "USDA: 74 °C", descanso: "5 min", nota: "A carne escura fica MELHOR acima dos 80 °C — o colagénio derrete e solta do osso." },
      { nome: "Frango espalmado (inteiro)", alvo: "74 °C no peito / 80 °C na coxa", tirar: "72 °C", seguranca: "USDA: 74 °C", descanso: "8 min", nota: "Mede nos dois sítios, sem tocar no osso. Indireto 35–45 min + direto no fim." },
      { nome: "Pato — peito", alvo: "58–60 °C (rosado)", tirar: "56 °C", seguranca: "USDA: 74 °C", descanso: "5 min", nota: "Chefs servem o magret rosado; a opção conservadora é 74 °C." },
    ]},
  ],

  /* Regras de ouro do termómetro */
  termometro: [
    "Espeta no ponto mais grosso da peça, sem tocar em osso nem gordura — mentem sempre para cima.",
    "Tira a peça da grelha 2–4 °C ANTES do alvo: o calor residual (carryover) completa durante o descanso.",
    "Peças pequenas sobem +2–3 °C no descanso; peças grandes (frango inteiro, peça de vaca) sobem +4–6 °C.",
    "O descanso não é opcional: 5–10 min debaixo de alumínio solto redistribui os sucos. Cortar logo = sucos na tábua.",
    "Termómetro de sonda instantânea custa 15–30 € e transforma qualquer amador em mestre. É O investimento.",
  ],

  /* Tempos indicativos (brasa bem formada, cinza branca) — completam a temperatura, não a substituem */
  tempos: [
    { grupo: "🐟 Peixe e marisco", itens: [
      { nome: "Sardinhas", brasa: "Forte", tempo: "6–8 min", min: 7 },
      { nome: "Dourada / robalo (~500 g)", brasa: "Média", tempo: "16–20 min", min: 18 },
      { nome: "Carapaus", brasa: "Forte", tempo: "8–10 min", min: 9 },
      { nome: "Polvo (pré-cozido)", brasa: "Forte", tempo: "6–8 min", min: 7 },
      { nome: "Lulas", brasa: "Forte", tempo: "4–6 min", min: 5 },
      { nome: "Camarão (com casca)", brasa: "Forte", tempo: "4–6 min", min: 5 },
      { nome: "Bacalhau (posta alta)", brasa: "Média", tempo: "20–25 min", min: 22 },
    ]},
    { grupo: "🥩 Carne", itens: [
      { nome: "Picanha (fatias 3 cm)", brasa: "Média-forte", tempo: "8–10 min", min: 9 },
      { nome: "Bife da vazia (2,5 cm)", brasa: "Forte", tempo: "6–8 min", min: 7 },
      { nome: "Costeletão (5 cm)", brasa: "Forte + indireto", tempo: "20–30 min", min: 25 },
      { nome: "Entrecosto", brasa: "Média (indireto)", tempo: "40–50 min", min: 45 },
      { nome: "Frango espalmado", brasa: "Média (indireto)", tempo: "35–45 min", min: 40 },
      { nome: "Secretos de porco", brasa: "Forte", tempo: "6–8 min", min: 7 },
      { nome: "Chouriço / linguiça", brasa: "Média", tempo: "10–12 min", min: 11 },
      { nome: "Espetadas (2 cm)", brasa: "Média-forte", tempo: "10–12 min", min: 11 },
    ]},
    { grupo: "🌽 Legumes", itens: [
      { nome: "Espargos", brasa: "Média", tempo: "4–6 min", min: 5 },
      { nome: "Milho (maçaroca)", brasa: "Média", tempo: "12–15 min", min: 13 },
      { nome: "Pimentos inteiros", brasa: "Forte", tempo: "15–20 min", min: 18 },
      { nome: "Curgete / beringela (1 cm)", brasa: "Média", tempo: "6–8 min", min: 7 },
      { nome: "Cogumelos portobello", brasa: "Média", tempo: "8–10 min", min: 9 },
      { nome: "Batata (pré-cozida, ao meio)", brasa: "Média", tempo: "10–12 min", min: 11 },
      { nome: "Ananás (rodelas)", brasa: "Média", tempo: "6–8 min", min: 7 },
    ]},
  ],
};
