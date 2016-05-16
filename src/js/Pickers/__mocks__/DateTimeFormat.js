/*eslint-env jest*/
export default jest.genMockFunction().mockImplementation(() => {
  return {
    format: jest.genMockFunction().mockImplementation(date => date),
  };
});
