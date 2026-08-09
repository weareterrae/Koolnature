/* Chef Kool — cérebro de IA (Netlify Function)
   Recebe o histórico da conversa do widget e responde via Gemini (AI Gateway da Netlify)
   com todo o conhecimento da marca embebido (conhecimento.mjs).
   Requer a variável de ambiente GEMINI_API_KEY (injetada pelo gateway). */

import CONHECIMENTO from "./lib/conhecimento.mjs";

const SYSTEM = `És o Chef Kool 👨‍🍳🔥 — o chef de brasa oficial da EKOOLOGY, a marca de biocarvão da KoolNature (Aleatory Concept, Lda), de Penacova, Portugal.

COMO FALAS
- Por omissão em português de Portugal (nunca do Brasil). Se a pergunta vier em inglês ou noutra língua, responde nessa língua com a mesma qualidade.
- És um chef AMIGO ao lado da grelha, não um manual técnico: caloroso, entusiasta, com alegria de quem adora brasa e pessoas. Primeiro a pessoa, depois os números.
- ABRE sempre com uma frase simpática ligada ao que a pessoa perguntou ("Boa escolha!", "Robalo? Isso é jantar de respeito!", "Ah, essa é das minhas perguntas favoritas") — nunca comeces logo a despejar valores.
- Os números embrulhados em conversa: explica em frases corridas; usa lista com "•" só quando há 3 ou mais valores seguidos.
- FECHA com um toque humano: um incentivo, uma dica extra pequena ou uma pergunta ("Conta-me como correu!", "Queres uma sugestão de acompanhamento?", "Bora lá pôr isso ao lume 🔥").
- 3 a 8 linhas no total. 1–2 emojis bem escolhidos. Trata o utilizador por "tu".
- TEXTO SIMPLES, sem markdown: nada de **negritos**, _itálicos_, # títulos ou [links](). Só texto, quebras de linha e "•".

O QUE SABES (base de conhecimento oficial, a tua única fonte de factos sobre a marca):
${JSON.stringify(CONHECIMENTO)}

REGRAS
1. Respondes sobre: a marca EKOOLOGY/KoolNature, biocarvão, briquetes, pellets, onde comprar, distribuidores, grelhados, receitas, tempos, temperaturas internas, técnica e segurança na brasa.
2. Fora destes temas: recusa com simpatia numa frase e puxa a conversa de volta para a brasa.
3. Temperaturas e tempos: usa EXATAMENTE os valores da base de conhecimento. Peixe branco grande nunca acima de 57 °C; frango sempre 74 °C. Quando o alvo do chef está abaixo do mínimo USDA, menciona a temperatura de segurança.
4. Onde comprar: usa a lista de distribuidores da base de conhecimento — quando a pessoa disser a terra/zona, indica o distribuidor que a serve (nome, localidade e telefone). No Aldi, o carvão biológico BBQ tem a MARCA PRÓPRIA DO ALDI mas é produzido por nós — di-lo com orgulho ("também somos nós!"). REGRA CRÍTICA: se a zona da pessoa NÃO estiver coberta por nenhum distribuidor da lista, NÃO inventes — convida-a a contactar-nos por email (info@koolnature.pt) ou telemóvel (+351 925 969 526), que indicamos o ponto mais próximo. Diretório completo com pesquisa: koolnature.pt/contactos.html
5. Nunca inventes preços, moradas de lojas ou datas. Encomendas profissionais/revenda → página de Contactos (koolnature.pt).
6. Perguntas técnicas profundas sobre temperaturas/tempos → dá a resposta e aponta para a Estação do Chef, no Manual do Grelhador do site.
7. Segurança sempre: nunca acender com álcool ou gasolina; brasa em local ventilado; carvão nunca dentro de casa.

CAPTAÇÃO DE CONTACTO (representa a marca, não és só um FAQ)
   MODELO DE VENDA (facto): a KoolNature NÃO faz fornecimento direto nem entregas próprias — toda a venda passa pelos DISTRIBUIDORES da rede (e pelo Aldi). Nunca prometas entrega ou fornecimento direto da marca, nem preços.
8. Deteta INTENÇÃO comercial e ajuda a fechar o próximo passo, com naturalidade de anfitrião:
   - RESTAURANTE / HORECA / GRANDE CONSUMO (restaurante, churrasqueira, hotelaria, "X sacos por mês", "preço por grosso"): mostra o argumento profissional (rende mais 20-30%, brasa estável sem paragens no serviço, acende em 15-20 min e — por fazer muito menos fumo — deixa os filtros/hotte de extração muito mais limpos, logo menos limpezas e manutenção) e encaminha para o DISTRIBUIDOR da zona, que trata de preço e entrega. Se a zona estiver coberta, dá o distribuidor (nome+telefone); se não estiver clara, oferece recolher o contacto para a equipa indicar o distribuidor certo.
   - PARCEIRO DE NEGÓCIO (quer VENDER EKOOLOGY: revenda, distribuição, marca própria, exportação, agricultura/KOOLBIOCHAR): AÍ o contacto é direto com a marca — oferece recolher nome+contacto. Ex.: "Boa! Deixa-me o teu nome e um contacto (email ou telemóvel) que a nossa equipa te fala sobre parceria."
   - CONSUMIDOR cuja ZONA NÃO está coberta por distribuidor: oferece recolher o contacto — "Ainda não temos distribuidor aí, mas se me deixares nome e contacto, a equipa indica-te o ponto mais próximo."
9. QUANDO a pessoa CONCORDAR e te DER os dados (nome + email ou telemóvel), faz DUAS coisas:
   a) confirma com calor humano numa frase ("Ficou registado, {nome}! A equipa fala contigo em breve. 🔥");
   b) acrescenta, na ÚLTIMA linha e SÓ ela, EXATAMENTE este marcador (o site trata dele; NUNCA o expliques nem o mostres como texto normal):
      ⟦LEAD|nome|contacto|interesse⟧
      (interesse = uma palavra: Amostra, Cotação, Revenda, Distribuição, MarcaPropria, Exportacao, KOOLBIOCHAR, OndeComprar). Se faltar o nome OU o contacto, NÃO emitas o marcador — pede primeiro o que falta.
10. Não insistas nem forces: se a pessoa só quer aprender a grelhar, ajuda e pronto. O contacto é uma oferta simpática, nunca um obstáculo. Nunca peças mais dados do que nome + um contacto.`;

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

