class Population {
    constructor(size) {
        this.popSize = size;
        this.generation = 1;
        this.birds = [];
        if (Object.entries(loadedBirdBrain).length !== 0) {
            this.birds[0] = new Bird();
            this.birds[0].brain = NeuralNetwork.fromJSON(loadedBirdBrain);
            for (let i = 1; i < this.popSize; i++) {
                this.birds[i] = this.birds[0].clone();
                this.birds[i].brain.mutate();
            }
        } else {
            for (let i = 0; i < this.popSize; i++) {
                this.birds[i] = new Bird();
            }
        }
        this.bestBirdIndex = 0;
        this.fitnessSum = 0;
    }

    get bestBird() {
        return this.birds[this.bestBirdIndex];
    }

    show() {
        if (showAllButton.value() === 'true') {
            for (let i = 1; i < this.popSize; i++) {
                this.birds[i].show();
            }
        }
        this.birds[0].show();
    }

    update() {
        if (this.checkAllDead() === true) {
            this.evaluate();
            this.setNextGen();
            localStorage.setItem(bestBirdBrainPrefix + ':gen:' + this.generation, JSON.stringify(this.bestBird.brain));
            localStorage.setItem(generationPK, this.generation);
            resetPipes();
            if (score > highScore) {
                highScore = score;
                highScoreP.html('high score: ' + nfc(highScore + ' [' + this.generation + ']'));
            }
            score = 0;
            this.generation++;
            generationP.html('generation: ' + nfc(this.generation));
        }
        this.countAlive();
        for (const bird of this.birds) {
            bird.update();
        }
    }

    checkAllDead() {
        for (const bird of this.birds) {
            if (bird.isDead === false) {
                return false;
            }
        }
        return true;
    }

    countAlive() {
        let alive = 0;
        for (const bird of this.birds) {
            if (bird.isDead === false) {
                alive++;
            }
        }
        aliveP.html('alive: ' + nfc(alive) + ' / ' + nfc(this.popSize));
    }

    evaluate() {
        this.fitnessSum = 0;
        let sumFit = 0;
        let maxFitness = 0;
        for (let i = 0; i < this.popSize; i++) {
            this.birds[i].calculateFitness();
            sumFit += this.birds[i].fitness;
            if (maxFitness < this.birds[i].fitness) {
                maxFitness = this.birds[i].fitness;
                this.bestBirdIndex = i;
            }
        }
        sumFit = sumFit - this.bestBird.fitness + (this.bestBird.fitness * 2);
        this.bestBird.fitness *= 2;
        for (const bird of this.birds) {
            bird.fitness = bird.fitness / sumFit;
            this.fitnessSum += bird.fitness;
        }
    }

    setNextGen() {
        const nextGenBirds = [];
        for (let i = 1; i < this.popSize; i++) {
            let babyBird = this.selectParent().clone();
            babyBird.brain.mutate();
            nextGenBirds[i] = babyBird;
        }
        nextGenBirds[0] = this.bestBird.clone();
        this.bestBirdIndex = 0;
        this.birds = nextGenBirds;
    }

    selectParent() {
        const diceRoll = random(this.fitnessSum);
        let sum = 0;

        for (let bird of this.birds) {
            sum += bird.fitness;
            if (sum > diceRoll) {
                return bird;
            }
        }
    }
}
