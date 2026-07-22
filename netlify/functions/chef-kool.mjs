/* Chef Kool — cérebro de IA (Netlify Function)
   Recebe o histórico da conversa do widget e responde via API da Anthropic
   com todo o conhecimento da marca embebido (conhecimento.mjs).
   Requer a variável de ambiente ANTHROPIC_API_KEY definida na Netlify. */

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
7. Segurança sempre: nunca acender com álcool ou gasolina; brasa em local ventilado; carvão nunca dentro de casa.`;

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

// PLANO B: se o Claude falhar (erro/429), tenta o Gemini — pelo MESMO gateway da
// Netlify (GEMINI_API_KEY + GOOGLE_GEMINI_BASE_URL injetados; sem chaves pessoais).
async function planoBGemini(system, mensagens, maxTokens) {
  const chave = process.env.GEMINI_API_KEY;
  const base = (process.env.GOOGLE_GEMINI_BASE_URL || "https://generativelanguage.googleapis.com").replace(/\/$/, "");
  if (!chave || !base) return null;
  try {
    const r = await fetch(`${base}/v1beta/models/gemini-2.5-flash:generateContent`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": chave },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: system }] },
        contents: mensagens.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: typeof m.content === "string" ? m.content : "" }],
        })),
        generationConfig: { maxOutputTokens: maxTokens },
      }),
    });
    if (!r.ok) { console.error("chef-kool: Gemini", r.status, (await r.text()).slice(0, 200)); return null; }
    const j = await r.json();
    const texto = (j?.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join("").trim();
    return texto ? texto.replace(/\*\*/g, "").replace(/(^|\s)\*(\S)/g, "$1$2") : null;
  } catch (e) {
    console.error("chef-kool: Gemini falha de rede", e);
    return null;
  }
}

// Modo de contingência: quando a IA não está disponível, o Chef Kool responde
// com os encaminhamentos essenciais em vez de um erro.
const CONTINGENCIA =
  "Estou a afiar as brasas e volto já! 🔥 Entretanto: no Manual do Grelhador (koolnature.pt/manual) tens tempos e temperaturas para tudo • Onde comprar: revendedores especializados por todo o país — vê a página de Produtos • Encomendas profissionais e revenda: página de Contactos. Até já, chef! 👨‍🍳";

// Proteção anti-abuso: limite por IP (janela deslizante) + teto diário global.
// Em memória por instância — best-effort, suficiente para travar floods e bots.
const IP_LIMITE = 8;            // pedidos por IP
const IP_JANELA_MS = 60_000;    // por minuto
const DIA_LIMITE = 400;         // teto de pedidos por instância e por dia
const baldeIp = new Map();
let diaTotal = 0;
let diaInicio = 0;

function excedeuLimites(ip) {
  const agora = Date.now();
  if (agora - diaInicio > 86_400_000) { diaInicio = agora; diaTotal = 0; }
  if (++diaTotal > DIA_LIMITE) return true;
  const recentes = (baldeIp.get(ip) ?? []).filter(t => agora - t < IP_JANELA_MS);
  recentes.push(agora);
  baldeIp.set(ip, recentes);
  if (baldeIp.size > 5000) baldeIp.clear(); // trava crescimento de memória
  return recentes.length > IP_LIMITE;
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

  const ip = context?.ip || req.headers.get("x-nf-client-connection-ip") || "?";
  if (excedeuLimites(ip)) return json({ erro: "Calma, chef! Muitos pedidos seguidos — tenta daqui a um minuto. 🔥" }, 429);

  const chave = process.env.ANTHROPIC_API_KEY;
  if (!chave) return json({ resposta: CONTINGENCIA });

  let corpo;
  try {
    corpo = await req.json();
  } catch {
    return json({ erro: "Pedido inválido" }, 400);
  }

  const historico = Array.isArray(corpo?.historico) ? corpo.historico : [];
  const mensagens = historico
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim()
    )
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1000) }));

  if (!mensagens.length || mensagens[mensagens.length - 1].role !== "user")
    return json({ erro: "Falta a pergunta" }, 400);

  // Netlify AI Gateway injeta ANTHROPIC_API_KEY + ANTHROPIC_BASE_URL;
  // uma chave própria definida no site sobrepõe-se e usa a API direta.
  const base = (process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com").replace(/\/$/, "");

  let resposta;
  try {
    const pedirClaude = () => fetch(`${base}/v1/messages`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": chave,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-8",
        max_tokens: 600,
        system: [
          { type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } },
        ],
        messages: mensagens,
      }),
    });
    resposta = await pedirClaude();
    // As rajadas de 429 do gateway duram ~1s — uma segunda tentativa resolve quase sempre.
    if (!resposta.ok && (resposta.status === 429 || resposta.status >= 500)) {
      console.error("chef-kool: Anthropic", resposta.status, "→ retry em 1.2s");
      await new Promise((res) => setTimeout(res, 1200));
      resposta = await pedirClaude();
    }
  } catch (e) {
    console.error("chef-kool: falha de rede para a Anthropic", e);
    const b = await planoBGemini(SYSTEM, mensagens, 600);
    return json({ resposta: b || CONTINGENCIA });
  }

  if (!resposta.ok) {
    console.error("chef-kool: Anthropic", resposta.status, await resposta.text());
    const b = await planoBGemini(SYSTEM, mensagens, 600);
    return json({ resposta: b || CONTINGENCIA });
  }

  const dados = await resposta.json();
  const texto = (dados.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();

  if (!texto) return json({ erro: "Sem resposta" }, 502);
  return json({ resposta: texto });
};

export const config = { path: "/api/chef-kool" };
