function preload() {
  Fish = loadImage("fish1.png");
  vid = createVideo("aquarium.mp4");
}

// GLOBALE VARIABLER
let vid; // Video
let playing = true;
let fishX; // Fiskens x-position
let fishY; // Fiskens y-position
let fishSpeed = 5; // Hastighed for fiskens bevægelse
let fishDirection = 1; // 1 betyder højre, -1 betyder venstre

function setup() {
  // Canvas
  createCanvas(windowWidth, windowHeight);

  // VIDEO
  vid.size(windowWidth, windowHeight);
  vid.volume(0);
  vid.loop();
  vid.hide(); // Skjul HTML-elementet, da vi vil tegne videoen i canvas

  //IMAGE
  // Start position for the fish
  fishX = width / 2; // Start midt på skærmen i x-aksen
  fishY = height / 2; // Start midt på skærmen i y-aksen
}

function draw() {
  // Tegn videoen som baggrund
  image(vid, 0, 0, width, height);

  // Hvis fisken bevæger sig mod højre, spejlvendes den
  if (fishDirection == 1) {
    push(); // Gem den nuværende transformation
    translate(fishX + Fish.width / 2, fishY); // Flyt koordinatsystemet til fiskens midte
    scale(-1, 1); // Spejlvend koordinatsystemet horisontalt
    image(Fish, -Fish.width / 2, -Fish.height / 2, 250, 150); // Tegn fisken spejlvendt
    pop(); // Gendan transformationen
  } else {
    image(Fish, fishX, fishY, 250, 150); // Tegn fisken normalt
  }

  // Bevæger fisken fra side til side
  fishX += fishSpeed * fishDirection; // Opdater fiskens x-position

  // Tjek om fisken rammer skærmkanten og vend retningen
  if (fishX + 250 > width || fishX < 0) {
    fishDirection *= -1; // Vend retningen
  }
}
