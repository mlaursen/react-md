// this polyfill was added to support the tree keyboard movement behavior
if (globalThis.window !== undefined) {
  // Based off of https://github.com/jsdom/jsdom/issues/1261#issuecomment-512217225
  //
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
  //
  // Note: offsetParent returns null in the following situations:
  //
  // - The element or any ancestor has the display property set to none.
  // - The element has the position property set to fixed (Firefox returns <body>).
  // - The element is <body> or <html>.
  Object.defineProperty(HTMLElement.prototype, "offsetParent", {
    get(this: HTMLElement) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias, unicorn/no-this-assignment
      let element: ParentNode | null = this;
      while (
        element &&
        // it'll almost always be an html element, unless using document fragments
        !(element as HTMLElement).hidden &&
        (element as HTMLElement).style?.display?.toLowerCase() !== "none"
      ) {
        element = element.parentNode;
      }

      if (
        // the current element or a parent has display: none
        element ||
        // the current element is fixed
        this.style?.position?.toLowerCase() === "fixed" ||
        this.tagName.toLowerCase() === "html" ||
        this.tagName.toLowerCase() === "body"
      ) {
        return null;
      }

      return this.parentNode;
    },
  });
}
