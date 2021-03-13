import React from "react";
import { render } from "@testing-library/react";

import { TooltipInitiated } from "../useHandlers";
import { useVisiblityChange } from "../useVisibilityChange";

const onShow = jest.fn();
const onHide = jest.fn();

interface Props {
  visible: boolean;
  mode: TooltipInitiated;
}
function Test({ visible, mode }: Props): null {
  useVisiblityChange({
    mode,
    visible,
    onShow,
    onHide,
  });
  return null;
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("useVisibilityChange", () => {
  it("should trigger the onShow and onHide functions correctly", () => {
    const { rerender } = render(<Test mode={null} visible={false} />);
    expect(onShow).not.toBeCalled();
    expect(onHide).not.toBeCalled();

    rerender(<Test mode="mouse" visible />);

    expect(onShow).toBeCalledWith("mouse");
    expect(onHide).not.toBeCalled();

    rerender(<Test mode="mouse" visible={false} />);

    expect(onShow).toBeCalledWith("mouse");
    expect(onHide).toBeCalled();
  });
});
