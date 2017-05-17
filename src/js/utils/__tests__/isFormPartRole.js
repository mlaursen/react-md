/* eslint-env jest */
jest.unmock('../isFormPartRole');

import isFormPartRole from '../isFormPartRole';

describe('isFormPartRole', () => {
  it('should return false if the el is false-ish', () => {
    expect(isFormPartRole()).toBe(false);
    expect(isFormPartRole(undefined)).toBe(false);
    expect(isFormPartRole(null)).toBe(false);
  });

  it('should return true if the role attribute is checkbox', () => {
    const el = { getAttribute: () => 'checkbox' };
    expect(isFormPartRole(el)).toBe(true);
  });

  it('should return true if the role attribute is radio', () => {
    const el = { getAttribute: () => 'radio' };
    expect(isFormPartRole(el)).toBe(true);
  });
});
