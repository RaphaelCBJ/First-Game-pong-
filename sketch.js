//Circle variables
let xCircle = 300;
let yCircle = 200;
let diameter = 20
let raio = diameter / 2 ;

// Speed Circle
let speedXCircle = 6;
let speedYCircle = 6;

// racket variables
let xRacket = 5;
let yRacket = 150;
let lengthRacket = 10;
let heightRacket= 90;

// CPU variables
let xCPURacket = 585;
let yCPURacket = 150;
let CPUYspeed;
let CPUfail = 0;

// Game Score
let myPoints = 0;
let CPUPoints = 0;

// Game Sound
let raquetada;
let ponto;
let trilha;

let colidiu = false;

function preload(){
  trilha = loadSound ("trilha.mp3");
  ponto = loadSound ("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(00);
  showCircle();
  Circlemove();
  CheckCollisionEdges();
  ShowRacket(xRacket, yRacket);
  Racketmove();
  //CheckCollisionRacket();
  ShowRacket(xCPURacket, yCPURacket);
  CPURacketmove();
  CheckCollisionRackets(xRacket, yRacket);
  CheckCollisionRackets(xCPURacket, yCPURacket);
  ShowScore();
  ScoredPoints();
  Circlebug();
  CalculateChanceOfError();
  //Player2();
 
  
}
function showCircle (){
  circle(xCircle, yCircle, diameter);
}

function Circlemove(){
  xCircle += speedXCircle;
  yCircle += speedYCircle;
}

function CheckCollisionEdges (){
    if (xCircle + raio> width || 
      xCircle - raio< 0){
    speedXCircle *= -1;    
  }
  if (yCircle + raio> height || 
      yCircle - raio< 0){
    speedYCircle *=-1;    
  }
}

function Circlebug (){
  if (xCircle - raio < 0){
    xCircle = 23
  }
}

function ShowRacket (x, y){
    rect(x, y, 
  lengthRacket, heightRacket);
}

function Racketmove (){
  if (keyIsDown(UP_ARROW) && yRacket > 0 ){
    yRacket -= 10;
      }
  if (keyIsDown(DOWN_ARROW)&& yRacket < 310){
    yRacket += 10;
      }
}

function CheckCollisionRacket(){
  if (xCircle - raio < xRacket +
      lengthRacket && yCircle - raio < yRacket + heightRacket && yCircle + raio > yRacket){
    speedXCircle *= -1;
    raquetada.play();
  }
}

function CheckCollisionRackets(x, y){
  colidiu=
  collideRectCircle(x, y, lengthRacket, heightRacket,xCircle,yCircle,raio);
  if (colidiu){
    speedXCircle *= -1;
    raquetada.play();
  }
}

function CPURacketmove(){
  CPUYspeed = yCircle - yCPURacket - lengthRacket / 2 -30;
  if (yCPURacket < 0 || yCPURacket > 300 && yCircle > 300 || yCircle < 0){
      }else{
    yCPURacket += CPUYspeed + CPUfail
    CalculateChanceOfError()
      }
  }

function Player2(){  
  if (keyIsDown(107)){     yCPURacket -= 10;      }
  if (keyIsDown(13)){     yCPURacket += 10;      }
  
}

function CalculateChanceOfError(){
  if (CPUPoints >= myPoints) {
    CPUfail +=1
  if (CPUfail >= 39){
    CPUfail = 40
  }
  } else {
    CPUfail -= 1
  if (CPUfail <= 35){
    CPUfail = 35
  }
  }
}

function ShowScore (){
  stroke(255);
  textAlign (CENTER)
  textSize (16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(myPoints, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text (CPUPoints, 470, 26);
}

function ScoredPoints(){
  if (xCircle > 590){
    myPoints += 1;
    ponto.play();
  }
  if (xCircle < 10){
    CPUPoints +=1;
    ponto.play();
  }
}