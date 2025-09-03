let tela = 0; // 0 para o campo, 1 para a cidade
let trator;
let tratorX, tratorY;
let arrastandoTrator = false;
let alimento;
let alimentoArrastavel = [];
let arrastandoAlimento = false;

function preload() {
  // Imagem real do trator
  trator = loadImage('https://i.imgur.com/gK9pMzv.png'); 
  // Imagem de exemplo para o alimento (você pode substituir)
  alimento = loadImage('https://i.imgur.com/eB0rQ8u.png'); 
  // Outras imagens (cenário, personagem, etc.) podem ser carregadas aqui
}

function setup() {
  createCanvas(800, 600);
  tratorX = width / 4;
  tratorY = height / 2;
  
  // Criar 3 alimentos arrastáveis
  for (let i = 0; i < 3; i++) {
    alimentoArrastavel.push({
      x: random(width/2 - 100, width/2 + 100),
      y: random(height/2 - 100, height/2 + 100),
      largura: 50,
      altura: 50
    });
  }
}

function draw() {
  background(220);
  
  if (tela === 0) {
    // Cenário do Campo
    desenhaCampo();
    
    // Trator Interativo
    image(trator, tratorX, tratorY, 100, 100);
    
    // Mensagem
    fill(0);
    textSize(24);
    textAlign(CENTER);
    text("Clique e arraste o trator para colher!", width/2, 50);

    // Se o trator for arrastado para a direita, muda de tela
    if (tratorX > width - 100) {
      tela = 1;
      // Reinicia a posição do trator para a próxima vez
      tratorX = width / 4; 
    }
    
  } else if (tela === 1) {
    // Cenário da Cidade
    desenhaCidade();
    
    // Alimentos Interativos
    for (let i = 0; i < alimentoArrastavel.length; i++) {
      let a = alimentoArrastavel[i];
      image(alimento, a.x, a.y, a.largura, a.altura);
    }
    
    // Mensagem
    fill(0);
    textSize(24);
    textAlign(CENTER);
    text("Arraste os alimentos para o prato!", width/2, 50);

    // Personagem e prato
    fill(255, 182, 193); // Cor de pele
    ellipse(width/2, height - 150, 80, 80); // Cabeça do personagem
    fill(150);
    rect(width/2 - 50, height - 80, 100, 10); // Mesa
    fill(200);
    ellipse(width/2, height - 90, 80, 30); // Prato
    
  }
}

function mousePressed() {
  // Se estiver na tela do campo
  if (tela === 0) {
    let d = dist(mouseX, mouseY, tratorX + 50, tratorY + 50);
    if (d < 50) {
      arrastandoTrator = true;
    }
  } 
  
  // Se estiver na tela da cidade
  else if (tela === 1) {
    for (let i = 0; i < alimentoArrastavel.length; i++) {
      let a = alimentoArrastavel[i];
      if (mouseX > a.x && mouseX < a.x + a.largura && mouseY > a.y && mouseY < a.y + a.altura) {
        arrastandoAlimento = true;
      }
    }
  }
}

function mouseReleased() {
  arrastandoTrator = false;
  arrastandoAlimento = false;
}

function mouseDragged() {
  if (tela === 0 && arrastandoTrator) {
    tratorX = mouseX - 50;
    tratorY = mouseY - 50;
  }
  
  if (tela === 1 && arrastandoAlimento) {
    // Encontre o alimento que está sendo arrastado
    for (let i = 0; i < alimentoArrastavel.length; i++) {
      let a = alimentoArrastavel[i];
      if (mouseX > a.x && mouseX < a.x + a.largura && mouseY > a.y && mouseY < a.y + a.altura) {
          a.x = mouseX - 25;
          a.y = mouseY - 25;
      }
    }
  }
}

function desenhaCampo() {
  // Fundo verde para o campo
  background(139, 195, 74);
  
  // Desenho de linhas de plantação (opcional)
  for (let i = 0; i < width; i += 50) {
    stroke(100, 150, 50);
    line(i, 0, i, height);
  }
  
  // Desenha um sol no céu
  noStroke();
  fill(255, 204, 0);
  ellipse(width - 100, 100, 80, 80);
  
  // Desenha um drone no céu para simbolizar tecnologia
  fill(100);
  rect(width - 150, 150, 50, 20);
  line(width - 125, 150, width - 125, 130);
}

function desenhaCidade() {
  // Fundo cinza para a cidade
  background(150, 150, 150);
  
  // Desenha prédios (retângulos)
  fill(100);
  rect(50, height - 200, 100, 200);
  rect(200, height - 300, 120, 300);
  rect(600, height - 250, 150, 250);
  
  // Desenha janelas
  fill(255, 255, 0);
  rect(70, height - 180, 20, 20);
  rect(70, height - 140, 20, 20);
}