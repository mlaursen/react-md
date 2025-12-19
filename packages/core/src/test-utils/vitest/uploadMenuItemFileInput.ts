import { fireEvent } from "@testing-library/dom";
import { type UserEvent } from "@testing-library/user-event";
import { vitest } from "vitest";

import { createFileList } from "../utils/createFileList.js";

/**
 * @since 6.0.0
 */
export interface UploadMenuItemFileUploadOptions {
  user: UserEvent;
  files: File | readonly File[];
  menuItem: HTMLElement;
}

/**
 * @example Main Example
 * ```tsx
 * const user = userEvent.setup()
 * render(<Test />);
 *
 * await user.click(screen.getByRole("button", { name: "Dropdown Menu" }));
 *
 * const menuItem = screen.getByRole("menuitem", { name: "Upload" });
 * const file = new File(["pretend-bytes"], "README.txt");
 * await uploadMenuItemFileUpload({
 *   user,
 *   // can be a single file or multiple
 *   files: file,
 *   menuItem,
 * });
 *
 * // expect something with uploaded file
 * ```
 *
 * @since 6.0.0
 */
export async function uploadMenuItemFileUpload(
  options: UploadMenuItemFileUploadOptions
): Promise<void> {
  const { user, files, menuItem } = options;

  const input = document.createElement("input");
  vitest.spyOn(document, "createElement").mockReturnValueOnce(input);
  vitest.spyOn(input, "click").mockImplementationOnce(() => {
    fireEvent.change(input, {
      target: { files: createFileList(globalThis.window, files) },
    });
  });

  await user.click(menuItem);
}
