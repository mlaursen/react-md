import React from "react";
import { render } from "@testing-library/react";

import GridList from "../GridList";

let getBoundingClientRect: jest.SpyInstance<DOMRect, []>;
beforeAll(() => {
  getBoundingClientRect = jest.spyOn(
    HTMLElement.prototype,
    "getBoundingClientRect"
  );

  // this mock doesn't really matter other than the `width` value. just have to
  // provide all the rest for Typescript
  getBoundingClientRect.mockImplementation(() => ({
    x: 100,
    y: 100,
    bottom: 2000,
    top: 100,
    left: 100,
    right: 2000,
    height: 100,
    width: 1000,
    toJSON: () => "",
  }));
});

afterAll(() => {
  if (getBoundingClientRect) {
    getBoundingClientRect.mockRestore();
  }
});

describe("GridList", () => {
  // NOTE: jsdom currently does not support rendering custom css properties (css variables)
  // so we can't actually test that part.
  it("should provide the number of columns and cellWidth to a children render function with the default of 8 padding and 150 maxCellSize", () => {
    const children = jest.fn(({ columns, cellWidth }) => (
      <span>{`Columns: ${columns}, cellWidth: ${cellWidth}`}</span>
    ));
    const { rerender } = render(<GridList>{children}</GridList>);

    const containerWidth = 1000 - 16;

    expect(children).toBeCalledTimes(2);
    expect(children).toBeCalledWith({ cellWidth: 150, columns: -1 });
    expect(children).toBeCalledWith({
      columns: 7,
      cellWidth: containerWidth / Math.ceil(containerWidth / 150),
    });
    children.mockClear();

    rerender(<GridList maxCellSize={400}>{children}</GridList>);
    expect(children).toBeCalledTimes(2);
    // first render then it recalculates
    expect(children).toBeCalledWith({
      columns: 7,
      cellWidth: containerWidth / Math.ceil(containerWidth / 150),
    });
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
    expect(children).toBeCalledTimes(2);
    expect(children).toBeCalledWith({ columns: -1, cellWidth: 400 });
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

    expect(container).toMatchSnapshot();

    rerender(
      <GridList maxCellSize={400}>
        {({ columns, cellWidth }) => (
          <span>{`Columns: ${columns}, cellWidth: ${cellWidth}`}</span>
        )}
      </GridList>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <GridList>
        <div>This is some content!</div>
      </GridList>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <GridList maxCellSize={400}>
        <div>This is some content!</div>
      </GridList>
    );
    expect(container).toMatchSnapshot();
  });
});
