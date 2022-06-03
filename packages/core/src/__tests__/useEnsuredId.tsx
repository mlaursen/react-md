import { render } from "@testing-library/react";
import type { ReactElement } from "react";

import { useEnsuredId } from "../useEnsuredId";

function Test(props: { id?: string }): ReactElement {
  return <div data-testid="test" id={useEnsuredId(props.id, "test")} />;
}

describe("useEnsuredId", () => {
  it("should return the propId if it is defined", () => {
    const { getByTestId } = render(<Test id="my-test-id" />);
    const test = getByTestId("test");

    expect(test).toHaveAttribute("id", "my-test-id");
  });

  it("should return an auto-generated id with the component name prefixed", () => {
    const { NODE_ENV } = process.env;
    expect(NODE_ENV).toBe("test");

    // this is caused by next defining process.env.NODE_ENV as readonly 'development' | 'production' | 'test'
    // @ts-expect-error
    process.env.NODE_ENV = "development";
    const { getByTestId } = render(<Test />);
    const test = getByTestId("test");

    expect(test.id).toMatch(/^test-.+$/);
    // @ts-expect-error
    process.env.NODE_ENV = NODE_ENV;
  });

  it("should use an indexed id while running in tests", () => {
    expect(process.env.NODE_ENV).toBe("test");
    function MultiTest(): ReactElement {
      return (
        <>
          <Test />
          <Test />
          <Test />
          <Test />
          <Test />
        </>
      );
    }
    const { getAllByTestId, rerender, unmount } = render(<MultiTest />);
    let tests = getAllByTestId("test");
    expect(tests.length).toBe(5);

    let [test1, test2, test3, test4, test5] = tests;
    expect(test1.id).toBe("test-ensured-id-1");
    expect(test2.id).toBe("test-ensured-id-2");
    expect(test3.id).toBe("test-ensured-id-3");
    expect(test4.id).toBe("test-ensured-id-4");
    expect(test5.id).toBe("test-ensured-id-5");

    rerender(<MultiTest />);
    tests = getAllByTestId("test");
    expect(tests.length).toBe(5);

    [test1, test2, test3, test4, test5] = tests;
    expect(test1.id).toBe("test-ensured-id-1");
    expect(test2.id).toBe("test-ensured-id-2");
    expect(test3.id).toBe("test-ensured-id-3");
    expect(test4.id).toBe("test-ensured-id-4");
    expect(test5.id).toBe("test-ensured-id-5");

    unmount();
    const { getAllByTestId: getAllByTestId2 } = render(<MultiTest />);
    tests = getAllByTestId2("test");
    expect(tests.length).toBe(5);

    [test1, test2, test3, test4, test5] = tests;
    expect(test1.id).toBe("test-ensured-id-6");
    expect(test2.id).toBe("test-ensured-id-7");
    expect(test3.id).toBe("test-ensured-id-8");
    expect(test4.id).toBe("test-ensured-id-9");
    expect(test5.id).toBe("test-ensured-id-10");
  });
});
