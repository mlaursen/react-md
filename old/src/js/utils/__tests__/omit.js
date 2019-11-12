/* eslint-env jest */
import omit from '../omit';

const OBJ = {
  value: 'Hello',
  onClick: jest.fn(),
  woop: 'woop',
};

describe('omit', () => {
  it('returns an empty object if object is falseish', () => {
    expect(omit(undefined, [])).toEqual({});
    expect(omit(null, [])).toEqual({});
    expect(omit(false, [])).toEqual({});
  });

  it('creates a new object from the object that only contains keys not provided', () => {
    const obj = Object.assign({}, OBJ);
    const reduced = omit(obj, []);
    expect(reduced).toEqual(OBJ);
    expect(obj).toEqual(OBJ);
  });

  it('returns a new object with the original values', () => {
    const obj = Object.assign({}, OBJ);
    let reduced = omit(obj, ['value']);

    expect(reduced.value).toBeUndefined();
    expect(reduced.onClick).toBe(OBJ.onClick);
    expect(reduced.woop).toBe(OBJ.woop);

    reduced = omit(obj, ['onClick', 'woop']);

    expect(reduced.value).toBe(OBJ.value);
    expect(reduced.onClick).toBeUndefined();
    expect(reduced.woop).toBeUndefined();
  });

  it('allows for keys to be a single string', () => {
    const reduced = omit(OBJ, 'value');
    expect(reduced.value).toBeUndefined();
    expect(reduced.onClick).toBe(OBJ.onClick);
    expect(reduced.woop).toBe(OBJ.woop);
  });

  it('returns the unmodified object if there are no keys', () => {
    const reduced = omit(OBJ, undefined);
    expect(reduced).toEqual(OBJ);
  });
});
