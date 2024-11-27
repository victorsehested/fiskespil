let mic;
let amplitude;
let img;
let bubbles = []; // array til flere bobler

function preload() {
  img = loadImage('bubble2.png'); // bubbles billede
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('black');
  
  // mikrofon input
  mic = new p5.AudioIn();
  mic.start();
  
  // amplitude input
  amplitude = new p5.Amplitude();
  amplitude.setInput(mic);
}

function draw() {
  //background(0, 0, 0); // transperant baggrund for fade-effect
  
  // indlæs mikrofon level
  let vol = amplitude.getLevel();
  /*
  // Check if volume exceeds threshold (for detecting blow)
  if (vol > 0.1) {
    let bubbleSize = map(vol, 0, 1, 50, 150); // lydvolumen mappes til bubblesize
    bubbles.push(new Bubble(random(width), height, bubbleSize)); // bobler starter random x i bunden af skærm
  }
  
  // Display and move each bubble
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].move();
    bubbles[i].display();
    
    // bobler væk fra skærmen fjernes 
    if (bubbles[i].y < -bubbles[i].size) {
      bubbles.splice(i, 1); //  bubbles slettes fra array
    }
  }
}

// Bubble class to create each bubble
class Bubble {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.ySpeed = random(-1, -3); // flyder op fart
    this.xSpeed = random(-1, 1);  // horisontal fart
  }
  
  // boblen bevæges
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  
  // boblen tegnes
  display() {
    imageMode(CENTER);
    image(img, this.x, this.y, this.size, this.size);
  }*/
}
