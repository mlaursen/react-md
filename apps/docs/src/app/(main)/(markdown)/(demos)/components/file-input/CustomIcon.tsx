import { box } from "@react-md/core/box/styles";
import { FileInput } from "@react-md/core/files/FileInput";
import { Form } from "@react-md/core/form/Form";
import CloudUploadOutlinedIcon from "@react-md/material-icons/CloudUploadOutlinedIcon";
import { type ReactElement } from "react";

export default function CustomIcon(): ReactElement {
  return (
    <Form className={box()}>
      <FileInput icon={<CloudUploadOutlinedIcon />} />
    </Form>
  );
}
