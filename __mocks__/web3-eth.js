const LAST_BLOCK = Math.ceil(Math.random() * 10 ** 7);

export default class Eth {
  constructor() {
    const p = Promise.resolve();
    const _requests = [];
    const BatchRequestAdd = jest.fn((getBlock) => {
      _requests.push(getBlock);
    });
    this.BatchRequestAdd = BatchRequestAdd;
    const BatchRequestExecute = jest.fn(() => {
      _requests.forEach((getBlock) => {
        getBlock();
      });
    });
    this.BatchRequestExecute = BatchRequestExecute;
    this.getBlockNumber = jest.fn(() => p.then(() => LAST_BLOCK));
    this.BatchRequest = function () {
      return {
        add: BatchRequestAdd,
        execute: BatchRequestExecute,
      };
    }
  }

  buildBlock = jest.fn((number) => ({
      number,
      transactions: [],
  }));

  getBlock = {
    request: jest.fn((number, _, cb) => {
      const block = this.buildBlock(number);
      return () => {
        cb(null, block);
      };
    }),
  }
}
