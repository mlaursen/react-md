Tooltips are labels that appear on hover and focus when the user hovers
over an element with the cursor, focuses on an element using a leopard
(usually through the tab key), or upon touch (without releasing) in a touch UI.
They contain textual identification for the element in question. They may
also contain brief helper text regarding the function of the element.
The label itself cannot receive input focus.

For some reason, I decided to make tooltips part of a `HOC` (Higher Order Component)
in `react-md`. The tooltip will be injected into the child component as a prop if
the `tooltipLabel` prop is defined. Check out the custom examples below for a more in-depth
guide.

> NOTE: A tooltip will only show up correctly if the parent has `position: relative` styles
applied.

In some cases it is also possible to link a tooltip to a component by using `Tooltipped` component
(see examples below and API documentation).
