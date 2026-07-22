/* Chef Kool — assistente da brasa com IA
   Fala com a Netlify Function /api/chef-kool (Claude + conhecimento da marca).
   Se a IA não estiver disponível, cai no motor de regras local — nunca falha. */

(function () {
  /* língua da página (EN nas páginas /en/) */
  const EN = document.documentElement.lang === "en" || location.pathname.includes("/en/");
  const W = EN ? {
    sub: "Your fire chef · EKOOLOGY",
    ola: "Hi! 👋 I'm Chef Kool, your fire chef. Ask me about grilling times, charcoal amounts, internal temperatures or fire tricks.",
    sugestoes: ["How much charcoal for 8 people?", "Sea bass: internal temperature?", "Meat doneness temperatures?"],
    placeholder: "Type your question…",
    aria: "Ask Chef Kool",
    abrir: "Open Chef Kool",
    fallback: "Good question! Offline I only know the essentials (times, amounts, how to light, where to buy). The full Griller's Manual on this site has it all. 🔥",
    teaserTitulo: "Chef Kool",
    teaserTexto: "Hi! 👋 Grilling questions? Times, charcoal amounts, temperatures — ask me anything.",
    teaserFechar: "Dismiss",
  } : {
    sub: "O teu chef de brasa · EKOOLOGY",
    ola: "Olá! 👋 Sou o Chef Kool. Pergunta-me tempos de grelha, quantidades de carvão ou truques de brasa.",
    sugestoes: ["Quanto carvão para 8 pessoas?", "Robalo: temperatura interna?", "Pontos da carne?"],
    placeholder: "Escreve a tua pergunta…",
    aria: "Pergunta ao Chef Kool",
    abrir: "Abrir o Chef Kool",
    fallback: null, // usa o motor local PT
    teaserTitulo: "Chef Kool",
    teaserTexto: "Olá! 👋 Dúvidas de grelha? Tempos, quantidades de carvão, temperaturas — pergunta-me o que quiseres.",
    teaserFechar: "Fechar",
  };

  /* respostas com base de conhecimento (window.BRASA, de brasa-dados.js) */
  const respondeTemperatura = (txt) => {
    const B = window.BRASA;
    if (!B) return null;
    const t = txt.toLowerCase();

    // pergunta sobre pontos da carne
    if (/(ponto|mal passado|bem passado|m[eé]dio|bleu)/.test(t)) {
      return (
        "Ah, os pontos da carne — a pergunta que separa os curiosos dos mestres! 🌡️ Aqui vai a tabela que uso todos os dias:\n" +
        B.pontos.map((p) => `• ${p.nome}: ${p.final}`).join("\n") +
        "\nO truque de chef: tira da grelha 2–4 °C antes do alvo, que o descanso completa o resto. E se quiseres brincar com isto ao vivo, a Estação do Chef no Manual é a tua amiga. Bora grelhar!"
      );
    }

    // pergunta sobre temperatura de uma proteína específica
    if (/(temperatura|graus|°|term[oó]metro|interna|seca?r)/.test(t)) {
      for (const g of B.proteinas) {
        for (const it of g.itens) {
          const chaves = it.nome.toLowerCase().split(/[\s(),\/]+/).filter((w) => w.length > 4);
          if (chaves.some((k) => t.includes(k))) {
            return `Boa escolha — ${it.nome.toLowerCase().split(" (")[0]} bem grelhado é jantar de respeito! 🌡️\nO alvo do chef é ${it.alvo}, e o segredo é tirar da grelha a ${it.tirar} — o calor residual faz o resto durante o descanso (${it.descanso}). Segurança oficial: ${it.seguranca}.\n${it.nota}\nConta-me como correu! 🔥`;
          }
        }
      }
      return (
        "Essa é das minhas favoritas! 🌡️ A regra de ouro que dou a toda a gente: peixe branco grande 55–57 °C (nunca mais que isso, senão seca!), bife médio-mal 54–57 °C, porco 63 °C ainda rosado, frango 74 °C sempre, e entrecosto low & slow a 88–92 °C. Diz-me que peça vais grelhar e dou-te o alvo exato — ou espreita a Estação do Chef no Manual, que tem tudo ao vivo."
      );
    }
    return null;
  };

  const REGRAS = [
    {
      re: /(quant[oa].*(carv|bio).*|carv[aã]o.*(pessoas|preciso|quanto))/i,
      resp: "Boa pergunta — ninguém gosta de ficar sem brasa a meio da festa! 🔥 A minha regra prática com EKOOLOGY:\n• 2–4 pessoas → ~1,5 kg (meio saco de 15 dm³)\n• 5–8 pessoas → ~3 kg (um saco de 15 dm³)\n• 9–15 pessoas → ~5 kg\nE atenção: como rende mais 20–30% que o carvão tradicional, vais gastar menos do que estás habituado. Boa grelhada!",
    },
    {
      re: /sardinha/i,
      resp: "Sardinhas 🐟: brasa forte e bem formada (sem chama!), grelha bem quente.\n• 3–4 min de cada lado, virar só uma vez\n• Sal grosso antes de grelhar\n• Prontas quando a pele descolar com facilidade. Pão, pimento assado e está feito o santo popular!",
    },
    {
      re: /(picanha|entrecosto|carne|frango|costel)/i,
      resp: "Tempos indicativos em brasa média-forte:\n• Picanha (fatias 3 cm): 4–5 min/lado\n• Entrecosto: 40–50 min em fogo indireto + 10 min a selar\n• Frango espalmado: 35–45 min, virar a cada 10\n• Secretos de porco: 3–4 min/lado\nConsulta a tabela completa no Manual do Grelhador!",
    },
    {
      re: /(peixe|dourada|robalo|polvo|lula)/i,
      resp: "Peixe na brasa 🐟 (brasa média, grelha untada):\n• Dourada/robalo inteiro (~500 g): 8–10 min/lado\n• Polvo (pré-cozido): 3–4 min/lado, brasa forte\n• Lulas: 2–3 min/lado\nDica: peixe só se vira uma vez — e a pele bem seca não agarra.",
    },
    {
      re: /(acender|acendalha|come[cç]ar|isqueiro|alcool|álcool)/i,
      resp: "Nunca uses álcool! 🔥 Com EKOOLOGY é rápido:\n1. Faz uma pirâmide com o biocarvão\n2. 2–3 acendalhas naturais no centro\n3. Acende e deixa trabalhar 15–20 min sem mexer\n4. Quando estiver com cinza branca à superfície, espalha e grelha.\nO EKOOLOGY acende mais rápido que o carvão tradicional — menos espera, mais grelha.",
    },
    {
      re: /(porqu|diferen|melhor|vantag|tradicional|bio)/i,
      resp: "O biocarvão EKOOLOGY vs. carvão tradicional:\n✓ +94% carbono fixo — mais calor com menos carvão\n✓ Acende mais rápido\n✓ Sem pós nem finos no saco\n✓ Menos fumo e faíscas\n✓ Sem toxinas\n✓ E o melhor: é feito de acácia invasora — cada saco ajuda a limpar a floresta portuguesa 🌲",
    },
    {
      re: /(onde|comprar|loja|pre[cç]o|aldi)/i,
      resp: "Boa notícia: estamos por todo o país! 🔵 No Aldi (o carvão biológico BBQ de marca própria… também somos nós!) e numa rede de 30 distribuidores de norte a sul — pesquisa a tua zona no diretório da página de Contactos. Se a tua terra não aparecer lá, escreve-nos para info@koolnature.pt ou liga +351 925 969 526, que indicamos-te o ponto mais próximo.",
    },
    {
      re: /(pellet|aquecimento|salamandra|caldeira|recuperador)/i,
      resp: "Também fazemos Pellets EKOOLOGY! 🌲 Produzidos na nossa unidade dedicada em Penacova, com certificação ENplus® A1 (o padrão europeu mais exigente): alto poder calorífico, baixo teor de cinzas, madeira 100% portuguesa. Para recuperadores, salamandras e caldeiras — em saco de 15 kg ou palete. Detalhes na página de Produtos.",
    },
    {
      re: /(legume|vegetal|espargo|milho|pimento|vegetarian)/i,
      resp: "Legumes na grelha 🌽 (brasa média):\n• Espargos: 4–6 min, a rolar\n• Milho (maçaroca): 12–15 min, virar sempre\n• Pimentos inteiros: 15–20 min até a pele estalar\n• Curgete/beringela (fatias 1 cm): 3–4 min/lado\nAzeite, sal grosso no fim, e um fio de limão.",
    },
    {
      re: /(ol[aá]|bom dia|boa tarde|boa noite|hey|hello)/i,
      resp: "Olá! 👋 Sou o Chef Kool, o teu chef de brasa. Pergunta-me tempos de grelha, quanto carvão precisas, como acender, ou porque é que o biocarvão é diferente.",
    },
  ];

  const FALLBACK =
    "Essa pergunta merece melhor resposta do que a que te consigo dar agora! 😅 Neste momento estou no essencial da brasa: tempos, quantidades, como acender, onde comprar. Espreita o Manual do Grelhador aqui no site — está lá tudo, com tabelas e truques de chef. E volta a perguntar-me daqui a nada! 🔥";

  function responder(txt) {
    if (EN) return W.fallback;
    const temp = respondeTemperatura(txt);
    if (temp) return temp;
    for (const r of REGRAS) if (r.re.test(txt)) return r.resp;
    return FALLBACK;
  }

  // ---- IA (Netlify Function → Claude) ----
  const historico = [];
  let iaDisponivel = true; // desliga-se sozinho se o backend disser que não há chave

  async function respostaIA() {
    if (!iaDisponivel) return null;
    try {
      const r = await fetch("/api/chef-kool", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ historico: historico.slice(-12) }),
      });
      if (r.status === 503) {
        iaDisponivel = false; // IA por configurar → ficar no modo local
        return null;
      }
      if (!r.ok) return null;
      const dados = await r.json();
      return typeof dados.resposta === "string" && dados.resposta.trim()
        ? dados.resposta.trim()
        : null;
    } catch {
      return null; // offline / erro de rede → modo local
    }
  }

  // ---- UI ----
  const botao = document.createElement("button");
  botao.id = "mk-botao";
  botao.setAttribute("aria-label", W.abrir);
  botao.innerHTML = `<img src="/assets/chef-kool.png" alt="" />`;

  const painel = document.createElement("div");
  painel.id = "mk-painel";
  painel.innerHTML =
    `<div class="mk-topo"><img class="mk-avatar" src="/assets/chef-kool.png" alt="" /><div><b>Chef Kool</b><span>${W.sub}</span></div></div>` +
    '<div id="mk-conversa" aria-live="polite"></div>' +
    '<div class="mk-sugestoes">' +
    W.sugestoes.map((t) => `<button type="button">${t}</button>`).join("") +
    "</div>" +
    `<form id="mk-form"><input type="text" placeholder="${W.placeholder}" aria-label="${W.aria}" /><button type="submit">➤</button></form>`;

  document.body.appendChild(botao);
  document.body.appendChild(painel);

  const conversa = painel.querySelector("#mk-conversa");
  const form = painel.querySelector("#mk-form");
  const input = form.querySelector("input");

  function msg(texto, quem) {
    const el = document.createElement("div");
    el.className = "mk-msg " + quem;
    el.textContent = texto;
    conversa.appendChild(el);
    conversa.scrollTop = conversa.scrollHeight;
    return el;
  }

  let ocupado = false;

  async function perguntar(txt) {
    txt = txt.trim();
    if (!txt || ocupado) return;
    ocupado = true;
    msg(txt, "eu");
    historico.push({ role: "user", content: txt });

    const espera = msg("…", "bot");
    espera.classList.add("espera");

    let texto = await respostaIA();
    if (!texto) texto = responder(txt); // rede de segurança: motor local

    espera.classList.remove("espera");
    espera.textContent = texto;
    conversa.scrollTop = conversa.scrollHeight;
    historico.push({ role: "assistant", content: texto });
    if (historico.length > 24) historico.splice(0, historico.length - 24);
    ocupado = false;
  }

  botao.addEventListener("click", () => {
    painel.classList.toggle("aberto");
    if (painel.classList.contains("aberto") && !conversa.children.length) {
      msg(W.ola, "bot");
    }
  });

  // ---- teaser: dá destaque ao Chef Kool (1× por sessão) ----
  (function teaser() {
    try {
      if (sessionStorage.getItem("mkTeaserVisto")) return;
    } catch { /* sessionStorage bloqueado → mostra na mesma */ }

    const t = document.createElement("div");
    t.id = "mk-teaser";
    t.innerHTML =
      `<button type="button" class="mk-teaser-fechar" aria-label="${W.teaserFechar}">×</button>` +
      `<img src="/assets/chef-kool.png" alt="" />` +
      `<div><b>${W.teaserTitulo}</b><span>${W.teaserTexto}</span></div>`;
    document.body.appendChild(t);

    const visto = () => {
      try { sessionStorage.setItem("mkTeaserVisto", "1"); } catch {}
    };
    const esconder = () => {
      visto();
      t.classList.remove("visivel");
      setTimeout(() => t.remove(), 400);
    };

    t.addEventListener("click", (e) => {
      if (e.target.closest(".mk-teaser-fechar")) { esconder(); return; }
      visto();
      t.remove();
      painel.classList.add("aberto");
      if (!conversa.children.length) msg(W.ola, "bot");
    });

    setTimeout(() => t.classList.add("visivel"), 1800);
    setTimeout(() => { if (document.body.contains(t)) esconder(); }, 18000);
  })();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    perguntar(input.value);
    input.value = "";
  });

  painel.querySelectorAll(".mk-sugestoes button").forEach((b) =>
    b.addEventListener("click", () => perguntar(b.textContent))
  );
})();
