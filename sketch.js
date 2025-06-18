let patoX; // Posição X do pato
let patoY; // Posição Y do pato
let patoTamanho = 50; // Tamanho do pato (raio do círculo)

let pontuacao = 0;
let tempoRestante = 30; // Tempo inicial em segundos
let temporizador; // Variável para controlar o setInterval

let jogoAcabou = false;

function setup() {
  createCanvas(600, 400); // Cria uma tela de 600x400 pixels
  novoPato(); // Gera o primeiro pato

  // Inicia o temporizador que diminui o tempo a cada segundo
  temporizador = setInterval(function() {
    if (tempoRestante > 0 && !jogoAcabou) {
      tempoRestante--;
    } else if (tempoRestante === 0 && !jogoAcabou) {
      jogoAcabou = true;
      clearInterval(temporizador); // Para o temporizador
    }
  }, 1000); // 1000 milissegundos = 1 segundo
}

function draw() {
  background(135, 206, 235); // Cor de fundo azul claro (céu)

  if (!jogoAcabou) {
    // Desenha o pato
    fill(255, 255, 0); // Amarelo para o corpo do pato
    ellipse(patoX, patoY, patoTamanho * 2, patoTamanho * 1.5); // Corpo oval
    fill(0); // Preto para o olho
    ellipse(patoX + patoTamanho * 0.3, patoY - patoTamanho * 0.3, patoTamanho * 0.2); // Olho
    fill(255, 165, 0); // Laranja para o bico
    triangle(patoX - patoTamanho * 0.5, patoY + patoTamanho * 0.2,
             patoX - patoTamanho * 0.8, patoY + patoTamanho * 0.1,
             patoX - patoTamanho * 0.5, patoY + patoTamanho * 0.4); // Bico

    // Exibe a pontuação e o tempo
    fill(0); // Cor do texto
    textSize(24);
    text("Pontuação: " + pontuacao, 10, 30);
    text("Tempo: " + tempoRestante, 10, 60);
  } else {
    // Tela de Fim de Jogo
    fill(0);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("FIM DE JOGO!", width / 2, height / 2 - 30);
    textSize(32);
    text("Pontuação Final: " + pontuacao, width / 2, height / 2 + 20);
    textSize(20);
    text("Clique para jogar novamente", width / 2, height / 2 + 70);
  }
}

function mousePressed() {
  if (!jogoAcabou) {
    // Verifica se o clique do mouse está dentro do pato
    let distancia = dist(mouseX, mouseY, patoX, patoY);
    if (distancia < patoTamanho) {
      pontuacao++; // Aumenta a pontuação
      novoPato(); // Gera um novo pato
    }
  } else {
    // Reinicia o jogo se ele acabou e o usuário clicou
    reiniciarJogo();
  }
}

function novoPato() {
  patoX = random(patoTamanho, width - patoTamanho); // Posição X aleatória
  patoY = random(patoTamanho, height - patoTamanho); // Posição Y aleatória
}

function reiniciarJogo() {
  pontuacao = 0;
  tempoRestante = 30;
  jogoAcabou = false;
  novoPato(); // Gera o primeiro pato novamente
  temporizador = setInterval(function() { // Reinicia o temporizador
    if (tempoRestante > 0 && !jogoAcabou) {
      tempoRestante--;
    } else if (tempoRestante === 0 && !jogoAcabou) {
      jogoAcabou = true;
      clearInterval(temporizador);
    }
  }, 1000);
}