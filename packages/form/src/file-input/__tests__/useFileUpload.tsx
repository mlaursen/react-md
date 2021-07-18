import React, { Fragment, ReactElement } from "react";
import filesize from "filesize";
import {
  act,
  fireEvent,
  getByRole as getByRoleGlobal,
  render,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@react-md/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@react-md/dialog";
import { Configuration } from "@react-md/layout";
import { List, SimpleListItem } from "@react-md/list";
import {
  CheckCircleSVGIcon,
  CloseSVGIcon,
  FileUploadSVGIcon,
  WatchSVGIcon,
} from "@react-md/material-icons";
import { StatesConfig } from "@react-md/states";
import { Text } from "@react-md/typography";
import { useDropzone } from "@react-md/utils";

import { FileInput } from "../FileInput";
import { FileUploadOptions, useFileUpload } from "../useFileUpload";
import {
  FileExtensionError,
  FileSizeError,
  FileValidationError,
  isFileSizeError,
  isTooManyFilesError,
  TooManyFilesError,
} from "../utils";

function createFile(name: string, bytes: number): File {
  const content = new Uint8Array(bytes);
  for (let i = 0; i < bytes; i += 1) {
    content[i] = 32 + i;
  }

  return new File([content.buffer], name);
}

class MockFileReader implements FileReader {
  error = null;
  result: string | ArrayBuffer | null = null;
  EMPTY = 0;
  LOADING = 1;
  DONE = 2;
  readyState = 0;

  _progressEvents: ((event: Event) => void)[] = [];
  _loadEvents: ((event: Event) => void)[] = [];

  onerror = jest.fn();
  onabort = jest.fn();
  onload = jest.fn();
  onloadstart = jest.fn();
  onloadend = jest.fn();
  onprogress = jest.fn();

  abort = jest.fn();
  readAsText = jest.fn();
  readAsDataURL = jest.fn();
  readAsArrayBuffer = jest.fn();
  readAsBinaryString = jest.fn();

  removeEventListener = jest.fn();
  dispatchEvent = jest.fn();

  addEventListener(
    name: "progress" | "load",
    callback: (event: Event) => void
  ) {
    if (name === "progress") {
      this._progressEvents.push(callback);
    } else {
      this._loadEvents.push(callback);
    }
  }

  triggerProgressEvent(loaded: number, total: number) {
    act(() => {
      const event = new ProgressEvent("progress", {
        total,
        loaded,
        lengthComputable: true,
      });

      this._progressEvents.forEach((callback) => {
        callback(event);
      });
    });
  }

  triggerLoadEvent(result: string | ArrayBuffer | null) {
    act(() => {
      const event = new Event("load");
      this.result = result;
      this._loadEvents.forEach((callback) => {
        callback(event);
      });
    });
  }
}

const abort = jest.fn();
const readAsText = jest.fn();
const readAsDataURL = jest.fn();
const readAsArrayBuffer = jest.fn();
const readAsBinaryString = jest.fn();
let mockFileReader = new MockFileReader();

let fileReader = jest.spyOn(window, "FileReader");

beforeEach(() => {
  jest.clearAllMocks();
  mockFileReader = new MockFileReader();
  fileReader = jest.spyOn(window, "FileReader");

  fileReader.mockImplementation(() => mockFileReader);
  mockFileReader.abort = abort;
  mockFileReader.readAsText = readAsText;
  mockFileReader.readAsDataURL = readAsDataURL;
  mockFileReader.readAsArrayBuffer = readAsArrayBuffer;
  mockFileReader.readAsBinaryString = readAsBinaryString;
});

function SingleFileTest(props: FileUploadOptions<HTMLElement>) {
  const { onChange, stats, reset, errors, clearErrors } = useFileUpload(props);
  const [stat] = stats;

  return (
    <StatesConfig disableRipple>
      <FileInput id="file-input" onChange={onChange} icon={null}>
        Upload
      </FileInput>
      <div data-testid="status">{stat?.status}</div>
      <div data-testid="fileName">{stat?.file.name}</div>
      <div data-testid="progress">{stat?.progress}</div>
      <div data-testid="result">
        {stat?.status === "complete" && stat.result}
      </div>
      <ul>
        {errors.map((error) => (
          <li key={error.key} aria-label={error.name}>
            {error.name}
          </li>
        ))}
      </ul>
      <button type="button" onClick={reset}>
        Reset
      </button>
      <button type="button" onClick={clearErrors}>
        Clear Errors
      </button>
    </StatesConfig>
  );
}

// all of this test setup is basically copied from
// `packages/documentation/src/components/Demos/Form/FileInputs/ServerUploadExample.tsx`
const IMAGE_VIDEO_EXTENSIONS = [
  "svg",
  "jpeg",
  "jpg",
  "png",
  "apng",
  "mkv",
  "mp4",
  "mpeg",
  "mpg",
  "webm",
  "mov",
];

interface ErrorHeaderProps {
  error: TooManyFilesError | FileSizeError | FileExtensionError;
}

function ErrorHeader({ error }: ErrorHeaderProps): ReactElement {
  if (isFileSizeError(error)) {
    const { type } = error;
    const limit = filesize(error.limit);
    if (type === "total") {
      return (
        <Text type="subtitle-2" margin="none">
          {`Unable to upload the following files due to total upload size limit (${limit})`}
        </Text>
      );
    }

    const range = type === "min" ? "greater" : "less";
    return (
      <Text type="subtitle-2" margin="none">
        {`Unable to upload the following files because files must be ${range} than ${limit}`}
      </Text>
    );
  }
  if (isTooManyFilesError(error)) {
    const { limit } = error;
    return (
      <Text type="subtitle-2" margin="none">
        {`Unable to upload the following files due to total files allowed limit (${limit})`}
      </Text>
    );
  }

  const { extensions } = error;
  return (
    <Text type="subtitle-2" margin="none">
      {`Invalid file extension. Must be one of ${extensions.join(", ")}`}
    </Text>
  );
}

interface ErrorRendererProps {
  error: FileValidationError<never>;
}

function ErrorRenderer({ error }: ErrorRendererProps): ReactElement {
  if ("files" in error) {
    const { key, files } = error;
    return (
      <Fragment key={key}>
        <ErrorHeader error={error} />
        <List>
          {files.map((file, i) => (
            <SimpleListItem
              key={i}
              primaryText={file.name}
              secondaryText={isFileSizeError(error) && filesize(file.size)}
            />
          ))}
        </List>
      </Fragment>
    );
  }

  // error
  /* ^ is a {@link FileAccessError} */
  return (
    <Text margin="none">
      File access is restricted. Try a different file or folder.
    </Text>
  );
}

interface ErrorModalProps {
  errors: readonly FileValidationError<never>[];
  clearErrors(): void;
}

function ErrorModal({ errors, clearErrors }: ErrorModalProps): ReactElement {
  return (
    <Dialog
      id="error-modal"
      aria-labelledby="error-modal-title"
      modal
      onRequestClose={clearErrors}
      visible={errors.length !== 0}
    >
      <DialogHeader>
        <DialogTitle id="error-modal-title">File Upload Errors</DialogTitle>
      </DialogHeader>
      <DialogContent>
        {errors.map((error) => (
          <ErrorRenderer key={error.key} error={error} />
        ))}
      </DialogContent>
      <DialogFooter>
        <Button onClick={clearErrors}>Okay</Button>
      </DialogFooter>
    </Dialog>
  );
}

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;

function ServerUploadExample({
  maxFiles = 5,
  concurrency = 1,
  maxFileSize = MAX_UPLOAD_SIZE,
  totalFileSize = MAX_UPLOAD_SIZE,
  extensions = IMAGE_VIDEO_EXTENSIONS,
  getFileParser = () => "readAsArrayBuffer",
  ...options
}: FileUploadOptions<HTMLElement>): ReactElement {
  const {
    stats,
    errors,
    onChange,
    clearErrors,
    remove,
    onDrop,
    accept,
    totalBytes,
    totalFiles,
  } = useFileUpload({
    concurrency,
    maxFiles,
    maxFileSize,
    totalFileSize,
    extensions,
    getFileParser,
    ...options,
  });
  const [_isOver, dndHandlers] = useDropzone({ onDrop });

  return (
    <>
      <ErrorModal errors={errors} clearErrors={clearErrors} />
      <List {...dndHandlers} ordered>
        {stats.map((uploadStats) => (
          <SimpleListItem
            key={uploadStats.key}
            leftAddon={
              uploadStats.status === "pending" ? (
                <WatchSVGIcon />
              ) : uploadStats.status === "uploading" ? (
                <FileUploadSVGIcon />
              ) : (
                <CheckCircleSVGIcon />
              )
            }
            rightAddon={
              <Button
                aria-label="Remove File"
                buttonType="icon"
                onClick={() => remove(uploadStats.key)}
              >
                <CloseSVGIcon />
              </Button>
            }
            primaryText={uploadStats.file.name}
            secondaryText={filesize(uploadStats.file.size)}
          />
        ))}
        {Array.from({ length: Math.max(0, maxFiles - totalFiles) }, (_, i) => (
          <SimpleListItem
            key={i}
            leftAddon={<FileUploadSVGIcon />}
            primaryText={`Remaining File ${totalFiles + i + 1}`}
            height="extra-large"
            disabled
            disabledOpacity
          />
        ))}
      </List>
      <FileInput
        id="file-upload-input"
        onChange={onChange}
        accept={accept}
        multiple
        icon={null}
      >
        Upload
      </FileInput>
      <div data-testid="totalBytes">{totalBytes}</div>
      <div data-testid="totalFiles">{totalFiles}</div>
    </>
  );
}

// utils for ServerUploadExample
const getErrorDialog = () =>
  getByRoleGlobal(document.body, "dialog", { name: "File Upload Errors" });

const getUploadListItem = (name: string) =>
  getByRoleGlobal(document.body, "listitem", {
    name: (_name, li) => (li.textContent || "").includes(name),
  });

function renderComplex(props: FileUploadOptions<HTMLElement> = {}) {
  return render(<ServerUploadExample {...props} />, {
    wrapper: ({ children }) => (
      <Configuration disableRipple>{children}</Configuration>
    ),
  });
}

describe("useFileUpload", () => {
  it("should work correctly for a single file upload flow and reset", () => {
    const file = new File(["pretend-bytes"], "README.txt");
    const { getAllByRole, getByLabelText, getByRole, getByTestId } = render(
      <SingleFileTest />
    );
    const input = getByLabelText("Upload") as HTMLInputElement;
    const status = getByTestId("status");
    const fileName = getByTestId("fileName");
    const progress = getByTestId("progress");
    const result = getByTestId("result");

    expect(status).toHaveTextContent("");
    expect(fileName).toHaveTextContent("");
    expect(progress).toHaveTextContent("");
    expect(result).toHaveTextContent("");
    expect(() => getAllByRole("listitem")).toThrow();

    userEvent.upload(input, file);

    expect(readAsText).toBeCalledWith(file);
    expect(status).toHaveTextContent("uploading");
    expect(fileName).toHaveTextContent("README.txt");
    expect(progress).toHaveTextContent("0");
    expect(result).toHaveTextContent("");
    expect(() => getAllByRole("listitem")).toThrow();

    mockFileReader.triggerProgressEvent(100, 1000);
    expect(status).toHaveTextContent("uploading");
    expect(fileName).toHaveTextContent("README.txt");
    expect(progress).toHaveTextContent("10");
    expect(result).toHaveTextContent("");
    expect(() => getAllByRole("listitem")).toThrow();

    const content = "pretend-bytes";
    mockFileReader.triggerLoadEvent(content);
    expect(status).toHaveTextContent("complete");
    expect(fileName).toHaveTextContent("README.txt");
    expect(progress).toHaveTextContent("100");
    expect(result).toHaveTextContent(content);
    expect(() => getAllByRole("listitem")).toThrow();

    fireEvent.click(getByRole("button", { name: "Reset" }));
    expect(status).toHaveTextContent("");
    expect(fileName).toHaveTextContent("");
    expect(progress).toHaveTextContent("");
    expect(result).toHaveTextContent("");
    expect(() => getAllByRole("listitem")).toThrow();
  });

  it("should abort any FileReaders when the reset function is called", () => {
    const file = new File(["pretend-bytes"], "README.txt");
    const { getByLabelText, getByRole } = render(<SingleFileTest />);
    const input = getByLabelText("Upload") as HTMLInputElement;

    userEvent.upload(input, file);
    expect(abort).not.toBeCalled();
    fireEvent.click(getByRole("button", { name: "Reset" }));
    expect(abort).toBeCalledTimes(1);
  });

  it("should allow for some default validation", () => {
    const { getByLabelText, getByRole, getByTestId } = render(
      <SingleFileTest maxFileSize={1024} minFileSize={612} />
    );
    const input = getByLabelText("Upload") as HTMLInputElement;
    const status = getByTestId("status");
    const fileName = getByTestId("fileName");
    const reset = getByRole("button", { name: "Reset" });
    const clearErrors = getByRole("button", { name: "Clear Errors" });

    const file1 = createFile("file1.txt", 32);
    expect(file1.size).toBe(32);
    userEvent.upload(input, file1);
    expect(() =>
      getByRole("listitem", { name: "FileSizeError" })
    ).not.toThrow();
    expect(status).toHaveTextContent("");
    expect(fileName).toHaveTextContent("");

    fireEvent.click(reset);
    expect(() => getByRole("listitem", { name: "FileSizeError" })).toThrow();

    const file2 = createFile("file2.txt", 2000);
    expect(file2.size).toBe(2000);
    userEvent.upload(input, file2);

    expect(() =>
      getByRole("listitem", { name: "FileSizeError" })
    ).not.toThrow();
    expect(status).toHaveTextContent("");
    expect(fileName).toHaveTextContent("");

    fireEvent.click(reset);
    expect(() => getByRole("listitem", { name: "FileSizeError" })).toThrow();

    const file3 = createFile("file3.txt", 800);
    expect(file3.size).toBe(800);
    userEvent.upload(input, file3);

    expect(() => getByRole("listitem")).toThrow();
    expect(status).toHaveTextContent("uploading");
    expect(fileName).toHaveTextContent(file3.name);

    mockFileReader.triggerLoadEvent("fake-contents");
    expect(status).toHaveTextContent("complete");
    expect(fileName).toHaveTextContent(file3.name);

    const file4 = createFile("file4.txt", 1);
    expect(file4.size).toBe(1);
    userEvent.upload(input, file4);
    expect(status).toHaveTextContent("complete");
    expect(fileName).toHaveTextContent(file3.name);
    expect(() =>
      getByRole("listitem", { name: "FileSizeError" })
    ).not.toThrow();

    fireEvent.click(clearErrors);
    expect(status).toHaveTextContent("complete");
    expect(fileName).toHaveTextContent(file3.name);
    expect(() => getByRole("listitem", { name: "FileSizeError" })).toThrow();
  });

  it("should restrict files based on the provided extensions", async () => {
    const extensions = ["svg", "png"];
    const { getByLabelText } = renderComplex({ extensions });
    const input = getByLabelText(/Upload/) as HTMLInputElement;
    expect(input).toHaveAttribute("accept", ".svg,.png");

    userEvent.upload(input, createFile("Invalid.txt", 1000));

    expect(readAsArrayBuffer).not.toBeCalled();

    expect(getErrorDialog).not.toThrow();
  });

  it("should allow for specific files to be removed", () => {
    const { getByLabelText } = renderComplex();
    const input = getByLabelText(/Upload/) as HTMLInputElement;
    const file1 = createFile("example1.png", 1000);
    const file2 = createFile("example2.png", 1024);

    userEvent.upload(input, file1);
    userEvent.upload(input, file2);

    const file1Item = getUploadListItem(file1.name);
    expect(() => getUploadListItem(file2.name)).not.toThrow();

    fireEvent.click(
      getByRoleGlobal(file1Item, "button", { name: "Remove File" })
    );
    expect(() => getUploadListItem(file1.name)).toThrow();
    expect(() => getUploadListItem(file2.name)).not.toThrow();
  });

  it("should allow files to be dropped when connected with useDropzone", () => {
    const { getByRole } = renderComplex();
    const list = getByRole("none");
    expect(list.tagName).toBe("OL");

    const file = createFile("file1.png", 1024);
    fireEvent.drop(list, {
      dataTransfer: {
        files: [file],
      },
    });

    expect(() => getUploadListItem(file.name)).not.toThrow();
  });

  it("should queue the FileAccessError if an error occurs while uploading a file through drag and drop or onChange", async () => {
    const onDrop = jest.fn();
    const onChange = jest.fn();
    const { getByLabelText, getByRole, getByText } = renderComplex({
      onDrop,
      onChange,
    });

    const list = getByRole("none");
    expect(list.tagName).toBe("OL");
    const input = getByLabelText(/Upload/) as HTMLInputElement;

    fireEvent.drop(list, {
      dataTransfer: {
        get files(): File[] {
          throw new Error();
        },
      },
    });
    expect(onDrop).toBeCalledTimes(1);
    expect(onChange).not.toBeCalled();
    expect(getErrorDialog).not.toThrow();
    expect(() => getByText(/File access is restricted/)).not.toThrow();

    fireEvent.click(getByRole("button", { name: "Okay" }));
    await waitFor(getErrorDialog);

    // throwing an error crashed the test for some reason here
    fireEvent.change(input, { target: { files: null } });
    expect(onDrop).toBeCalledTimes(1);
    expect(onChange).toBeCalledTimes(1);
    expect(getErrorDialog).not.toThrow();
    expect(() => getByText(/File access is restricted/)).not.toThrow();

    fireEvent.click(getByRole("button", { name: "Okay" }));
  });

  it("should allow for a custom validateFiles function", () => {
    const validateFiles = jest.fn((files) => ({
      pending: files,
      errors: [],
    }));

    const { getByLabelText } = renderComplex({ validateFiles });
    const input = getByLabelText(/Upload/) as HTMLInputElement;

    const file = createFile("file1.png", 1024);
    expect(validateFiles).not.toBeCalled();
    userEvent.upload(input, file);
    expect(validateFiles).toBeCalledWith([file], {
      maxFiles: 5,
      extensions: IMAGE_VIDEO_EXTENSIONS,
      minFileSize: -1,
      maxFileSize: MAX_UPLOAD_SIZE,
      totalBytes: 0,
      totalFiles: 0,
      totalFileSize: MAX_UPLOAD_SIZE,
    });
  });

  it("should throw a TooManyFilesError if too many files are uploaded", () => {
    const { getByLabelText, getByText } = renderComplex({ maxFiles: 1 });
    const input = getByLabelText(/Upload/) as HTMLInputElement;
    const file1 = createFile("file1.png", 1000);
    const file2 = createFile("file2.png", 1000);

    userEvent.upload(input, file1);
    expect(getErrorDialog).toThrow();

    userEvent.upload(input, file2);
    expect(getErrorDialog).not.toThrow();
    expect(() =>
      getByText(
        "Unable to upload the following files due to total files allowed limit (1)"
      )
    ).not.toThrow();
  });
});
