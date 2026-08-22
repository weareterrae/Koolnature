/* Popover do mapa de distritos (onde-comprar.html): ao passar o rato (ou tocar,
   em ecrãs táteis) num pin, mostra os distribuidores desse distrito — nome e
   telefone, tirados de js/pontos-venda-dados.js (mesma fonte do diretório).
   Cada pin já tem <title>Nome do distrito</title> — é só ler dali. */
(function () {
  var wrap = document.querySelector(".mapa-wrap");
  if (!wrap || !window.PONTOS_VENDA) return;

  var EN = document.documentElement.lang === "en" || location.pathname.includes("/en/");
  var T = EN
    ? { titulo: function (n) { return n + (n === 1 ? " distributor" : " distributors"); } }
    : { titulo: function (n) { return n + (n === 1 ? " distribuidor" : " distribuidores"); } };

  // Preposição usada em "distrito de/do/da <Nome>" nas tags — a maioria é "de".
  var PREP = { Porto: "do", Guarda: "da" };

  var normaliza = function (s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  };

  function distribuidoresDoDistrito(nome) {
    var prep = PREP[nome] || "de";
    var alvo = normaliza("distrito " + prep + " " + nome);
    var re = new RegExp(alvo.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![a-z])");
    return window.PONTOS_VENDA.filter(function (p) {
      return re.test(normaliza(p.tags || ""));
    });
  }

  wrap.style.position = "relative";
  var tip = document.createElement("div");
  tip.className = "mp-tooltip";
  tip.hidden = true;
  wrap.appendChild(tip);

  function render(nome, lista) {
    var itens = lista.map(function (p) {
      return (
        '<li><strong>' + p.nome + "</strong>" +
        '<a href="tel:+351' + p.telefone.replace(/\s/g, "") + '">📞 ' + p.telefone + "</a></li>"
      );
    }).join("");
    tip.innerHTML =
      '<p class="mp-tooltip-titulo">' + nome + " · " + T.titulo(lista.length) + "</p>" +
      "<ul>" + itens + "</ul>";
  }

  function posiciona(pin) {
    var wr = wrap.getBoundingClientRect();
    var pr = pin.querySelector("circle").getBoundingClientRect();
    var cx = pr.left + pr.width / 2 - wr.left;
    var cy = pr.top - wr.top;
    tip.style.left = cx + "px";
    tip.style.top = Math.max(cy - 8, 4) + "px";
    // Vira para a direita se estiver perto da margem esquerda, e vice-versa —
    // evita que o popover saia do cartão em pins junto às bordas do mapa.
    tip.classList.toggle("dir-direita", cx < 70);
    tip.classList.toggle("dir-esquerda", cx > wr.width - 70);
  }

  var pinAberto = null;

  function abre(pin) {
    var nome = pin.querySelector("title").textContent;
    var lista = distribuidoresDoDistrito(nome);
    if (!lista.length) return;
    render(nome, lista);
    tip.hidden = false;
    posiciona(pin);
    pinAberto = pin;
  }

  function fecha() {
    tip.hidden = true;
    pinAberto = null;
  }

  Array.prototype.forEach.call(wrap.querySelectorAll(".mp-pin"), function (pin) {
    pin.addEventListener("pointerenter", function (e) {
      if (e.pointerType === "mouse") abre(pin);
    });
    pin.addEventListener("pointerleave", function (e) {
      if (e.pointerType === "mouse") fecha();
    });
    pin.addEventListener("click", function (e) {
      e.stopPropagation();
      if (pinAberto === pin) { fecha(); return; }
      abre(pin);
    });
  });

  document.addEventListener("click", function (e) {
    if (pinAberto && !tip.contains(e.target)) fecha();
  });
})();