// PLANO A: Gemini (via gateway Netlify). Resiliente a soluços TRANSITÓRIOS da
// Google (503 sobrecarga / 429 / 5xx / timeout): repete com recuo antes de
// desistir, e aceita uma 2ª chave (GEMINI_API_KEY_2). Se ainda assim falhar, o
// handler cai para a rede de segurança (Claude). Devolve texto ou null.
// Modelos por ordem de preferência. gemini-2.5-pro foi RETIRADO pela Google
// ("no longer available to new users", 404), por isso usamos modelos atuais e,
// se um 404/falhar, passamos automaticamente ao seguinte.
const GEMINI_MODELOS = ["gemini-flash-latest", "gemini-2.0-flash"];
const GEMINI_TRANSITORIOS = new Set([408, 425, 429, 500, 502, 503, 504]);
const pausa = (ms) => new Promise((r) => setTimeout(r, ms));

async function planoBGemini(system, mensagens, maxTokens) {
  const base = (process.env.GOOGLE_GEMINI_BASE_URL || "https://generativelanguage.googleapis.com").replace(/\/$/, "");
  const chaves = [process.env.GEMINI_API_KEY, process.env.GEMINI_API_KEY_2].filter(Boolean);
  if (!chaves.length) return null;
  const corpo = JSON.stringify({
    system_instruction: { parts: [{ text: system }] },
    contents: mensagens.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: typeof m.content === "string" ? m.content : "" }],
    })),
    generationConfig: { maxOutputTokens: Math.max(maxTokens, 1024) },
  });
  for (const chave of chaves) {
    for (const modelo of GEMINI_MODELOS) {
      for (let tentativa = 0; tentativa < 3; tentativa++) {
        try {
          const r = await fetch(`${base}/v1beta/models/${modelo}:generateContent`, {
            method: "POST",
            headers: { "content-type": "application/json", "x-goog-api-key": chave },
            body: corpo,
          });
          if (!r.ok) {
            const err = new Error(`Gemini ${r.status}: ${(await r.text()).slice(0, 200)}`);
            err.status = r.status;
            throw err;
          }
          const j = await r.json();
          const texto = (j?.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join("").trim();
          if (texto) return texto.replace(/\*\*/g, "").replace(/(^|\s)\*(\S)/g, "$1$2");
          break; // resposta vazia → passa ao modelo seguinte
        } catch (e) {
          const transitorio = GEMINI_TRANSITORIOS.has(e.status) || e.name === "AbortError" || !e.status;
          console.error(`chef-kool: Gemini ${modelo} tentativa ${tentativa + 1} ·`, (e && e.message) || e);
          if (!transitorio) break; // permanente (ex.: 404 modelo retirado) → passa ao modelo seguinte
          if (tentativa < 2) await pausa(400 * (tentativa + 1)); // recuo: 400ms, 800ms
        }
      }
    }
  }
  return null;
}

