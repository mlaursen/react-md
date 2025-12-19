import { type ReactElement, createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { useFileUpload } from "../../files/useFileUpload.js";
import {
  createFileList,
  fireEvent,
  render,
  rmdRender,
  screen,
  userEvent,
  waitFor,
} from "../../test-utils/index.js";
import { uploadMenuItemFileUpload } from "../../test-utils/vitest/index.js";
import { DropdownMenu } from "../DropdownMenu.js";
import { MenuItemFileInput } from "../MenuItemFileInput.js";

describe("MenuItemFileInput", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLLIElement>();
    const props = {
      ref,
      onChange: vi.fn(),
      children: "Upload",
    };
    const { rerender } = render(<MenuItemFileInput {...props} />);
    const menuItem = screen.getByRole("menuitem", { name: "Upload" });
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
    expect(ref.current).toBe(menuItem);
    expect(menuItem).toMatchSnapshot();

    rerender(
      <MenuItemFileInput
        {...props}
        style={{ color: "orange" }}
        className="custom-class-name"
      />
    );
    expect(menuItem).toHaveStyle("color: rgb(255, 165, 0)");
    expect(menuItem).toHaveClass("custom-class-name");
    expect(menuItem).toMatchSnapshot();
  });

  it("should default to using the upload icon as the leftAddon", () => {
    const { rerender } = render(
      <MenuItemFileInput onChange={vi.fn()}>Upload</MenuItemFileInput>
    );
    const menuItem = screen.getByRole("menuitem", { name: "Upload" });
    expect(menuItem.querySelector(".rmd-icon")).toMatchSnapshot();
    expect(menuItem).toMatchSnapshot();

    rerender(
      <MenuItemFileInput
        onChange={vi.fn()}
        leftAddon={<span data-testid="icon" />}
      >
        Upload
      </MenuItemFileInput>
    );
    expect(menuItem.querySelector(".rmd-icon")).toBe(null);
    expect(() => screen.getByTestId("icon")).not.toThrowError();
    expect(menuItem).toMatchSnapshot();
  });

  it("should be able to upload files when clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<MenuItemFileInput onChange={onChange}>Upload</MenuItemFileInput>);
    const menuItem = screen.getByRole("menuitem", { name: "Upload" });

    const file = new File(["example"], "example.txt");
    const input = document.createElement("input");
    vi.spyOn(input, "click").mockImplementation(() => {
      fireEvent.change(input, {
        target: { files: createFileList(globalThis.window, file) },
      });
    });

    vi.spyOn(document, "createElement").mockReturnValueOnce(input);

    await user.click(menuItem);
    expect(input.type).toBe("file");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("should allow the stopPropagation behavior in menus", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const file = new File(["example"], "example.txt");
    const input = document.createElement("input");
    vi.spyOn(input, "click").mockImplementation(() => {
      fireEvent.change(input, {
        target: { files: createFileList(globalThis.window, file) },
      });
    });

    const { rerender } = rmdRender(
      <DropdownMenu buttonChildren="Button">
        <MenuItemFileInput onChange={onChange}>Upload</MenuItemFileInput>
      </DropdownMenu>
    );

    const button = screen.getByRole("button", { name: "Button" });
    await user.click(button);

    let upload = screen.getByRole("menuitem", { name: "Upload" });
    vi.spyOn(document, "createElement").mockReturnValueOnce(input);
    await user.click(upload);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(upload).not.toBeInTheDocument();
    await user.click(button);

    rerender(
      <DropdownMenu buttonChildren="Button">
        <MenuItemFileInput preventMenuHideOnClick onChange={onChange}>
          Upload
        </MenuItemFileInput>
      </DropdownMenu>
    );
    upload = screen.getByRole("menuitem", { name: "Upload" });
    vi.spyOn(document, "createElement").mockReturnValueOnce(input);
    await user.click(upload);
    expect(upload).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("should pass the useful input element props down when they are provided", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <MenuItemFileInput onChange={onChange}>Upload</MenuItemFileInput>
    );
    const menuItem = screen.getByRole("menuitem", { name: "Upload" });

    const input = document.createElement("input");
    const capture = vi.fn();
    // `vi.spyOn(input, 'capture', 'set')` throws "Property `capture` does not exist on..."
    Object.defineProperty(input, "capture", {
      set: capture,
    });
    const accept = vi.spyOn(input, "accept", "set");
    const multiple = vi.spyOn(input, "multiple", "set");
    vi.spyOn(document, "createElement").mockReturnValueOnce(input);
    await user.click(menuItem);
    expect(accept).not.toHaveBeenCalled();
    expect(capture).not.toHaveBeenCalled();
    expect(multiple).not.toHaveBeenCalled();

    rerender(
      <MenuItemFileInput onChange={onChange} accept="video/*" multiple capture>
        Upload
      </MenuItemFileInput>
    );

    vi.spyOn(document, "createElement").mockReturnValueOnce(input);
    await user.click(menuItem);
    expect(accept).toHaveBeenCalledWith("video/*");
    expect(capture).toHaveBeenCalledWith("");
    expect(multiple).toHaveBeenCalledWith(true);

    rerender(
      <MenuItemFileInput
        onChange={onChange}
        accept="image/*"
        multiple
        capture="user"
      >
        Upload
      </MenuItemFileInput>
    );
    vi.spyOn(document, "createElement").mockReturnValueOnce(input);
    await user.click(menuItem);
    expect(accept).toHaveBeenCalledWith("image/*");
    expect(capture).toHaveBeenCalledWith("user");
    expect(multiple).toHaveBeenCalledWith(true);
  });

  it("should be able to upload files within a menu and the useFileUpload hook", async () => {
    function Test(): ReactElement {
      const FOUR_HUNDRED_MB = 400 * 1024 * 1024;
      const maxFiles = 10;
      const { accept, onChange, stats } = useFileUpload({
        maxFiles,
        maxFileSize: FOUR_HUNDRED_MB,
        extensions: ["txt"],
      });
      const [stat] = stats;

      return (
        <>
          <div data-testid="status">{stat?.status}</div>
          <div data-testid="fileName">{stat?.file.name}</div>
          <div data-testid="progress">{stat?.progress}</div>
          <div data-testid="result">
            {stat?.status === "complete" && stat.result?.toString()}
          </div>
          <DropdownMenu buttonChildren="Button">
            <MenuItemFileInput onChange={onChange} accept={accept}>
              Upload
            </MenuItemFileInput>
          </DropdownMenu>
        </>
      );
    }

    const user = userEvent.setup();
    rmdRender(<Test />);

    const status = screen.getByTestId("status");
    const fileName = screen.getByTestId("fileName");
    const progress = screen.getByTestId("progress");
    const result = screen.getByTestId("result");
    await user.click(screen.getByRole("button", { name: "Button" }));

    const menuItem = screen.getByRole("menuitem", { name: "Upload" });

    const file = new File(["pretend-bytes"], "README.txt");
    await uploadMenuItemFileUpload({
      user,
      files: file,
      menuItem,
    });
    await waitFor(() => {
      expect(status).toHaveTextContent("complete");
    });
    expect(fileName).toHaveTextContent("README.txt");
    expect(progress).toHaveTextContent("100");
    expect(result).toHaveTextContent("pretend-bytes");
  });
});
