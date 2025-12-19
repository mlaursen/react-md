if (
  globalThis.window !== undefined &&
  typeof HTMLElement.prototype.scrollIntoView !== "function"
) {
  // this is required for keyboard movement behavior
  HTMLElement.prototype.scrollIntoView = () => {
    // do nothing
  };
}
