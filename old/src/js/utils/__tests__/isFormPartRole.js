/* eslint-env jest */
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

  it('should return true if the nodeName is INPUT', () => {
    const el = { nodeName: 'INPUT', getAttribute: jest.fn() };
    expect(isFormPartRole(el)).toBe(true);
  });

  it('should return false if the nodeName is DIV', () => {
    const el = { nodeName: 'DIV', getAttribute: jest.fn() };
    expect(isFormPartRole(el)).toBe(false);
  });
});
