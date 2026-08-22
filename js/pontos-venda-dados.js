/* PONTOS DE VENDA EKOOLOGY — FONTE ÚNICA DE VERDADE
   Origem: "LISTA DISTRIBUIDORES EKOOLOGY VERSAO 2.xlsx" (Nuno Cabral, 21/08/2026).
   Alimenta: a página de contactos (diretório com pesquisa) e o Chef Kool
   (site + redes, via exporta-conhecimento.mjs).
   PARA ATUALIZAR: editar apenas este ficheiro (o array é JSON válido),
   correr node exporta-conhecimento.mjs no scratchpad e fazer deploy.
   REGRA DO NUNO: localidade que não conste aqui → pedir contacto por
   email (info@koolnature.pt) ou telemóvel (+351 925 969 526).
   Campos email/contacto: alimentam SÓ o conhecimento do Chef Kool (não
   aparecem nos cartões públicos do diretório — ver js/pontos-venda.js). */
window.PONTOS_VENDA = [
  {
    "nome": "A. Marques Lda",
    "localidade": "Caldas da Rainha",
    "telefone": "262 841 005",
    "zonas": "Caldas da Rainha e toda a zona, litoral e interior, desde Torres Vedras até Alcobaça, Cartaxo e Santarém",
    "tags": "Oeste, distrito de Leiria, distrito de Lisboa, distrito de Santarém, Ribatejo, centro",
    "email": "antoniobairros@marques.pt",
    "contacto": "António Bairros / 917 587 491"
  },
  {
    "nome": "A. M. Embalagens Lda",
    "localidade": "Braga",
    "telefone": "913 215 096",
    "zonas": "Cidade de Braga",
    "tags": "Minho, distrito de Braga, norte",
    "email": "comercial@amembalagens.pt",
    "contacto": "Margarida / 913 215 096"
  },
  {
    "nome": "Biquimicos",
    "localidade": "Aljustrel",
    "telefone": "284 601 288",
    "zonas": "Zona litoral entre Sines e V. N. Milfontes, Aljustrel, Beja e todo o Baixo Alentejo, zona entre Albufeira e Olhão",
    "tags": "Alentejo, Baixo Alentejo, Algarve, distrito de Beja, distrito de Faro, litoral alentejano, sul",
    "email": "biquimicos@grupobiquimicos.com",
    "contacto": "Jorge Lopes / 938 134 855"
  },
  {
    "nome": "Candeias & Filho Lda",
    "localidade": "Odemira",
    "telefone": "283 386 317",
    "zonas": "Zona litoral entre Sines e Aljezur, Odemira",
    "tags": "Alentejo, Costa Vicentina, litoral alentejano, distrito de Beja, sudoeste, sul",
    "email": "candeiasfilho@sapo.pt",
    "contacto": "Carlos Candeias / 917 641 005"
  },
  {
    "nome": "Centro Agro Avícola - Picamilho",
    "localidade": "Campo de Besteiros",
    "telefone": "232 859 106",
    "zonas": "Santa Comba Dão, Tondela, Campo de Besteiros",
    "tags": "distrito de Viseu, Beiras, Dão, centro",
    "email": "antoniocarrapico@centroagroavicola.pt",
    "contacto": "Maria / 912 300 351"
  },
  {
    "nome": "Cordeiro & C.ª",
    "localidade": "Leiria",
    "telefone": "244 720 480",
    "zonas": "Leiria, Marinha Grande, Pombal, Batalha, Fátima, Coimbra",
    "tags": "distrito de Leiria, distrito de Coimbra, centro, Pinhal Litoral",
    "email": "geral@cordeiroecompanhia.pt",
    "contacto": "Carina / 914 180 286"
  },
  {
    "nome": "David Nicolau",
    "localidade": "S. Brás de Alportel",
    "telefone": "965 099 514",
    "zonas": "Loulé, Faro, S. Brás de Alportel, Olhão, Almancil",
    "tags": "Algarve, distrito de Faro, sotavento, sul",
    "email": "david.nicolau@sapo.pt",
    "contacto": "David Nicolau / 965 099 514"
  },
  {
    "nome": "Fielgas Lda",
    "localidade": "Penafiel",
    "telefone": "919 575 963",
    "zonas": "Penafiel e toda a zona do Vale do Sousa",
    "tags": "distrito do Porto, Vale do Sousa, norte",
    "email": "geral@fielgas.pt",
    "contacto": "Joaquim Barbosa / 917 623 072"
  },
  {
    "nome": "Gascomb",
    "localidade": "Mangualde",
    "telefone": "232 095 862",
    "zonas": "Mangualde",
    "tags": "distrito de Viseu, Beiras, Dão, centro",
    "email": "encomendas@gascomb.pt",
    "contacto": "232095862"
  },
  {
    "nome": "Gasnunos",
    "localidade": "Castanheira do Ribatejo",
    "telefone": "263 299 111",
    "zonas": "Castanheira do Ribatejo, Vila Franca de Xira",
    "tags": "distrito de Lisboa, Ribatejo, grande Lisboa",
    "email": "escrotorio.gasnunos@sapo.pt",
    "contacto": "263299111"
  },
  {
    "nome": "Gasunidos Lda",
    "localidade": "Abrantes",
    "telefone": "241 372 988",
    "zonas": "Abrantes, Chamusca e parte do Pinhal Interior",
    "tags": "distrito de Santarém, Ribatejo, Médio Tejo, Pinhal Interior, centro",
    "email": "helena.amaral@gasunifod.pt",
    "contacto": "Luis Miguel / 917 769 362"
  },
  {
    "nome": "Impergas Lda",
    "localidade": "Póvoa de Varzim",
    "telefone": "912 515 870",
    "zonas": "Santa Maria da Feira, Porto e arredores, Vila Nova de Gaia, Póvoa de Varzim, Vila do Conde, todo o distrito de Braga",
    "tags": "norte, distrito do Porto, distrito de Braga, grande Porto, litoral norte, Minho",
    "email": "sofia.campelo@impergas.pt",
    "contacto": "Sofia Campelo / 252 683 226"
  },
  {
    "nome": "Inforgás Lda",
    "localidade": "Viseu",
    "telefone": "232 929 100",
    "zonas": "São Pedro do Sul, Viseu, Mangualde",
    "tags": "distrito de Viseu, Beiras, centro",
    "email": "clara.godinho@inforgas.pt",
    "contacto": "Clara Godinho / 968 332 547"
  },
  {
    "nome": "Inforgás Lda",
    "localidade": "Fundão",
    "telefone": "275 776 497",
    "zonas": "Manteigas, Belmonte, Covilhã e Fundão",
    "tags": "distrito de Castelo Branco, Beira Baixa, Cova da Beira, Serra da Estrela, centro",
    "email": "fatima.raposo@inforgas.pt",
    "contacto": "Fátima Raposo / 275 445 497"
  },
  {
    "nome": "Inforgás Lda",
    "localidade": "Castelo Branco",
    "telefone": "272 345 580",
    "zonas": "Castelo Branco e arredores",
    "tags": "distrito de Castelo Branco, Beira Baixa, centro",
    "email": "marina.goncalves@inforgas.pt",
    "contacto": "Marina Goncalves / 915 134 073"
  },
  {
    "nome": "Jogás Lda",
    "localidade": "Sátão",
    "telefone": "966 968 382",
    "zonas": "Sátão, Vila Nova de Paiva, Aguiar da Beira",
    "tags": "distrito de Viseu, Beiras, centro",
    "email": "jogas-satao@hotmail.com",
    "contacto": "Jorge Costa / 966 968 382"
  },
  {
    "nome": "Klotgás Lda",
    "localidade": "Coimbra",
    "telefone": "917 566 575",
    "zonas": "Mealhada, Coimbra e arredores",
    "tags": "distrito de Coimbra, Bairrada, centro",
    "email": "geral@klotgas.pt",
    "contacto": "Vasconcelos / 919 550 816"
  },
  {
    "nome": "Luis Miguel F. Oliveira",
    "localidade": "Almada",
    "telefone": "933 283 424",
    "zonas": "Lisboa, Almada, Seixal, Costa de Caparica, Odivelas",
    "tags": "grande Lisboa, distrito de Lisboa, distrito de Setúbal, margem sul, península de Setúbal",
    "email": "luismfoliveira74@gmail.com",
    "contacto": "Luis Oliveira / 933283424"
  },
  {
    "nome": "Luz e Sol Lda",
    "localidade": "Oliveira de Azeméis",
    "telefone": "917 683 235",
    "zonas": "Oliveira de Azeméis, Porto, Vila Nova de Gaia, distrito de Aveiro",
    "tags": "distrito de Aveiro, distrito do Porto, grande Porto, norte",
    "email": "manuelsrs6@gmail.com",
    "contacto": "Manuel Soares / 917 683 235"
  },
  {
    "nome": "Matéria Lda",
    "localidade": "Setúbal",
    "telefone": "968 809 012",
    "zonas": "Setúbal, Palmela e todo o litoral entre Troia e Vila Nova de Milfontes",
    "tags": "distrito de Setúbal, península de Setúbal, litoral alentejano, Alentejo, sul",
    "email": "materia.ramos@gmail.com",
    "contacto": "Rui Ramos / 968 732 754"
  },
  {
    "nome": "Packfilm Lda",
    "localidade": "Loures",
    "telefone": "219 891 137",
    "zonas": "Lisboa, linha de Sintra, linha de Cascais, Loures, Odivelas, Malveira, margem sul do Tejo até Corroios",
    "tags": "grande Lisboa, distrito de Lisboa, margem sul, Sintra, Cascais",
    "email": "daniel.rodrigues@packfilm.pt",
    "contacto": "Daniel Rodrigues / 912 221 948"
  },
  {
    "nome": "Paulcerpel - Grupo PS",
    "localidade": "Fajões",
    "telefone": "256 842 176",
    "zonas": "Todo o distrito de Aveiro",
    "tags": "distrito de Aveiro, Entre Douro e Vouga, norte, centro",
    "email": "rui.santos@grupo-ps.pt",
    "contacto": "Rui Santos / 913 383 844"
  },
  {
    "nome": "Quebrarco - Carvão",
    "localidade": "Vila Praia de Âncora",
    "telefone": "964 585 573",
    "zonas": "Vila Praia de Âncora e todo o distrito de Viana do Castelo",
    "tags": "Minho, distrito de Viana do Castelo, Alto Minho, norte",
    "email": "info@quebrarco.com",
    "contacto": "Pedro / 964 585 573"
  },
  {
    "nome": "Reconco Lda",
    "localidade": "Bragança",
    "telefone": "273 312 841",
    "zonas": "Bragança",
    "tags": "Trás-os-Montes, distrito de Bragança, nordeste, norte",
    "email": "comercial01@reconco.pt",
    "contacto": "Fabio Domingues / 933 037 309"
  },
  {
    "nome": "Sequeira & Duarte Lda",
    "localidade": "Silves",
    "telefone": "282 443 782",
    "zonas": "Portimão, Alvor, Lagos, Silves, Monchique e toda a zona até Albufeira",
    "tags": "Algarve, distrito de Faro, barlavento, sul",
    "email": "geral@sequeiraeduarte.pt",
    "contacto": "Carlos Sequeira / 966 958 368"
  },
  {
    "nome": "Sodigás S.A. - Loures",
    "localidade": "Loures",
    "telefone": "219 407 570",
    "zonas": "Toda a cidade de Lisboa, zona norte de Lisboa até Alverca, Loures, Odivelas",
    "tags": "grande Lisboa, distrito de Lisboa",
    "email": "ja.silva@rubisenergia.pt",
    "contacto": "João Silva / 915 758 265"
  },
  {
    "nome": "Supermaco Lda",
    "localidade": "Tábua",
    "telefone": "235 413 148",
    "zonas": "Tábua",
    "tags": "distrito de Coimbra, Beira Serra, centro",
    "email": "geral@supermaco.pt",
    "contacto": "João / 961 268 569"
  },
  {
    "nome": "Torrefação M. C. Oureana",
    "localidade": "Ourém",
    "telefone": "249 542 290",
    "zonas": "Ourém, Fátima",
    "tags": "distrito de Santarém, Fátima, Médio Tejo, centro",
    "email": "oureana.geral@sapo.pt",
    "contacto": "Rui Ferreira / 919 359 765"
  },
  {
    "nome": "Guilherme Casinha",
    "localidade": "Lagos",
    "telefone": "966 616 858",
    "zonas": "Toda a zona entre Sagres e Portimão",
    "tags": "Algarve, distrito de Faro, barlavento, Costa Vicentina, sul",
    "email": "guilhermecasinha1@gmail.com",
    "contacto": "Guilherme Casinha / 966 616 858"
  },
  {
    "nome": "JDA Gás Unip. Lda",
    "localidade": "Guarda",
    "telefone": "271 082 220",
    "zonas": "Cidade da Guarda e arredores + Sabugal",
    "tags": "distrito da Guarda, Beira Interior, Serra da Estrela, centro",
    "email": "jdagas.loja@gmail.com",
    "contacto": "David / 927 967 898"
  },
  {
    "nome": "Charrua do Mondego",
    "localidade": "Penacova",
    "telefone": "969 748 391",
    "zonas": "Penacova",
    "tags": "distrito de Coimbra, Vale do Mondego, Beira Litoral, centro",
    "email": "charruadomondego@gmail.com",
    "contacto": "969 748 391"
  },
  {
    "nome": "Agro-Penacovense",
    "localidade": "Penacova",
    "telefone": "916 137 278",
    "zonas": "Penacova",
    "tags": "distrito de Coimbra, Vale do Mondego, Beira Litoral, centro",
    "email": "agro-penacovense@sapo.pt",
    "contacto": "Nuno Luis / 916 137 278"
  },
  {
    "nome": "Bruno Trindade (Frutyalva)",
    "localidade": "São Pedro d'Alva",
    "telefone": "962 304 195",
    "zonas": "São Pedro d'Alva",
    "tags": "distrito de Coimbra, Tábua, Vale do Alva, centro",
    "email": "frutyalva@gmail.com",
    "contacto": "Bruno / 962 304 195"
  },
  {
    "nome": "Agropet Pampilhosa",
    "localidade": "Pampilhosa",
    "telefone": "910 182 276",
    "zonas": "Pampilhosa",
    "tags": "distrito de Aveiro, Mealhada, Bairrada, centro",
    "email": "pampilhosaagropet@gmail.com",
    "contacto": "Sónia / 910 182 276"
  },
  {
    "nome": "Bricopesca",
    "localidade": "Vila Nova de Poiares",
    "telefone": "912 918 929",
    "zonas": "Vila Nova de Poiares",
    "tags": "distrito de Coimbra, Vale do Ceira, centro",
    "email": "bricopescapoiares@hotmail.com",
    "contacto": "912 918 929"
  }
];
