import React from "react";
import { render } from "@testing-library/react";

import { SliderThumb } from "../SliderThumb";

describe("SliderThumb", () => {
  it("should log an error when the id or baseId are not provided", () => {
    const error = jest.spyOn(console, "error").mockImplementation(() => {});
    const props = {
      "aria-label": "Value",
      value: 20,
      index: 0,
    } as const;
    const { rerender } = render(<SliderThumb {...props} id="slider" />);
    rerender(<SliderThumb {...props} baseId="slider" />);

    expect(error).not.toBeCalled();
    rerender(<SliderThumb {...props} />);
    expect(error).toBeCalledTimes(1);

    error.mockRestore();
  });
});
