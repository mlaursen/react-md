Another use case for the progress components is to show the current progress
for:

- downloading files
- uploading files
- progress of finishing a task
- etc

Since most of these items have a set range to operate on, we can make these
deterministic and manually set what the current progress is.

To create a deterministic progress component, all that is needed is to provide a
`value` prop that is between the `min` and `max` prop values to calculate a
percentage.
