var END = 0;
var PLAY = 1;
var gameState = PLAY;
var moon;
var distance = 0;
var moon , moonImg;
var gameOver, gameOverImage, pathImg, path, aladdin, aladdinimg, changeimg, mirror, mirrorimg;
var star;
var totalstars=0,starGroup;
var soldier, soldierImage;
function preload(){

  pathImg = loadImage("images/sky3.jpg");
  gameOverImage = loadImage("images/gameOver.png");
  //aladdinimg = loadImage("images/aladdin.png");

  aladdinimg = loadImage("images/alladin.gif");
  changeimg = loadImage("images/alladin2.gif");

  changeimg2 = loadImage("images/alladin3.gif");
  changeimg3 = loadImage("images/alladin4.gif");
  changeimg4 = loadImage("images/alladin5.gif");
  changeimg5 = loadImage("images/alladin6.gif");
  changeimg6 = loadImage("images/alladin7.gif");


  mirrorimg = loadImage("images/mirror.gif");
  starimg=loadImage("images/star2.gif")
  moonImg = loadImage("images/moon.png")
  soldierImage= loadImage("images/soldier.gif");
}

function setup(){
  
createCanvas(displayWidth-25,displayHeight-180);
  
path = createSprite(0,350);
path.addImage(pathImg);
path.x = path.width/2
path.scale=1.8;

aladdin  = createSprite(0, 0, 20, 20);
aladdin.addImage( aladdinimg);
//aladdin.addAnimation( changeimg);
//aladdin.addAnimation( changeimg2);
/*aladdin.addAnimation("aladdin3", changeimg3);
aladdin.addAnimation("aladdin4", changeimg4);
aladdin.addAnimation("aladdin5", changeimg5);
aladdin.addAnimation("aladdin6", changeimg6);
aladdin.addAnimation("aladdin7", changeimg7);*/
aladdin.scale = 0.6;
aladdin.debug=true
//aladdin.setCollider("rectangle",0,0,300,300) 
aladdin.setCollider("rectangle",0,0,1,100);
moon= createSprite(displayWidth-400,100);
moon.addImage(moonImg);
moon.scale=0.5;
 
soldier = createSprite(displayWidth, displayHeight-300);

soldier.addImage(soldierImage);
soldier.scale = 0.5;
mirrorGroup = new Group();
//spawnStars=new Group();

gameOver = createSprite(camera.position.x+570, displayHeight-450);

gameOver.addImage(gameOverImage);

  gameOver.scale = 0.5;
  gameOver.visible = false;
  
starGroup = new Group();
}

function draw(){

  background("white");

  drawSprites();
  textSize(20);
  fill(255);
  text("☁: "+ distance, camera.position.x,50);
  text("⭐ : "+ totalstars,camera.position.x+300,50);

  spawnStars();

  if(gameState===PLAY){
    soldier.velocityX = -4;
    
    distance = distance + Math.round(getFrameRate()/60);
    
    aladdin.y = World.mouseY;
    
   
    camera.position.x = aladdin.x+500;
   
    path.velocityX = -4;
    
    if(path.x < 0 ){

      path.x = width/2;

    }

    //aladdin.changeAnimation("player", aladdinimg);
      
    Mirror();

    if(mirrorGroup.isTouching(aladdin)){
      var rand = Math.round(random(1,7));
    
       console.log(rand);
       switch(rand)
       {
         case 1: aladdin.addImage( aladdinimg);
                break;
        case 2: aladdin.addImage(changeimg2);
                break;
        case 3: aladdin.addImage(changeimg3);
                break;
        case 4: aladdin.addImage(changeimg4);
                break;
        case 5: aladdin.addImage(changeimg5);
                break;
        case 6: aladdin.addImage(changeimg6);
                break;
        case 7: aladdin.addImage(changeimg);
                break;
       }
      //gameState = END;
      
    }
    if(starGroup.isTouching(aladdin))
    {
      totalstars=totalstars+1;
      starGroup.destroyEach();
      console.log("star touched");
    }

  }
    
  else if(gameState === END){

    gameOver.visible = true;

    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", camera.position.x-100,displayHeight-500);
   
    aladdin.changeAnimation("bone", changeimg);

    path.velocityX = 0

    mirrorGroup.destroyEach();
    
    if(keyDown("UP_ARROW")) {

      reset();

    }

  }

}

function Mirror(){
  
  if(World.frameCount % 250 == 0){

    mirror = createSprite(displayWidth, random(displayHeight-240, displayHeight-750));
    mirror.addImage(mirrorimg);

    mirror.velocityX = -(10 + distance/100);
    mirror.scale = 1;
    mirror.setLifetime = 220;

    mirrorGroup.add(mirror);
    mirror.debug=true;
    mirror.setCollider("rectangle",0,0,1,100);
  }

}

function reset(){

  gameState = PLAY;
  gameOver.visible = false;
  
  distance = 0;

}

function spawnStars() {
  if (frameCount % 200 === 0) {
    star = createSprite(600,100,40,10);
    star.y = Math.round(random(10,300));
    star.addImage(starimg);
    star.scale = 0.5;
    star.velocityX = -3;
    //star.lifetime = 134;
    star.debug=true;
    starGroup.add(star);
    }
}
