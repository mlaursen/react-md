import { describe, expect, it, jest } from "@jest/globals";
import { type ChangeEvent, type ReactElement } from "react";
import { render, screen } from "../../test-utils/index.js";

import { type UseStateSetter } from "../../types.js";
import { LocalStorageColorSchemeProvider } from "../LocalStorageColorSchemeProvider.js";
import {
  useColorScheme,
  type ColorScheme,
  type ColorSchemeMode,
} from "../useColorScheme.js";

function ControllableTest(): ReactElement {
  const { colorScheme, colorSchemeMode, setColorSchemeMode } = useColorScheme();

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget;
    if (value === "light" || value === "dark" || value === "system") {
      setColorSchemeMode(value);
    }
  };

  return (
    <>
      <span data-testid="color-scheme">{colorScheme}</span>
      <label>
        Light
        <input
          type="checkbox"
          value="light"
          checked={colorSchemeMode === "light"}
          onChange={onChange}
        />
      </label>
      <label>
        Dark
        <input
          type="checkbox"
          value="dark"
          checked={colorSchemeMode === "dark"}
          onChange={onChange}
        />
      </label>
      <label>
        System
        <input
          type="checkbox"
          value="system"
          checked={colorSchemeMode === "system"}
          onChange={onChange}
        />
      </label>
    </>
  );
}

describe("LocalStorageColorSchemeProvider", () => {
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

  it("should throw an error if the setColorSchemeMode from the useColorScheme hook is used without a ColorSchemeProvider", () => {
    let setColorSchemeMode: UseStateSetter<ColorSchemeMode> | undefined;
    function Test(): null {
      ({ setColorSchemeMode } = useColorScheme());
      return null;
    }

    jest.spyOn(console, "error").mockImplementation(() => {});
    render(<Test />);

    expect(() => setColorSchemeMode?.("dark")).toThrow(
      "The `ColorSchemeProvider` has not been initialized."
    );
  });

  it("should return dark when the mode is system and the prefers-color-scheme media query matches dark", () => {
    const onchange = jest.fn();
    const addListener = jest.fn();
    const addEventListener = jest.fn();
    const removeListener = jest.fn();
    const removeEventListener = jest.fn();
    const dispatchEvent = jest.fn(() => false);

    const baseQueryList: Omit<MediaQueryList, "matches"> = {
      media: "",
      onchange,
      addListener,
      addEventListener,
      removeEventListener,
      removeListener,
      dispatchEvent,
    };

    const matchMedia = jest
      .spyOn(window, "matchMedia")
      .mockImplementation((query) => ({
        matches: query.includes("dark"),
        ...baseQueryList,
      }));

    let colorScheme: ColorScheme | undefined;
    function Test(): null {
      ({ colorScheme } = useColorScheme());

      return null;
    }

    render(
      <LocalStorageColorSchemeProvider defaultColorSchemeMode="system">
        <Test />
      </LocalStorageColorSchemeProvider>
    );

    expect(colorScheme).toBe("dark");
    expect(matchMedia).toHaveBeenCalledWith("(prefers-color-scheme: dark)");
    expect(matchMedia).toHaveBeenCalledTimes(2);
  });

  it("should set the initial value to the stored value in local storage if it is valid", () => {
    const localStorageKey = "colorScheme";
    localStorage.setItem(localStorageKey, "light");
    render(
      <LocalStorageColorSchemeProvider
        localStorageKey={localStorageKey}
        defaultColorSchemeMode="system"
      >
        <ControllableTest />
      </LocalStorageColorSchemeProvider>
    );

    expect(screen.getByRole("checkbox", { name: "Light" })).toBeChecked();
    expect(localStorage.getItem(localStorageKey)).toBe("light");
  });

  it("should set the initial value to the defaultColorSchemeMode if there is an invalid value in local storage", () => {
    const localStorageKey = "colorScheme";
    localStorage.setItem(localStorageKey, "invalid");
    render(
      <LocalStorageColorSchemeProvider
        localStorageKey={localStorageKey}
        defaultColorSchemeMode="system"
      >
        <ControllableTest />
      </LocalStorageColorSchemeProvider>
    );

    expect(screen.getByRole("checkbox", { name: "System" })).toBeChecked();
    expect(localStorage.getItem(localStorageKey)).toBe("system");
  });
});
