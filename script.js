// ===== ELEMENTOS PRINCIPAIS =====
const categoriasDiv = document.getElementById("categorias");
const bannerArea = document.getElementById("banner-destaque");
const bannerImg = document.getElementById("banner-imagem");
const bannerTitulo = document.getElementById("banner-titulo");
const bannerDescricao = document.getElementById("banner-descricao");
const assistirBtn = document.getElementById("assistir-btn");
const modal = document.getElementById("playerModal");
const player = document.getElementById("player");
const erroPlayer = document.getElementById("erroPlayer");
const tituloFilme = document.getElementById("tituloFilme");
const descricaoFilme = document.getElementById("descricaoFilme");
const fechar = document.getElementById("fechar");
const pesquisa = document.getElementById("pesquisa");
const suggestionsBox = document.getElementById("suggestions");

// ===== CAMPOS EXTRAS NO MODAL =====
const filmeAno = document.getElementById("filmeAno");
const filmeDuracao = document.getElementById("filmeDuracao");
const filmeResolucao = document.getElementById("filmeResolucao");

// ===== SELEÇÃO DE BANNERS =====
let banners = [];
filmes.forEach(item => {
  if (item.mostrarNoBanner) {
    const vezes = item.prioridade && item.prioridade > 1 ? item.prioridade : 1;
    for (let i = 0; i < vezes; i++) banners.push(item);
  }
});

if (banners.length === 0) {
  console.warn("⚠️ Nenhum item com mostrarNoBanner: true");
  banners = [filmes[0]];
}

// ===== FUNÇÃO DE ATUALIZAÇÃO DO BANNER =====
let bannerIndex = 0;
atualizarBanner(banners[bannerIndex]);

function atualizarBanner(item) {
  bannerImg.src = item.banner && item.mostrarNoBanner ? item.banner : item.capa;

  if (item.tipo === "anuncio") {
    bannerTitulo.textContent = "";
    bannerDescricao.textContent = "";
    assistirBtn.style.display = "none";
  } else {
    bannerTitulo.textContent = item.titulo;
    bannerDescricao.textContent = item.descricao;
    assistirBtn.style.display = "inline-block";
    assistirBtn.onclick = () => abrirPlayer(item);
  }
}

// ===== BANNER ROTATIVO AUTOMÁTICO =====
setInterval(() => {
  bannerIndex = (bannerIndex + 1) % banners.length;
  bannerImg.classList.remove("active");

  setTimeout(() => {
    atualizarBanner(banners[bannerIndex]);
    bannerImg.classList.add("active");
  }, 400);
}, 7000);

// ===== GERAR CATEGORIAS (com suporte a múltiplas) =====
function gerarCategorias(lista) {
  const apenasFilmes = lista.filter(f => f.tipo === "filme");

  // Coleta categorias únicas
  const todasCategorias = [];
  apenasFilmes.forEach(filme => {
    if (filme.categoria) {
      const categorias = filme.categoria.split(/[/,]/).map(c => c.trim());
      categorias.forEach(cat => {
        if (cat && !todasCategorias.includes(cat)) todasCategorias.push(cat);
      });
    }
  });

  categoriasDiv.innerHTML = "";

  todasCategorias.forEach(cat => {
    const sec = document.createElement("section");
    sec.className = "categoria";
    sec.innerHTML = `<h3>${cat}</h3>`;

    const linha = document.createElement("div");
    linha.className = "linha-filmes";

    apenasFilmes.forEach(filme => {
      if (
        filme.categoria &&
        filme.categoria
          .split(/[/,]/)
          .map(c => c.trim().toLowerCase())
          .includes(cat.toLowerCase())
      ) {
        const card = document.createElement("div");
        card.className = "filme";

        // imagem da capa
        const img = document.createElement("img");
        img.src = filme.capa;
        img.alt = filme.titulo;

        img.onerror = () => {
          card.innerHTML = `
            <div class="erro">📷<br>Erro ao carregar a capa</div>
            <div class="info"><div class="titulo">${filme.titulo}</div></div>`;
        };

        // bloco de info
        const info = document.createElement("div");
        info.className = "info";

        const nome = document.createElement("div");
        nome.className = "titulo";
        nome.textContent = filme.titulo;

        // bloco de detalhes (ano, duração, resolução)
        const detalhes = document.createElement("div");
        detalhes.className = "detalhes";
        detalhes.textContent = `${filme.ano || "—"} • ${filme.duracao || "—"} • ${filme.resolucao || "—"}`;

        info.appendChild(nome);
        info.appendChild(detalhes);

        card.appendChild(img);
        card.appendChild(info);

        card.onclick = () => abrirPlayer(filme);
        linha.appendChild(card);
      }
    });

    sec.appendChild(linha);
    categoriasDiv.appendChild(sec);
  });
}
gerarCategorias(filmes);

