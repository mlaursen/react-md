import { getClassNames } from "../getClassNames";

const DISABLED_TIMEOUT = {
  appear: 0,
  enter: 0,
  exit: 0,
};

const ALL_TIMEOUT = {
  appear: 120,
  enter: 150,
  exit: 200,
};

const APPEAR_ONLY_TIMEOUT = {
  appear: 200,
  enter: 0,
  exit: 0,
};

const APPEAR_ENTER_TIMEOUT = {
  appear: 200,
  enter: 200,
  exit: 0,
};

const APPEAR_EXIT_TIMEOUT = {
  appear: 200,
  enter: 0,
  exit: 200,
};

const ENTER_ONLY_TIMEOUT = {
  appear: 0,
  enter: 200,
  exit: 0,
};

const ENTER_EXIT_TIMEOUT = {
  appear: 0,
  enter: 150,
  exit: 150,
};

const EXIT_ONLY_TIMEOUT = {
  appear: 0,
  enter: 0,
  exit: 175,
};

describe("getClassNames", () => {
  describe("string classNames", () => {
    it("should create the correct object based on the timeout without ever setting the enterActive, enterDone, and exitDone classes to anything other than the empty string", () => {
      expect(getClassNames("prefix", DISABLED_TIMEOUT)).toEqual({
        appear: "",
        appearActive: "",
        appearDone: "",
        enter: "",
        enterActive: "",
        enterDone: "",
        exit: "",
        exitActive: "",
        exitDone: "",
      });

      expect(getClassNames("prefix", ALL_TIMEOUT)).toEqual({
        appear: "prefix--appear",
        appearActive: "prefix--appear-active",
        appearDone: "",
        enter: "prefix--enter",
        enterActive: "prefix--enter-active",
        enterDone: "",
        exit: "prefix--exit",
        exitActive: "prefix--exit-active",
        exitDone: "",
      });

      expect(getClassNames("prefix", APPEAR_ONLY_TIMEOUT)).toEqual({
        appear: "prefix--appear",
        appearActive: "prefix--appear-active",
        appearDone: "",
        enter: "",
        enterActive: "",
        enterDone: "",
        exit: "",
        exitActive: "",
        exitDone: "",
      });

      expect(getClassNames("prefix", APPEAR_ENTER_TIMEOUT)).toEqual({
        appear: "prefix--appear",
        appearActive: "prefix--appear-active",
        appearDone: "",
        enter: "prefix--enter",
        enterActive: "prefix--enter-active",
        enterDone: "",
        exit: "",
        exitActive: "",
        exitDone: "",
      });

      expect(getClassNames("prefix", APPEAR_EXIT_TIMEOUT)).toEqual({
        appear: "prefix--appear",
        appearActive: "prefix--appear-active",
        appearDone: "",
        enter: "",
        enterActive: "",
        enterDone: "",
        exit: "prefix--exit",
        exitActive: "prefix--exit-active",
        exitDone: "",
      });

      expect(getClassNames("prefix", ENTER_ONLY_TIMEOUT)).toEqual({
        appear: "",
        appearActive: "",
        appearDone: "",
        enter: "prefix--enter",
        enterActive: "prefix--enter-active",
        enterDone: "",
        exit: "",
        exitActive: "",
        exitDone: "",
      });

      expect(getClassNames("prefix", ENTER_EXIT_TIMEOUT)).toEqual({
        appear: "",
        appearActive: "",
        appearDone: "",
        enter: "prefix--enter",
        enterActive: "prefix--enter-active",
        enterDone: "",
        exit: "prefix--exit",
        exitActive: "prefix--exit-active",
        exitDone: "",
      });

      expect(getClassNames("prefix", EXIT_ONLY_TIMEOUT)).toEqual({
        appear: "",
        appearActive: "",
        appearDone: "",
        enter: "",
        enterActive: "",
        enterDone: "",
        exit: "prefix--exit",
        exitActive: "prefix--exit-active",
        exitDone: "",
      });
    });
  });

  describe("object classNames", () => {
    it("should return an object with all CSSTransitionClassNames defined as an empty string if an empty object was provided", () => {
      const expected = {
        appear: "",
        appearActive: "",
        appearDone: "",
        enter: "",
        enterActive: "",
        enterDone: "",
        exit: "",
        exitActive: "",
        exitDone: "",
      };

      expect(getClassNames({}, DISABLED_TIMEOUT)).toEqual(expected);
      expect(getClassNames({}, ALL_TIMEOUT)).toEqual(expected);
      expect(getClassNames({}, APPEAR_ONLY_TIMEOUT)).toEqual(expected);
      expect(getClassNames({}, APPEAR_ENTER_TIMEOUT)).toEqual(expected);
      expect(getClassNames({}, APPEAR_EXIT_TIMEOUT)).toEqual(expected);
      expect(getClassNames({}, ENTER_ONLY_TIMEOUT)).toEqual(expected);
      expect(getClassNames({}, ENTER_EXIT_TIMEOUT)).toEqual(expected);
      expect(getClassNames({}, EXIT_ONLY_TIMEOUT)).toEqual(expected);
    });

    it("should use the defined value or fallback to the empty string", () => {
      const classNames = {
        appear: "appear",
        appearActive: "appear-active",
        appearDone: "appear-done",
        enter: "enter",
        enterActive: "enter-active",
        enterDone: "enter-done",
        exit: "exit",
        exitActive: "exit-active",
        exitDone: "exit-done",
      };

      expect(getClassNames(classNames, DISABLED_TIMEOUT)).toEqual(classNames);
      expect(getClassNames(classNames, ALL_TIMEOUT)).toEqual(classNames);
      expect(getClassNames(classNames, APPEAR_ONLY_TIMEOUT)).toEqual(
        classNames
      );
      expect(getClassNames(classNames, APPEAR_ENTER_TIMEOUT)).toEqual(
        classNames
      );
      expect(getClassNames(classNames, APPEAR_EXIT_TIMEOUT)).toEqual(
        classNames
      );
      expect(getClassNames(classNames, ENTER_ONLY_TIMEOUT)).toEqual(classNames);
      expect(getClassNames(classNames, ENTER_EXIT_TIMEOUT)).toEqual(classNames);
      expect(getClassNames(classNames, EXIT_ONLY_TIMEOUT)).toEqual(classNames);

      const exitClassNames = { exit: "exit", exitActive: "exit-active" };
      const expected = {
        appear: "",
        appearActive: "",
        appearDone: "",
        enter: "",
        enterActive: "",
        enterDone: "",
        exit: "exit",
        exitActive: "exit-active",
        exitDone: "",
      };
      expect(getClassNames(exitClassNames, DISABLED_TIMEOUT)).toEqual(expected);
      expect(getClassNames(exitClassNames, ALL_TIMEOUT)).toEqual(expected);
      expect(getClassNames(exitClassNames, APPEAR_ONLY_TIMEOUT)).toEqual(
        expected
      );
      expect(getClassNames(exitClassNames, APPEAR_ENTER_TIMEOUT)).toEqual(
        expected
      );
      expect(getClassNames(exitClassNames, APPEAR_EXIT_TIMEOUT)).toEqual(
        expected
      );
      expect(getClassNames(exitClassNames, ENTER_ONLY_TIMEOUT)).toEqual(
        expected
      );
      expect(getClassNames(exitClassNames, ENTER_EXIT_TIMEOUT)).toEqual(
        expected
      );
      expect(getClassNames(exitClassNames, EXIT_ONLY_TIMEOUT)).toEqual(
        expected
      );
    });

    it("should default the appear classnames to the enter classnames if omittied and the appear timeout is enabled", () => {
      const classNames = {
        enter: "custom-enter",
        enterActive: "custom-enter-active",
        enterDone: "custom-enter-done",
      };

      const expected = {
        appear: "custom-enter",
        appearActive: "custom-enter-active",
        appearDone: "custom-enter-done",
        enter: "custom-enter",
        enterActive: "custom-enter-active",
        enterDone: "custom-enter-done",
        exit: "",
        exitActive: "",
        exitDone: "",
      };

      expect(getClassNames(classNames, APPEAR_ENTER_TIMEOUT)).toEqual(expected);
      expect(getClassNames(classNames, APPEAR_ONLY_TIMEOUT)).toEqual(expected);
      expect(getClassNames(classNames, ALL_TIMEOUT)).toEqual(expected);

      const expected2 = {
        appear: "",
        appearActive: "",
        appearDone: "",
        enter: "custom-enter",
        enterActive: "custom-enter-active",
        enterDone: "custom-enter-done",
        exit: "",
        exitActive: "",
        exitDone: "",
      };

      expect(getClassNames(classNames, ENTER_ONLY_TIMEOUT)).toEqual(expected2);
      expect(getClassNames(classNames, ENTER_EXIT_TIMEOUT)).toEqual(expected2);
    });
  });
});
