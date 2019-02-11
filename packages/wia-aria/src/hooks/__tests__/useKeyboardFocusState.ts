import { act, cleanup, testHook } from "react-testing-library";
import { KeyboardFocusedId } from "../../types.d";
import useKeyboardFocusState, {
  disableKeyboardMode,
  DISABLE_KEYBOARD_MODE,
  enableKeyboardMode,
  ENABLE_KEYBOARD_MODE,
  reducer,
  setFocusedId,
  SET_FOCUSED_ID,
} from "../useKeyboardFocusState";

describe("useKeyboardFocusState", () => {
  describe("actions", () => {
    describe("enable", () => {
      it("should call dispatch with the correct arguments", () => {
        expect(enableKeyboardMode()).toEqual({ type: ENABLE_KEYBOARD_MODE });
      });
    });

    describe("disable", () => {
      it("should call dispatch with the correct arguments", () => {
        expect(disableKeyboardMode()).toEqual({ type: DISABLE_KEYBOARD_MODE });
      });
    });

    describe("setFocusedId", () => {
      it("should call dispatch with the correct arguments", () => {
        expect(setFocusedId(null)).toEqual({
          type: SET_FOCUSED_ID,
          focusedId: null,
        });

        expect(setFocusedId("focused-id")).toEqual({
          type: SET_FOCUSED_ID,
          focusedId: "focused-id",
        });
      });
    });
  });

  describe("reducer", () => {
    it("should enable keyboard mode after an enable action", () => {
      const action = enableKeyboardMode();
      expect(
        reducer({ focusedId: null, isKeyboardMode: false }, action)
      ).toEqual({ focusedId: null, isKeyboardMode: true });
      expect(
        reducer({ focusedId: null, isKeyboardMode: true }, action)
      ).toEqual({ focusedId: null, isKeyboardMode: true });
    });

    it("should reset the state after the disable action", () => {
      const expected = { focusedId: null, isKeyboardMode: false };
      const disable = disableKeyboardMode();
      expect(
        reducer({ focusedId: "some-id", isKeyboardMode: true }, disable)
      ).toEqual(expected);
      expect(
        reducer({ focusedId: "some-id", isKeyboardMode: false }, disable)
      ).toEqual(expected);
      expect(
        reducer({ focusedId: null, isKeyboardMode: false }, disable)
      ).toEqual(expected);
    });

    it("should update the focusedId the state after the updateId action", () => {
      const action = setFocusedId("another-id");
      expect(
        reducer({ focusedId: "some-id", isKeyboardMode: true }, action)
      ).toEqual({
        focusedId: "another-id",
        isKeyboardMode: true,
      });

      expect(
        reducer({ focusedId: "some-id", isKeyboardMode: false }, action)
      ).toEqual({
        focusedId: "another-id",
        isKeyboardMode: false,
      });

      expect(
        reducer({ focusedId: null, isKeyboardMode: false }, action)
      ).toEqual({
        focusedId: "another-id",
        isKeyboardMode: false,
      });
    });
  });

  describe("useKeyboardFocusState", () => {
    afterEach(cleanup);
    it("should return the correct values", () => {
      let value;
      testHook(() => {
        value = useKeyboardFocusState(null);
      });

      expect(value).toMatchObject({
        focusedId: null,
        isKeyboardMode: false,
        enable: expect.any(Function),
        disable: expect.any(Function),
        setFocusedId: expect.any(Function),
      });

      testHook(() => {
        value = useKeyboardFocusState("default-id");
      });

      expect(value).toMatchObject({
        focusedId: "default-id",
        isKeyboardMode: true,
        enable: expect.any(Function),
        disable: expect.any(Function),
        setFocusedId: expect.any(Function),
      });
    });

    it("should correctly update the state after the enable function", () => {
      let focusedId: KeyboardFocusedId = null;
      let isKeyboardMode = false;
      let enable = () => {};
      testHook(
        () =>
          ({ focusedId, enable, isKeyboardMode } = useKeyboardFocusState(null))
      );

      expect(focusedId).toBe(null);
      expect(isKeyboardMode).toBe(false);
      act(() => {
        enable();
      });

      expect(focusedId).toBe(null);
      expect(isKeyboardMode).toBe(true);
    });

    it("should correctly update the state after the disable function", () => {
      let focusedId: KeyboardFocusedId = null;
      let isKeyboardMode = false;
      let disable = () => {};
      testHook(
        () =>
          ({ focusedId, disable, isKeyboardMode } = useKeyboardFocusState(
            "some-id"
          ))
      );

      expect(focusedId).toBe("some-id");
      expect(isKeyboardMode).toBe(true);
      act(() => {
        disable();
      });

      expect(focusedId).toBe(null);
      expect(isKeyboardMode).toBe(false);
    });

    it("should correctly update the state after the setFocusedId function", () => {
      let focusedId: KeyboardFocusedId = null;
      let isKeyboardMode = false;
      let setFocusedId = (_focusedId: KeyboardFocusedId) => {};
      testHook(
        () =>
          ({ focusedId, setFocusedId, isKeyboardMode } = useKeyboardFocusState(
            "some-id"
          ))
      );

      expect(focusedId).toBe("some-id");
      expect(isKeyboardMode).toBe(true);
      act(() => {
        setFocusedId(null);
      });

      expect(focusedId).toBe(null);
      expect(isKeyboardMode).toBe(true);

      act(() => {
        setFocusedId("another-id");
      });

      expect(focusedId).toBe("another-id");
      expect(isKeyboardMode).toBe(true);
    });
  });
});
