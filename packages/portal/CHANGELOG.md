# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.8.3](https://github.com/mlaursen/react-md/compare/v2.8.2...v2.8.3) (2021-05-18)


### Documentation

* **react-md.dev:** updated tsdoc to work with `typedoc` ([cf54c35](https://github.com/mlaursen/react-md/commit/cf54c359268332245d1dad8a8d91e0476cd8cb33))






# [2.8.0](https://github.com/mlaursen/react-md/compare/v2.7.1...v2.8.0) (2021-04-22)


### Other Internal Changes

* **tsconfig:** separate tsconfig by package instead of a single root ([b278230](https://github.com/mlaursen/react-md/commit/b2782303b2a2db07eeaa25b6a3d04337976cffaa))






# [2.7.0](https://github.com/mlaursen/react-md/compare/v2.6.0...v2.7.0) (2021-02-28)


### Documentation

* **tsdoc:** fixed some tsdoc annotations and styling ([0449b86](https://github.com/mlaursen/react-md/commit/0449b86e4e51793710b35a452b7ebcbb6e7b5b2e))


### Other Internal Changes

* updated test coverage to not include conditional component PropTypes ([24e5df1](https://github.com/mlaursen/react-md/commit/24e5df14c731411d7691253383435036326407b5))






# [2.5.0](https://github.com/mlaursen/react-md/compare/v2.4.3...v2.5.0) (2020-12-15)

**Note:** Version bump only for package [@react-md/portal](../portal)

## [2.4.2](https://github.com/mlaursen/react-md/compare/v2.4.1...v2.4.2) (2020-10-23)

**Note:** Version bump only for package [@react-md/portal](../portal)

## [2.4.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.4.1) (2020-10-17)

**Note:** Version bump only for package [@react-md/portal](../portal)

# [2.4.0](https://github.com/mlaursen/react-md/compare/v2.2.2...v2.4.0) (2020-10-17)

### Features

- [@react-md/theme](../theme): Better Contrast Colors by Default and dev-utils
  refactor ([#955](https://github.com/mlaursen/react-md/issues/955))
  ([519b128](https://github.com/mlaursen/react-md/commit/519b128522de944d55ff96a1e1125447665ed586))

## [2.2.2](https://github.com/mlaursen/react-md/compare/v2.2.1...v2.2.2) (2020-09-02)

**Note:** Version bump only for package [@react-md/portal](../portal)

## [2.2.1](https://github.com/mlaursen/react-md/compare/v2.2.0...v2.2.1) (2020-09-02)

**Note:** Version bump only for package [@react-md/portal](../portal)

## [2.0.2](https://github.com/mlaursen/react-md/compare/v2.0.1...v2.0.2) (2020-06-30)

### Bug Fixes

- **LICENSE:** Removed the time range from license since it was incorrect
  ([50c9021](https://github.com/mlaursen/react-md/commit/50c9021cedc0d642758b9fd541bb6c93d2fe1786))
- Added `sideEffects` field to `package.json`
  ([31820b9](https://github.com/mlaursen/react-md/commit/31820b9b43705e5849664500a17b6849eb6dc2a9))
- `sideEffects` formatting
  ([78a7b6b](https://github.com/mlaursen/react-md/commit/78a7b6b0e40c7daefb749835670705f21bd21720))

## v2.0.1

No changes.

## v2.0.0

This was a re-write of the `Portal` component that created a "more usable" API
as well as removing temporary workarounds before the `createPortal` API was
added into React.

There is also now another new component: `ConditionalPortal` that can be used to
conditionally render children wrapped in the `Portal` component **only** when
portal props have been enabled. This will most likely be used internally between
packages though, but it is still exported and documented for external use.

### Breaking Changes

- No longer supports `react@15` and only uses the new `createPortal` API from
  `react@16+`. This major change removed all need for the following props since
  they have no DOM node to create/apply them to:
  - `style`
  - `className`
  - `component`
  - `lastChild`
  - `renderNode` (see API changes below)
- no longer supports `visible`, `onOpen`, and `onClose` props since you'll
  normally want to handle enter/exit transitions with the
  [@react-md/transition](../transition) package instead

### New API and Props

With the switch to using the `createPortal` API from React, you can create
portals by using the `into` or `intoId` props instead of using the `renderNode`
/ `lastChild` props.

If both the `into` and `intoId` props are undefined, a portal will be created
into the main `document.body` which is kind of how the API worked before when
you did not specify a `renderNode`. If the `into` or `intoId` props result in
the container being `null`, the `Portal`'s `children` will not be rendered.

The portal's `container` element will be evaluated once the component mounts as
well as each time the `into` or `intoId` props are no longer shallow equal. This
means that if you use an arrow function for the `into` prop, you _might_ want to
use the `useCallback` hook from react instead otherwise it'll re-evaluate each
time this component renders.

#### Using the `intoId` prop

The `intoId` prop is used when you want to render into a specific element on the
page by id.

```tsx
const App = () => {
  <div>
    <div id="portal-div" />
    <Portal intoId="portal-div">
      <h3>This is a portaled h3 tag!</h3>
    </Portal>
  </div>;
};
```

#### Using the `into` prop

The `into` prop can either be a `string`, `function`, an `HTMLElement`, or
`null`. If the `into` prop is a string, the portal will be created into the
result of `document.querySelector` so you can do some fancy element selecting if
you need.

```tsx
const App = () => (
  <div>
    <ul id="some-list">
      <li class="custom-class">Item 1</li>
      <li class="custom-class">Item 2</li>
      <li class="custom-class">Item 3</li>
      <li class="custom-class">Item 4</li>
      <li class="custom-class">Item 5</li>
    </ul>
    <Portal into="#some-list .custom-class:nth-child(3)">
      <h3>This is a portaled h3 tag!</h3>
    </Portal>
  </div>
);
```

If the `into` prop is a `function`, it should return an `HTMLElement` or `null`.

```tsx
const App = () => {
  // Note: this function will be called each time the Portal (and App) component
  // is rendered, so if this function is expensive to compute, you should
  // instead use `useCallback`:
  // const into = useCallback(() => { /* expensive calculation here */ }, []);
  const into = () => document.getElementById("portal-div");

  return (
    <div>
      <div id="portal-div" />
      <Portal into={into}>
        <h3>This is a portaled h3 tag!</h3>
      </Portal>
    </div>
  );
};
```

Finally, if the `into` prop is an `HTMLElement`, this will behave just like the
`renderNode` prop did before and just render into that element. This is really
just useful if you would like to use React refs or cache the portal's node
yourself in your lifecycle methods or some other way.

```tsx
const App = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div ref={ref} />
      <Portal into={this.ref.current}>
        <h3>This is a portalled h3 tag!</h3>
      </Portal>
    </>
  );
};
```

> Note: The `into` prop can be strongly typed for Typescript users with the
> `PortalInto` type.
