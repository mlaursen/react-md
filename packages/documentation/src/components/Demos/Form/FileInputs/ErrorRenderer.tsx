import React, { Fragment, ReactElement } from "react";
import filesize from "filesize";
import { FileValidationError, isFileSizeError } from "@react-md/form";
import { List, SimpleListItem } from "@react-md/list";
import { Text } from "@react-md/typography";

import ErrorHeader from "./ErrorHeader";

export interface ErrorRendererProps {
  error: FileValidationError<never>;
}

export default function ErrorRenderer({
  error,
}: ErrorRendererProps): ReactElement {
  if ("files" in error) {
    const { key, files } = error;
    return (
      <Fragment key={key}>
        <ErrorHeader error={error} />
        <List>
          {files.map((file, i) => (
            <SimpleListItem
              key={i}
              primaryText={file.name}
              secondaryText={isFileSizeError(error) && filesize(file.size)}
            />
          ))}
        </List>
      </Fragment>
    );
  }

  // error
  /* ^ is a {@link FileAccessError} */
  return (
    <Text margin="none">
      File access is restricted. Try a different file or folder.
    </Text>
  );
}
