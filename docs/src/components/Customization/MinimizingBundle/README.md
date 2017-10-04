## Minimizing JS Bundle Size
For convenience, `react-md` exposes its full API at the top-level `react-md` import. If you are not
using ES6 modules, this will cause the entire library and its dependencies to be included in your bundle.

The simplist solution is to make sure that your babel config has `modules: false` set correctly. If you can
not use ES6 modules, you can do the following.

Assuming you are using ES2015 modules, instead of:

```js
import { LinearProgress, Card } from 'react-md';
// or even
import { LinearProgress } from 'react-md/lib/Progress';
import { Card } from 'react-md/lib/Cards';
```

use

```js
import LinearProgress from 'react-md/lib/Progress/LinearProgress';
import Card from 'react-md/lib/Cards/Card';
```

The first example will include the entire `react-md` library even if you are not using all the components.
The commented out line is a little better because it will only include the `LinearProgress` and the `CircularProgress`
components. However, if the `CircularProgress` component is actually never used, it was imported for no reason.

Anything not defined at the top level `react-md` API or documented on the website is not guaranteed to be stable
and may change without notice.

## Minimizing CSS Bundle Size
For convenience, the mixin `react-md-everything` can be used to import every component's styles. However,
when you aren't using all the components, it can bloat with unused code.

There are multiple ways to reduce the CSS size:

- Do not use `react-md-everything`. Instead use `@include react-md-COMPONENTs` for every component.
- Disable the `md-COMPONENT-include-PART` sass variable before the `react-md-everything` or provide `false`
to each component's style mixin

> NOTE: There is currently no component-dependency checks for the SCSS includes. This might be implemented
some time in the future. You will be required to make sure all the dependencies are included yourself. Sorry.

### Examples

#### Specific Component Imports

```scss
@import '~react-md/scss/react-md';

@include react-md-everything;
```

instead use

```scss
@import '~react-md/scss/react-md';

@import react-md-typography;
@import react-md-cards;
@import react-md-buttons;
@import react-md-inks;
```

#### Disabling Optional Styles

##### Global Level

```scss
@import '~react-md/scss/react-md';

$md-card-include-title-avatar: false;
$md-btn-include-flat: false;

@include react-md-everything;
```

##### Mixin Level

```scss
@import '~react-md/scss/react-md';

// Disablle title avatars and table cards
@include react-md-cards(true, true, true, false, true, false);

// Disable flat buttons
@include react-md-buttons($md-primary-color, $md-secondary-color, $md-light-theme, true, false);
```
