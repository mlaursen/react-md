import userEvent_ from "@testing-library/user-event";

// const userEvent_ = userEvent.default;

const userEvent = userEvent_ as unknown as typeof userEvent_.default;

export { userEvent };
export * from "@testing-library/react";
export * from "@testing-library/user-event";

export * from "./IntersectionObserver.js";
export * from "./ResizeObserver.js";
export * from "./matchMedia.js";
export * from "./render.js";
export * from "./timers.js";
