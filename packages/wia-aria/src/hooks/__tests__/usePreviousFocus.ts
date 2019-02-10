import { testHook } from "react-testing-library";
import usePreviousFocus from "../usePreviousFocus";

describe("usePreviousFocus", () => {
  it("should return null when save is set to false", () => {
    let value;
    testHook(() => (value = usePreviousFocus(false)));
    expect(value).toBeNull();
  });

  it("should return the document.activeElement when save is set to true", () => {
    const button = document.createElement("button");
    button.id = "test-button";

    document.body.appendChild(button);
    button.focus();

    expect(document.activeElement).toBe(button);
    let value;
    testHook(() => (value = usePreviousFocus(true)));
    expect(value).toBe(button);
  });

  it("should not update the value if different elements come into focus", () => {
    // not sure if this test _actually_ tests anything though..
    const [button1, button2, button3] = [
      "test-button-1",
      "test-button-2",
      "test-button-3",
    ].map(id => {
      const button = document.createElement("button");
      button.id = id;

      document.body.appendChild(button);
      return button;
    });

    button1.focus();

    expect(document.activeElement).toBe(button1);

    let value;
    testHook(() => (value = usePreviousFocus(true)));
    expect(value).toBe(button1);

    button2.focus();
    expect(value).toBe(button1);

    button3.focus();
    expect(value).toBe(button1);
  });
});