// ===== PLAYER =====
function abrirPlayer(filme) {
  if (filme.tipo === "anuncio") return;

  tituloFilme.textContent = filme.titulo;
  descricaoFilme.textContent = filme.descricao;
  erroPlayer.style.display = "none";

  filmeAno.textContent = filme.ano || "";
  filmeDuracao.textContent = filme.duracao || "";
  filmeResolucao.textContent = filme.resolucao || "";

  player.src = `https://drive.google.com/file/d/${filme.id}/embedded`;

  setTimeout(() => {
    if (!player.contentWindow || !filme.id) {
      erroPlayer.style.display = "block";
    }
  }, 5000);

  modal.style.display = "flex";
}

// ===== FECHAR PLAYER =====
fechar.onclick = () => fecharModal();
modal.onclick = e => { if (e.target === modal) fecharModal(); };

function fecharModal() {
  player.src = "";
  erroPlayer.style.display = "none";
  modal.style.display = "none";
}

// ===== SUGESTÕES DE BUSCA =====
function atualizarSugestoes(termo) {
  const searchTerm = termo.toLowerCase();
  const matches = filmes
    .filter(f =>
      f.tipo === "filme" &&
      f.titulo &&
      f.titulo.toLowerCase().includes(searchTerm)
    )
    .slice(0, 5);

  if (matches.length === 0 || !searchTerm) {
    suggestionsBox.style.display = "none";
    suggestionsBox.innerHTML = "";
    return;
  }

  suggestionsBox.innerHTML = matches.map(f => `
    <button onclick="selecionarSugestao('${escapeJS(f.titulo)}')">
      ${f.titulo}
    </button>
  `).join("");

  suggestionsBox.style.display = "block";
}

function selecionarSugestao(titulo) {
  const filmeEscolhido = filmes.find(f => f.titulo === titulo);
  if (filmeEscolhido) abrirPlayer(filmeEscolhido);

  pesquisa.value = "";
  suggestionsBox.style.display = "none";
  suggestionsBox.innerHTML = "";

  if (bannerArea) bannerArea.style.display = "";
  gerarCategorias(filmes);
}

function escapeJS(str) {
  return str.replace(/["'\\]/g, s => "\\" + s);
}

// ===== PESQUISA =====
pesquisa.addEventListener("input", e => {
  const termo = e.target.value.toLowerCase().trim();

  if (bannerArea) bannerArea.style.display = termo.length > 0 ? "none" : "";

  atualizarSugestoes(termo);

  const filtrados = filmes.filter(f =>
    f.tipo === "filme" &&
    (
      (f.titulo && f.titulo.toLowerCase().includes(termo)) ||
      (f.descricao && f.descricao.toLowerCase().includes(termo))
    )
  );

  gerarCategorias(filtrados.length ? filtrados : filmes);
});

document.addEventListener("click", e => {
  const dentroBusca = e.target.closest(".busca-wrapper");
  if (!dentroBusca) suggestionsBox.style.display = "none";
});