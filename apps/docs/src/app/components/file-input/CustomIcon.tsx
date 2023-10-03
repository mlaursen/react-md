import { FileInput, Form, box } from "@react-md/core";
import CloudUploadOutlinedIcon from "@react-md/material-icons/CloudUploadOutlinedIcon";
import type { ReactElement } from "react";

export default function CustomIcon(): ReactElement {
  return (
    <Form className={box()}>
      <FileInput icon={<CloudUploadOutlinedIcon />} />
    </Form>
  );
}
