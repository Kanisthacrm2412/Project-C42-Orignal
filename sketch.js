var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;
var blast;

var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   

  heading = createElement("h1");
  scoreboard = createElement("h1");
  
  
}

function draw() {
  background("#BDA297");

  //display Score and number of lifes

  if(gameState===1){
    gun.y=mouseY  

    if(keyWentDown("space")){

        shootBullet();

    }

    if(frameCount%120 === 0){

      drawblueBubble();

    }

    if(frameCount%140 === 0){

      drawredBubble();

    }
    
    scoreboard.html("Score: "+score);
    scoreboard.style('color:red');
    scoreboard.position(width-200,20);

    handleBubbleCollision(blueBubbleGroup);

    drawSprites();


  }
     
}

function shootBullet(){

  bullet = createSprite(gun.x,gun.y);
  
  bullet.velocityX = 80;
  bullet.addImage(bulletImg);
  bullet.scale = 0.07;
  bullet.lifetime = 350;
  
  bulletGroup.add(bullet);

}

function drawblueBubble(){

    bluebubble = createSprite(random(700,800),random(100,700));
    bluebubble.velocityX = -1;
    bluebubble.addImage(blueBubbleImg);
    bluebubble.scale = 0.07;
    bluebubble.lifetime = 400;

    blueBubbleGroup.add(bluebubble);

}

function drawredBubble(){

  redbubble = createSprite(random(700,800),random(100,700));
    redbubble.velocityX = -1;
    redbubble.addImage(redBubbleImg);
    redbubble.scale = 0.07;
    redbubble.lifetime = 400;

    redBubbleGroup.add(redbubble);

}
function handleBubbleCollision(bubbleGroup){

  if(life < 0){

      score=score+1;

    
  }

  if(bubbleGroup.collide(bulletGroup)){
    
    blast= createSprite(bullet.x,bullet.y);
    blast.addImage(blastImg);
    blast.scale = 0.2;
    blast.lifetime = 20;

    bulletGroup.destroyEach();
    bulletGroup.destroyEach();
    
  }

}

function handleGameOver(bubbleGroup){

  if(bubbleGroup.collide(backBoard)){

    life = life-1;

    bubbleGroup.destroyEach();

    if(life===0){

      gameState = 2;

      swal({

        title: 'Game Over',
        text: "Oops you lost the game...!!!",
        text: "Your score is "+ score,
        imageURL:
        "https://cdn.shopify"

      })

    }

  }

}
