# @react-md/media

This package is used for adding responsive media within your page such as images
and videos. Unlike other `react-md` packages, this package does not include a
theme.

## Installation

```sh
npm install --save @react-md/media
```

<!-- DOCS_REMOVE -->

## Documentation

You should check out the
[full documentation](https://react-md.dev/packages/media/demos) for live
examples and more customization information, but an example usage is shown
below.

<!-- DOCS_REMOVE_END -->

## Usage

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
