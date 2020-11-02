
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup
var score
var survivalTime=0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
 monkey=createSprite(80,315,20,20);
 monkey.addAnimation("moving",monkey_running); 
 monkey.scale=0.1
  
ground = createSprite(400,350,900,10);
ground.velocityX=-4;  
ground.x=ground.width/2;
console.log(ground.x);  
  
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
  
}

function draw() {
  background(255);

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 100,50);
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(keyDown("space")) {
   monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.9;
  
  monkey.collide(ground);
  food();  
  spawnObstacles();
  
  if(obstaclesGroup.isTouching(monkey)){
  ground.velocityX = 0;
  monkey.velocityY = 0;
  obstaclesGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0);
  obstaclesGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
  }
  
drawSprites();
}
function food() {
 if (frameCount % 80 === 0) {
    var food = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.scale = 0.5;
    monkey.depth = banana.depth + 1;
    banana.velocityX = -5;
    banana.lifetime = 300;
    FoodGroup.add(banana);
  }
}

  function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacles = createSprite(200,400,20,20);
    obstacle.y = Math.round(random(390,400)); 
    obstacle.addImage(obstacleImage)
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
   }
  } 