/* EKOOLOGY — motor de dinâmica do site
   Reveals por scroll, contadores, brasas no hero, nav inteligente,
   menu mobile e iconografia SVG. Respeita prefers-reduced-motion. */

(function () {
  const reduzMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Iconografia SVG (substitui emojis) ---------- */
  const I = (paths, extra) =>
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    paths + (extra || "") + "</svg>";
  const ICONES = {
    "🔥": I('<path d="M12 3c1 3-3 4.5-3 8a5 5 0 0 0 10 0c0-1.5-.5-3-1.5-4.5C17 8.5 15.5 9 15 8c-.6-1.2.5-3-3-5z"/><path d="M12 21a3 3 0 0 1-3-3c0-1.8 1.5-2.5 3-4 1.5 1.5 3 2.2 3 4a3 3 0 0 1-3 3z"/>'),
    "⚡": I('<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>'),
    "💨": I('<path d="M3 8h9a3 3 0 1 0-3-3"/><path d="M3 12h13a3 3 0 1 1-3 3"/><path d="M3 16h6"/>'),
    "✨": I('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/><path d="M19 16l.9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16z"/>'),
    "🌿": I('<path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16z"/><path d="M4 20C8 16 12 12 16 8"/>'),
    "🌲": I('<path d="M12 2 6 10h3l-4 6h5v6h4v-6h5l-4-6h3L12 2z"/>'),
    "🌳": I('<circle cx="12" cy="9" r="6"/><path d="M12 15v7M9 22h6"/>'),
    "☀️": I('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    "🌙": I('<path d="M20 13A8 8 0 1 1 11 4a6.5 6.5 0 0 0 9 9z"/>'),
    "📈": I('<path d="M3 20h18"/><path d="M5 16l4-5 3 3 6-8"/><path d="M18 6h3v3"/>'),
    "💶": I('<circle cx="12" cy="12" r="9"/><path d="M15 8.5A4.2 4.2 0 0 0 8.8 12 4.2 4.2 0 0 0 15 15.5M6.5 10.8h5M6.5 13.2h5"/>'),
    "💧": I('<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>'),
    "🍽️": I('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/>'),
    "👨‍🍳": I('<path d="M7 13a4 4 0 1 1 1-7.9 5 5 0 0 1 8 0A4 4 0 1 1 17 13v6H7v-6z"/><path d="M7 16h10"/>'),
    "✅": I('<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16.5 9"/>'),
    "📦": I('<path d="M3 8l9-5 9 5v8l-9 5-9-5V8z"/><path d="M3 8l9 5 9-5M12 13v8"/>'),
    "🏭": I('<path d="M3 21V9l6 4V9l6 4V4h6v17H3z"/><path d="M7 17h2M12 17h2M17 17h2"/>'),
  };
  document.querySelectorAll(".card .ico, .banda-azul .ico").forEach((el) => {
    const svg = ICONES[el.textContent.trim()];
    if (svg) { el.innerHTML = svg; el.classList.add("ico-svg"); }
  });

  /* ---------- 2. Nav: compacta ao scroll + menu mobile ---------- */
  const nav = document.querySelector(".nav");
  if (nav) {
    const aoScroll = () => nav.classList.toggle("compacta", window.scrollY > 40);
    aoScroll();
    window.addEventListener("scroll", aoScroll, { passive: true });

    const lista = nav.querySelector("ul");
    if (lista) {
      const botao = document.createElement("button");
      botao.className = "nav-hamburger";
      botao.setAttribute("aria-label", "Abrir menu");
      botao.setAttribute("aria-expanded", "false");
      botao.innerHTML = "<span></span><span></span><span></span>";
      nav.querySelector(".wrap").appendChild(botao);
      botao.addEventListener("click", () => {
        const aberto = nav.classList.toggle("menu-aberto");
        botao.setAttribute("aria-expanded", String(aberto));
      });
      lista.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => nav.classList.remove("menu-aberto"))
      );
    }
  }

  /* ---------- 3. Reveals por scroll ---------- */
  const alvos = document.querySelectorAll(
    "section .wrap > *, .banda-azul .item, footer .wrap > div"
  );
  if (!reduzMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visivel");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    alvos.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });
    // stagger dentro de grelhas
    document.querySelectorAll(".cards, .numeros, .galeria, .receitas-grelha, .passos").forEach((grelha) => {
      [...grelha.children].forEach((filho, i) => {
        filho.classList.add("reveal");
        filho.style.transitionDelay = Math.min(i * 90, 540) + "ms";
        io.observe(filho);
      });
    });
  }

  /* ---------- 4. Contadores animados ---------- */
  const animaContador = (el) => {
    const original = el.textContent;
    const m = original.match(/^([^0-9]*)([\d\s.,]+)(.*)$/s);
    if (!m) return;
    const alvo = parseFloat(m[2].replace(/[\s.]/g, "").replace(",", "."));
    if (!isFinite(alvo) || alvo === 0) return;
    const dur = 1400, t0 = performance.now();
    const formata = (v) => {
      let s = String(Math.round(v));
      if (m[2].includes(" ")) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return m[1] + s + m[3];
    };
    const passo = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const suave = 1 - Math.pow(1 - p, 3);
      el.textContent = formata(alvo * suave);
      if (p < 1) requestAnimationFrame(passo);
      else el.textContent = original;
    };
    requestAnimationFrame(passo);
  };
  if (!reduzMotion && "IntersectionObserver" in window) {
    const ioNum = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) { animaContador(e.target); ioNum.unobserve(e.target); }
        });
      },
      { threshold: 0.6 }
    );
    document.querySelectorAll(".num b").forEach((el) => ioNum.observe(el));
  }

  /* ---------- 5. Brasas a flutuar no hero ---------- */
  const hero = document.querySelector(".hero");
  if (hero && !reduzMotion) {
    const c = document.createElement("canvas");
    c.className = "hero-brasas";
    hero.appendChild(c);
    const ctx = c.getContext("2d");
    let W, H, particulas = [], ativo = true;

    const dimensiona = () => {
      W = c.width = hero.offsetWidth;
      H = c.height = hero.offsetHeight;
    };
    dimensiona();
    window.addEventListener("resize", dimensiona);

    const nova = () => ({
      x: Math.random() * W,
      y: H + 10,
      r: 0.8 + Math.random() * 2.2,
      vy: 0.3 + Math.random() * 0.9,
      vx: (Math.random() - 0.5) * 0.4,
      vida: 0,
      max: 300 + Math.random() * 300,
    });
    for (let i = 0; i < 26; i++) {
      const p = nova();
      p.y = Math.random() * H;
      p.vida = Math.random() * p.max;
      particulas.push(p);
    }
    const desenha = () => {
      if (!ativo) return;
      ctx.clearRect(0, 0, W, H);
      particulas.forEach((p, i) => {
        p.y -= p.vy;
        p.x += p.vx + Math.sin((p.vida + i * 40) / 60) * 0.3;
        p.vida++;
        const alfa = Math.max(0, 0.55 * (1 - p.vida / p.max));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(242, 122, 40, ${alfa})`;
        ctx.shadowColor = "rgba(242, 92, 27, 0.8)";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
        if (p.vida > p.max || p.y < -10) particulas[i] = nova();
      });
      requestAnimationFrame(desenha);
    };
    desenha();
    document.addEventListener("visibilitychange", () => {
      ativo = !document.hidden;
      if (ativo) desenha();
    });
  }

  /* ---------- 5b. Vídeo do hero: respeitar reduced motion ---------- */
  const video = document.querySelector(".hero-video");
  if (video && reduzMotion) { video.remove(); }

  /* ---------- 6. Marquee: duplicar conteúdo para loop contínuo ---------- */
  document.querySelectorAll(".marquee-inner").forEach((m) => {
    m.innerHTML += m.innerHTML;
  });
})();

/* ---------- Consentimento de cookies + Tracking do Metricool ----------
   O tracker (cookie analítico) só carrega depois de a pessoa aceitar.
   Escolha guardada em localStorage kn-consent: 'sim' | 'nao'. "knCookies()" reabre o aviso. */
(function () {
  var EN = document.documentElement.lang === 'en' || location.pathname.indexOf('/en/') > -1;
  var T = EN ? {
    txt: 'We use one analytics cookie (Metricool) to count visits — nothing else. ',
    mais: 'Privacy policy', sim: 'Accept', nao: 'Decline',
  } : {
    txt: 'Usamos um único cookie analítico (Metricool) para contar visitas — mais nada. ',
    mais: 'Política de privacidade', sim: 'Aceitar', nao: 'Recusar',
  };
  var priv = EN ? '../privacidade.html' : 'privacidade.html';

  function liga() {
    var head = document.getElementsByTagName('head')[0];
    // Metricool (contagem de visitas)
    var c = document.createElement('script');
    c.type = 'text/javascript'; c.src = 'https://tracker.metricool.com/resources/be.js';
    c.onload = function () { try { beTracker.t({ hash: '558a3450bf8434b88d973867baafd42b' }); } catch (e) {} };
    head.appendChild(c);
    // Google Analytics 4 (eventos de negócio) — só após consentimento
    var g = document.createElement('script');
    g.async = true; g.src = 'https://www.googletagmanager.com/gtag/js?id=G-W2JRWTQE5V';
    head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', 'G-W2JRWTQE5V', { anonymize_ip: true });
  }
  function mostra() {
    if (document.getElementById('kn-cookies')) return;
    var d = document.createElement('div');
    d.id = 'kn-cookies';
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-label', EN ? 'Cookie notice' : 'Aviso de cookies');
    d.innerHTML = '<p>' + T.txt + '<a href="' + priv + '">' + T.mais + '</a></p>' +
      '<div><button type="button" data-v="nao">' + T.nao + '</button>' +
      '<button type="button" class="sim" data-v="sim">' + T.sim + '</button></div>';
    d.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      try { localStorage.setItem('kn-consent', b.dataset.v); } catch (er) {}
      d.remove();
      if (b.dataset.v === 'sim') liga();
    });
    document.body.appendChild(d);
  }
  window.knCookies = function () { try { localStorage.removeItem('kn-consent'); } catch (e) {} mostra(); };
  var atual = null;
  try { atual = localStorage.getItem('kn-consent'); } catch (e) {}
  if (atual === 'sim') liga();
  else if (atual !== 'nao') mostra();
})();


/* ---------- Eventos de negócio (GA4; só disparam se houver consentimento/gtag) ---------- */
(function () {
  function ev(nome, params) { if (typeof window.gtag === 'function') window.gtag('event', nome, params || {}); }
  window.knEvento = ev;

  // vistas de conteúdo-chave (pelo caminho)
  var p = location.pathname;
  if (p.indexOf('/receitas/') > -1 && p.slice(-5) === '.html') ev('ver_receita', { receita: p.split('/').pop().replace('.html', '') });
  if (/(guia-acender-carvao|quanto-carvao-por-pessoa|duas-zonas-de-calor|carvao-ou-briquetes)/.test(p)) ev('ver_guia', { guia: p.split('/').pop().replace('.html', '') });
  if (/onde-comprar/.test(p)) ev('ver_onde_comprar');
  if (/profissionais/.test(p)) ev('ver_profissionais');

  // cliques (delegado)
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a, button'); if (!a) return;
    var h = (a.getAttribute && a.getAttribute('href')) || '';
    if (h.indexOf('onde-comprar') > -1) ev('clique_onde_comprar', { origem: p });
    else if (h.indexOf('profissionais') > -1) ev('clique_profissionais', { origem: p });
    else if (h.indexOf('tel:') === 0) ev('clique_telefone', { numero: h.slice(4) });
    else if (h.indexOf('mailto:') === 0) ev('clique_email');
    else if (a.id === 'mk-botao' || (a.closest && a.closest('#mk-botao'))) ev('chef_kool_abrir', { pagina: p });
  }, true);

  // pesquisa no diretório de distribuidores (1º uso por página)
  var buscou = false;
  document.addEventListener('input', function (e) {
    if (!buscou && e.target && e.target.classList && e.target.classList.contains('pv-busca')) {
      buscou = true; ev('pesquisa_distribuidor');
    }
  }, true);

  // envio de formulários
  document.addEventListener('submit', function (e) {
    var f = e.target; if (!f || !f.getAttribute) return;
    var nome = f.getAttribute('name') || 'form';
    ev('form_' + nome, { pagina: p });
  }, true);
})();
