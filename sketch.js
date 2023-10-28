let img1; // start screen
let img2; // background screen
let img3; // end screen
let img4; // ship
let img5; // star
let img6; // instructions
let screen = 0; // This will control which screen is displayed during the game

// starting point of the star
let x = 200;
let y = -20;

// how fast the star falls from the top
let speed = 2;

// will keep track of the score
let score = 0;

// starting position of the ship
let shipX;

let showInstructions = false;

function preload(){
  img1 = loadImage("start_screen.png");
  img2 = loadImage("background_image.jpg");
  img3 = loadImage("endg.png");
  img4 = loadImage("ship.png");
  img5 = loadImage("star.png");
  img6 = loadImage("instructions.png");
}



function setup() {
  var canvas = createCanvas(800, 600); //this is div id for canvas.
  canvas.parent('Star'); //this attached the canvas to div id, star game.
  fill(255);
  textSize(20);
  shipX = width / 2; // Start the ship in the center of the screen
}



function draw() {
 if (showInstructions) {
    // background(255); // Clear the canvas
    image(img6, 0, 0, width, height); // Display instructions 
  } else if (screen === 0) {
    startScreen();
  } else if (screen === 1) {
    gameOn();
  } else if (screen === 2) { 
    endScreen();
  }
}

function startScreen() {
  background(img1);
  text("click (I) for instructions", 30, 40);
  reset();
}

function gameOn() {
  imageMode(CORNER);
  background(img2);
  text("Score = " + score, 30, 40);
  image(img5, x, y, 30, 30); // star
  imageMode(CENTER); 
  image(img4, shipX, 550, 90, 90); // ship
  imageMode(CORNER);

  y = y + speed; // moves the star down

  if (y > height) { 
    screen = 2; // if the star falls beyond the screen, change to screen 2
  }

  if (y > 550 && x > shipX - 45 && x < shipX + 45) {
    y = -20;
    speed = speed + 0.75;
    score = score + 1;
  }
  if (y === -20) {
    fallDown();
  }

  // move the ship
  if (keyIsDown(LEFT_ARROW) && shipX > 45) {
    shipX = shipX - 8; // Move the ship left
  }
  if (keyIsDown(RIGHT_ARROW) && shipX < width - 45) {
    shipX = shipX + 8; // Move the ship right
  }
}

//this is the range of the star falling on the sreen.
function fallDown() {
  x = random(100, 700);
}

function endScreen() {
  background(img3);
  text("Score = " + score, 360, 330);
}


function keyPressed() {
  if (keyCode === 32) { // 32 is the key code for the spacebar
    if (screen === 0) {
      screen = 1; // Start the game if it's on the start screen
      gameStarted = true; // Update gameStarted
    } else if (screen === 2) {
      reset(); // Reset the game if it's on the end screen
      screen = 1;
      gameStarted = true; // Update gameStarted
    }
  }
}

function reset() {
  score = 0;
  speed = 2;
  y = -20;
}

function keyTyped() {
  if (key == "i") {
    showInstructions = true;
  } else if (key == "r") {
    screen = 0;
    showInstructions = false;
  }
}
