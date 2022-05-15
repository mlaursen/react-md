import { createRef } from "react";

import { applyRef } from "../applyRef";

const instance = document.createElement("div");

describe("applyRef", () => {
  it("should call the provided ref if it is a function", () => {
    const ref = jest.fn();

    applyRef(instance, ref);
    expect(ref).toBeCalledWith(instance);

    applyRef(null, ref);
    expect(ref).toBeCalledWith(null);
  });

  it("should update mutable ref objects", () => {
    const ref = createRef<HTMLDivElement | null>();

    expect(ref.current).toBe(null);

    applyRef(instance, ref);
    expect(ref.current).toBe(instance);

    applyRef(null, ref);
    expect(ref.current).toBe(null);
  });
});
