import { fireEvent, render, within } from "@testing-library/react";

import { SortableColumns } from "../SortableColumns";

describe("SortableColumns", () => {
  it("should work correctly", () => {
    const { getByRole } = render(<SortableColumns />);

    const sortName = getByRole("columnheader", { name: "Name" });
    const sortType = getByRole("columnheader", { name: "Type" });
    const sortCalories = getByRole("columnheader", { name: "Calories" });

    expect(sortName).toHaveAttribute("aria-sort", "ascending");
    expect(sortType).not.toHaveAttribute("aria-sort");
    expect(sortCalories).not.toHaveAttribute("aria-sort");

    fireEvent.click(within(sortType).getByRole("button"));
    expect(sortName).not.toHaveAttribute("aria-sort");
    expect(sortType).toHaveAttribute("aria-sort", "descending");
    expect(sortCalories).not.toHaveAttribute("aria-sort");

    fireEvent.click(within(sortType).getByRole("button"));
    expect(sortName).not.toHaveAttribute("aria-sort");
    expect(sortType).toHaveAttribute("aria-sort", "ascending");
    expect(sortCalories).not.toHaveAttribute("aria-sort");

    fireEvent.click(within(sortName).getByRole("button"));
    expect(sortName).toHaveAttribute("aria-sort", "ascending");
    expect(sortType).not.toHaveAttribute("aria-sort");
    expect(sortCalories).not.toHaveAttribute("aria-sort");
  });
});
