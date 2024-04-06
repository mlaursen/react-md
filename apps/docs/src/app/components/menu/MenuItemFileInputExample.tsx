import { DropdownMenu, MenuItemFileInput, useFileUpload } from "react-md";
import { useState, type ReactElement } from "react";

const extensions = [
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
] as const;

const FOUR_HUNDRED_MB = 400 * 1024 * 1024;
const maxFiles = 10;

export default function MenuItemFileInputExample(): ReactElement {
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");

  // checkout the useFileUpload documentation for a real example with this hook
  const { accept, onChange } = useFileUpload({
    maxFiles,
    maxFileSize: FOUR_HUNDRED_MB,
    extensions,
  });
  return (
    <DropdownMenu buttonChildren="Options">
      <MenuItemFileInput
        onChange={(event) => setFile1(event.currentTarget.value)}
        secondaryText={`Selected file: ${file1 || "none"}`}
      >
        Upload
      </MenuItemFileInput>
      <MenuItemFileInput
        onChange={(event) => setFile2(event.currentTarget.value)}
        secondaryText={`Selected file: ${file2 || "none"}`}
        preventMenuHideOnClick
      >
        Upload
      </MenuItemFileInput>
      <MenuItemFileInput disabled onChange={() => {}}>
        Disabled
      </MenuItemFileInput>
      <MenuItemFileInput accept={accept} onChange={onChange} multiple>
        Upload Multiple
      </MenuItemFileInput>
    </DropdownMenu>
  );
}
