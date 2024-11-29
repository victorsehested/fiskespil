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
  //background(0, 0, 0);
  textSize(50); 
  fill(255); 
  textAlign(CENTER);
  text('PUST', width/2, height/2+20);
  
  imageMode(CENTER);
  image(img, width/2, height/2, 200, 200);
  
  imageMode(CORNER);
  
  
 
  // indlæs mikrofon level
  sender(amplitude.getLevel());
  

}