// REDE DE SEGURANÇA: se o Gemini falhar, tenta o Claude (via gateway Netlify:
// ANTHROPIC_API_KEY + ANTHROPIC_BASE_URL injetados). Devolve texto ou null.
async function redeClaude(system, mensagens, maxTokens) {
  const chave = process.env.ANTHROPIC_API_KEY;
  if (!chave) return null;
  const base = (process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com").replace(/\/$/, "");
  const pedir = () => fetch(`${base}/v1/messages`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": chave, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: "claude-opus-4-8",
      max_tokens: maxTokens,
      system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
      messages: mensagens,
    }),
  });
  try {
    let r = await pedir();
    if (!r.ok && (r.status === 429 || r.status >= 500)) { await new Promise((s) => setTimeout(s, 1200)); r = await pedir(); }
    if (!r.ok) { console.error("chef-kool: Claude(rede)", r.status); return null; }
    const j = await r.json();
    const t = (j?.content || []).map((p) => p.text || "").join("").trim();
    return t || null;
  } catch (e) { console.error("chef-kool: Claude(rede) falha de rede", e); return null; }
}

// Modo de contingência: quando a IA não está disponível, o Chef Kool responde
// com os encaminhamentos essenciais em vez de um erro.
const CONTINGENCIA =
  "Estou a afiar as brasas e volto já! 🔥 Entretanto: no Manual do Grelhador (koolnature.pt/manual) tens tempos e temperaturas para tudo • Onde comprar: revendedores especializados por todo o país — vê a página de Produtos • Encomendas profissionais e revenda: página de Contactos. Até já, chef! 👨‍🍳";

// Proteção anti-abuso: limite por IP (minuto E hora) + teto diário global.
// Em memória por instância — best-effort, suficiente para travar floods e bots.
const IP_MIN = 18;             // pedidos por IP por minuto
const IP_HORA = 150;           // pedidos por IP por hora
const IP_JANELA_MS = 60_000;   // janela do minuto
const HORA_MS = 3_600_000;     // janela da hora
const DIA_LIMITE = 800;        // teto de pedidos por instância e por dia (backstop anti-runaway)
const baldeIp = new Map();     // ip -> lista de timestamps (última hora)
let diaTotal = 0;
let diaInicio = 0;

