import React from "react";
import { render } from "@testing-library/react";

import { FileInput } from "../FileInput";

describe("FileInput", () => {
  it("should render correctly", () => {
    const props = { id: "input", onChange: () => {} };
    const { container, rerender } = render(<FileInput {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<FileInput {...props}>Custom children</FileInput>);
    expect(container).toMatchSnapshot();

    rerender(
      <FileInput {...props} icon={null}>
        Custom children and no Icon
      </FileInput>
    );
    expect(container).toMatchSnapshot();
  });

  it("should only render the screen-reader only accessible Upload text if there are no children", () => {
    const props = { id: "file-input", onChange: () => {} };
    const { container, getByText, rerender } = render(<FileInput {...props} />);
    expect(() => getByText("Upload")).not.toThrow();
    expect(container.querySelector(".rmd-icon--before")).toBe(null);
    expect(container.querySelector(".rmd-icon--after")).toBe(null);

    rerender(<FileInput {...props}>Custom Children</FileInput>);
    expect(() => getByText("Upload")).toThrow();
    expect(container.querySelector(".rmd-icon--before")).not.toBe(null);
    expect(container.querySelector(".rmd-icon--after")).toBe(null);

    rerender(
      <FileInput {...props} icon={null}>
        Custom Children
      </FileInput>
    );
    expect(() => getByText("Upload")).toThrow();
    expect(container.querySelector(".rmd-icon--before")).toBe(null);
    expect(container.querySelector(".rmd-icon--after")).toBe(null);

    rerender(<FileInput {...props} icon={null} />);
    expect(() => getByText("Upload")).not.toThrow();
    expect(container.querySelector(".rmd-icon--before")).toBe(null);
    expect(container.querySelector(".rmd-icon--after")).toBe(null);
  });
});
