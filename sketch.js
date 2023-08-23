var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
var score = 0
var starImg,star, starsGroup;


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  starImg =loadImage("hp_gold_star.png")
  
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;


  //make ghost and add picture to it, scale it accordingly

  ghost=createSprite(300, 300)
  ghost.addImage("ghost ", ghostImg)
  ghost.scale=0.35;


  climbersGroup = createGroup()
  doorsGroup = createGroup()
  invisibleBlockGroup=createGroup()
  starsGroup=createGroup()

  spookySound.play();
  
}

function draw() {
  spookySound.setVolume(0.2)
  background(200);
  drawSprites()
  fill("red")
  stroke("white")
  textSize(20)
  text("SCORE : "+score,30,30)
  
  if(gameState=="play"){
    if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("RIGHT")){
      ghost.x=ghost.x+10
    }

    if(keyDown("LEFT")){
      ghost.x=ghost.x+-10
    }

    if(keyDown("UP")){
      ghost.velocityY=-10;
    }

    ghost.velocityY= ghost.velocityY+1;

    ghost.collide(climbersGroup)

    ghostDIES()
    spawnDoors()

    for(var i=0;i<starsGroup.length;i++){
      if(ghost.isTouching(starsGroup[i])){
        score=score+1;
        starsGroup[i].destroy();

      }
    }
    

    
  }
  

  if(gameState=="end"){
    tower.velocityY=0;
    ghost.remove();
    doorsGroup.setVelocityYEach(0)
    climbersGroup.setVelocityYEach(0)
    invisibleBlockGroup.setVelocityYEach(0)
    starsGroup.setVelocityYEach(0)
     textSize(80)
    fill ("red")
    text("You Lost !", 150, 300)
  }
 

  

  
}

function spawnDoors(){
    if(frameCount%100==0 ){
      door=createSprite(random(50, 550), 0)
      door.addImage(doorImg)
      door.velocityY=3;
      doorsGroup.add(door)
      climber=createSprite(door.x, door.y+50)
      climber.addImage(climberImg)
      climber.velocityY=3
      climbersGroup.add(climber);
      
      star=createSprite(climber.x, climber.y-40)
      star.addImage(starImg)
      star.velocityY=3
      star.scale=0.05
      starsGroup.add(star)
      

      invisibleBlock= createSprite(climber.x, climber.y+20, climber.width-5,10);
      invisibleBlock.velocityY=3
      invisibleBlock.visible=false
      invisibleBlockGroup.add(invisibleBlock);

      
      

      ghost.depth=door.depth+1;
      
      
    }
    
}

function ghostDIES(){
  if (ghost.y>600 || ghost.isTouching(invisibleBlockGroup)){
   

    gameState="end"
  
  }
}
