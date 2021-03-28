/* eslint-disable no-underscore-dangle */
import React from "react";
import { act, render } from "@testing-library/react";
import { ResizeObserver } from "@juggle/resize-observer";
import { mocked } from "ts-jest/utils";

import { GridList } from "../GridList";
import { useGridListSize } from "../useGridList";

jest.mock("@juggle/resize-observer");

const ResizeObserverMock = mocked(ResizeObserver);

const DEFAULT_DOM_RECT: DOMRectReadOnly = {
  x: 100,
  y: 100,
  bottom: 2000,
  top: 100,
  left: 100,
  right: 2000,
  height: 100,
  width: 1000,
  toJSON: () => "",
};

class MockedObserver implements ResizeObserver {
  public _callback: ResizeObserverCallback;

  public _elements: Element[];

  public constructor(callback: ResizeObserverCallback) {
    this._elements = [];
    this._callback = callback;
  }

  public observe(target: Element): void {
    this._elements.push(target);
  }

  public unobserve(target: Element): void {
    this._elements = this._elements.filter((el) => el !== target);
  }

  public disconnect(): void {
    this._elements = [];
  }

  public trigger(rect: Partial<DOMRectReadOnly> = {}) {
    const contentRect: DOMRectReadOnly = {
      ...rect,
      ...DEFAULT_DOM_RECT,
    };

    act(() => {
      this._callback(
        this._elements.map((target) => ({
          target,
          contentRect,
          borderBoxSize: [],
          contentBoxSize: [],
        })),
        this
      );
    });
  }
}

let observer: MockedObserver | undefined;
let getBoundingClientRect: jest.SpyInstance<DOMRect, []>;
beforeAll(() => {
  ResizeObserverMock.mockImplementation((callback) => {
    // @ts-ignore
    observer = new MockedObserver(callback);
    return observer;
  });

  getBoundingClientRect = jest.spyOn(
    HTMLElement.prototype,
    "getBoundingClientRect"
  );

  // this mock doesn't really matter other than the `width` value. just have to
  // provide all the rest for Typescript
  getBoundingClientRect.mockImplementation(() => ({
    ...DEFAULT_DOM_RECT,
    toJSON: () => "",
  }));
});

beforeEach(() => {
  observer?.disconnect();
});

afterAll(() => {
  ResizeObserverMock.mockRestore();

  if (getBoundingClientRect) {
    getBoundingClientRect.mockRestore();
  }
});

function trigger(width: number = DEFAULT_DOM_RECT.width): void {
  act(() => {
    if (!observer) {
      throw new Error();
    }

    observer.trigger({ width });
  });
}

describe("GridList", () => {
  // NOTE: jsdom currently does not support rendering custom css properties (css variables)
  // so we can't actually test that part.
  it("should provide the number of columns and cellWidth to a children render function with the default of 8 padding and 150 maxCellSize", () => {
    const children = jest.fn(({ columns, cellWidth }) => (
      <span>{`Columns: ${columns}, cellWidth: ${cellWidth}`}</span>
    ));
    const { rerender } = render(<GridList>{children}</GridList>);

    const containerWidth = 1000 - 16;

    expect(children).toBeCalledTimes(1);
    expect(children).toBeCalledWith({ cellWidth: 150, columns: -1 });

    trigger(containerWidth);

    expect(children).toBeCalledTimes(2);
    expect(children).toBeCalledWith({
      columns: 7,
      cellWidth: containerWidth / Math.ceil(containerWidth / 150),
    });
    children.mockClear();

    rerender(<GridList maxCellSize={400}>{children}</GridList>);
    expect(children).toBeCalledTimes(1);
    // first render then it recalculates
    expect(children).toBeCalledWith({
      columns: 7,
      cellWidth: containerWidth / Math.ceil(containerWidth / 150),
    });

    trigger(containerWidth);

    expect(children).toBeCalledWith({
      columns: 3,
      cellWidth: containerWidth / Math.ceil(containerWidth / 400),
    });
  });

  it("should provide the number of columns and cellWidth to a children render function with a custom maxCellSize", () => {
    const containerWidth = 1000 - 16;
    const children = jest.fn(({ columns, cellWidth }) => (
      <span>{`Columns: ${columns}, cellWidth: ${cellWidth}`}</span>
    ));

    render(<GridList maxCellSize={400}>{children}</GridList>);
    expect(children).toBeCalledTimes(1);
    expect(children).toBeCalledWith({ columns: -1, cellWidth: 400 });

    trigger(containerWidth);
    expect(children).toBeCalledTimes(2);
    expect(children).toBeCalledWith({
      columns: 3,
      cellWidth: containerWidth / Math.ceil(containerWidth / 400),
    });
  });

  it("should render correctly... (lazy test)", () => {
    const { container, rerender } = render(
      <GridList>
        {({ columns, cellWidth }) => (
          <span>{`Columns: ${columns}, cellWidth: ${cellWidth}`}</span>
        )}
      </GridList>
    );
    trigger();

    expect(container).toMatchSnapshot();

    rerender(
      <GridList maxCellSize={400}>
        {({ columns, cellWidth }) => (
          <span>{`Columns: ${columns}, cellWidth: ${cellWidth}`}</span>
        )}
      </GridList>
    );
    trigger();
    expect(container).toMatchSnapshot();

    rerender(
      <GridList>
        <div>This is some content!</div>
      </GridList>
    );
    trigger();
    expect(container).toMatchSnapshot();

    rerender(
      <GridList maxCellSize={400}>
        <div>This is some content!</div>
      </GridList>
    );
    trigger();
    expect(container).toMatchSnapshot();
  });

  it("should allow for the current cellWidth to be accessed with the useGridListSize hook", () => {
    const Child = () => {
      const size = useGridListSize();

      return <div data-testid="child">{JSON.stringify(size)}</div>;
    };

    const { getByTestId } = render(
      <GridList>
        <Child />
      </GridList>
    );
    trigger();
    const child = getByTestId("child");
    expect(child).toMatchInlineSnapshot(`
      <div
        data-testid="child"
      >
        {"cellWidth":140.57142857142858,"columns":7}
      </div>
    `);
  });

  it("should provide -1 if the useGridListSize hook is used without a parent GridList component", () => {
    const Child = () => {
      const size = useGridListSize();

      return <div data-testid="child">{JSON.stringify(size)}</div>;
    };

    const { getByTestId } = render(<Child />);
    const child = getByTestId("child");
    expect(child).toMatchInlineSnapshot(`
      <div
        data-testid="child"
      >
        {"columns":-1,"cellWidth":-1}
      </div>
    `);
  });
});
