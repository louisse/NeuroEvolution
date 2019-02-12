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
        this.brain = new NeuralNetwork(4, 3, 1);
        // this.brain = NeuralNetwork.fromJSON('{"hiddenLayer":{"neurons":[{"weights":[-0.35040330331914316,-0.9907804459753815,-0.6941304618670374,0.4403314059902663],"bias":0.6063456467998143,"mr":0.1},{"weights":[0.8681454820804686,-0.1135897595323283,-0.05314704232514922,-0.8325575866977282],"bias":-0.06576772345566395,"mr":0.1},{"weights":[-0.13208493512569364,-0.8459028586527713,0.08444643558300813,-0.3704889624815553],"bias":0.956904112655514,"mr":0.1}]},"outputLayer":{"neurons":[{"weights":[-0.6500090120437321,0.4389909002163219,0.9027358719699419],"bias":-0.07639531623561746,"mr":0.1}]}}');
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
        const inputs = [];
        inputs[0] = map(this.y, 0, height, -1, 1, true);
        inputs[1] = map(this.ySpeed, -this.maxSpeed, this.maxSpeed, -1, 1);
        inputs[2] = map(pipes.pipes[0].x, 0, width, -1, 1);
        inputs[3] = map(pipes.pipes[0].y, 0, height, -1, 1);
        // const inputs = [this.y, this.ySpeed, pipes.pipes[0].x, pipes.pipes[0].y];
        if (this.brain.think(inputs)[0] === 1) {
            this.f = true;
        }
        this.yAcc -= G;
        if (this.f === true) {
            this.yAcc = 5;
        }
        this.ySpeed += this.yAcc;
        this.ySpeed = constrain(this.ySpeed, -this.maxSpeed, this.maxSpeed);
        this.y -= this.ySpeed;
        if ((this.y >= height - groundHeight) || (pipes.checkCollisionWithBird(this.x - this.r, this.y - this.r, this.x + this.r, this.y + this.r) === true)) {
            this.score = score;
            this.isDead = true;
        }
        this.f = false;
    }

    calculateFitness() {
        this.fitness = this.score * this.score;
    }

    clone() {
        const cloneBird = new Bird();
        cloneBird.brain = this.brain.copy();
        return cloneBird;
    }
}
