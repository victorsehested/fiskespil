let isSending = true; // Tracks if motion data is being sent
let motionSensor = { x: 0, y: 0, z: 0, hasNewValue: false }; // Motion sensor data
let orientationSensor = { alpha: 0, beta: 0, gamma: 0, hasNewValue: false }; // Orientation sensor data
let swingTextDisplayed = false; // Tracks if the "swing" text is shown
let isFishing = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(20);
  textAlign(CENTER, CENTER);

  // Enable motion and orientation tracking
  setupMotion();
  setupOrientation();
}

function draw() {
  background(220); // Static light gray background for simplicity

  if (!swingTextDisplayed) {
    text("Swing your phone to cast the line!", width / 2, height / 2);
    swingTextDisplayed = true; // Ensure text is shown only once
  }

  // Simulate sending data if enabled
  if (isSending) {
    sendMotionAndOrientation();
  }
}

// Function to handle motion and orientation data sending
function sendMotionAndOrientation() {
  const dataToSend = {
    x: {
      motion: {
        x: motionSensor.x,
        y: motionSensor.y,
        z: motionSensor.z,
      },
      orientation: {
        beta: orientationSensor.beta, // Tilt forward/backward
        gamma: orientationSensor.gamma, // Tilt left/right
      },
    },
  };

  // Send only if there is new data
  if (motionSensor.hasNewValue || orientationSensor.hasNewValue) {
    sender(dataToSend);
    motionSensor.hasNewValue = false; // Reset flag
    orientationSensor.hasNewValue = false; // Reset flag
  }
}

// Motion event setup
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

// Orientation event setup
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

// Motion sensor handler
function handleMotion(event) {
  motionSensor.hasNewValue = true;
  motionSensor.x = event.acceleration.x || 0;
  motionSensor.y = event.acceleration.y || 0;
  motionSensor.z = event.acceleration.z || 0;
}

// Orientation sensor handler
function handleOrientation(event) {
  orientationSensor.hasNewValue = true;
  orientationSensor.alpha = event.alpha || 0; // Not used in this game
  orientationSensor.beta = event.beta || 0; // Forward/backward tilt
  orientationSensor.gamma = event.gamma || 0; // Left/right tilt
}

// Mock MQTT sender
function sender(data) {
  console.log("Sending data:", data);
}
