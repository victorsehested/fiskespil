function setup() {
}


function draw() {
    if (orientationSensor.hasNewValue){
        let gyro = orientationSensor.get(); //skriver nye sensor data
        let a = gyro.gamma;
        let b = gyro.beta;
        let c = gyro.alpha;
    }
}

function mouseClicked() {
    setupOrientation();
    setupMotion();
}