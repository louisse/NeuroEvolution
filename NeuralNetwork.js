class NeuralNetwork {
    constructor(inputCount, hiddenNeuronCount, outputNeuronCount) {
        this.hiddenLayer = new Layer(hiddenNeuronCount, inputCount);
        this.hiddenLayer.activateFunction = Perceptron.activateHyperbolicTangent;
        this.outputLayer = new Layer(outputNeuronCount, hiddenNeuronCount);
    }

    think(inputs) {
        const hiddenOutput = this.hiddenLayer.feedForward(inputs);
        return this.outputLayer.feedForward(hiddenOutput);
    }

    copy() {
        const copyNeuralNetwork = new NeuralNetwork(0, 0, 0);
        copyNeuralNetwork.hiddenLayer = this.hiddenLayer.copy();
        copyNeuralNetwork.outputLayer = this.outputLayer.copy();
        return copyNeuralNetwork;
    }

    mutate() {
        this.hiddenLayer.mutate();
        this.outputLayer.mutate();
    }

    static fromJSON(NNObj) {
        const newNeuralNetwork = new NeuralNetwork(0, 0, 0);
        newNeuralNetwork.hiddenLayer = Layer.fromJSON(NNObj.hiddenLayer);
        newNeuralNetwork.hiddenLayer.activateFunction = Perceptron.activateHyperbolicTangent;
        newNeuralNetwork.outputLayer = Layer.fromJSON(NNObj.outputLayer);
        return newNeuralNetwork;
    }
}
