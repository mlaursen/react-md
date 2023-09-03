import { fireEvent, render, waitFor } from "@testing-library/react";
import { isElementVisible } from "@react-md/core";

import { SimpleExample } from "../SimpleExample";

describe("SimpleExample", () => {
  it("should default to single expansion, allowing all panels to be closed, no expanded ids, and apply hidden while collapsed", async () => {
    const { container, getByRole, getAllByRole } = render(<SimpleExample />);
    const panel1 = getByRole("button", { name: "Panel 1" });
    const panel2 = getByRole("button", { name: "Panel 2" });
    const panel3 = getByRole("button", { name: "Panel 3" });

    const [panel1Contents, panel2Contents, panel3Contents] =
      getAllByRole("region");

    expect(panel1).toHaveAttribute("aria-expanded", "false");
    expect(panel2).toHaveAttribute("aria-expanded", "false");
    expect(panel3).toHaveAttribute("aria-expanded", "false");
    expect(panel1Contents).toBeInTheDocument();
    expect(panel2Contents).toBeInTheDocument();
    expect(panel3Contents).toBeInTheDocument();
    expect(isElementVisible(panel1Contents)).toBe(false);
    expect(isElementVisible(panel2Contents)).toBe(false);
    expect(isElementVisible(panel3Contents)).toBe(false);
    expect(container).toMatchSnapshot();

    fireEvent.click(panel1);
    expect(panel1).toHaveAttribute("aria-expanded", "true");
    expect(panel2).toHaveAttribute("aria-expanded", "false");
    expect(panel3).toHaveAttribute("aria-expanded", "false");
    expect(isElementVisible(panel1Contents)).toBe(true);
    expect(isElementVisible(panel2Contents)).toBe(false);
    expect(isElementVisible(panel3Contents)).toBe(false);

    fireEvent.click(panel1);
    // have to wait because of the collapse transition
    await waitFor(() => {
      expect(panel1).toHaveAttribute("aria-expanded", "false");
      expect(panel2).toHaveAttribute("aria-expanded", "false");
      expect(panel3).toHaveAttribute("aria-expanded", "false");
      expect(isElementVisible(panel1Contents)).toBe(false);
      expect(isElementVisible(panel2Contents)).toBe(false);
      expect(isElementVisible(panel3Contents)).toBe(false);
    });

    fireEvent.click(panel2);
    await waitFor(() => {
      expect(panel1).toHaveAttribute("aria-expanded", "false");
      expect(panel2).toHaveAttribute("aria-expanded", "true");
      expect(panel3).toHaveAttribute("aria-expanded", "false");
      expect(isElementVisible(panel1Contents)).toBe(false);
      expect(isElementVisible(panel2Contents)).toBe(true);
      expect(isElementVisible(panel3Contents)).toBe(false);
    });

    fireEvent.click(panel3);
    await waitFor(() => {
      expect(panel1).toHaveAttribute("aria-expanded", "false");
      expect(panel2).toHaveAttribute("aria-expanded", "false");
      expect(panel3).toHaveAttribute("aria-expanded", "true");
      expect(isElementVisible(panel1Contents)).toBe(false);
      expect(isElementVisible(panel2Contents)).toBe(false);
      expect(isElementVisible(panel3Contents)).toBe(true);
    });
  });
});
