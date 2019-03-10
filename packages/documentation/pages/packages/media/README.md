## @react-md/media

This package is used for adding responsive media within your page such as images
and videos. Unlike other `react-md` pacakges, this package does not include a
theme.

### Installation

```sh
$ npm install --save @react-md/media
```

### Including Styles

> If you have not done so already, please read the main documentation about
> #including-styles before continuing.

### Usage

```tsx
import React from "react";
import { render } from "react-dom";
import { MediaContainer, MediaOverlay } from "@react-md/media";

const App = () => (
  <div>
    <MediaContainer className="responsive-item">
      <img
        src="https://picsum.photos/400/400?random"
        role="presentation"
        alt="An image from https://picsum.photos"
      />
    </MediaContainer>
    <Media height={9} width={16}>
      <iframe
        src="https://www.youtube.com/embed/kyAn3fSs8_A"
        allowFullScreen
        frameBorder="0"
      />
    </MediaContainer>
    <MediaContainer height={9} width={16}>
      <img
        src="https://picsum.photos/800/800?image=430"
        role="presentation"
        alt="A random picture from https://picsum.photos"
      />
      <MediaOverlay position={position}>
        <h5>This is a random picture!</h5>
      </MediaOverlay>
    </MediaContainer>
  </div>
);

render(<App />, document.getElementById("root"));
```
