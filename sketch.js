var balloon,balloonImage1,balloonImage2;
var database;
var position;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);
  var balloonposition=database.ref("balloon/position")
  balloonposition.on("value",readPosition,showError)
  console.log(database);

  balloon=createSprite(250,450,150,150);
  balloon.scale=0.5;
  balloon.addAnimation("hotAirBalloon",balloonImage2);
  
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
   
    changePosition(-1,0);
    //write code to move air balloon in left direction
  }
  else if(keyDown(RIGHT_ARROW)){
    
    changePosition(1,0);
    //write code to move air balloon in right direction
  }
  else if(keyDown(UP_ARROW)){
  
    changePosition(0,-1);
    //write code to move air balloon in up direction
  }
  else if(keyDown(DOWN_ARROW)){
    
    changePosition(0,1);
    //write code to move air balloon in down direction
  }
  

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
  text("The arrow keys move the balloon in the same direction they are in ",40,60);
  text("Press the letter A and the space bar to increase or decrease the size of the balloon",40,80);
}

function changePosition(x,y){
  database.ref('balloon/position').set({
    'x':position.x+x,
    'y':position.y+y
  })
}
function readPosition(data){
  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;
}
function showError(){
  console.log("error");
}
function keyPressed(){ 
  if(keyCode==32&&balloon.scale>0){
   balloon.scale=balloon.scale-0.1;
   } 
  if(keyCode===65){
    balloon.scale=balloon.scale+0.1
  }
}
function update(position){
database.ref('/').update({balloon:position})
}

  
  

