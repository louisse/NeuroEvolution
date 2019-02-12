class Population {
    constructor(size) {
        this.popSize = size;
        this.generation = 0;
        this.birds = [];
        for (let i = 0; i < this.popSize; i++) {
            this.birds[i] = new Bird();
        }
        this.bestBirdIndex = 0;
        this.fitnessSum = 0;
    }

    get bestBird() {
        return this.birds[this.bestBirdIndex];
    }

    show() {
        if (showAllButton.value() === 'true') {
            for (let i = 1; i < this.birds.length; i++) {
                this.birds[i].show();
            }
        }
        this.birds[0].show();
    }

    update() {
        if (this.checkAllDead() === true) {
            this.evaluate();
            this.birds = this.makeNextGen();
            this.bestBirdIndex = 0;
            this.generation++;
            generationP.html('generation: ' + nfc(this.generation));
            localStorage.setItem('flappy.bestbrain.gen.' + this.generation, JSON.stringify(this.bestBird.brain));
            localStorage.setItem('flappy.gen', this.generation);
            resetPipes();
            if (score > highScore) {
                highScore = score;
                highScoreP.html('high score: ' + nfc(highScore));
            }
            score = 0;
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
        for (const bird of this.birds) {
            bird.calculateFitness();
            sumFit += bird.fitness;
        }
        for (const bird of this.birds) {
            bird.fitness = bird.fitness / sumFit;
            this.fitnessSum += bird.fitness;
        }
        let maxFitness = 0;
        for (let i = 0; i < this.birds.length; i++) {
            const bird = this.birds[i];
            if (maxFitness < bird.fitness) {
                maxFitness = bird.fitness;
                this.bestBirdIndex = i;
            }
        }
        this.bestBird.fitness *= 1.5;
    }

    makeNextGen() {
        const nextGenBirds = [];
        for (let i = 1; i < this.popSize; i++) {
            let babyBird = this.selectParent().clone();
            babyBird.brain.mutate();
            nextGenBirds[i] = babyBird;
        }
        nextGenBirds[0] = this.bestBird.clone();
        return nextGenBirds;
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
