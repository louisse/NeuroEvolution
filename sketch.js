let population;
let pipes;
let G = 0.4;
let groundHeight = 25;
let speedSlider;
let showAllButton;
let score = 0;
let scoreP;
let highScore = 0;
let highScoreP;
let generationP;

function setup() {
    createCanvas(600, 400);
    speedSlider = createSlider(1, 20, 1, 1);
    showAllButton = createButton('show best', true);
    showAllButton.mousePressed(showHandle);
    generationP = createP('generation: 0');
    scoreP = createP('score: 0');
    highScoreP = createP('high score: 0');
    resetPipes();
    population = new Population(200);
}

function resetPipes() {
    pipes = new Pipes();
}

function draw() {
    drawStage();
    for (let i = 0; i < speedSlider.value(); i++) {
        population.update();
        pipes.update();
    }
    scoreP.html('score: ' + score);
    pipes.show();
    population.show();
}

function drawStage() {
    background(100, 100, 255);
    fill(155);
    noStroke();
    rect(0, height - groundHeight, width, height);
}

function showHandle() {
    let value = showAllButton.value();
    showAllButton.value(value === 'false');
    if (value === 'false') {
        showAllButton.html('show best');
    } else {
        showAllButton.html('show all');
    }
}
