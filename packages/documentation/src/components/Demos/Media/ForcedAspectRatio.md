Sometimes it can be helpful to enforce a specific aspect ratio so that a general
layout can be used even if images are different sizes. This is helpful when
users can upload content without a specific resolution or when you have no
control over the size of the content.

`react-md` creates styles for the following aspect ratios by default:

- `16:9`
- `4:3`
- `1:1`

but this can be changed from by the
[\$rmd-media-default-aspect-ratios](sassdoc#media-variable-rmd-media-default-aspect-ratios)
SCSS variable. To enforce an aspect ratio, you need to update the
`MediaContainer` component to just use the `height` and `width` props to create
that aspect ratio.
