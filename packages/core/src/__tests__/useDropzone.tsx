import { describe, expect, it, jest } from "@jest/globals";
import { cnb } from "cnbuilder";
import { type ReactElement, type ReactNode } from "react";

import { fireEvent, render, screen } from "../test-utils/index.js";
import { type DropzoneOptions, useDropzone } from "../useDropzone.js";

function Test({
  children,
  ...options
}: DropzoneOptions & { children?: ReactNode }): ReactElement {
  const { isOver, dropzoneHandlers } = useDropzone(options);

  return (
    <div
      data-testid="dropzone"
      {...dropzoneHandlers}
      className={cnb(isOver && "over")}
    >
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

    render(
      <Test
        onDragLeave={onDragLeave}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDrop={onDrop}
      />
    );
    const dropzone = screen.getByTestId("dropzone");
    expect(dropzone).not.toHaveClass("over");
    expect(onDragOver).not.toHaveBeenCalled();
    expect(onDragEnter).not.toHaveBeenCalled();
    expect(onDragLeave).not.toHaveBeenCalled();
    expect(onDrop).not.toHaveBeenCalled();

    fireEvent.dragEnter(dropzone);
    expect(dropzone).toHaveClass("over");
    expect(onDragOver).not.toHaveBeenCalled();
    expect(onDragEnter).toHaveBeenCalled();
    expect(onDragLeave).not.toHaveBeenCalled();
    expect(onDrop).not.toHaveBeenCalled();

    fireEvent.dragLeave(dropzone);
    expect(dropzone).not.toHaveClass("over");
    expect(onDragOver).not.toHaveBeenCalled();
    expect(onDragEnter).toHaveBeenCalled();
    expect(onDragLeave).toHaveBeenCalled();
    expect(onDrop).not.toHaveBeenCalled();

    fireEvent.dragOver(dropzone);
    expect(dropzone).toHaveClass("over");
    expect(onDragOver).toHaveBeenCalled();
    expect(onDragEnter).toHaveBeenCalled();
    expect(onDragLeave).toHaveBeenCalled();
    expect(onDrop).not.toHaveBeenCalled();

    fireEvent.drop(dropzone);
    expect(dropzone).not.toHaveClass("over");
    expect(onDragOver).toHaveBeenCalled();
    expect(onDragEnter).toHaveBeenCalled();
    expect(onDragLeave).toHaveBeenCalled();
    expect(onDrop).toHaveBeenCalled();
  });

  it("should prevent default and stop propagation", () => {
    const onDragOver = jest.fn();
    const onDragEnter = jest.fn();
    const onDragLeave = jest.fn();
    const onDrop = jest.fn();
    render(
      <div
        data-testid="container"
        onDragLeave={onDragLeave}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Test onDrop={() => {}} />
      </div>
    );

    const dropzone = screen.getByTestId("dropzone");
    fireEvent.dragEnter(dropzone);
    fireEvent.dragLeave(dropzone);
    fireEvent.dragOver(dropzone);
    fireEvent.drop(dropzone);

    expect(onDragOver).not.toHaveBeenCalled();
    expect(onDragEnter).not.toHaveBeenCalled();
    expect(onDragLeave).not.toHaveBeenCalled();
    expect(onDrop).not.toHaveBeenCalled();
  });

  it("should not disable the isOver state if a dragleave event is called on a child element", () => {
    render(
      <Test onDrop={() => {}}>
        <div data-testid="child1" />
        <div data-testid="child2" />
      </Test>
    );

    const dropzone = screen.getByTestId("dropzone");
    const child1 = screen.getByTestId("child1");
    const child2 = screen.getByTestId("child2");
    expect(dropzone).not.toHaveClass("over");

    fireEvent.dragEnter(dropzone);
    expect(dropzone).toHaveClass("over");

    fireEvent.dragOver(child1);
    expect(dropzone).toHaveClass("over");

    fireEvent.dragLeave(child1);
    fireEvent.dragOver(child2);
    expect(dropzone).toHaveClass("over");

    fireEvent.dragLeave(dropzone);
    expect(dropzone).not.toHaveClass("over");
  });
});
