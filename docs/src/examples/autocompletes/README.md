The `Autocomplete` component comes in two forms: `Menu` and `Inline` completions.

The `Menu` completion view is default. When the user types, any filtered (or best match)
will appear in a menu. The user can then select a value by:
- Using the up and down arrow keys to select a completion and then press enter or space to select
the value
- Using the mouse or touch to select a value

The `Inline` completion view can be enabled by setting the prop `inline` to true. This will
allow a single best match to appear inline and the user can autocomplete by using the tab key.

Since there are many different ways to filter or sort data, there are only two basic filters
included. A `caseInsensitiveFilter` and a `fuzzyFilter`. They are both pretty basic so
you might want to include another library like [fuse.js](https:github.comkriskFuse) or
something else. I didn't want to force a library dependency, so it was not included.
The `Inline` completion view uses a simple find by best match ignoring case by default.
