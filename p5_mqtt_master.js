const threshold = 10;
let alfa = 0;
let beta = 0;
let val = 0;
let motionZ = 0;
let previousZ = 0;
let kastet = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill('yellow');
  textAlign(CENTER, CENTER);
  text('Tap to start sending sensor data', windowWidth / 2, windowHeight / 2);
}

function touchStarted() {
  setupOrientation();
  setupMotion();
}

function draw() {
  background(220);
  fill('yellow');
  textAlign(CENTER, CENTER);

  // Display data
  text(`alfa: ${alfa}`, width / 2, height / 2 - 30);
  text(`beta: ${beta}`, width / 2, height / 2);
  text(`gamma (val): ${val}`, width / 2, height / 2 + 30);
  sender(alfa,beta,val);
  // Check orientation data
  if (orientationSensor.hasNewValue) {
    alfa = orientationSensor.alpha; // Update global variables
    beta = orientationSensor.beta;
    val = orientationSensor.gamma;
    orientationSensor.hasNewValue = false; // Reset the flag
  }

  // Check motion data
  if (motionSensor.hasNewValue) {
    motionZ = motionSensor.z;
    let acceleration = motionZ - previousZ;

    // Detect cast motion
    if (acceleration > threshold) {
      kastet = true;
      sender(alfa, beta, val, kastet); // Send data
      background(200); // Visual feedback
      console.log("Fishing line cast!");
      kastet = false; // Reset cast state
    }

    previousZ = motionZ; // Update previousZ for the next frame
    motionSensor.hasNewValue = false; // Reset the flag
  }
}

// Motion sensor setup
function setupMotion() {
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === 'granted') {
          window.addEventListener('devicemotion', handleMotion, false);
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener('devicemotion', handleMotion, false);
  }
}

// Orientation sensor setup
function setupOrientation() {
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation, false);
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener('deviceorientation', handleOrientation, false);
  }
}

// Handle motion data
function handleMotion(event) {
  motionSensor.hasNewValue = true;
  motionSensor.z = event.acceleration.z || 0;
}

// Handle orientation data
function handleOrientation(event) {
  orientationSensor.hasNewValue = true;
  orientationSensor.alpha = event.alpha || 0;
  orientationSensor.beta = event.beta || 0;
  orientationSensor.gamma = event.gamma || 0;
}
