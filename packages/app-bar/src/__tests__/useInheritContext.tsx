import React, { MutableRefObject, ReactElement, ReactNode } from "react";
import { renderHook } from "@testing-library/react-hooks";
import { render } from "@testing-library/react";

import { useInheritContext, InheritContext } from "../useInheritContext";

describe("useInheritContext", () => {
  it("should default to false", () => {
    const { result } = renderHook(() => useInheritContext(undefined));
    expect(result.current).toBe(false);
  });

  it("should update to true based on the InheritContext", () => {
    const result: MutableRefObject<boolean | undefined> = {
      current: undefined,
    };

    function Context({ children }: { children: ReactNode }): ReactElement {
      return (
        <InheritContext.Provider value>{children}</InheritContext.Provider>
      );
    }

    const Test1 = () => {
      result.current = useInheritContext(undefined);
      return null;
    };

    const Test2 = () => {
      result.current = useInheritContext(false);
      return null;
    };
    const Test3 = () => {
      result.current = useInheritContext(true);
      return null;
    };

    render(
      <Context>
        <Test1 />
      </Context>
    );
    expect(result.current).toBe(true);
    result.current = undefined;

    render(
      <Context>
        <Test2 />
      </Context>
    );
    expect(result.current).toBe(false);
    result.current = undefined;

    render(
      <Context>
        <Test3 />
      </Context>
    );
    expect(result.current).toBe(true);
    result.current = undefined;

    render(<Test2 />);
    expect(result.current).toBe(false);
    result.current = undefined;

    render(<Test3 />);
    expect(result.current).toBe(true);
    result.current = undefined;
  });
});
