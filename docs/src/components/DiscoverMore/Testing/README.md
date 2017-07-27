## Testing
Right now, you _should_ be able to test your application using `react-md` with your favorite test runner.
However, if you are using [jest's snapshot testing](https://facebook.github.io/jest/docs/snapshot-testing.html)
you will run into a few problems since a couple of my components still use `findDOMNode` behind the scenes. If
you create a simple mock of the componemt, you should be able to snapshot as normal.

> Check out [427](#issues-427) for the migration status for this.

### resize-observer-polyfill
Some of the components use the `ResizeObserver` component to handle positioning calculations. Since it uses the
[resize-observer-polyfill](https://github.com/que-etc/resize-observer-polyfill) behind the scenes, you _might_
run into an error:

```bash
ReferenceError: SVGElement is not defined
  at ~/code/your-repo/node_modules/resize-observer-polyfill/dist/ResizeObserver.js:651:57
```

This error occurs since jsdom has not implemented the `SVGElement` and when running tests, the `resize-observer-polyfill`
does an _unsafe_ [check](https://github.com/que-etc/resize-observer-polyfill/blob/b0fb530f16666030577c5f252f84c95598af7330/dist/ResizeObserver.js#L641-L652)
for determining if the element is an SVG. You can do a "hack" before your test to get your tests working:

```js
global.SVGElement = Element;
```

This should allow your tests to work as expected and not crash.

> // TODO: Add more testing examples
