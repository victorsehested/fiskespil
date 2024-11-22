let a = 0;
let b = 0;
let c = 0;
let motionZ = 0;
const threshold = 10;
//let string = 'Hej jeg virker';


function setup() {
}

function draw() {
    if (orientationSensor.hasNewValue){
        let gyro = orientationSensor.get(); //skriver nye sensor data
        let a = gyro.gamma;
        let b = gyro.beta;
        let c = gyro.alpha;
    }
    if(motionSensor.hasNewValue){
        let motion = motionSensor.get();
        motionZ = motion.z;

    }
}

function mouseClicked() {
    sender();
    setupOrientation(threshold);
    setupMotion();

}