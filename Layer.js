class Layer {
    constructor(neuronCount, inputCount) {
        this.neurons = [];
        for (let i = 0; i < neuronCount; i++) {
            this.neurons[i] = new Perceptron(inputCount);
        }
    }

    set activateFunction(func) {
        for (let i = 0; i < this.neurons.length; i++) {
            this.neurons[i].activateFunc = func;
        }
    }

    feedForward(inputs) {
        let outputs = [];
        for (let i = 0; i < this.neurons.length; i++) {
            outputs[i] = this.neurons[i].feedForward(inputs);
        }
        return outputs;
    }

    copy() {
        let copyLayer = new Layer(this.neurons.length, 0);
        for (let i = 0; i < this.neurons.length; i++) {
            copyLayer.neurons[i] = this.neurons[i].copy();
        }
        return copyLayer;
    }

    mutate() {
        for (let i = 0; i < this.neurons.length; i++) {
            this.neurons[i].mutate();
        }
    }
}
