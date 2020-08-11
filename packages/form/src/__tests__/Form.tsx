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

  // unable to get this working right now with jsdom even with the suggestions
  // in https://github.com/jsdom/jsdom/issues/1937
  //
  // // this still throws an error
  // Object.defineProperty(HTMLFormElement.prototype, "submit", {
  //   value() {
  //     this.dispatchEvent(new Event("submit"))
  //   }
  // })
  it.todo("should prevent default form submission by default");
});
