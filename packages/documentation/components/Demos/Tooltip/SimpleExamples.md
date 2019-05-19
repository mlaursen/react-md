Tooltips are used to help add additional information to users when an element is
hovered, keyboard focused, or long-touched and are generally used alongside icon
buttons. The tooltips within `react-md` have been developed to follow the
[tooltip role](https://www.w3.org/TR/wai-aria-practices/#tooltip) even though it
is still a work in progress. This means that the `id` prop will be required for
the tooltip's container element as well as the tooltip so that an
`aria-labelledby` attribute can be correctly applied.

Once a tooltip becomes visible, it will automatically hide when:

- the browser window is blurred
- the user starts scrolling the page
- an element on the page is clicked
- escape key closes the tooltip (if the tooltip became visible via keyboard)

To create a tooltip in `react-md`, you can use the `Tooltipped` component which
will apply the required accessibility props and event handlers to show and hide
the tooltip for you. The tooltip can be positioned `"above"`, `"below"`,
`"left"`, or `"right"` relative to the container element.

> If you are on mobile, you will notice that the `"left"` and `"right"` tooltips
> below are positioned incorrectly or out of the viewport. Do not worry! Check
> out the next example about
> [auto positioning tooltips](#auto-positioning-tooltips-title).
