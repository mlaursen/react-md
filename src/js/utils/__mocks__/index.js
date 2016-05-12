/*eslint-env jest*/
export const getOffset = jest.genMockFunction().mockImplementation(() => {
  return {
    left: 0,
    top: 0,
  };
});

export const animate = jest.genMockFunction();
export const isBetween = jest.genMockFunction().mockImplementation(() => true);
