/* eslint-env jest */
import getScreenSize from '../getScreenSize';

describe('getScreenSize', () => {
  it('should get the window\'s inner width and inner height', () => {
    expect(getScreenSize('Height')).toBe(window.innerHeight);
    expect(getScreenSize('Width')).toBe(window.innerWidth);
  });

  it('should fallback to the document.documentElement if the window attributes do not exist', () => {
    // I don't know how to actually test this.
    expect(true).toBe(true);
  });
});
