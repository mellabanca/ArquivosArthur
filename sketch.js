var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var nuvem, imagem, grupodenuvens;
var obs1,obs2,obs3,obs4,obs5,obs6, grupodeobs;

var score;

var JOGAR = 1;
var ENCERRAR = 0;
var estado = JOGAR;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
 imagem=loadImage("cloud.png");
 obs1=loadImage("obstacle1.png");
 obs2=loadImage("obstacle2.png");
 obs3=loadImage("obstacle3.png");
 obs4=loadImage("obstacle4.png");
 obs5=loadImage("obstacle5.png");
 obs6=loadImage("obstacle6.png");
}

function setup() {

  createCanvas(600,200)
  
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //crie sprite ground (solo)
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  //crie um solo invisível
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  grupodeobs = new Group();
  grupodenuvens = new Group();

  score = 0;

  //gerar números aleatórios
  var rand =  Math.round(random(1,100))
  console.log(rand)

  trex.setCollider("circle",0,0,40);
  trex.debug = true;

}

function draw() {
  //definir cor do plano de fundo
  background("#cc9600");
  
console.log("Estado="+estado);

  //console.log(trex.y)
  
  fill("black");
  text("Pontuação:"+score, 500,40);

  if(estado === JOGAR){
    ground.velocityX = -4;
    score = score + Math.round(frameCount/60);
   
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    // pulando o trex ao pressionar a tecla de espaço
  if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -10;
  }

  trex.velocityY = trex.velocityY + 0.8;

    //Gerar Nuvens
    spawnClouds();
    obistaculo();

    //colisão com os obstáculos
    if(grupodeobs.isTouching(trex)){
      estado = ENCERRAR;
    }

  }else if (estado === ENCERRAR){
    ground.velocityX = 0;
    grupodeobs.setVelocityXEach(0);
    grupodenuvens.setVelocityXEach(0);
  }
//impedir que o trex caia
trex.collide(invisibleGround);
  drawSprites();
}

//função para gerar as nuvens
function spawnClouds(){
 //escreva seu código aqui
 if(frameCount % 60 === 0){
 nuvem=createSprite(600,100,40,10);
 nuvem.addImage(imagem);
 nuvem.y= Math.round(random(10,100));
 nuvem.velocityX=-3;
 nuvem.depth=trex.depth;
 trex.depth=trex.depth+1;

 grupodenuvens.add(nuvem);

 nuvem.lifetime = 250;
 }


}

function obistaculo(){
 if(frameCount % 60 === 0){
 var obs=createSprite(600,165,10,40);
 obs.velocityX=-6;
 var obss= Math.round(random(1,6));
   switch (obss) {
   case 1:obs.addImage(obs1);
   break;
   case 2:obs.addImage(obs2);
   break;
   case 3:obs.addImage(obs3);
   break;
   case 4:obs.addImage(obs4);
   break;
   case 5:obs.addImage(obs5);
   break;
   case 6:obs.addImage(obs6);
   break;
   default:
   break;
 }
 obs.scale=0.5;
 obs.lifetime=300;

 grupodeobs.add(obs);
 }
}
