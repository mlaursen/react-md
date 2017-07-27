export default `
Minimize visual changes that occur while your app loads content by representing each operation
with a single activity indicator. For example, a refresh operation should display either a
refresh bar or an activity circle, but not both.

When using a progress bar, it is recommended to follow the guide for the
[Progress Bar Role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_progressbar_role).

> TL;DR: If the progressbar is describing the loading progress of a particular region of a page, the author **SHOULD** use
\`aria-describedby\` to point to the status, and set the \`aria-busy\` attribute to true on the region until it is finished loading.
It is not possible for the user to alter the value of a progressbar because it is always readonly.

#### Other Examples
The [FileUpload examples](/components/file-inputs#file-upload-example) are also another good resource for looking at using progress bars.

#### Progress Types
`;
