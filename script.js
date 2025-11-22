let palavrasCategorias = {
  1: ['FUSCA','GOL','UNO','ONIX','KA','FERRARI'],
  2: ['DEADPOOL','TITANIC','SHREK','TUBARAO'],
  3: ['BANANA','MACA','LARANJA','MORANGO'],
  4: ['CAMISA','VESTIDO','JAQUETA','TERNO']
};

let palavraAtual = "";
let letraLista = [];
let tabuleiro = [];
let tentadas = [];
let categoriaAtual = null;
let jogoAtivo = false;

const p = [...Array(6).keys()].map(i => document.getElementById("p"+i));

document.getElementById("btnGuess").onclick = () => {
  let inp = document.getElementById("inputLetra");
  let l = inp.value.toUpperCase();
  inp.value = "";
  tentar(l);
};

function selecionarCategoria(botao, categoria) {
    categoriaAtual = {
        carro: 1,
        filme: 2,
        frutas: 3,
        roupas: 4
    }[categoria];

    document.querySelectorAll(".categoria").forEach(b => {
        b.classList.remove("selecionado");
    });

    botao.classList.add("selecionado");

    iniciarNovoJogo();
}

function iniciarNovoJogo() {
  if (!categoriaAtual) return;

  const lista = palavrasCategorias[categoriaAtual];
  palavraAtual = lista[Math.floor(Math.random() * lista.length)];
  letraLista = palavraAtual.split("");
  tabuleiro = letraLista.map(() => "_");
  tentadas = [];
  jogoAtivo = true;

  atualizar();
  esconderPartes();
}

function atualizar() {
  document.getElementById("displayWord").textContent = tabuleiro.join(" ");

  document.getElementById("letrasTentadas").textContent =
    tentadas.length ? "Letras tentadas: " + tentadas.join(", ") : "Letras tentadas: —";
}

function tentar(l) {
  if (!jogoAtivo) return;
  if (!l || !/^[A-Z]$/.test(l)) return;
  if (tentadas.includes(l)) return;

  tentadas.push(l);

  if (letraLista.includes(l)) {
    letraLista.forEach((x, i) => { if (x === l) tabuleiro[i] = l; });
  } else {
    mostrarParte(tentadas.filter(t => !letraLista.includes(t)).length - 1);
  }

  atualizar();
  checar();
}

function checar() {
  if (!tabuleiro.includes("_")) {
    jogoAtivo = false;
    abrirModal("Você venceu!");
  }

  const erros = tentadas.filter(t => !letraLista.includes(t)).length;
  if (erros >= 6) {
    jogoAtivo = false;
    tabuleiro = [...letraLista];
    atualizar();
    abrirModal("Você perdeu!\nA palavra era: " + palavraAtual);
  }
}

function mostrarParte(i) {
  if (p[i]) p[i].classList.add("show");
}

function esconderPartes() {
  p.forEach(x => x.classList.remove("show"));
}

function abrirModal(texto) {
  document.getElementById("placarTexto").innerText = texto;
  document.getElementById("modalPlacar").style.display = "flex";
}

function fecharModal() {
  document.getElementById("modalPlacar").style.display = "none";
}
