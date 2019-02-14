const G = 0.4;
const groundHeight = 25;

let population;
let pipes;
let loadedBirdBrain;

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

function preload() {
    let load = localStorage.getItem('flappy.bestbirdbrain');
    if (load !== null) {
        loadedBirdBrain = JSON.parse(load);
    } else{
        loadedBirdBrain = loadJSON('bestBirdBrain.json');
    }
}

function setup() {
    createCanvas(600, 400);
    // noCanvas();
    initHtmlElements();
    resetPipes();
    resetStorage();
    population = new Population(200);
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
    generationP = createP('generation: 1');
    aliveP = createP('alive: 0 / 200');
    scoreP = createP('score: 0');
    highScoreP = createP('high score: 0 [1]');
}

function resetPipes() {
    pipes = new Pipes();
}

function resetStorage() {
    let gen = localStorage.getItem('flappy:gen');
    if (gen !== null) {
        gen = parseInt(gen, 10);
        for (let i = 1; i <= gen; i++) {
            localStorage.removeItem('flappy:bestbirdbrain:gen:' + i);
        }
        localStorage.setItem('flappy:gen', '1');
    }
}

function draw() {
    //update
    for (let i = 0; i < speedSlider.value(); i++) {
        population.update();
        pipes.update();
    }
    //render
    drawStage();
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
    localStorage.setItem('flappy:bestbirdbrain', JSON.stringify(population.bestBird.brain));
    saveJSON(population.bestBird.brain, 'bestBirdBrain.json', true);
}
