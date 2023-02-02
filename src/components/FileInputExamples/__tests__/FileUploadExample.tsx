import type { IsValidFileName } from "@react-md/core";
import { ElementInteractionProvider, isValidFileName } from "@react-md/core";
import {
  fireEvent,
  render as baseRender,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";

import { EXTENSIONS, FileUploadExample } from "../FileUploadExample";

function createFile(name: string, bytes: number): File {
  const content = new Uint8Array(bytes);
  for (let i = 0; i < bytes; i += 1) {
    content[i] = 32 + i;
  }

  return new File([content.buffer], name);
}

// utils for ServerUploadExample
const getErrorDialog = () =>
  screen.getByRole("alertdialog", { name: "File Upload Errors" });

const render = (ui: ReactElement): ReturnType<typeof baseRender> =>
  baseRender(ui, {
    wrapper: ({ children }) => (
      <ElementInteractionProvider mode="none">
        {children}
      </ElementInteractionProvider>
    ),
  });

describe("FileUploadExample", () => {
  it("should restrict files based on the provided extensions", async () => {
    const user = userEvent.setup({
      applyAccept: false,
    });

    const extensions = ["svg", "png"];
    const readAsArrayBuffer = jest.fn();
    const { getByLabelText } = render(
      <FileUploadExample extensions={extensions} />
    );
    const input = getByLabelText(/Upload/) as HTMLInputElement;
    expect(input).toHaveAttribute("accept", ".svg,.png");

    await user.upload(input, createFile("Invalid.txt", 1000));
    await user.upload(input, createFile("Invalidpng", 1000));
    await user.upload(input, createFile("Invalidsvg", 1000));

    await waitFor(() => {
      expect(readAsArrayBuffer).not.toHaveBeenCalled();
      expect(getErrorDialog).not.toThrow();
    });
  });

  it("should allow for specific files to be removed", async () => {
    const { getByLabelText, getByRole } = render(<FileUploadExample />);
    const input = getByLabelText(/Upload/) as HTMLInputElement;
    const file1 = createFile("example1.png", 1000);
    const file2 = createFile("example2.png", 1024);

    await userEvent.upload(input, file1);
    await userEvent.upload(input, file2);

    const file1Region = getByRole("region", { name: file1.name });
    const file2Region = getByRole("region", { name: file2.name });

    fireEvent.click(
      within(file1Region).getByRole("button", { name: "Remove" })
    );

    expect(file1Region).not.toBeInTheDocument();
    expect(file2Region).toBeInTheDocument();
  });

  it("should queue the FileAccessError if an error occurs while uploading a file onChange", async () => {
    const onChange = jest.fn();
    const { getByLabelText, getByRole, getByText } = render(
      <FileUploadExample onChange={onChange} />
    );

    const input = getByLabelText(/Upload/) as HTMLInputElement;

    // throwing an error crashed the test for some reason here
    fireEvent.change(input, { target: { files: null } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(getErrorDialog).not.toThrow();
    expect(() => getByText(/File access is restricted/)).not.toThrow();

    fireEvent.click(getByRole("button", { name: "Okay" }));
  });

  it("should allow for a custom isValidFileName so that files without extensions can be uploaded", async () => {
    const user = userEvent.setup({
      applyAccept: false,
    });

    const allowExtensionsAndLicense: IsValidFileName = (
      file,
      extensionRegExp,
      extensions
    ) =>
      isValidFileName(file, extensionRegExp, extensions) ||
      /^LICENSE$/i.test(file.name);

    const customIsValidFileName = jest.fn(allowExtensionsAndLicense);
    const extensions = ["md", "txt"];
    const extensionRegExp = new RegExp("\\.(md|txt)$", "i");

    const { getByLabelText } = render(
      <FileUploadExample
        extensions={extensions}
        isValidFileName={customIsValidFileName}
      />
    );

    const input = getByLabelText(/Upload/) as HTMLInputElement;
    expect(customIsValidFileName).not.toHaveBeenCalled();

    const md = createFile("file2.md", 1024);
    await user.upload(input, md);
    expect(customIsValidFileName).toHaveBeenCalledWith(
      md,
      extensionRegExp,
      extensions
    );
    expect(getErrorDialog).toThrow();

    const txt = createFile("file2.txt", 1024);
    await user.upload(input, txt);
    expect(customIsValidFileName).toHaveBeenCalledWith(
      txt,
      extensionRegExp,
      extensions
    );
    expect(getErrorDialog).toThrow();

    const license = createFile("LICENSE", 1024);
    await user.upload(input, license);
    expect(customIsValidFileName).toHaveBeenCalledWith(
      license,
      extensionRegExp,
      extensions
    );
    expect(getErrorDialog).toThrow();

    const png = createFile("file1.png", 1024);
    await user.upload(input, png);
    expect(customIsValidFileName).toHaveBeenCalledWith(
      png,
      extensionRegExp,
      extensions
    );
    expect(getErrorDialog).not.toThrow();
    fireEvent.click(screen.getByRole("button", { name: "Okay" }));
  });

  it("should allow for a custom validateFiles function", async () => {
    const validateFiles = jest.fn((files) => ({
      pending: files,
      errors: [],
    }));

    const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;
    const { getByLabelText } = render(
      <FileUploadExample
        maxFiles={5}
        maxFileSize={MAX_UPLOAD_SIZE}
        totalFileSize={MAX_UPLOAD_SIZE}
        validateFiles={validateFiles}
      />
    );
    const input = getByLabelText(/Upload/) as HTMLInputElement;

    const file = createFile("file1.png", 1024);
    expect(validateFiles).not.toHaveBeenCalled();
    await userEvent.upload(input, file);
    expect(validateFiles).toHaveBeenCalledWith([file], {
      maxFiles: 5,
      extensions: EXTENSIONS,
      minFileSize: -1,
      maxFileSize: MAX_UPLOAD_SIZE,
      totalBytes: 0,
      totalFiles: 0,
      totalFileSize: MAX_UPLOAD_SIZE,
      isValidFileName,
    });
  });

  it("should throw a TooManyFilesError if too many files are uploaded", async () => {
    const { getByLabelText, getByText } = render(
      <FileUploadExample maxFiles={1} />
    );
    const input = getByLabelText(/Upload/) as HTMLInputElement;
    const file1 = createFile("file1.png", 1000);
    const file2 = createFile("file2.png", 1000);

    await userEvent.upload(input, file1);
    expect(getErrorDialog).toThrow();

    await userEvent.upload(input, file2);
    expect(getErrorDialog).not.toThrow();
    expect(() =>
      getByText(
        "Unable to upload the following files due to total files allowed limit (1)"
      )
    ).not.toThrow();
  });
});
