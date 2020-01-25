import React from "react";
import { render } from "@testing-library/react";

import Form from "../Form";

describe("Form", () => {
  it("should render correctly", () => {
    const { container } = render(
      <Form>
        <button type="submit">Submit</button>
      </Form>
    );

    expect(container).toMatchSnapshot();
  });
});
