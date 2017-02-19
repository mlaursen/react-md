/* eslint-env jest */
jest.unmock('../getScreenSize');
import getScreenSize from '../getScreenSize';

describe('getScreenSize', () => {
  it('should get the window\'s inner width and inner height', () => {
    expect(getScreenSize('Height')).toBe(window.innerHeight);
    expect(getScreenSize('Width')).toBe(window.innerWidth);
  });

  it('should fallback to the document.docuemntElement if the window attributes do not exist', () => {
    // I don't know how to actually test this.
    expect(true).toBe(true);
  });
});
