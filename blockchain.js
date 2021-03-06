const { genesis } = require('./block');
const Block = require('./block');
const cryptoHash = require('./crypto-hash');

class Blockchain {
	constructor() {
		const genesis = Block.genesis();
		this.chain = [genesis];
	}

	addBlock({ data }) {
		const newBlock = Block.mineBlock({
			lastBlock: this.chain[this.chain.length - 1],
			data,
		});
		this.chain.push(newBlock);
	}

	replaceChain(chain) {
		if (chain.length <= this.chain.length) {
			console.error('The incoming chain must be longer');
			return;
		}

		if (!Blockchain.isValidChain(chain)) {
			console.error('The incoming chain must be valid');
			return;
		}
		console.log('Replacing chain with ', chain);
		this.chain = chain;
	}
	static isValidChain(chain) {
		if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
			return false;
		}
		for (let i = 1; i < chain.length; i++) {
			const block = chain[i];
			const actualLastHash = chain[i - 1].hash;
			const lastDifficulty = chain[i-1].difficulty;

			const { data, lastHash, hash, timestamp, nonce, difficulty } = block;
			if (lastHash !== actualLastHash) return false;

			if (hash !== cryptoHash(timestamp, data, lastHash, nonce, difficulty)) {
				return false;
			}

			if (Math.abs(lastDifficulty - difficulty) > 1) return false;
		}
		return true;
	}
}
module.exports = Blockchain;
