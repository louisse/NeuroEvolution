class Pipes {
    constructor() {
        this.pipes = [];
        this.pipes.push(new Pipe(width / 2));
        this.pipes.push(new Pipe(width / 2 + 225));
        this.pipes.push(new Pipe(width / 2 + 450));
    }

    show() {
        for (const pipe of this.pipes) {
            pipe.show();
        }
    }

    update() {
        for (const pipe of this.pipes) {
            pipe.update();
        }
        if (this.pipes[0].x + this.pipes[0].w < population.bestBird.x) {
            const pipe = this.pipes.shift();
            this.pipes[this.pipes.length] = pipe;
            scoreP.html('score: ' + nfc(score++));
        }
    }

    checkCollisionWithBird(x1, y1, x2, y2) {
        return this.pipes[0].checkCollision(x1, y1, x2, y2);
    }
}
