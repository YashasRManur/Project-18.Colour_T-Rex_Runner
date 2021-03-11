var Play = 1;
var End = 0;
var gameState = Play;
var T_Rex, T_RexRun, T_RexEnd;
var Ground, GroundImg, BackGround, BGImg;
var Collider, Collider2;
var Cloud, CloudGroup, CloudImg;
var Sun, SunImg;
var Obstacle, ObstacleImg1, ObstacleImg2, ObstacleImg3, ObstacleImg4, ObstacleGroup;
var Score;
var GameOver, GameOverImg, Restare, RestartImg;
var JumpSound, EndSound;
function preload() {
T_RexRun = loadAnimation("assets/trex_1.png", "assets/trex_2.png", "assets/trex_3.png");
T_RexEnd = loadAnimation("assets/trex_collided.png");
GroundImg = loadImage("assets/ground.png");
CloudImg = loadImage("assets/cloud.png");
ObstacleImg1 = loadImage("assets/obstacle1.png");
ObstacleImg2 = loadImage("assets/obstacle2.png");
ObstacleImg3 = loadImage("assets/obstacle3.png");
ObstacleImg4 = loadImage("assets/obstacle4.png");
GameOverImg = loadImage("assets/gameOver.png");
BGImg = loadImage("assets/backgroundImg.png");
RestartImg = loadImage("assets/restart.png");
SunImg = loadImage("assets/sun.png");
JumpSound = loadSound("assets/sounds/jump.wav");
EndSound = loadSound("assets/sounds/collided.wav");
}
function setup() {
createCanvas(600, 400);
BackGround = createSprite(300, 150, 10, 10);
BackGround.addImage(BGImg);
BackGround.scale = 1.5;
Sun = createSprite(550, 50, 10, 10);
Sun.addImage(SunImg);
Sun.scale = 0.2;
T_Rex = createSprite(100, 350, 20, 50);
T_Rex.addAnimation("running", T_RexRun);
T_Rex.addAnimation("stopped", T_RexEnd);
T_Rex.scale = 0.2;
T_Rex.setCollider("rectangle", 0, 0, T_Rex.width - 5, T_Rex.height - 5)
Ground = createSprite(200, 400, 400, 20);
Ground.addImage(GroundImg);
Ground.x = Ground.width / 2;
GameOver = createSprite(300, 100);
GameOver.addImage(GameOverImg);
Restart = createSprite(300, 200);
Restart.addImage(RestartImg);
Restart.scale = 0.1;
Collider = createSprite(200, 350, 400, 10);
Collider.visible = false;
//Collider2 = createSprite(200, -10, 400, 5);
//Collider2.visible = false;
ObstacleGroup = createGroup();
CloudGroup = createGroup();
score = 0;
}
function draw() {
textSize(30);
if (gameState === Play) {
GameOver.visible = false;
Restart.visible = false;
Ground.velocityX = -(4 + 3 * score / 100)
score = score + Math.ceil(frameCount / 60);
if (score > 0 && score % 100 === 0) {
}
if (Ground.x < 0) {
Ground.x = Ground.width / 2;
}
T_Rex.velocityY = T_Rex.velocityY + 0.8;
if (keyDown("space") && T_Rex.y <= 320) {
JumpSound.play()
T_Rex.velocityY = -16;
}
spawnClouds();
spawnObstacles();
if (ObstacleGroup.isTouching(T_Rex)) {
EndSound.play();
gameState = End;
}
Ground.depth = T_Rex.depth;
}
else if (gameState === End) {
GameOver.visible = true;
Restart.visible = true;
T_Rex.changeAnimation("stopped", T_RexEnd);
Ground.velocityX = 0;
T_Rex.velocityY = 0
ObstacleGroup.setLifetimeEach(-1);
CloudGroup.setLifetimeEach(-1);
ObstacleGroup.setVelocityXEach(0);
CloudGroup.setVelocityXEach(0);
}
T_Rex.collide(Collider);
//T_Rex.bounceOff(Collider2);
if (mousePressedOver(GameOver)) {
reset();
}
drawSprites();
text("Score: " + score, 50, 50);
}
function reset() {
gameState = Play;
score = 0;
GameOver.visible = false;
Restart.visible = false;
ObstacleGroup.destroyEach();
CloudGroup.destroyEach();
T_Rex.changeAnimation("running", T_RexRun);
}
function spawnObstacles() {
if (frameCount % 60 === 0) {
Obstacle = createSprite(600, 290, 10, 40);
Obstacle.velocityX = -(6 + score / 100);
var X = Math.round(random(1, 2));
switch(X) {
case 1: Obstacle.addImage(ObstacleImg1);
break;
case 2: Obstacle.addImage(ObstacleImg2);
break;
//case 3: Obstacle.addImage(ObstacleImg3);
//break;
//case 4: Obstacle.addImage(ObstacleImg4);
//break;
}
Obstacle.scale = 0.5;
Obstacle.lifetime = 300;
ObstacleGroup.add(Obstacle);
}
}
function spawnClouds() {
if (frameCount % 80 === 0) {
Cloud = createSprite(600, 120, 40, 10);
Cloud.y = Math.round(random(50, 200));
Cloud.addImage(CloudImg);
Cloud.scale = 0.5;
Cloud.velocityX = -3;
Cloud.lifetime = 200;
Cloud.depth = T_Rex.depth;
T_Rex.depth = T_Rex.depth + 1;
CloudGroup.add(Cloud);
}
}