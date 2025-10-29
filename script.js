// ===== ELEMENTOS PRINCIPAIS =====
const categoriasDiv = document.getElementById("categorias");
const bannerArea = document.getElementById("banner-area"); // NOVO
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
const suggestionsBox = document.getElementById("suggestions"); // NOVO

// ===== SELEÇÃO CONTROLADA DE BANNERS =====
let banners = [];

// adiciona os itens que devem aparecer no banner e respeita a prioridade
filmes.forEach(item => {
  if (item.mostrarNoBanner) {
    const vezes = item.prioridade && item.prioridade > 1 ? item.prioridade : 1;
    for (let i = 0; i < vezes; i++) banners.push(item);
  }
});

// fallback se não houver nenhum marcado como banner
if (banners.length === 0) {
  console.warn("⚠️ Nenhum item foi marcado com mostrarNoBanner: true");
  banners = [filmes[0]];
}

// ===== FUNÇÃO DE ATUALIZAÇÃO DO BANNER =====
let bannerIndex = 0;
atualizarBanner(banners[bannerIndex]);

function atualizarBanner(item) {
  bannerImg.src = item.capa;

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
}, 6000);

// ===== GERAR CATEGORIAS =====
function gerarCategorias(lista) {
  // Filtra apenas filmes (exclui anúncios)
  const apenasFilmes = lista.filter(f => f.tipo === "filme");
  const categoriasUnicas = [...new Set(apenasFilmes.map(f => f.categoria))];
  categoriasDiv.innerHTML = "";

  categoriasUnicas.forEach(cat => {
    const sec = document.createElement("section");
    sec.className = "categoria";
    sec.innerHTML = `<h3>${cat}</h3>`;

    const linha = document.createElement("div");
    linha.className = "linha-filmes";

    apenasFilmes
      .filter(f => f.categoria === cat)
      .forEach(filme => {
        const card = document.createElement("div");
        card.className = "filme";

        const img = document.createElement("img");
        img.src = filme.capa;

        // fallback de capa quebrada
        img.onerror = () => {
          card.innerHTML = `
            <div class="erro">📷<br>Não foi possível carregar a capa</div>
            <p>${filme.titulo}</p>`;
        };

        const nome = document.createElement("p");
        nome.textContent = filme.titulo;

        card.appendChild(img);
        card.appendChild(nome);
        card.onclick = () => abrirPlayer(filme);

        linha.appendChild(card);
      });

    sec.appendChild(linha);
    categoriasDiv.appendChild(sec);
  });
}
gerarCategorias(filmes);

// ===== PLAYER =====
function abrirPlayer(filme) {
  if (filme.tipo === "anuncio") return; // anúncios não abrem player

  tituloFilme.textContent = filme.titulo;
  descricaoFilme.textContent = filme.descricao;
  erroPlayer.style.display = "none";

  // tenta carregar o vídeo
  player.src = `https://drive.google.com/file/d/${filme.id}/preview`;

  // checagem de erro (Drive com link inválido)
  setTimeout(() => {
    if (!player.contentWindow || player.src.includes("id_invalido") || player.src.trim() === "") {
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

// ===== SUGESTÕES DA BUSCA =====
// gera HTML da caixa de sugestões (máx 5 resultados)
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

// quando clico numa sugestão
function selecionarSugestao(titulo) {
  const filmeEscolhido = filmes.find(f => f.titulo === titulo);
  if (filmeEscolhido) {
    abrirPlayer(filmeEscolhido);
  }

  // limpa busca e restaura layout
  pesquisa.value = "";
  suggestionsBox.style.display = "none";
  suggestionsBox.innerHTML = "";

  if (bannerArea) bannerArea.style.display = ""; // traz de volta
  gerarCategorias(filmes);
}

// helper pra escapar aspas no onclick
function escapeJS(str) {
  return str.replace(/["'\\]/g, s => "\\"+s);
}

// ===== PESQUISA AVANÇADA =====
pesquisa.addEventListener("input", e => {
  const termo = e.target.value.toLowerCase().trim();

  // NOVO: esconder o banner quando existe texto
  if (bannerArea) {
    if (termo.length > 0) {
      bannerArea.style.display = "none";
    } else {
      bannerArea.style.display = "";
    }
  }

  // atualiza sugestões dinâmicas
  atualizarSugestoes(termo);

  // filtra apenas filmes que tenham título ou descrição válidos
  const filtrados = filmes.filter(f =>
    f.tipo === "filme" &&
    (
      (f.titulo && f.titulo.toLowerCase().includes(termo)) ||
      (f.descricao && f.descricao.toLowerCase().includes(termo))
    )
  );

  gerarCategorias(filtrados.length ? filtrados : filmes);
});

// se clicar fora da caixa de busca/sugestões, some o dropdown
document.addEventListener("click", e => {
  const dentroBusca = e.target.closest(".busca-wrapper");
  if (!dentroBusca) {
    suggestionsBox.style.display = "none";
  }
});