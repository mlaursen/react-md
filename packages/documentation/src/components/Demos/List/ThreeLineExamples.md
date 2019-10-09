List items can also be rendered as three lines of text: one line for primary
text and two lines for secondary text. This can be enabled by enabling the
`threeLines` prop which will modify the height and update the height for the
`secondaryText`.

Unfortunately, the trailing ellipsis isn't built in when a three lined list item
is used because there is no cross-browser support for this feature yet. You can
look into the [line-clamp](https://caniuse.com/#search=line-clamp) property if
you only need to support webkit browsers, but it'll fail for all the others.
