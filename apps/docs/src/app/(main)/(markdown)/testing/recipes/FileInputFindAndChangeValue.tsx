import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.jsx";

const DEFAULT_CODE = `
import { describe, expect, it } from "{FRAMEWORK}";
import { rmdRender, screen, userEvent } from "@react-md/core/test-utils";

function Test() {
  return (
    <Form>
      <FileInput
        onChange={(event) => {
          // do something
        }}
      />
    </Form>
  );
}

describe("Test", () => {
  it("should be able to change value", async () => {
    const user = userEvent.setup();
    rmdRender(<Test />);

    const input = screen.getByLabelTest("Upload");

    const file = new File(["some-example-content"], "README.md");
    await user.upload(input, file);

    expect(input.files[0]).toBe(file);
  });
});
`;

export default function FileInputFindAndChangeValue(): ReactElement {
  return (
    <FrameworkCodeSwap
      code={DEFAULT_CODE}
      lang="tsx"
      replacement={{ jest: "@jest/globals" }}
    />
  );
}
