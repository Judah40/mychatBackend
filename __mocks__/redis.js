module.exports = {
  createClient: jest.fn().mockReturnValue({
    connect: jest.fn(),
    disconnect: jest.fn(),
    on: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
    incr: jest.fn(),
  }),
};
