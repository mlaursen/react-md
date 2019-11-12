Material design Ink is used to show that an element has been touched, clicked or
has focus.

Ink can be disabled on an app level by defining either `inkDisabled` or
`inkDisabledInteractions` as a context type. Example:

```js
import inkContextTypes from "react-md/lib/Inks/inkContextTypes";

class App extends React.Component {
  static childContextTypes = inkContextTypes;
  getChildContext() {
    // Only disable the mouse and keyboard ink effects
    // return { inkDisabledInteractions: ['mouse', 'keyboard'] };

    // Any ink interaction is disabled
    return { inkDisabled: true };
  }
}
```

See the [inkDisabled](/components/inks?tab=1#inject-ink-proptypes-ink-disabled)
and
[disabledInteractions](/components/inks?tab=1#inject-ink-proptypes-disabled-interactions)
