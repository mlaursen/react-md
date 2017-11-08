The `ResizeObserver` component is a component hook for the [ResizeObserver](http://rawgit.com/WICG/ResizeObserver/master/index.html)
using the [resize-observer-polyfill](https://github.com/que-etc/resize-observer-polyfill) for browsers that don't support it yet. The
main use-case for this component is when just a normal window resize event is not sufficient for calculating differences in sizes.

This component displays an empty `span` with `aria-hidden` to allow access to the DOM. By default it will attempt to watch changes on
its parent component, but it can be configured to watch any element by using the `target` prop.
