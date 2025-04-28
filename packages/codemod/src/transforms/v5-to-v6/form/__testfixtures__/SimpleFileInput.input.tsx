import { type ReactElement } from "react";
import { FileInput } from "react-md";

export default function SimpleFileInput(): ReactElement {
  return (
    <>
      <FileInput />
      <FileInput disableIconSpacing />
      <FileInput disableIconSpacing={someFlag} />
      <FileInput disableIconSpacing={false} />
    </>
  );
}
