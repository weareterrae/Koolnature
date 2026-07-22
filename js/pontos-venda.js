/* Diretório de pontos de venda EKOOLOGY — pesquisa por localidade/zona.
   Dados: js/pontos-venda-dados.js (fonte única). Regra do Nuno: zona não
   encontrada → convidar a contactar por email ou telemóvel. */
(function () {
  var raiz = document.getElementById("rede-distribuidores");
  if (!raiz || !window.PONTOS_VENDA) return;

  var EN = document.documentElement.lang === "en" || location.pathname.includes("/en/");
  var T = EN ? {
    placeholder: "Type your town or region (e.g. Braga, Algarve)…",
    aria: "Search for a point of sale",
    resultados: function (n) { return n + (n === 1 ? " distributor found" : " distributors found"); },
    todos: "Our distributor network — nationwide:",
    zonas: "Areas covered: ",
    semResultados: "We couldn't find a distributor for that area — yet! Talk to us and we'll point you to the nearest one (or get one there):",
    ligar: "Call",
  } : {
    placeholder: "Escreve a tua terra ou zona (ex.: Braga, Algarve)…",
    aria: "Pesquisar ponto de venda",
    resultados: function (n) { return n + (n === 1 ? " distribuidor encontrado" : " distribuidores encontrados"); },
    todos: "A nossa rede de distribuidores — de norte a sul:",
    zonas: "Zonas servidas: ",
    semResultados: "Ainda não encontrámos um distribuidor para essa zona! Fala connosco e indicamos-te o ponto mais próximo (ou levamos a Kool até aí):",
    ligar: "Ligar",
  };

  var normaliza = function (s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  };

  raiz.innerHTML =
    '<input type="search" class="pv-busca" placeholder="' + T.placeholder + '" aria-label="' + T.aria + '" />' +
    '<p class="pv-conta" aria-live="polite"></p>' +
    '<div class="pv-grelha"></div>' +
    '<div class="pv-vazio" hidden>' +
      "<p>" + T.semResultados + "</p>" +
      '<div class="acoes" style="justify-content:center">' +
        '<a class="btn azul" href="mailto:info@koolnature.pt">info@koolnature.pt</a>' +
        '<a class="btn" href="tel:+351925969526">+351 925 969 526</a>' +
      "</div>" +
    "</div>";

  var busca = raiz.querySelector(".pv-busca");
  var conta = raiz.querySelector(".pv-conta");
  var grelha = raiz.querySelector(".pv-grelha");
  var vazio = raiz.querySelector(".pv-vazio");

  function render(filtro) {
    var f = normaliza(filtro).trim();
    var lista = window.PONTOS_VENDA.filter(function (p) {
      if (!f) return true;
      return normaliza(p.nome + " " + p.localidade + " " + p.zonas + " " + (p.tags || "")).includes(f);
    });
    grelha.innerHTML = lista.map(function (p) {
      return (
        '<div class="pv-card">' +
          "<h3>" + p.nome + "</h3>" +
          '<div class="pv-local">📍 ' + p.localidade + "</div>" +
          '<p class="pv-zonas">' + T.zonas + p.zonas + "</p>" +
          '<a class="pv-tel" href="tel:+351' + p.telefone.replace(/\s/g, "") + '">📞 ' + p.telefone + "</a>" +
        "</div>"
      );
    }).join("");
    conta.textContent = f ? T.resultados(lista.length) : T.todos;
    vazio.hidden = lista.length > 0;
    grelha.hidden = lista.length === 0;
  }

  busca.addEventListener("input", function () { render(busca.value); });
  render("");
})();
