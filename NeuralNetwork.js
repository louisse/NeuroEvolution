class NeuralNetwork {
    constructor(inputCount, hiddenNeuronCount, outputNeuronCount) {
        this.hiddenLayer = new Layer(hiddenNeuronCount, inputCount);
        this.hiddenLayer.activateFunction = Perceptron.activateHyperbolicTangent;
        this.outputLayer = new Layer(outputNeuronCount, hiddenNeuronCount);
    }

    think(inputs) {
        let hiddenOutput = this.hiddenLayer.feedForward(inputs);
        return this.outputLayer.feedForward(hiddenOutput);
    }

    copy() {
        let copyNeuralNetwork = new NeuralNetwork();
        copyNeuralNetwork.hiddenLayer = this.hiddenLayer.copy();
        copyNeuralNetwork.outputLayer = this.outputLayer.copy();
        return copyNeuralNetwork;
    }

    mutate() {
        this.hiddenLayer.mutate();
        this.outputLayer.mutate();
    }
}
