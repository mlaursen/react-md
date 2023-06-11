// this is required for keyboard movement behavior
if (
  typeof window !== "undefined" &&
  typeof HTMLElement.prototype.scrollIntoView !== "function"
) {
  HTMLElement.prototype.scrollIntoView = () => {
    // do nothing
  };
}
