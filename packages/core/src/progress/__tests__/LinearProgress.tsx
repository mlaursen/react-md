import { render } from "@testing-library/react";

import { LinearProgress } from "../LinearProgress";

describe("LinearProgress", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(<LinearProgress />);

    expect(container).toMatchSnapshot();

    rerender(<LinearProgress vertical />);
    expect(container).toMatchSnapshot();

    rerender(<LinearProgress vertical verticalHeight={null} />);
    expect(container).toMatchSnapshot();

    rerender(<LinearProgress vertical verticalHeight={300} />);
    expect(container).toMatchSnapshot();

    rerender(<LinearProgress reverse />);
    expect(container).toMatchSnapshot();

    rerender(<LinearProgress value={30} />);
    expect(container).toMatchSnapshot();

    rerender(<LinearProgress value={30} reverse />);
    expect(container).toMatchSnapshot();

    rerender(<LinearProgress value={30} vertical />);
    expect(container).toMatchSnapshot();

    rerender(<LinearProgress value={30} vertical reverse />);
    expect(container).toMatchSnapshot();

    rerender(<LinearProgress id="custom-id" />);
    expect(container).toMatchSnapshot();
  });
});