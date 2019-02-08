class Perceptron {
    constructor(inputCount) {
        this.weights = [];
        for (let i = 0; i < inputCount; i++) {
            this.weights[i] = random(-1, 1);
        }
        this.bias = random(-1, 1);
        this.mr = 0.2;
        this.activateFunc = Perceptron.activateSign;
    }

    feedForward(inputs) {
        let sum = 0;
        for (let i = 0; i < inputs.length; i++) {
            sum += inputs[i] * this.weights[i];
        }
        sum += this.bias;
        return this.activateFunc(sum);
    }

    copy() {
        let copyPerceptron = new Perceptron(0);
        for (let i = 0; i < this.weights.length; i++) {
            copyPerceptron.weights[i] = this.weights[i];
        }
        copyPerceptron.bias = this.bias;
        return copyPerceptron;
    }

    mutate() {
        for (let i = 0; i < this.weights.length; i++) {
            if (random() < this.mr) {
                this.weights[i] = random(-1, 1);
            }
        }
        if (random() < this.mr) {
            this.bias = random(-1, 1);
        }
    }

    static activateSign(num) {
        if (num > 0) {
            return 1;
        }
        return -1;
    }

    static activateSigmoid(num) {
        return 1 / (1 + Math.exp(-num));
    }

    static activateHyperbolicTangent(num) {
        let ex = Math.exp(num);
        let exMinus = Math.exp(-num);
        return (ex - exMinus) / (ex + exMinus);
    }
}
