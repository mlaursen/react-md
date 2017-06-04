/* eslint-env jest */
import reducer, {
  INITIAL_STATE,
  DEFAULT_KEYWORDS,
  DEFAULT_DESCRIPTION,
  UPDATE_KEYWORDS,
  UPDATE_DESCRIPTION,
  updateKeywords,
  updateDescription,
} from '../meta';

describe('meta', () => {
  describe('action creators', () => {
    describe('updateDescription', () => {
      it('should create the correct action when a description is provided', () => {
        const description = 'Lorem Ipsum';
        const expected = { type: UPDATE_DESCRIPTION, payload: { description } };
        expect(updateDescription(description)).toEqual(expected);
      });

      it('should default to the DEFAULT_DESCRIPTION when the description is false-ish', () => {
        const expected = { type: UPDATE_DESCRIPTION, payload: { description: DEFAULT_DESCRIPTION } };
        expect(updateDescription()).toEqual(expected);
        expect(updateDescription(undefined)).toEqual(expected);
        expect(updateDescription(null)).toEqual(expected);
        expect(updateDescription('')).toEqual(expected);
      });
    });

    describe('updateKeywords', () => {
      it('should create the correct action when a keywords is provided', () => {
        const keywords = 'Lorem Ipsum';
        const expected = { type: UPDATE_KEYWORDS, payload: { keywords } };
        expect(updateKeywords(keywords)).toEqual(expected);
      });

      it('should default to the DEFAULT_KEYWORDS when the keywords is false-ish', () => {
        const expected = { type: UPDATE_KEYWORDS, payload: { keywords: DEFAULT_KEYWORDS } };
        expect(updateKeywords()).toEqual(expected);
        expect(updateKeywords(undefined)).toEqual(expected);
        expect(updateKeywords(null)).toEqual(expected);
        expect(updateKeywords('')).toEqual(expected);
      });
    });
  });

  describe('reducer', () => {
    it('should default to the INITIAL_STATE', () => {
      expect(reducer(undefined, {})).toBe(INITIAL_STATE);
    });

    it('should update the description after the UPDATE_DESCRIPTION action type', () => {
      const description = 'Hello, World!';
      const expected = [
        { name: 'description', content: description },
        INITIAL_STATE[1],
      ];

      expect(reducer(INITIAL_STATE, updateDescription(description))).toEqual(expected);
    });

    it('should update the keywords after the UPDATE_KEYWORDS action type', () => {
      const keywords = 'Hello, World!';
      const expected = [
        INITIAL_STATE[0],
        { name: 'keywords', content: keywords },
      ];

      expect(reducer(INITIAL_STATE, updateKeywords(keywords))).toEqual(expected);
    });
  });
});
