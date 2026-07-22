/* EKOOLOGY — Estação do Chef
   Seletor de ponto com termómetro visual + relógio de brasa com alarme.
   Renderiza a partir de window.BRASA (brasa-dados.js). */

(function () {
  const B = window.BRASA;
  if (!B) return;

  // textos da interface (PT por omissão; en/js/brasa-dados-en.js define window.BRASA_TXT)
  const T = Object.assign({
    pontoAria: "Escolher o ponto da carne",
    tempFinal: "temperatura interna final",
    tirarA: "Tira da grelha aos",
    tirarB: "— o descanso completa o resto.",
    cabTemp: ["Peça", "Alvo do chef", "Tirar da grelha", "Segurança oficial", "Descanso", "Nota do mestre"],
    cabTempo: ["Peça", "Brasa", "Tempo total"],
    cronometrar: "⏱ Cronometrar",
    relogio: "Relógio de brasa",
    iniciar: "Iniciar",
    virar: "🔄 Virar! (marcar metade)",
    repor: "Repor",
    dica: "Escolhe um tempo — ou usa o botão ⏱ de qualquer linha da tabela. Aos 50% avisamos para virar; no fim toca o alarme.",
    horaVirar: "🔄 Hora de virar!",
    pronto: "🔥 Está pronto!",
    retomar: "Retomar",
    pausa: "Pausa",
    virado: "🔄 Virado — boa!",
  }, window.BRASA_TXT || {});

  /* ============ 1. PONTO PERFEITO (termómetro visual) ============ */
  const alvoPonto = document.getElementById("ponto-perfeito");
  if (alvoPonto) {
    alvoPonto.innerHTML =
      `<div class="pp-seletor" role="tablist" aria-label="${T.pontoAria}">` +
      B.pontos.map((p, i) =>
        `<button type="button" role="tab" data-i="${i}" class="${i === 2 ? "ativo" : ""}" style="--cor-ponto:${p.cor}">${p.nome}</button>`
      ).join("") +
      "</div>" +
      '<div class="pp-mostrador">' +
      '<div class="pp-gauge"><div class="pp-carne" id="pp-carne"></div></div>' +
      '<div class="pp-info">' +
      '<div class="pp-temp" id="pp-temp"></div>' +
      '<div class="pp-tirar" id="pp-tirar"></div>' +
      '<p id="pp-desc"></p>' +
      "</div></div>";

    const botoes = alvoPonto.querySelectorAll(".pp-seletor button");
    const mostra = (i) => {
      const p = B.pontos[i];
      botoes.forEach((b, j) => b.classList.toggle("ativo", i === j));
      document.getElementById("pp-carne").style.background =
        `radial-gradient(ellipse at center, ${p.cor} 0%, ${p.cor} ${38 + i * 9}%, #8A6A52 100%)`;
      document.getElementById("pp-temp").innerHTML =
        `<b>${p.final}</b><span>${T.tempFinal}</span>`;
      document.getElementById("pp-tirar").innerHTML =
        `${T.tirarA} <b>${p.tirar} °C</b> ${T.tirarB}`;
      document.getElementById("pp-desc").textContent = p.descricao;
    };
    botoes.forEach((b) => b.addEventListener("click", () => mostra(+b.dataset.i)));
    mostra(2); // médio-mal, o recomendado
  }

  /* ============ 2. TABELAS DE TEMPERATURA ============ */
  const alvoTemp = document.getElementById("tabelas-temperatura");
  if (alvoTemp) {
    alvoTemp.innerHTML = B.proteinas.map((g) =>
      `<h3 class="grupo-titulo">${g.grupo}</h3>` +
      '<div class="tabela-wrap"><table class="tempos">' +
      `<thead><tr>${T.cabTemp.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>` +
      g.itens.map((it) =>
        `<tr><td>${it.nome}</td><td><b style="color:var(--azul)">${it.alvo}</b></td><td>${it.tirar}</td><td>${it.seguranca}</td><td>${it.descanso}</td><td>${it.nota}</td></tr>`
      ).join("") +
      "</tbody></table></div>"
    ).join("");
  }

  const alvoRegras = document.getElementById("regras-termometro");
  if (alvoRegras) {
    alvoRegras.innerHTML = B.termometro.map((r) => `<li>${r}</li>`).join("");
  }

  /* ============ 3. TABELAS DE TEMPO (com botão de cronómetro) ============ */
  const alvoTempo = document.getElementById("tabelas-tempo");
  if (alvoTempo) {
    alvoTempo.innerHTML = B.tempos.map((g) =>
      `<h3 class="grupo-titulo">${g.grupo}</h3>` +
      '<div class="tabela-wrap"><table class="tempos">' +
      `<thead><tr>${T.cabTempo.map(h=>`<th>${h}</th>`).join("")}<th></th></tr></thead><tbody>` +
      g.itens.map((it) =>
        `<tr><td>${it.nome}</td><td>${it.brasa}</td><td>${it.tempo}</td>` +
        `<td><button type="button" class="btn-timer" data-min="${it.min}" data-nome="${it.nome}">${T.cronometrar}</button></td></tr>`
      ).join("") +
      "</tbody></table></div>"
    ).join("");
  }

  /* ============ 4. RELÓGIO DE BRASA ============ */
  const alvoRelogio = document.getElementById("relogio-brasa");
  if (!alvoRelogio) return;

  alvoRelogio.innerHTML =
    '<div class="rb-anel">' +
    '<svg viewBox="0 0 200 200"><circle class="rb-fundo" cx="100" cy="100" r="88"/><circle class="rb-progresso" id="rb-prog" cx="100" cy="100" r="88"/></svg>' +
    '<div class="rb-centro"><b id="rb-tempo">10:00</b><span id="rb-nome"></span></div>' +
    "</div>" +
    '<div class="rb-controlos">' +
    '<div class="rb-presets">' +
    [3, 5, 8, 10, 15, 20, 30, 45].map((m) => `<button type="button" data-min="${m}">${m} min</button>`).join("") +
    "</div>" +
    '<div class="rb-acoes">' +
    `<button type="button" id="rb-iniciar" class="btn azul">${T.iniciar}</button>` +
    `<button type="button" id="rb-virar">${T.virar}</button>` +
    `<button type="button" id="rb-zerar">${T.repor}</button>` +
    "</div>" +
    `<p class="rb-dica">${T.dica}</p>` +
    "</div>";

  const CIRC = 2 * Math.PI * 88;
  const prog = document.getElementById("rb-prog");
  prog.style.strokeDasharray = CIRC;
  const elTempo = document.getElementById("rb-tempo");
  const elNome = document.getElementById("rb-nome");
  const btnIniciar = document.getElementById("rb-iniciar");
  elNome.textContent = T.relogio;

  let total = 600, resta = 600, timer = null, avisouMetade = false;

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const pinta = () => {
    elTempo.textContent = fmt(resta);
    prog.style.strokeDashoffset = CIRC * (1 - resta / total);
    prog.style.stroke = resta / total > 0.5 ? "var(--turquesa)" : resta / total > 0.15 ? "var(--brasa)" : "#D32F2F";
  };

  const bip = (n) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      for (let i = 0; i < n; i++) {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.frequency.value = 880; g.gain.value = 0.25;
        o.start(ctx.currentTime + i * 0.35);
        o.stop(ctx.currentTime + i * 0.35 + 0.22);
      }
    } catch (e) { /* sem áudio, sem drama */ }
  };

  const define = (min, nome) => {
    clearInterval(timer); timer = null;
    total = resta = Math.round(min * 60);
    avisouMetade = false;
    elNome.textContent = nome || T.relogio;
    btnIniciar.textContent = T.iniciar;
    pinta();
  };

  const tique = () => {
    resta--;
    if (!avisouMetade && resta <= total / 2) {
      avisouMetade = true;
      bip(1);
      elNome.textContent = T.horaVirar;
      setTimeout(() => { if (timer) elNome.textContent = nomeAtual; }, 4000);
    }
    if (resta <= 0) {
      resta = 0; clearInterval(timer); timer = null;
      bip(4);
      elNome.textContent = T.pronto;
      btnIniciar.textContent = T.iniciar;
    }
    pinta();
  };

  let nomeAtual = T.relogio;
  btnIniciar.addEventListener("click", () => {
    if (timer) { clearInterval(timer); timer = null; btnIniciar.textContent = T.retomar; return; }
    if (resta <= 0) resta = total;
    timer = setInterval(tique, 1000);
    btnIniciar.textContent = T.pausa;
  });
  document.getElementById("rb-zerar").addEventListener("click", () => define(total / 60, nomeAtual));
  document.getElementById("rb-virar").addEventListener("click", () => {
    avisouMetade = true;
    elNome.textContent = T.virado;
    setTimeout(() => { elNome.textContent = nomeAtual; }, 3000);
  });
  alvoRelogio.querySelectorAll(".rb-presets button").forEach((b) =>
    b.addEventListener("click", () => { nomeAtual = T.relogio; define(+b.dataset.min, nomeAtual); })
  );

  // botões ⏱ nas tabelas
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".btn-timer");
    if (!b) return;
    nomeAtual = b.dataset.nome;
    define(+b.dataset.min, nomeAtual);
    alvoRelogio.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  pinta();
})();
