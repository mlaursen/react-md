import React, { ReactElement } from "react";
import filesize from "filesize";
import {
  FileExtensionError,
  FileSizeError,
  isFileSizeError,
  isTooManyFilesError,
  TooManyFilesError,
} from "@react-md/form";
import { Text } from "@react-md/typography";

interface ErrorHeaderProps {
  error: TooManyFilesError | FileSizeError | FileExtensionError;
}

export default function ErrorHeader({ error }: ErrorHeaderProps): ReactElement {
  if (isFileSizeError(error)) {
    const { type } = error;
    const limit = filesize(error.limit);
    if (type === "total") {
      return (
        <Text type="subtitle-2" margin="none">
          {`Unable to upload the following files due to total upload size limit (${limit})`}
        </Text>
      );
    }

    const range = type === "min" ? "greater" : "less";
    return (
      <Text type="subtitle-2" margin="none">
        {`Unable to upload the following files because files must be ${range} than ${limit}`}
      </Text>
    );
  }
  if (isTooManyFilesError(error)) {
    const { limit } = error;
    return (
      <Text type="subtitle-2" margin="none">
        {`Unable to upload the following files due to total files allowed limit (${limit})`}
      </Text>
    );
  }

  const { extensions } = error;
  return (
    <Text type="subtitle-2" margin="none">
      {`Invalid file extension. Must be one of ${extensions.join(", ")}`}
    </Text>
  );
}
