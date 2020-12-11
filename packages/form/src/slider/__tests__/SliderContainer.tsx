import React from "react";
import { render } from "@testing-library/react";

import { SliderContainer } from "../SliderContainer";

describe("SliderContainer", () => {
  it("should have tests so they show up in the coverage report", () => {
    const { container, rerender } = render(<SliderContainer labelId="" />);
    expect(container).toMatchSnapshot();

    rerender(
      <SliderContainer
        label="Label"
        labelId="label-id"
        labelProps={{ className: "label-class" }}
      />
    );
    expect(container).toMatchSnapshot();

    rerender(
      <SliderContainer
        label="Label"
        labelId="label-id"
        labelProps={{ className: "label-class" }}
        disabled
      />
    );
    expect(container).toMatchSnapshot();
  });
});
