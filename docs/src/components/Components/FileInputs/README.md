The `FileInput` component is just a simple styling of the `<input type="file" />` element.
There is an additional component: `FileUpload` that helps with the local uploading of files.
Uploading a file to the server is not supported because I did not want to force a specific
Ajax implementation or force the `fetch` api polyfill.
