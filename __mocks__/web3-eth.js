const LAST_BLOCK = Math.ceil(Math.random() * 10 ** 7);

export default class Eth {
  constructor(p = Promise.resolve()) {
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

  getBlock = {
    request: jest.fn((number, cb) => {
      return () => {
        cb(null, {
          number,
        });
      };
    }),
  }
}
