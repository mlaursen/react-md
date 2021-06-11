Checkboxes and radios have been implemented to behave exactly like their native
counterparts and add a slight animation when the selection state changes. Unlike
v1 of `react-md`, all checkboxes and radios can be fully uncontrolled and will
also reset correctly if a form reset button is clicked.

Checkboxes and radios can be created by either using the `Checkbox` and `Radio`
components or the `InputToggle` component. The `Checkbox` and `Radio` components
are just simple wrappers that will provide the correct `type` attribute and a
reasonable default icon to use (a material icon for the checkbox/radio as an
outline).
