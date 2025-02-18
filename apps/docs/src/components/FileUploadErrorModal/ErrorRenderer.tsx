import {
  type FileValidationError,
  isFileSizeError,
} from "@react-md/core/files/validation";
import { ListItemChildren } from "@react-md/core/list/ListItemChildren";
import { Typography } from "@react-md/core/typography/Typography";
import { filesize } from "filesize";
import { Fragment, type ReactElement } from "react";

import ErrorHeader from "./ErrorHeader.jsx";

export interface ErrorRendererProps {
  error: FileValidationError<never>;
}

export function ErrorRenderer({ error }: ErrorRendererProps): ReactElement {
  if ("files" in error) {
    const { key, files } = error;
    return (
      <Fragment key={key}>
        <ErrorHeader error={error} />
        <Typography type="subtitle-1" as="ul">
          {files.map((file, i) => (
            <li key={i}>
              <ListItemChildren
                primaryText={file.name}
                secondaryText={
                  isFileSizeError(error) && filesize(file.size).toString()
                }
              />
            </li>
          ))}
        </Typography>
      </Fragment>
    );
  }

  // error
  /* ^ is a {@link FileAccessError} */
  return (
    <Typography margin="none">
      File access is restricted. Try a different file or folder.
    </Typography>
  );
}
