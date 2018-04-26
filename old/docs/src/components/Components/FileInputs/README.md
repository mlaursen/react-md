The `FileInput` component is just a simple styling of the `<input type="file" />` element
by making it display as a button. When you want to do in-browser uploads, you can use the
additional `FileUpload` component to hook into the API. Unfortunately the uploading to
a server is not built in to the component since there are many different ways to upload
and it didn't seem worth implementing all the logic for one way. However, there **is**
an example below of using the `fetch` API and `FormData` to upload files to my documentation
server as a guideline.
