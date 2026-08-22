/* Mapa de distritos (onde-comprar.html): o SVG (~125 KB) vive à parte em
   assets/mapa-distribuidores.svg — carregado aqui por fetch() e injetado no
   placeholder .mapa-wrap. Antes ia embutido no próprio HTML, mas um bloco
   gigante numa única linha corria o risco de ser mal interpretado por proxies
   de compressão de dados de operadoras móveis (comuns em Angola/Portugal),
   partindo o resto da página a seguir ao mapa — daí ficar num ficheiro à parte.
   Depois de injetado, liga o popover: ao passar o rato (ou tocar, em ecrãs
   táteis) num pin, mostra os distribuidores desse distrito — nome e telefone,
   tirados de js/pontos-venda-dados.js (mesma fonte do diretório). Cada pin
   tem <title>Nome do distrito</title> — é só ler dali. */
(function () {
  var alvo = document.getElementById("mapa-distribuidores-alvo");
  if (!alvo || !window.PONTOS_VENDA) return;

  var EN = document.documentElement.lang === "en" || location.pathname.includes("/en/");
  var svgUrl = EN ? "../assets/mapa-distribuidores.svg" : "assets/mapa-distribuidores.svg";
  var T = EN
    ? { titulo: function (n) { return n + (n === 1 ? " distributor" : " distributors"); }, legenda: "Each dot is a district where the Kool is already within reach." }
    : { titulo: function (n) { return n + (n === 1 ? " distribuidor" : " distribuidores"); }, legenda: "Cada ponto é um distrito onde já tens a Kool à mão." };

  fetch(svgUrl)
    .then(function (r) { return r.ok ? r.text() : null; })
    .then(function (svg) {
      if (!svg) return;
      alvo.insertAdjacentHTML("beforeend", svg + '<p class="mapa-legenda">' + T.legenda + "</p>");
      liga();
    })
    .catch(function () {}); // sem mapa não parte a página — o diretório de pesquisa continua a funcionar

  // Preposição usada em "distrito de/do/da <Nome>" nas tags — a maioria é "de".
  var PREP = { Porto: "do", Guarda: "da" };

  var normaliza = function (s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  };

  function distribuidoresDoDistrito(nome) {
    var prep = PREP[nome] || "de";
    var alvoTxt = normaliza("distrito " + prep + " " + nome);
    var re = new RegExp(alvoTxt.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![a-z])");
    return window.PONTOS_VENDA.filter(function (p) {
      return re.test(normaliza(p.tags || ""));
    });
  }

  function liga() {
    var wrap = alvo;
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
  }
})();
