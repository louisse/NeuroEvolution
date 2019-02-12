const G = 0.4;
const groundHeight = 25;

let population;
let pipes;

let score = 0;
let highScore = 0;

let speedSlider;
let showAllButton;
let saveBestBirdButton;
let aliveP;
let scoreP;
let highScoreP;
let generationP;
// const width = 600;
// const height = 400;

function setup() {
    createCanvas(600, 400);
    // noCanvas();
    initHtmlElements();
    resetPipes();
    // population = new Population(1);
    population = new Population(500);
    resetStorage();
}

function initHtmlElements() {
    //sliders
    speedSlider = createSlider(1, 20, 1, 1);
    //buttons
    showAllButton = createButton('show best', true);
    showAllButton.mousePressed(showHandle);
    saveBestBirdButton = createButton('save best bird');
    saveBestBirdButton.mousePressed(saveBestBirdHandle);
    //paragraphs
    generationP = createP('generation: 0');
    aliveP = createP('alive: 0');
    scoreP = createP('score: 0');
    highScoreP = createP('high score: 0');
}

function resetPipes() {
    pipes = new Pipes();
}

function resetStorage() {
    let gen = localStorage.getItem('flappy.gen');
    if (gen !== null) {
        gen = parseInt(gen, 10);
        for (let i = 1; i <= gen; i++) {
            localStorage.removeItem('flappy.bestbrain.gen.' + i);
        }
        localStorage.setItem('flappy.gen', '0');
    }
}

function draw() {
    drawStage();
    for (let i = 0; i < speedSlider.value(); i++) {
        population.update();
        pipes.update();
    }
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
    const value = showAllButton.value();
    showAllButton.value(value === 'false');
    if (value === 'false') {
        showAllButton.html('show best');
    } else {
        showAllButton.html('show all');
    }
}

function saveBestBirdHandle() {
    population.evaluate();
    localStorage.setItem('flappy.bestbrain', JSON.stringify(population.bestBird.brain));
}
