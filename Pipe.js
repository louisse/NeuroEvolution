class Pipe {
    constructor(x) {
        this.h = 100;
        this.w = 75;
        this.x = x;
        this.y = 0;
        this.randomizeY();
        this.speed = -3;
    }

    randomizeY() {
        this.y = floor(random(this.h + 25, height - groundHeight - 25));
    }

    show() {
        push();
        translate(this.x, this.y);
        fill(100, 200, 100);
        noStroke();
        rect(0, 0, this.w, height - this.y - groundHeight);
        rect(0, -this.h, this.w, -this.y + this.h);
        fill(0, 200, 0);
        rect(-5, 0, this.w + 10, 25);
        rect(-5, -this.h, this.w + 10, -25);
        pop();
    }

    update() {
        this.x += this.speed;
        if (this.x < -this.w) {
            this.x = width;
            this.randomizeY();
        }
    }

    checkCollision(x1, y1, x2, y2) {
        return (this.x < x2 && x1 < this.x + this.w) && (this.y < y2 || y1 < this.y - this.h);
    }
}
