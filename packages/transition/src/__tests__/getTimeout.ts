import { getTimeout } from "../getTimeout";

describe("getTimeout", () => {
  describe("number timeout", () => {
    it("should set the enter and exit values to tne timeout value and set the appear to 0 when appear is false", () => {
      expect(getTimeout(120, false)).toEqual({
        appear: 0,
        enter: 120,
        exit: 120,
      });
    });

    it("should set the appear, enter, and exit values to the timeout value when appear is true", () => {
      expect(getTimeout(120, true)).toEqual({
        appear: 120,
        enter: 120,
        exit: 120,
      });
    });

    it("should throw a RangeError if the timeout is less than 0", () => {
      const error = new RangeError("Minimum timeout allowed is 0");
      expect(() => getTimeout(-1, false)).toThrow(error);
      expect(() => getTimeout(-1, true)).toThrow(error);
      expect(() => getTimeout(-5, false)).toThrow(error);
      expect(() => getTimeout(-5, true)).toThrow(error);
    });
  });

  describe("object timeout", () => {
    it("should default all missing timeouts to 0", () => {
      const expected = { appear: 0, enter: 0, exit: 0 };
      expect(getTimeout({}, false)).toEqual(expected);
      expect(getTimeout({}, true)).toEqual(expected);
    });

    it("should not change the result if all the appear, enter, and exit values are numbers", () => {
      const timeout = {
        appear: 2,
        enter: 120,
        exit: 150,
      };

      expect(getTimeout(timeout, false)).toEqual(timeout);
      expect(getTimeout(timeout, true)).toEqual(timeout);
    });

    it("should default the appear timeout to the enter timeout if omitted and the appear argument is true", () => {
      expect(getTimeout({ enter: 120, exit: 150 }, true)).toEqual({
        appear: 120,
        enter: 120,
        exit: 150,
      });
    });

    it("should throw a RangeError if any of the timeouts are less than 0", () => {
      const appearError = new RangeError("Minimum appear timeout allowed is 0");
      const enterError = new RangeError("Minimum enter timeout allowed is 0");
      const exitError = new RangeError("Minimum exit timeout allowed is 0");

      expect(() => getTimeout({ appear: -1 }, false)).toThrow(appearError);
      expect(() => getTimeout({ appear: -1, enter: -1 }, false)).toThrow(
        appearError
      );
      expect(() => getTimeout({ appear: -1, exit: -1 }, false)).toThrow(
        appearError
      );
      expect(() =>
        getTimeout({ appear: -1, enter: -1, exit: -1 }, false)
      ).toThrow(appearError);
      expect(() => getTimeout({ appear: -1 }, false)).toThrow(appearError);
      expect(() => getTimeout({ appear: -1, enter: -1 }, false)).toThrow(
        appearError
      );
      expect(() => getTimeout({ appear: -1, exit: -1 }, false)).toThrow(
        appearError
      );
      expect(() =>
        getTimeout({ appear: -1, enter: -1, exit: -1 }, false)
      ).toThrow(appearError);

      expect(() => getTimeout({ enter: -1 }, false)).toThrow(enterError);
      expect(() => getTimeout({ enter: -1, exit: -1 }, false)).toThrow(
        enterError
      );
      expect(() => getTimeout({ enter: -1 }, true)).toThrow(enterError);
      expect(() => getTimeout({ enter: -1, exit: -1 }, true)).toThrow(
        enterError
      );

      expect(() => getTimeout({ exit: -1 }, false)).toThrow(exitError);
      expect(() => getTimeout({ exit: -1 }, true)).toThrow(exitError);
    });
  });
});
