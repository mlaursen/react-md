/* eslint-env jest */
jest.unmock('../addHours');
import addHours from '../addHours';

const threeFiftyOne = new Date(2016, 3, 2, 3, 51);
describe('addHours', () => {
  it('adds hours to a date', () => {
    const fiveFiftyOne = new Date(2016, 3, 2, 5, 51);
    expect(addHours(threeFiftyOne, 2)).toEqual(fiveFiftyOne);
  });

  it('can add negative hours to a date', () => {
    const oneFiftyOne = new Date(2016, 3, 2, 1, 51);
    expect(addHours(threeFiftyOne, -2)).toEqual(oneFiftyOne);
  });
});
