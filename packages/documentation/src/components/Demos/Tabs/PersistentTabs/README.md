One of the downsides about the default behavior for tabs is that when a tab is
not currently active, it will be removed from the DOM. This means that if your
component fetches data or has local state, it will be reset once the tab becomes
inactive. This means that if you want to maintain state between the tabs, you'll
need to move the state up above the `TabPanels` component and pass it down to
your panels instead.

Since this isn't always ideal, you can also enable the `persistent` flag which
will always render all the tab panels and apply the `hidden` attribute for
inactive tabs so they can't be tab focusable.
