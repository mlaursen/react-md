import React, { ReactElement } from "react";
import cn from "classnames";
import { fireEvent, render } from "@testing-library/react";

import { DropzoneHanders, useDropzone } from "../useDropzone";

function Test(props: DropzoneHanders<HTMLElement>): ReactElement {
  const [isOver, handlers] = useDropzone(props);

  return (
    <div
      data-testid="dropzone"
      {...handlers}
      className={cn(isOver && "over")}
    />
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
});