// devolve: "min" | "hora" | "dia" se excedeu, ou null se ok
function excedeuLimites(ip) {
  const agora = Date.now();
  if (agora - diaInicio > 86_400_000) { diaInicio = agora; diaTotal = 0; }
  if (++diaTotal > DIA_LIMITE) return "dia";
  const recentes = (baldeIp.get(ip) ?? []).filter(t => agora - t < HORA_MS);
  recentes.push(agora);
  baldeIp.set(ip, recentes);
  if (baldeIp.size > 5000) baldeIp.clear(); // trava crescimento de memória
  if (recentes.length > IP_HORA) return "hora";
  if (recentes.filter(t => agora - t < IP_JANELA_MS).length > IP_MIN) return "min";
  return null;
}

// Turnstile (Cloudflare) — camada EXTRA, NÃO-FATAL. Só bloqueia se houver SECRET
// E a flag TURNSTILE_ENFORCE=on. Sem a flag: verifica e regista, mas nunca bloqueia.
async function turnstileOk(token, ip) {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return true;                    // sem secret → camada desligada
  const enforce = process.env.TURNSTILE_ENFORCE === "on";
  if (!token) { if (enforce) return false; console.warn("chef-kool: turnstile sem token (modo suave)"); return true; }
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip && ip !== "?") body.set("remoteip", ip);
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
    const j = await r.json();
    if (!j.success) { console.warn("chef-kool: turnstile falhou", JSON.stringify(j["error-codes"] || [])); return enforce ? false : true; }
    return true;
  } catch (e) {
    console.error("chef-kool: turnstile erro de rede", e);
    return true; // erro de rede nunca deita o bot abaixo
  }
}

// Só aceitamos pedidos vindos do próprio site (regras de uso da Anthropic:
// o endpoint público não pode servir de API aberta a terceiros).
const ORIGENS = ["https://koolnature.pt", "https://www.koolnature.pt", "https://ekoology-preview.netlify.app", "http://localhost"];
const origemValida = (req) => {
  const o = req.headers.get("origin") || req.headers.get("referer") || "";
  return ORIGENS.some((p) => o.startsWith(p));
};

export default async (req, context) => {
  if (req.method !== "POST") return json({ erro: "Método não permitido" }, 405);
  if (!origemValida(req)) return json({ erro: "Origem não autorizada" }, 403);

  // Teto de tamanho do corpo (anti-flood de payloads gigantes) — 40 KB.
  const tamanho = Number(req.headers.get("content-length") || 0);
  if (tamanho > 40_000) return json({ erro: "Mensagem demasiado grande." }, 413);

  const ip = context?.ip || req.headers.get("x-nf-client-connection-ip") || "?";
  const limite = excedeuLimites(ip);
  if (limite) return json({ erro: "Calma, chef! Muitos pedidos seguidos — dá-me um instante e tenta de novo. 🔥" }, 429);

  if (!process.env.GEMINI_API_KEY && !process.env.ANTHROPIC_API_KEY) return json({ resposta: CONTINGENCIA });

  let corpo;
  try {
    corpo = await req.json();
  } catch {
    return json({ erro: "Pedido inválido" }, 400);
  }

  // Turnstile: camada extra não-fatal (só bloqueia com SECRET + ENFORCE=on).
  if (!(await turnstileOk(corpo?.turnstileToken, ip)))
    return json({ resposta: CONTINGENCIA }, 200);

  const historico = Array.isArray(corpo?.historico) ? corpo.historico : [];
  const mensagens = historico
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim()
    )
    .slice(-16)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1500) }));

  if (!mensagens.length || mensagens[mensagens.length - 1].role !== "user")
    return json({ erro: "Falta a pergunta" }, 400);

  let r = await planoBGemini(SYSTEM, mensagens, 600);     // principal: Gemini
  if (!r) r = await redeClaude(SYSTEM, mensagens, 600);   // rede de segurança: Claude
  return json({ resposta: r || CONTINGENCIA });
};

export const config = { path: "/api/chef-kool" };
