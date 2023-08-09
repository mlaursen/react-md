import { useEffect } from "react";
import { act, fireEvent, render, userEvent } from "../../test-utils";

import { ElementInteractionProvider } from "../../interaction/ElementInteractionProvider";
import { FileInput } from "../FileInput";
import type { FileUploadOptions } from "../useFileUpload";
import { useFileUpload } from "../useFileUpload";

function createFile(name: string, bytes: number): File {
  const content = new Uint8Array(bytes);
  for (let i = 0; i < bytes; i += 1) {
    content[i] = 32 + i;
  }

  return new File([content.buffer], name);
}

class MockFileReader implements FileReader {
  readyState: 0 | 1 | 2;
  EMPTY: 0;
  LOADING: 1;
  DONE: 2;
  error = null;
  result: string | ArrayBuffer | null = null;

  constructor() {
    this.readyState = 0;
    this.EMPTY = 0;
    this.LOADING = 1;
    this.DONE = 2;
  }

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
    <ElementInteractionProvider mode="none">
      <FileInput id="file-input" onChange={onChange} icon={null}>
        Upload
      </FileInput>
      <div data-testid="status">{stat?.status}</div>
      <div data-testid="fileName">{stat?.file.name}</div>
      <div data-testid="progress">{stat?.progress}</div>
      <div data-testid="result">
        {stat?.status === "complete" && stat.result?.toString()}
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
    </ElementInteractionProvider>
  );
}

describe("useFileUpload", () => {
  it("should work correctly for a single file upload flow and reset", async () => {
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

    await userEvent.upload(input, file);

    expect(readAsText).toHaveBeenCalledWith(file);
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

  it("should not cause infinite rerenders if the reset function is added to a useEffect's dependency array", () => {
    let renders = 0;
    function Test(): null {
      const { reset } = useFileUpload();
      renders += 1;
      useEffect(() => {
        if (renders < 10) {
          reset();
        }
      }, [reset]);

      return null;
    }

    render(<Test />);
    expect(renders).toBe(2);
  });

  it("should abort any FileReaders when the reset function is called", async () => {
    const file = new File(["pretend-bytes"], "README.txt");
    const { getByLabelText, getByRole } = render(<SingleFileTest />);
    const input = getByLabelText("Upload") as HTMLInputElement;

    await userEvent.upload(input, file);
    expect(abort).not.toHaveBeenCalled();
    fireEvent.click(getByRole("button", { name: "Reset" }));
    expect(abort).toHaveBeenCalledTimes(1);
  });

  it("should allow for some default validation", async () => {
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
    await userEvent.upload(input, file1);
    expect(() =>
      getByRole("listitem", { name: "FileSizeError" })
    ).not.toThrow();
    expect(status).toHaveTextContent("");
    expect(fileName).toHaveTextContent("");

    fireEvent.click(reset);
    expect(() => getByRole("listitem", { name: "FileSizeError" })).toThrow();

    const file2 = createFile("file2.txt", 2000);
    expect(file2.size).toBe(2000);
    await userEvent.upload(input, file2);

    expect(() =>
      getByRole("listitem", { name: "FileSizeError" })
    ).not.toThrow();
    expect(status).toHaveTextContent("");
    expect(fileName).toHaveTextContent("");

    fireEvent.click(reset);
    expect(() => getByRole("listitem", { name: "FileSizeError" })).toThrow();

    const file3 = createFile("file3.txt", 800);
    expect(file3.size).toBe(800);
    await userEvent.upload(input, file3);

    expect(() => getByRole("listitem")).toThrow();
    expect(status).toHaveTextContent("uploading");
    expect(fileName).toHaveTextContent(file3.name);

    mockFileReader.triggerLoadEvent("fake-contents");
    expect(status).toHaveTextContent("complete");
    expect(fileName).toHaveTextContent(file3.name);

    const file4 = createFile("file4.txt", 1);
    expect(file4.size).toBe(1);
    await userEvent.upload(input, file4);
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
});
