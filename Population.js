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
            this.generation++;
            generationP.html('generation: ' + this.generation);
            resetPipes();
            score = 0;
        }
        for (let bird of this.birds) {
            bird.update();
        }
    }

    checkAllDead() {
        for (let bird of this.birds) {
            if (bird.isDead === false) {
                return false;
            }
        }
        return true;
    }

    evaluate() {
        this.fitnessSum = 0;
        let sumFit = 0;
        for (let bird of this.birds) {
            bird.calculateFitness();
            sumFit += bird.fitness;
        }
        for (let i = 0; i < this.birds.length; i++) {
            const bird = this.birds[i];
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
        if (score > highScore) {
            highScore = score;
            highScoreP.html('high score: ' + highScore);
        }
        this.bestBird.fitness *= 1.5;
    }

    makeNextGen() {
        let nextGenBirds = [];
        for (let i = 1; i < this.popSize; i++) {
            let babyBird = this.selectParent().clone();
            babyBird.brain.mutate();
            nextGenBirds[i] = babyBird;
        }
        nextGenBirds[0] = this.bestBird.clone();
        return nextGenBirds;
    }

    selectParent() {
        let diceRoll = random(this.fitnessSum);
        let sum = 0;

        for (let bird of this.birds) {
            sum += bird.fitness;
            if (sum > diceRoll) {
                return bird;
            }
        }
    }
}
