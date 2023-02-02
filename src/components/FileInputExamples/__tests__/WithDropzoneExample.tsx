import { ElementInteractionProvider } from "@react-md/core";
import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactElement } from "react";

import { WithDropzoneExample } from "../WithDropzoneExample";

function Wrapper({ children }: { children: ReactElement }): ReactElement {
  return (
    <ElementInteractionProvider mode="none">
      {children}
    </ElementInteractionProvider>
  );
}

function createFile(name: string, bytes: number): File {
  const content = new Uint8Array(bytes);
  for (let i = 0; i < bytes; i += 1) {
    content[i] = 32 + i;
  }

  return new File([content.buffer], name);
}

const getErrorDialog = () =>
  screen.getByRole("alertdialog", { name: "File Upload Errors" });

describe("WithDropzoneExample", () => {
  it("should allow files to be dropped when connected with useDropzone", () => {
    const { getByRole } = render(<WithDropzoneExample />, { wrapper: Wrapper });
    const list = getByRole("none");
    expect(list.tagName).toBe("OL");

    const file = createFile("file1.png", 1024);
    fireEvent.drop(list, {
      dataTransfer: {
        files: [file],
      },
    });

    expect(() =>
      screen.findByRole("listitem", { name: file.name })
    ).not.toThrow();
  });

  it("should queue the FileAccessError if an error occurs while uploading a file through drag and drop", async () => {
    const onDrop = jest.fn();
    const { getByRole, getByText } = render(
      <WithDropzoneExample onDrop={onDrop} />,
      { wrapper: Wrapper }
    );

    const list = getByRole("none");
    expect(list.tagName).toBe("OL");

    fireEvent.drop(list, {
      dataTransfer: {
        get files(): File[] {
          throw new Error();
        },
      },
    });
    expect(onDrop).toHaveBeenCalledTimes(1);
    expect(getErrorDialog).not.toThrow();
    expect(() => getByText(/File access is restricted/)).not.toThrow();
  });
});
