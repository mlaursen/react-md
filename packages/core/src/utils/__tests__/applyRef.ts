import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { applyRef } from "../applyRef.js";

const instance = document.createElement("div");

describe("applyRef", () => {
  it("should call the provided ref if it is a function", () => {
    const ref = vi.fn();

    applyRef(instance, ref);
    expect(ref).toHaveBeenCalledWith(instance);

    applyRef(null, ref);
    expect(ref).toHaveBeenCalledWith(null);
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
