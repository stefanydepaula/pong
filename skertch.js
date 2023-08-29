a//Variáveis da bolinha
let xbolinha = 300;
let ybolinha = 200;
let diametro = 15;
let raio = diametro / 2;

// Velocidade da bolinha
let velocidadeXbolinha = 6;
let velocidadeYbolinha = 6;

//Variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let LarguraRaquete = 10;
let AlturaRaquete = 90;

//Variáveis RaqueteOponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let LarguraRaqueteOponente = 10;
let AlturaRaqueteOponente = 90;

// Variáveis do placar
let meusPontos = 0;
let PontosOponente = 0;
let pontoMarcado = false;

// Sons do jogo
let Raquetada;
let ponto;
let trilha;

function preload () {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  Raquetada = loadSound("Raquetada.mp3");
}
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostrarBolinha();
  movimentoBolinha();
  verificacaoColisaoBorda();
  mostraRaquete(xRaquete, yRaquete); // Desenha a raquete do jogador
  movimentaMinhaRaquete(); // Move a raquete do jogador
  verificaColisaoRaquete(); // Verifica colisão com a raquete do jogador
 mostraRaquete(xRaqueteOponente, yRaqueteOponente); // Desenha a raquete do oponente
  movimentaRaqueteOponente(); // Move a raquete do oponente
  verificaColisaoRaqueteOponente(); // Verifica colisão com a raquete do oponente
// Mostra o placar
 textSize(24);
  fill(255);
  text(meusPontos, 20, 30);
  text(PontosOponente, width - 30, 30);

  function mostrarBolinha() {
  circle(xbolinha, ybolinha, diametro);
}

function mostraRaquete(x, y) {
  rect(x, y, LarguraRaquete, AlturaRaquete);
}

function movimentoBolinha() {
  xbolinha += velocidadeXbolinha;
  ybolinha += velocidadeYbolinha;
}

function verificacaoColisaoBorda() {
  if (xbolinha + raio > width) {
    if (!pontoMarcado) {
      meusPontos++; // Incrementa o placar do jogador apenas uma vez
      pontoMarcado = true;
      ponto.play();
    }
    velocidadeXbolinha *= -1;
  } else if (xbolinha - raio < 0) {
    if (!pontoMarcado) {
      PontosOponente++; // Incrementa o placar do oponente apenas uma vez
      pontoMarcado = true;
       ponto.play();
    }
    velocidadeXbolinha *= -1;
  } else {
    pontoMarcado = false; // Reseta o flag para marcar ponto se não houver colisão com bordas
  }
}

  if (ybolinha + raio > height || ybolinha - raio < 0) {
    velocidadeYbolinha *= -1;
  }
}

function movimentaMinhaRaquete() {
  // Verifica colisão com a borda superior
  if (yRaquete < 0) {
    yRaquete = 0;
  }

  // Verifica colisão com a borda inferior
  if (yRaquete + AlturaRaquete > height) {
    yRaquete = height - AlturaRaquete;
  }

  // Move a raquete do jogador com as teclas de seta
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}
function movimentaRaqueteOponente() {
  // Lógica para fazer a raquete do oponente seguir a bola
  let centroRaqueteOponente = yRaqueteOponente + AlturaRaqueteOponente / 2;
  if (centroRaqueteOponente < ybolinha - 10) {
    yRaqueteOponente += 3;
  } else if (centroRaqueteOponente > ybolinha + 10) {
    yRaqueteOponente -= 3;
  }

  // Verifica colisão com a borda superior
  if (yRaqueteOponente < 0) {
    yRaqueteOponente = 0;
  }

  // Verifica colisão com a borda inferior
  if (yRaqueteOponente + AlturaRaqueteOponente > height) {
    yRaqueteOponente = height - AlturaRaqueteOponente;
  }
}

function verificaColisaoRaquete() {
  if (xbolinha - raio < xRaquete + LarguraRaquete &&
    ybolinha - raio < yRaquete + AlturaRaquete &&
    ybolinha + raio > yRaquete) {
    velocidadeXbolinha *= -1;
    Raquetada.play();
  }
}

function verificaColisaoRaqueteOponente() {
  if (xbolinha + raio > xRaqueteOponente &&
    ybolinha - raio < yRaqueteOponente + AlturaRaqueteOponente &&
    ybolinha + raio > yRaqueteOponente) {
    velocidadeXbolinha *= -1;
     Raquetada.play();
  }
}