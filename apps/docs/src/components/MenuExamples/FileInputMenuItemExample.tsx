import {
  Box,
  Button,
  DropdownMenu,
  FormMessage,
  FormMessageCounter,
  LinearProgress,
  MenuItemFileInput,
  useFileUpload,
} from "@react-md/core";
import FileUploadIcon from "@react-md/material-icons/FileUploadIcon";
import type { ReactElement } from "react";

import { FilePreview } from "../FilePreview";
import { FileUploadErrorModal } from "../FileUploadErrorModal";
import styles from "./FileInputMenuItemExample.module.scss";

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

// See the main File Upload Example for more details around the `useFileUpload` hook
export function FileInputMenuItemExample(): ReactElement {
  const { stats, errors, onChange, clearErrors, reset, remove, accept } =
    useFileUpload({
      maxFiles,
      maxFileSize: FOUR_HUNDRED_MB,
      extensions,
    });

  return (
    <div className={styles.container}>
      <FileUploadErrorModal errors={errors} clearErrors={clearErrors} />
      <Box>
        <DropdownMenu buttonChildren="Dropdown" themeType="outline">
          <MenuItemFileInput accept={accept} onChange={onChange} multiple>
            Upload
          </MenuItemFileInput>
          <MenuItemFileInput
            accept={accept}
            onChange={onChange}
            multiple
            preventMenuHideOnClick
          >
            Upload
          </MenuItemFileInput>
          <MenuItemFileInput
            accept={accept}
            onChange={onChange}
            multiple
            disabled
          >
            Upload
          </MenuItemFileInput>
          <MenuItemFileInput
            accept={accept}
            onChange={onChange}
            multiple
            leftAddon={null}
            rightAddon={<FileUploadIcon />}
          >
            Upload
          </MenuItemFileInput>
        </DropdownMenu>
        <Button onClick={reset} disabled={!stats.length}>
          Remove all files
        </Button>
      </Box>
      <div className={styles.progress}>
        <LinearProgress min={0} max={maxFiles} value={stats.length} />
        <FormMessage theme="none">
          <FormMessageCounter>
            {stats.length} of {maxFiles}
          </FormMessageCounter>
        </FormMessage>
      </div>
      <Box grid gridColumns="fill" align="start">
        {stats.map(({ key, ...uploadStatus }) => (
          <FilePreview
            key={key}
            {...uploadStatus}
            fileKey={key}
            remove={remove}
          />
        ))}
      </Box>
    </div>
  );
}
