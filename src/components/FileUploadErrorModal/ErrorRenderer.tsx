import { List, listItem, ListItemChildren, Typography } from "@react-md/core";
import type { FileValidationError } from "@react-md/form";
import { isFileSizeError } from "@react-md/form";
import { filesize } from "filesize";
import type { ReactElement } from "react";
import { Fragment } from "react";

import ErrorHeader from "./ErrorHeader";

export interface ErrorRendererProps {
  error: FileValidationError<never>;
}

export function ErrorRenderer({ error }: ErrorRendererProps): ReactElement {
  if ("files" in error) {
    const { key, files } = error;
    return (
      <Fragment key={key}>
        <ErrorHeader error={error} />
        <List>
          {files.map((file, i) => (
            <li key={i} className={listItem({ height: "medium" })}>
              <ListItemChildren
                primaryText={file.name}
                secondaryText={
                  isFileSizeError(error) && filesize(file.size).toString()
                }
              />
            </li>
          ))}
        </List>
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
