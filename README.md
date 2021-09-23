# Learning Blockchain
###  What is a Blockchain?
The blockchain is a distributed and decentralized ledger that stores data such as transactions, and that's publicly shared across all the nodes in the network.
<br>
###  Code the Blockchain in 10 minutes Lightning Version
```bash
  const lightHash = (data) => {
    return data+'*'
}

class Block{
    constructor(data, hash, lightHash) {
        this.data = data;
        this.hash = hash;
        this.lightHash = lightHash;
    }
}

class BlockChain{
    constructor() {
        const genesis=new Block('gen-data','gen-hash','gen-lastHash')
        this.chain = [genesis]
    }
    addBlock(data) {
        const lastHash = this.chain[this.chain.length - 1].hash
        const hash = lightHash(data + lastHash)
        const block = new Block(data, hash, lastHash)
        this.chain.push(block)
    }
}

const fooBlockChain = new BlockChain();
fooBlockChain.addBlock('one');
fooBlockChain.addBlock('two');
fooBlockChain.addBlock('three');

console.log(fooBlockChain)
```
###  Table of Content
1. Blocks - The Blockchain Backend <br>
   a. Create the Block class and respective Tests <br>
   b. Create the Genesis Block and respective Tests <br>
   c. Create the Mine Block and respective Tests <br>
   d. Crypto Hash and SHA-256 <br>
2. Chain - The Blockchain Backend <br>
   a. Create the Blockchain class and respective Tests <br>
   b. Make chain validations and respective Tests <br>
   c. Make chain replacements and respective Tests <br>
   d. Stub Console Outputs in Tests <br>
