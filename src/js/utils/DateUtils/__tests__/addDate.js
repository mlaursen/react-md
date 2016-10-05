/* eslint-env jest */
jest.unmock('../addDate');
import addDate from '../addDate';

const march14 = new Date(2016, 2, 14, 15, 22, 18, 450);
describe('addDate', () => {
  it('adds days to a date', () => {
    const march15 = new Date(2016, 2, 15, 15, 22, 18, 450);
    const march22 = new Date(2016, 2, 22, 15, 22, 18, 450);

    expect(addDate(march14, 1, 'D')).toEqual(march15);
    expect(addDate(march14, 8, 'D')).toEqual(march22);
  });

  it('can add negative days to a date', () => {
    const march13 = new Date(2016, 2, 13, 15, 22, 18, 450);
    const march1 = new Date(2016, 2, 1, 15, 22, 18, 450);

    expect(addDate(march14, -1, 'D')).toEqual(march13);
    expect(addDate(march14, -13, 'D')).toEqual(march1);
  });
});
