import type {
  FileExtensionError,
  FileSizeError,
  TooManyFilesError,
} from "@react-md/core";
import {
  isFileSizeError,
  isTooManyFilesError,
  Typography,
} from "@react-md/core";
import { filesize } from "filesize";
import type { ReactElement } from "react";

interface ErrorHeaderProps {
  error: TooManyFilesError | FileSizeError | FileExtensionError;
}

export default function ErrorHeader({ error }: ErrorHeaderProps): ReactElement {
  if (isFileSizeError(error)) {
    const { type } = error;
    const limit = filesize(error.limit);
    if (type === "total") {
      return (
        <Typography type="subtitle-2" margin="none">
          {`Unable to upload the following files due to total upload size limit (${limit})`}
        </Typography>
      );
    }

    const range = type === "min" ? "greater" : "less";
    return (
      <Typography type="subtitle-2" margin="none">
        {`Unable to upload the following files because files must be ${range} than ${limit}`}
      </Typography>
    );
  }
  if (isTooManyFilesError(error)) {
    const { limit } = error;
    return (
      <Typography type="subtitle-2" margin="none">
        {`Unable to upload the following files due to total files allowed limit (${limit})`}
      </Typography>
    );
  }

  const { extensions } = error;
  return (
    <Typography type="subtitle-2" margin="none">
      {`Invalid file extension. Must be one of ${extensions.join(", ")}`}
    </Typography>
  );
}
