/* eslint-env jest */
import addDate from '../addDate';
import addDay from '../addDay';
import addMonth from '../addMonth';
import addYear from '../addYear';

jest.mock('../addDay');
jest.mock('../addMonth');
jest.mock('../addYear');

describe('addDate', () => {
  it('should call the correct helper utils based on the part param', () => {
    const jan1 = new Date(2018, 0, 1);
    addDate(null, 1, 'D');
    addDate(jan1, 5, 'D');
    expect(addDay).toBeCalledWith(null, 1);
    expect(addDay).toBeCalledWith(jan1, 5);
    expect(addMonth).not.toBeCalled();
    expect(addYear).not.toBeCalled();

    addDay.mockClear();
    addDate(null, 1, 'M');
    addDate(jan1, 1, 'M');
    addDate(null, 1, 'M', 12);
    addDate(jan1, 1, 'M', 1);
    expect(addMonth).toBeCalledWith(null, 1, undefined);
    expect(addMonth).toBeCalledWith(jan1, 1, undefined);
    expect(addMonth).toBeCalledWith(null, 1, 12);
    expect(addMonth).toBeCalledWith(jan1, 1, 1);
    expect(addDay).not.toBeCalled();
    expect(addYear).not.toBeCalled();

    addMonth.mockClear();
    addDate(null, 1, 'Y');
    addDate(jan1, 1, 'Y');
    expect(addYear).toBeCalledWith(null, 1);
    expect(addYear).toBeCalledWith(jan1, 1);
    expect(addDay).not.toBeCalled();
    expect(addMonth).not.toBeCalled();
  });

  it('should return whatever value was provided if it is not a valid part', () => {
    const jan1 = new Date(2018, 0, 1);
    expect(addDate(null, 1, 'y')).toBe(null);
    expect(addDate('hello', 1, '')).toBe('hello');
    expect(addDate(jan1, 1, 'y')).toBe(jan1);
  });
});
