The biggest use case for the progress components is to show a loading indicator
while you are waiting for:

- part of a page to load
- an API call to finish
- some other async task

Since we can't determine the current progress for these types of events, we can
create indeterministic progress bars by only providing an `id` to the progress
component. However, you **should** also update the part of the page or a
component with some additional accessibility props to help assistive
technologies understand that some task us going on behind the scenes. This
package also exports a `getProgressA11y` util that will generate the
accessibility props as needed for you.

Check out the example below for two simple examples for a linear progress and a
circular progress bar that will appear and animate for 10 seconds when the
button is pressed and then hide.
