import React, { ReactElement, ReactNode } from "react";
import cn from "classnames";
import { fireEvent, render } from "@testing-library/react";

import { DropzoneHanders, useDropzone } from "../useDropzone";

function Test({
  children,
  ...options
}: DropzoneHanders<HTMLElement> & { children?: ReactNode }): ReactElement {
  const [isOver, handlers] = useDropzone(options);

  return (
    <div data-testid="dropzone" {...handlers} className={cn(isOver && "over")}>
      {children}
    </div>
  );
}

describe("useDropzone", () => {
  it("should work correctly", () => {
    const onDragOver = jest.fn();
    const onDragEnter = jest.fn();
    const onDragLeave = jest.fn();
    const onDrop = jest.fn();

    const { getByTestId } = render(
      <Test
        onDragLeave={onDragLeave}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDrop={onDrop}
      />
    );
    const dropzone = getByTestId("dropzone");
    expect(dropzone).not.toHaveClass("over");
    expect(onDragOver).not.toBeCalled();
    expect(onDragEnter).not.toBeCalled();
    expect(onDragLeave).not.toBeCalled();
    expect(onDrop).not.toBeCalled();

    fireEvent.dragEnter(dropzone);
    expect(dropzone).toHaveClass("over");
    expect(onDragOver).not.toBeCalled();
    expect(onDragEnter).toBeCalled();
    expect(onDragLeave).not.toBeCalled();
    expect(onDrop).not.toBeCalled();

    fireEvent.dragLeave(dropzone);
    expect(dropzone).not.toHaveClass("over");
    expect(onDragOver).not.toBeCalled();
    expect(onDragEnter).toBeCalled();
    expect(onDragLeave).toBeCalled();
    expect(onDrop).not.toBeCalled();

    fireEvent.dragOver(dropzone);
    expect(dropzone).toHaveClass("over");
    expect(onDragOver).toBeCalled();
    expect(onDragEnter).toBeCalled();
    expect(onDragLeave).toBeCalled();
    expect(onDrop).not.toBeCalled();

    fireEvent.drop(dropzone);
    expect(dropzone).not.toHaveClass("over");
    expect(onDragOver).toBeCalled();
    expect(onDragEnter).toBeCalled();
    expect(onDragLeave).toBeCalled();
    expect(onDrop).toBeCalled();
  });

  it("should prevent default and stop propagation", () => {
    const onDragOver = jest.fn();
    const onDragEnter = jest.fn();
    const onDragLeave = jest.fn();
    const onDrop = jest.fn();
    const { getByTestId } = render(
      <div
        data-testid="container"
        onDragLeave={onDragLeave}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Test />
      </div>
    );

    const dropzone = getByTestId("dropzone");
    fireEvent.dragEnter(dropzone);
    fireEvent.dragLeave(dropzone);
    fireEvent.dragOver(dropzone);
    fireEvent.drop(dropzone);

    expect(onDragOver).not.toBeCalled();
    expect(onDragEnter).not.toBeCalled();
    expect(onDragLeave).not.toBeCalled();
    expect(onDrop).not.toBeCalled();
  });

  it("should not disable the isOver state if a dragleave event is called on a child element", () => {
    const { getByTestId } = render(
      <Test>
        <div data-testid="child1" />
        <div data-testid="child2" />
      </Test>
    );

    const dropzone = getByTestId("dropzone");
    const child1 = getByTestId("child1");
    const child2 = getByTestId("child2");
    expect(dropzone).not.toHaveClass("over");

    fireEvent.dragEnter(dropzone);
    expect(dropzone).toHaveClass("over");

    fireEvent.dragOver(child1);
    expect(dropzone).toHaveClass("over");

    fireEvent.dragLeave(child1);
    expect(dropzone).toHaveClass("over");

    fireEvent.dragOver(child2);
    expect(dropzone).toHaveClass("over");

    fireEvent.dragLeave(dropzone);
    expect(dropzone).not.toHaveClass("over");
  });
});
