import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { type ChangeEvent, type ReactElement } from "react";

import { render, screen } from "../../test-utils/index.js";
import { spyOnMatchMedia } from "../../test-utils/jest-globals/match-media.js";
import { type UseStateSetter } from "../../types.js";
import { LocalStorageColorSchemeProvider } from "../LocalStorageColorSchemeProvider.js";
import { type ColorScheme, type LightDarkColorScheme } from "../types.js";
import { useColorScheme } from "../useColorScheme.js";

function ControllableTest(): ReactElement {
  const { currentColor, colorScheme, setColorScheme } = useColorScheme();

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget;
    if (value === "light" || value === "dark" || value === "system") {
      setColorScheme(value);
    }
  };

  return (
    <>
      <span data-testid="color-scheme">{currentColor}</span>
      <label>
        Light
        <input
          type="checkbox"
          value="light"
          checked={colorScheme === "light"}
          onChange={onChange}
        />
      </label>
      <label>
        Dark
        <input
          type="checkbox"
          value="dark"
          checked={colorScheme === "dark"}
          onChange={onChange}
        />
      </label>
      <label>
        System
        <input
          type="checkbox"
          value="system"
          checked={colorScheme === "system"}
          onChange={onChange}
        />
      </label>
    </>
  );
}

describe("LocalStorageColorSchemeProvider", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("should default to the light color scheme and allow the useColorScheme hook to change the values", () => {
    render(
      <LocalStorageColorSchemeProvider>
        <ControllableTest />
      </LocalStorageColorSchemeProvider>
    );

    const lightTheme = screen.getByRole("checkbox", { name: "Light" });
    const darkTheme = screen.getByRole("checkbox", { name: "Dark" });
    const systemTheme = screen.getByRole("checkbox", { name: "System" });
    expect(lightTheme).toBeChecked();
    expect(darkTheme).not.toBeChecked();
    expect(systemTheme).not.toBeChecked();
  });

  it("should throw an error if the setColorScheme from the useColorScheme hook is used without a ColorSchemeProvider", () => {
    let setColorScheme: UseStateSetter<ColorScheme> | undefined;
    function Test(): null {
      ({ setColorScheme } = useColorScheme());
      return null;
    }

    jest.spyOn(console, "error").mockImplementation(() => {});
    render(<Test />);

    expect(() => setColorScheme?.("dark")).toThrow(
      "The `ColorSchemeProvider` has not been initialized."
    );
  });

  it("should return dark when the mode is system and the prefers-color-scheme media query matches dark", () => {
    const matchMedia = spyOnMatchMedia((query) => query.includes("dark"));

    let currentColor: LightDarkColorScheme | undefined;
    function Test(): null {
      ({ currentColor } = useColorScheme());

      return null;
    }

    render(
      <LocalStorageColorSchemeProvider defaultColorScheme="system">
        <Test />
      </LocalStorageColorSchemeProvider>
    );

    expect(currentColor).toBe("dark");
    expect(matchMedia).toHaveBeenCalledWith("(prefers-color-scheme: dark)");
    expect(matchMedia).toHaveBeenCalledTimes(2);
  });

  it("should set the initial value to the stored value in local storage if it is valid", () => {
    const localStorageKey = "colorScheme";
    localStorage.setItem(localStorageKey, "light");
    render(
      <LocalStorageColorSchemeProvider
        localStorageKey={localStorageKey}
        defaultColorScheme="system"
      >
        <ControllableTest />
      </LocalStorageColorSchemeProvider>
    );

    expect(screen.getByRole("checkbox", { name: "Light" })).toBeChecked();
    expect(localStorage.getItem(localStorageKey)).toBe("light");
  });

  it("should set the initial value to the defaultColorScheme if there is an invalid value in local storage", () => {
    const localStorageKey = "colorScheme";
    localStorage.setItem(localStorageKey, "invalid");
    render(
      <LocalStorageColorSchemeProvider
        localStorageKey={localStorageKey}
        defaultColorScheme="system"
      >
        <ControllableTest />
      </LocalStorageColorSchemeProvider>
    );

    expect(screen.getByRole("checkbox", { name: "System" })).toBeChecked();
    expect(localStorage.getItem(localStorageKey)).toBe("system");
  });
});
