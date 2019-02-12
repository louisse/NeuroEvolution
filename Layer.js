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
        const outputs = [];
        for (let i = 0; i < this.neurons.length; i++) {
            outputs[i] = this.neurons[i].feedForward(inputs);
        }
        return outputs;
    }

    copy() {
        const copyLayer = new Layer(this.neurons.length, 0);
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

    static fromJSON(layerObj) {
        layerObj = typeof layerObj === 'string' ? JSON.parse(layerObj) : layerObj;
        const newLayer = new Layer(0, 0);
        const newNeurons = [];
        for (let i = 0; i < layerObj.neurons.length; i++) {
            newNeurons[i] = Perceptron.fromJSON(layerObj.neurons[i]);
        }
        newLayer.neurons = newNeurons;
        return newLayer;
    }
}
