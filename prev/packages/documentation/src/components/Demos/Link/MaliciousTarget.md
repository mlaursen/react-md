The `Link` component also has some built-in "security" around opening links with
`target="_blank"`. Whenever a link is updated to have `target="_blank"`, it will
automatically add a `rel="noopener norefferer"` attribute as well. You can check
out [this link](https://mathiasbynens.github.io/rel-noopener/) for some more
details about this risk.
