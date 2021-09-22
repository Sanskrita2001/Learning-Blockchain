const Block = require('./block');
const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

describe('Block', () => {
	const timestamp = '01/01/2021';
	const data = 'foo-data';
	const hash = 'foo-hash';
	const lastHash = 'foo-lastHash';
	const block = new Block({ timestamp, data, hash, lastHash });

	it('has a timestamp, data, hash, and a last-hash property', () => {
		expect(block.timestamp).toEqual(timestamp);
		expect(block.data).toEqual(data);
		expect(block.hash).toEqual(hash);
		expect(block.lastHash).toEqual(lastHash);
	});

	describe('genesis()', () => {
		const genesisBlock = Block.genesis();
		it('returns a block instance', () => {
			expect(genesisBlock instanceof Block).toBe(true);
		});

		it('returns the genesis data', () => {
			expect(genesisBlock).toEqual(GENESIS_DATA);
		});
	});

	describe('mineBlock()', () => {
		const lastBlock = Block.genesis();
		const data = 'mined data';
		const minedBlock = Block.mineBlock({ lastBlock, data });

		it('returns a block instance', () => {
			expect(minedBlock instanceof Block).toBe(true);
		});

		it('sets `lastHash` of mined block to be the `hash` of last block', () => {
			expect(minedBlock.lastHash).toEqual(lastBlock.hash);
		});

		it('sets the `data`', () => {
			expect(minedBlock.data).toEqual(data);
		});

		it('sets a `timestamp`', () => {
			expect(minedBlock.timestamp).not.toEqual(undefined);
		});

		it('creates a SHA-256 `hash` based on the proper input', () => {
			expect(minedBlock.hash).toEqual(
				cryptoHash(minedBlock.timestamp, lastBlock.hash, data)
			);
		});
	});
});
