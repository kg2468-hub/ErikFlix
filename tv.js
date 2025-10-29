// ===== MODO TV ERIKFLIX =====
// Navegação por controle remoto (setas e Enter)

let focoAtual = null;
let elementosNavegaveis = [];

function inicializarModoTV() {
  // Seleciona todos os itens interativos
  elementosNavegaveis = Array.from(document.querySelectorAll(
    ".filme, #assistir-btn, #fechar, .btn-fechar"
  ));

  if (elementosNavegaveis.length > 0) {
    focoAtual = 0;
    aplicarFoco();
  }

  document.addEventListener("keydown", controleTV);
}

function controleTV(e) {
  if (!focoAtual && focoAtual !== 0) return;

  const cols = 6; // nº de itens por linha em telas grandes
  const total = elementosNavegaveis.length;

  switch (e.key) {
    case "ArrowRight":
      focoAtual = (focoAtual + 1) % total;
      aplicarFoco();
      break;
    case "ArrowLeft":
      focoAtual = (focoAtual - 1 + total) % total;
      aplicarFoco();
      break;
    case "ArrowDown":
      focoAtual = Math.min(focoAtual + cols, total - 1);
      aplicarFoco();
      break;
    case "ArrowUp":
      focoAtual = Math.max(focoAtual - cols, 0);
      aplicarFoco();
      break;
    case "Enter":
      const alvo = elementosNavegaveis[focoAtual];
      if (alvo) alvo.click();
      break;
    case "Backspace":
    case "Escape":
      fecharModal();
      break;
  }
}

function aplicarFoco() {
  elementosNavegaveis.forEach(el => el.classList.remove("focado"));
  const alvo = elementosNavegaveis[focoAtual];
  if (alvo) {
    alvo.classList.add("focado");
    alvo.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  }
}

// inicializa o modo TV
document.addEventListener("DOMContentLoaded", inicializarModoTV);