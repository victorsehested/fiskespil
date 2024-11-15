function preload(){
  CastSound=loadSound("waterplop.mp3");
	ReelSound=loadSound("haleind.mp3");
	fisk=loadImage("tun.jpg");

}

const threshold = 10; // Acceleration threshold for casting
let canCast = true; // Determines if the player can cast
let previousZ = 0; // Tracks previous z-acceleration value
let successMessage = ""; // Message to display on successful cast
let isCasting = false; // State if the cast has been thrown
let lineLength = 20; // Vertical fishing line length
let fishCaught = false; // State if a fish is caught

// For orientation control of the line
let lineX, lineY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(20);
  textAlign(CENTER, CENTER);

  // Set initial line position
  lineX = width / 2;
  lineY = height / 4;

  setupMotion(threshold); // Initialize motion listener
}

function handleOrientation(event) {
  // Update gyroscope data
  alpha = event.alpha; // Rotation around z-axis (0 to 360)
  beta = event.beta; // Tilt front-to-back (-180 to 180)
  gamma = event.gamma; // Tilt left-to-right (-90 to 90)
}

function draw() {
  background(255);

  // Display instructions if line hasn't been cast
  if (!isCasting) {
    text("Sving telefonen fremad for at kaste linen!", width / 2, height / 2);
  }

  // Check for new motion data
  if (motionSensor.hasNewValue) {
    let motion = motionSensor.get();

    // Check z-acceleration to detect casting motion
    if (canCast) {
      let acceleration = motion.z - previousZ;
      if (acceleration > threshold) {
        onCastDetected(); // Cast detected
      }
      previousZ = motion.z; // Update z value
    }
  }

  // If casting is in progress, show the fishing line with ocean background
  if (isCasting) {
    drawFishingScene(); // Draw ocean and line

    // Check if line reaches the top to reset cast
    if (lineLength <= 0) {
      catchFish(); // Catch fish when line is fully reeled in
    }
  }

  // Show success message on fish catch
  if (fishCaught) {
    background('lightgreen');
    text("Tillykke, du har fanget en tun!", width / 2, height / 2);
    image(fisk, width / 2 - 50, height / 2 - 50, 100, 100);
  }
}

function onCastDetected() {
  console.log("Cast detected!");
  successMessage = "Linjen kastet!";
  isCasting = true;
  canCast = false; // Prevent further casting
  lineLength = height / 2; // Reset line length for fishing
  CastSound.play();
}

function drawFishingScene() {
  background(0, 0, 255); // Ocean background
  fill(255);

  // Draw the fishing line
  stroke(255);
  strokeWeight(4);
  line(lineX, 0, lineX, lineY + lineLength);

  // Update line position based on orientation if not caught
  if (!fishCaught && orientationSensor.hasNewValue) {

      // Map the gyroscope data to the canvas dimensions
  let x = map(gamma, -45, 45, 0, width); // Map gamma to x-coordinate
  let y = map(beta, -45, 45, 0, height); // Map beta to y-coordinate


    let gyro = orientationSensor.get();
    lineX = constrain(lineX + x, 0, width); // Horizontal movement
    lineLength = constrain(lineLength - y, 0, height); // Vertical reeling
  }
}

function catchFish() {
  fishCaught = true;
  setTimeout(() => {
    isCasting = false; // Reset to allow new cast
    canCast = true;
    fishCaught = false; // Reset fish catch state
    successMessage = "";
  }, 3000); // Show success message for 3 seconds
}

// Setup motion-sensor
function setupMotion(threshold) {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener("devicemotion", doMotion, false);
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener("devicemotion", doMotion, false);
  }
}

// Motion sensor handler
function doMotion(e) {
  motionSensor.hasNewValue = true;
  motionSensor.x = e.acceleration.x;
  motionSensor.y = e.acceleration.y;
  motionSensor.z = e.acceleration.z;
}

// Orientation setup
function setupOrientation() {
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener("deviceorientation", doOrientation, false);
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener("deviceorientation", doOrientation, false);
  }
}

// Orientation sensor handler
function doOrientation(e) {
  orientationSensor.hasNewValue = true;
  orientationSensor.alpha = e.alpha;
  orientationSensor.beta = e.beta;
  orientationSensor.gamma = e.gamma;
}
