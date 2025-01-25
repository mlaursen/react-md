/**
 * @see https://github.com/testing-library/user-event/blob/d42954be66484bcf78486a298cc37f8a7c9e4bea/src/utils/dataTransfer/FileList.ts
 */
export function createFileList(
  window: Window & typeof globalThis,
  fileOrFiles: File | readonly File[]
): FileList & Iterable<File> {
  const files = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles];
  const fileList: FileList & Iterable<File> = {
    ...files,
    length: files.length,
    item: (index) => fileList[index],
    // needs to be `any` to match the FileList definition
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [Symbol.iterator]: function* nextFile(): Generator<File, any, any> {
      for (let i = 0; i < fileList.length; i++) {
        yield fileList[i];
      }
    },
  };
  fileList.constructor = window.FileList;
  if (window.FileList) {
    Object.setPrototypeOf(fileList, window.FileList.prototype);
  }
  Object.freeze(fileList);
  return fileList;
}
