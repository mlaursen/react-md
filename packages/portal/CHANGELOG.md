# v2.0.0-alpha.0

This was a re-write of the `Portal` component that created a "more usable" API
as well as removing temporary workarounds before the `createPortal` API was
added into React.

There is also now another new component: `ConditionalPortal` that can be used to
conditionally render children wrapped in the `Portal` component **only** when
portal props have been enabled. This will most likely be used internally between
packages though, but it is still exported and documented for external use.

## Breaking Changes

- No longer supports `react@15` and only uses the new `createPortal` API from
  `react@16+`. This major change removed all need for the following props since
  they have no DOM node to create/apply them to:
  - `style`
  - `className`
  - `component`
  - `lastChild`
  - `renderNode` (see API changes below)

## New API and Props

With the switch to using the `createPortal` API from React, you can create
portals by using the `into` or `intoId` props instead of using the `renderNode`
/ `lastChild` props.

If both the `into` and `intoId` props are undefined, a portal will be created
into the main `document.body` which is kind of how the API worked before when
you did not specify a `renderNode`.

The `into` and `intoId` props will be evaluated each time the portal's
visibility is set to `true`, so it is possible to change the portal's location
each time to create temporary nodes in your app as needed. This also means that
if you are removing elements from your page, you need to ensure that there is a
valid DOM element to be rendered into at the time the portal is visible.

### Using the `intoId` prop

The `intoId` prop is used when you want to render into a specific element on the
page by id.

```ts
const App = () => {
  <div>
    <div id="portal-div" />
    <Portal intoId="portal-div" visible>
      <h3>This is a portaled h3 tag!</h3>
    </Portal>
  </div>;
};
```

### Using the `into` prop

The `into` prop can either be a `string`, `function`, an `HTMLElement`, or
`null`. When the value is `null`, the portal will not be able to render even
when the visible prop is enabled. Once it is changed to one of the other values,
the portal will finally be created and visible. This is really just helpful if
you need to do some async work or dynamically create the node beforehand to
create your portal's node.

If the `into` prop is a string, the portal will be created into the result of
`document.querySelector` so you can do some fancy element selecting if you need.

```ts
const App = () => {
  <div>
    <ul id="some-list">
      <li class="custom-class">Item 1</li>
      <li class="custom-class">Item 2</li>
      <li class="custom-class">Item 3</li>
      <li class="custom-class">Item 4</li>
      <li class="custom-class">Item 5</li>
    </ul>
    <Portal into="#some-list .custom-class:nth-child(3)" visible>
      <h3>This is a portaled h3 tag!</h3>
    </Portal>
  </div>;
};
```

If the `into` prop is a function, that function **must** return a valid
`HTMLElement` once it is called otherwise an error will be logged in the
console.

```ts
const App = () => {
  <div>
    <div id="portal-div" />
    <Portal into={() => document.getElementById("portal-div")} visible>
      <h3>This is a portaled h3 tag!</h3>
    </Portal>
  </div>;
};
```

Finally, if the `into` prop is an `HTMLElement`, this will behave just like the
`renderNode` prop did before and just render into that element. This is really
just useful if you would like to use React refs or cache the portal's node
yourself in your lifecycle methods or some other way.

```ts
class App extends React.Component {
  private ref = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    window.setTimeout(() => {
      this.setState({ visible: true });
    }, 1000);
  }

  public render() {
    return (
      <div>
        <div id={this.ref} />
        <Portal into={this.ref.current} visible={this.state.visible}>
          <h3>This is a portaled h3 tag!</h3>
        </Portal>
      </div>
    );
  }
}
```
