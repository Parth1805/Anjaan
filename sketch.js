
var check = 0;
var asteroid 
var bg,backgroundImg
var earthImg,earth
var asteroidImg1,asteroid,asteroidImg2,asteroid2
var spaceShipImg,spaceShip
var explosionImg
var visiblity=255
var score = 0


var End = 0
var Play = 1
var GameState=Play;


var asteroidGroup;
var bulletGroup;

function preload(){
  backgroundImg=loadImage("Images/Galaxy.jpg");
  earthImg=loadImage("Images/Earth2.png");
  asteroidImg1=loadImage("Images/Asteroid1.png");
  asteroidImg2=loadImage("Images/Asteroid2.png");
  spaceShipImg=loadImage("Images/Rocket.png");
  explosionImg=loadImage("Images/Explosion.png")
}


function setup() {
  createCanvas(displayWidth,displayHeight);
   earth=createSprite(displayWidth/2,displayHeight/2,400,400);
   spaceShip=createSprite(200,400,50,50);
   spaceShip.scale=0.1;

   earth.addImage(earthImg);
spaceShip.addImage(spaceShipImg);
 asteroidGroup = new Group();
 bulletGroup = new Group();
 //asteroid.addImage(asteroidImg);
 //asteroid2.addImage(asteroid2Img);
}

function draw() {
background(backgroundImg);


if(GameState===Play){
spaceShip.x=mouseX;
spaceShip.y=mouseY;
if(keyWentDown(32)){
  bullets();
  }
  for(var i=0; i<asteroidGroup.length;i++){
    if(asteroidGroup.get(i).isTouching(bulletGroup)){
      asteroidGroup.get(i).destroy();
  score += 5;
  console.log(score);
    }
  
  }
spawnObstacles();

for(var i = 0;i<asteroidGroup.length;i++){
  if(asteroidGroup.get(i).isTouching(spaceShip)){
    asteroidGroup.get(i).destroy();
    spaceShip.destroy();
    check=1
    GameState=End
  }
}

}

else if(GameState===End){
  if(check===1){
    push()
    visiblity-=5
    tint(255,visiblity);
    image(explosionImg,spaceShip.x,spaceShip.y,100,100)
    pop()
    
    fill("green");
    textSize(200)
    text("Game Over", 400, 200)
  
  }
}

textFont("Joker")
fill("red");
textSize(20);
text("SCORE: "+ score ,200,200);

  drawSprites();
}

function bullets(){
var bullet=createSprite(200,450,15,10)
bullet.depth=spaceShip.depth-1

bullet.x=spaceShip.x
bullet.y=spaceShip.y

bullet.shapeColor="red";
bullet.velocityY=-5;

bulletGroup.add(bullet);

}

function spawnObstacles(){
  if(frameCount %  70 === 0){
  var asteroid=createSprite(random(0,displayWidth),0,50,50);
  var rand = Math.round(random(1,2))
  asteroid.velocityY = 8 + 4*score;

  switch(rand){
    case 1 :asteroid.addImage(asteroidImg1);
    asteroid.x=random(displayWidth/2,displayWidth);
break;

   case 2:asteroid.addImage(asteroidImg2);
   asteroid.x=random(0,displayWidth/2);
   asteroid.scale=0.5
break;


  }
  asteroidGroup.add(asteroid);
  asteroid.lifetime = displayHeight/5

  }

}

