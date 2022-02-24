const mock = jest.genMockFromModule("dayjs");
const dayjs = jest.requireActual("dayjs");
mock.dayjs = jest.fn().mockReturnValue(9);

module.exports = mock;
