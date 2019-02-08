class Bird {
    constructor() {
        this.x = width * 0.10;
        this.y = height / 2;
        this.yAcc = 0;
        this.ySpeed = 0;
        this.size = 20;
        this.r = this.size / 2;
        this.maxSpeed = 5;
        this.f = false;
        /**
         * this.y
         * this.ySpeed
         * pipes[0].x
         * pipes[0].y
         */
        this.brain = new NeuralNetwork(4, 4, 1);
        this.score = 0;
        this.fitness = 0;
        this.isDead = false;
    }

    show() {
        if (this.isDead === true) {
            return;
        }
        push();
        translate(this.x, this.y);
        fill(255, 255, 100, 250);
        noStroke();
        ellipse(0, 0, this.size, this.size);
        fill(200);
        ellipse(-7, 5, 15, 10);
        fill(255);
        ellipse(0, -7, 7, 10);
        ellipse(7, -7, 7, 10);
        fill(0);
        ellipse(9, -7, 3, 5);
        ellipse(4, -7, 3, 5);
        fill(255, 165, 0);
        ellipse(7, 0, 15, 10);
        pop();
    }

    update() {
        if (this.isDead === true) {
            return;
        }
        // let inputs = [];
        // inputs[0] = map(this.y, 0, height, -1, 1, true);
        // inputs[1] = map(this.ySpeed, -this.maxSpeed, this.maxSpeed, -1, 1);
        // inputs[2] = map(pipes.pipes[0].x, 0, width, -1, 1);
        // inputs[3] = map(pipes.pipes[0].y, 0, height, -1, 1);
        let inputs = [this.y, this.ySpeed, pipes.pipes[0].x, pipes.pipes[0].y];
        let output = this.brain.think(inputs)[0];
        if (output === 1) {
            this.f = true;
        }
        this.yAcc -= G;
        if (this.f === true) {
            this.yAcc = 5;
        }
        this.ySpeed += this.yAcc;
        this.ySpeed = constrain(this.ySpeed, -this.maxSpeed, this.maxSpeed);
        this.y -= this.ySpeed;
        if (this.y >= height - groundHeight) {
            this.isDead = true;
        } else if (pipes.checkCollisionWithBird(this.x - this.r, this.y - this.r, this.x + this.r, this.y + this.r) === true) {
            this.isDead = true;
        }
        this.f = false;
        this.score++;
    }

    calculateFitness() {
        this.fitness = this.score * this.score;
    }

    clone() {
        let cloneBird = new Bird();
        cloneBird.brain = this.brain.copy();
        return cloneBird;
    }
}
