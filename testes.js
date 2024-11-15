function preload() {
  CastSound = loadSound("waterplop.mp3");
  ReelSound = loadSound("haleind.mp3");
}

// GLOBALE VARIABLER
//KASTE Global
const castThreshold = 10; // Tærskelværdi for acceleration
let canCast = true; // Holder styr på, om spilleren kan kaste
let previousZ = 0; // Gemmer den tidligere z-accelerationsværdi
let successMessage = ""; // Besked til succes
let lastCastTime = 0; // Tidspunkt for sidste kast
let vid;
let playing = true;

//HALE Global
let lineLength; // Startlængden af linjen
let lastRotationZ = 0; // Gemmer den tidligere rotationZ-værdi
const reelThreshold = 1; // Tærskelværdi for rotation
let startspil = false;

function setup() {
  //KASTE
  textSize(20);
  textAlign(CENTER, CENTER);

  // Start motion-sensoren med den ønskede threshold
  setupMotion(castThreshold);
  //HALE
  createCanvas(windowWidth, windowHeight);
  lineLength = height / 2; // Start med en halv linje
  background("white");

  //VIDEO
}

//KASTE

function draw() {
  background(255);
  text("Sving telefonen fremad for at kaste linen!", width / 2, height / 2);

  // Hvis der er en ny bevægelsesværdi
  if (motionSensor.hasNewValue) {
    let motion = motionSensor.get(); // Få de nyeste accelerationsværdier

    // Tjek om z-aksens acceleration overskrider threshold for at simulere et kast
    if (canCast) {
      let acceleration = motion.z - previousZ; // Beregn ændringen i z-aksens acceleration

      // Kun registrer kastet, hvis accelerationen er over threshold
      if (acceleration > castThreshold) {
        onCastDetected();
      }

      // Opdater previousZ med den nuværende z-accelerationsværdi
      previousZ = motion.z;
    }
  }

  // Hvis der er en succesbesked, vis den
  if (successMessage) {
    background("lightgreen"); // Indstil baggrunden til grøn
    text(successMessage, width / 2, height / 2 + 50); // Vis succesbesked
  }

  if (startspil == true) {
    background("white");
    stroke(144, 213, 255); // Linjens farve
    strokeWeight(4); // Linjens tykkelse

    // Tjek forskellen mellem den aktuelle og sidste rotationZ
    let rotationDifference = abs(rotationZ - lastRotationZ);

    // Hvis bevægelsen overstiger tærsklen, mindsker vi linjens længde
    if (rotationDifference > reelThreshold) {
      lineLength -= map(rotationDifference, reelThreshold, 180, 1, 5); // Justér disse værdier for at ændre hastigheden
      if (!ReelSound.isPlaying()) {
        ReelSound.play();
      }
    }

    // Begræns linjens længde til at være mindst 0
    lineLength = constrain(lineLength, 0, height);

    // Tegn linjen fra toppen af skærmen og nedad, afhængigt af lineLength
    line(width / 2, 0, width / 2, lineLength);

    // Opdater lastRotationZ til den aktuelle rotationZ
    lastRotationZ = rotationZ;
  }

  function touchStarted() {
    background("white");
    lineLength = height / 2; // Nulstil linjens længde til en halv linje ved berøring
  }
}

function onCastDetected() {
  console.log("Kast bevægelse registreret!");
  successMessage = "Linjen kastet!"; // Sæt succesbesked

  // Send en MQTT-besked her, hvis det ønskes

  // Sæt canCast til false for at starte ventetiden
  canCast = false;
  startspil = true;
  CastSound.play();

  // Vent i 5 sekunder, før spilleren kan kaste igen
  setTimeout(() => {
    canCast = true; // Tillad kast igen efter 5 sekunder
    successMessage = ""; // Ryd succesbesked
  }, 5000);
}

// Setup motion-sensor
function setupMotion(castThreshold) {
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceMotionEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
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
