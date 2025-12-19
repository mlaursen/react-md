import lzString from "lz-string";
import { type ReactElement, useEffect } from "react";
import { afterEach, describe, expect, it } from "vitest";

import { SsrProvider } from "../../SsrProvider.js";
import { Button } from "../../button/Button.js";
import {
  act,
  fireEvent,
  render,
  screen,
  userEvent,
} from "../../test-utils/index.js";
import { type StorageDeserializer } from "../types.js";
import { useStorage } from "../useStorage.js";

const TEST_KEY = "test-key";

describe("useStorage", () => {
  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("should support storing objects using JSON.stringify", () => {
    interface Value {
      a: string;
      b: number;
      c: string[];
      d: { label: string; value: 3 }[];
      e: boolean;
    }

    const defaultValue: Value = {
      a: "welcome",
      b: -1,
      c: ["a"],
      d: [{ label: "Label", value: 3 }],
      e: true,
    };

    function Test(): ReactElement {
      const { value, setValue, remove } = useStorage({
        key: TEST_KEY,
        defaultValue,
      });

      useEffect(() => {
        return () => {
          remove();
        };
      }, [remove]);

      return (
        <>
          <table>
            <thead>
              <tr>
                <th>a</th>
                <th>b</th>
                <th>c</th>
                <th>d</th>
                <th>e</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{value.a}</td>
                <td>{value.b}</td>
                <td>{value.c.join(", ")}</td>
                <td>{JSON.stringify(value.d)}</td>
                <td>{`${value.e}`}</td>
              </tr>
            </tbody>
          </table>
          <Button
            onClick={() => {
              setValue((prevValue) => ({ ...prevValue, b: 0 }));
            }}
          >
            Button
          </Button>
        </>
      );
    }

    expect(localStorage.getItem(TEST_KEY)).toBe(null);
    const { unmount } = render(<Test />);
    const cells = screen.getAllByRole("cell");
    expect(cells).toHaveLength(5);

    const [a, b, c, d, e] = cells;
    expect(a).toHaveTextContent("welcome");
    expect(b).toHaveTextContent("-1");
    expect(c).toHaveTextContent("a");
    expect(d).toHaveTextContent(JSON.stringify([{ label: "Label", value: 3 }]));
    expect(e).toHaveTextContent("true");

    expect(localStorage.getItem(TEST_KEY)).toBe(JSON.stringify(defaultValue));

    fireEvent.click(screen.getByRole("button", { name: "Button" }));
    expect(a).toHaveTextContent("welcome");
    expect(b).toHaveTextContent("0");
    expect(c).toHaveTextContent("a");
    expect(d).toHaveTextContent(JSON.stringify([{ label: "Label", value: 3 }]));
    expect(e).toHaveTextContent("true");
    expect(localStorage.getItem(TEST_KEY)).toBe(
      JSON.stringify({ ...defaultValue, b: 0 })
    );

    unmount();
    expect(localStorage.getItem(TEST_KEY)).toBe(null);
  });

  it("should support storing numbers as-is", () => {
    function Test(): ReactElement {
      const { value, setValue } = useStorage({
        key: TEST_KEY,
        defaultValue: -1,
      });

      if (typeof value !== "number") {
        throw new TypeError("Value is not a number");
      }

      return (
        <>
          <div data-testid="value">{value}</div>
          <Button
            onClick={() => {
              setValue(100);
            }}
          >
            Should Work
          </Button>
          <Button
            onClick={() => {
              // @ts-expect-error
              setValue("100");
            }}
          >
            Should Fail
          </Button>
        </>
      );
    }

    render(<Test />);
    const value = screen.getByTestId("value");
    expect(value).toHaveTextContent("-1");

    const shouldWork = screen.getByRole("button", { name: "Should Work" });
    fireEvent.click(shouldWork);
    expect(value).toHaveTextContent("100");
    expect(localStorage.getItem(TEST_KEY)).toBe("100");
  });

  it("should support a custom serializer and deserializer", () => {
    interface Value {
      value: string;
    }
    const defaultValue: Value = { value: "" };

    // this is just one example of using it
    function Test(): ReactElement {
      const { value, setValue } = useStorage<Value>({
        key: TEST_KEY,
        defaultValue,
        serializer: (value) => lzString.compress(JSON.stringify(value)),
        deserializer: (item) => JSON.parse(lzString.decompress(item)),
      });

      return (
        <>
          <div data-testid="value">{JSON.stringify(value)}</div>
          <Button
            onClick={() => {
              setValue({ value: "next value!" });
            }}
          >
            Button
          </Button>
        </>
      );
    }

    render(<Test />);
    const value = screen.getByTestId("value");
    const button = screen.getByRole("button", { name: "Button" });
    expect(value).toHaveTextContent(JSON.stringify(defaultValue));
    expect(localStorage.getItem(TEST_KEY)).toBe(
      lzString.compress(JSON.stringify(defaultValue))
    );

    fireEvent.click(button);
    const nextValue: Value = { value: "next value!" };
    expect(value).toHaveTextContent(JSON.stringify(nextValue));
    expect(localStorage.getItem(TEST_KEY)).toBe(
      lzString.compress(JSON.stringify(nextValue))
    );
  });

  it("should support a custom deserializer to prevent invalid data from being provided", () => {
    interface Schema {
      username: string;
      birth_year: number;
      email: string;
    }

    const DEFAULT_VALUE: Schema = {
      username: "username",
      birth_year: 1950,
      email: "hello@example.com",
    };

    const deserializer: StorageDeserializer<Schema> = (item) => {
      const value = JSON.parse(item);
      let { username, birth_year, email } = value;

      // pretend like there is some _real_ validation. could be useful to verify
      // that stored values match specific lists or something
      if (
        typeof username !== "string" ||
        !["existing username", "username"].includes(username)
      ) {
        ({ username } = DEFAULT_VALUE);
      }

      if (typeof birth_year === "string") {
        try {
          birth_year = Number.parseInt(birth_year, 10);
          if (Number.isNaN(birth_year)) {
            throw new TypeError("birth_year is not a number");
          }
        } catch {
          ({ birth_year } = DEFAULT_VALUE);
        }
      }

      if (typeof birth_year !== "number") {
        ({ birth_year } = DEFAULT_VALUE);
      }

      if (typeof email !== "string") {
        ({ email } = DEFAULT_VALUE);
      }

      return {
        username,
        birth_year,
        email,
      };
    };

    localStorage.setItem(
      TEST_KEY,
      JSON.stringify({
        username: "existing username",
        birth_year: "1980",
        email: -1,
      })
    );

    function Test(): ReactElement {
      const { value } = useStorage({
        key: TEST_KEY,
        defaultValue: DEFAULT_VALUE,
        deserializer,
      });

      return <div data-testid="value">{JSON.stringify(value)}</div>;
    }

    render(<Test />);
    const value = screen.getByTestId("value");
    expect(value).toHaveTextContent(
      JSON.stringify({
        username: "existing username",
        birth_year: 1980,
        email: "hello@example.com",
      })
    );
    expect(localStorage.getItem(TEST_KEY)).toBe(
      JSON.stringify({
        username: "existing username",
        birth_year: 1980,
        email: "hello@example.com",
      })
    );
  });

  it("should support manually persisting the value", () => {
    function Test(): ReactElement {
      const { value, setValue, persist, remove } = useStorage({
        key: TEST_KEY,
        manual: true,
        defaultValue: "",
      });
      return (
        <>
          <Button
            onClick={() => {
              setValue("value");
            }}
          >
            Set Value
          </Button>
          <Button onClick={persist}>Persist</Button>
          <Button onClick={remove}>Remove</Button>
          <div data-testid="value">{value}</div>
        </>
      );
    }

    render(<Test />);
    const value = screen.getByTestId("value");
    const setValue = screen.getByRole("button", { name: "Set Value" });
    const remove = screen.getByRole("button", { name: "Remove" });
    const persist = screen.getByRole("button", { name: "Persist" });

    expect(value).toBeEmptyDOMElement();
    expect(localStorage.length).toBe(0);

    fireEvent.click(setValue);
    expect(value).toHaveTextContent("value");
    expect(localStorage.length).toBe(0);

    fireEvent.click(persist);
    expect(localStorage.length).toBe(1);
    expect(localStorage.getItem(TEST_KEY)).toBe("value");

    fireEvent.click(remove);
    expect(localStorage.length).toBe(0);
    expect(localStorage.getItem(TEST_KEY)).toBe(null);
  });

  it("should update the value for storage events", () => {
    function Test(): ReactElement {
      const { value } = useStorage({
        key: TEST_KEY,
        defaultValue: "",
      });
      return <div data-testid="value">{value}</div>;
    }

    render(<Test />);
    const value = screen.getByTestId("value");
    expect(value).toBeEmptyDOMElement();

    act(() => {
      // don't really know a good way to test this part
      localStorage.setItem(TEST_KEY, '"storage event value"');
      globalThis.dispatchEvent(
        new StorageEvent("storage", {
          key: TEST_KEY,
          oldValue: "",
          newValue: "storage event value",
          storageArea: localStorage,
        })
      );
    });
    expect(value).toHaveTextContent("storage event value");
  });

  it("should skip updating the value for storage events if the key or storageArea do not match", () => {
    function Test(): ReactElement {
      const { value } = useStorage({
        key: TEST_KEY,
        defaultValue: "",
      });
      return <div data-testid="value">{value}</div>;
    }

    render(<Test />);
    const value = screen.getByTestId("value");
    expect(value).toBeEmptyDOMElement();

    act(() => {
      // don't really know a good way to test this part
      localStorage.setItem(TEST_KEY, '"storage event value"');
      globalThis.dispatchEvent(
        new StorageEvent("storage", {
          key: TEST_KEY,
          oldValue: "",
          newValue: "storage event value",
          storageArea: sessionStorage,
        })
      );
    });
    expect(value).toBeEmptyDOMElement();

    act(() => {
      // don't really know a good way to test this part
      localStorage.setItem(TEST_KEY + "INVALID", '"storage event value"');
      globalThis.dispatchEvent(
        new StorageEvent("storage", {
          key: TEST_KEY + "INVALID",
          oldValue: "",
          newValue: "storage event value",
          storageArea: localStorage,
        })
      );
    });
    expect(value).toBeEmptyDOMElement();
  });

  it("should work correctly in SSR mode", () => {
    let initialValue: string | null = null;
    function Test(): ReactElement {
      const { value } = useStorage({
        key: TEST_KEY,
        defaultValue: "",
      });

      if (initialValue === null) {
        initialValue = value;
      }

      return <div data-testid="value">{value}</div>;
    }

    localStorage.setItem(TEST_KEY, "stored value");
    render(
      <SsrProvider ssr>
        <Test />
      </SsrProvider>
    );

    const value = screen.getByTestId("value");
    expect(initialValue).toBe("");
    expect(value).toHaveTextContent("stored value");
  });

  it("should support session storage", async () => {
    const user = userEvent.setup();

    function Test(): ReactElement {
      const { value, setValue } = useStorage({
        key: TEST_KEY,
        storage: sessionStorage,
        defaultValue: "Hello, world!",
      });

      return (
        <>
          <div data-testid="value">{value}</div>
          <Button
            onClick={() => {
              setValue("next value!");
            }}
          >
            Button
          </Button>
        </>
      );
    }

    render(<Test />);
    const value = screen.getByTestId("value");
    expect(value).toHaveTextContent("Hello, world!");
    expect(localStorage.getItem("TEST_KEY")).toBe(null);
    expect(sessionStorage.getItem(TEST_KEY)).toBe("Hello, world!");

    await user.click(screen.getByRole("button", { name: "Button" }));
    expect(localStorage.getItem("TEST_KEY")).toBe(null);
    expect(sessionStorage.getItem(TEST_KEY)).toBe("next value!");
  });

  it("should act as a normal useState hook if the key is an empty string", async () => {
    function Test(): ReactElement {
      const { value, setValue } = useStorage({ key: "", defaultValue: "" });

      return (
        <>
          <div data-testid="value">{value}</div>
          <Button onClick={() => setValue("next value!")}>Button</Button>
        </>
      );
    }

    const user = userEvent.setup();
    render(<Test />);

    const value = screen.getByTestId("value");
    const button = screen.getByRole("button", { name: "Button" });
    expect(value).toBeEmptyDOMElement();
    expect(localStorage.length).toBe(0);

    act(() => {
      // don't really know a good way to test this part
      localStorage.setItem(TEST_KEY, '"storage event value"');
      globalThis.dispatchEvent(
        new StorageEvent("storage", {
          key: TEST_KEY,
          oldValue: "",
          newValue: "storage event value",
          storageArea: localStorage,
        })
      );
    });
    expect(value).toBeEmptyDOMElement();
    expect(localStorage.length).toBe(1);
    expect(localStorage.getItem(TEST_KEY)).toBe('"storage event value"');

    await user.click(button);
    expect(value).toHaveTextContent("next value!");
    expect(localStorage.length).toBe(1);
    expect(localStorage.getItem(TEST_KEY)).toBe('"storage event value"');
  });
});
