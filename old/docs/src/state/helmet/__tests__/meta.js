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
      it('should create the correct action when only keywords are provided', () => {
        const keywords = 'Lorem Ipsum';
        const expected = { type: UPDATE_KEYWORDS, payload: { keywords, merge: true } };
        expect(updateKeywords(keywords)).toEqual(expected);
      });

      it('should create the correct aciton when keywords and merge are provided', () => {
        const keywords = 'Lorem Ipsum';
        let merge = false;

        let expected = { type: UPDATE_KEYWORDS, payload: { keywords, merge } };
        expect(updateKeywords(keywords, merge)).toEqual(expected);

        merge = true;
        expected = { type: UPDATE_KEYWORDS, payload: { keywords, merge } };
        expect(updateKeywords(keywords, merge)).toEqual(expected);
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
        INITIAL_STATE[2],
      ];

      expect(reducer(INITIAL_STATE, updateDescription(description))).toEqual(expected);
    });

    it('should merge the keywords correctly', () => {
      const keywords = 'Hello, World!';
      const expected = [
        INITIAL_STATE[0],
        { name: 'keywords', content: `${DEFAULT_KEYWORDS},${keywords}` },
        INITIAL_STATE[2],
      ];

      expect(reducer(INITIAL_STATE, updateKeywords(keywords))).toEqual(expected);
    });

    it('should replace the keywords correctly', () => {
      const keywords = 'Hello, World!';
      const expected = [
        INITIAL_STATE[0],
        { name: 'keywords', content: keywords },
        INITIAL_STATE[2],
      ];

      expect(reducer(INITIAL_STATE, updateKeywords(keywords, false))).toEqual(expected);
    });

    it('should set the keywords content to the DEFAULT_KEYWORDS if the new keywords are null', () => {
      const state = [
        INITIAL_STATE[0],
        { name: 'keywords', content: `${DEFAULT_KEYWORDS},some other keywords` },
        INITIAL_STATE[2],
      ];

      expect(reducer(state, updateKeywords(null))).toEqual(INITIAL_STATE);
    });
  });
});
