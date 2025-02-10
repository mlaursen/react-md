import { Box } from "@react-md/core/box/Box";
import { cssUtils } from "@react-md/core/cssUtils";
import { FileInput } from "@react-md/core/files/FileInput";
import { useFileUpload } from "@react-md/core/files/useFileUpload";
import { LinearProgress } from "@react-md/core/progress/LinearProgress";
import { Typography } from "@react-md/core/typography/Typography";
import { useDropzone } from "@react-md/core/useDropzone";
import { cnb } from "cnbuilder";
import UploadIcon from "node_modules/@react-md/material-icons/src/UploadIcon.jsx";
import { type ReactElement } from "react";

import styles from "./SimpleExample.module.scss";

export default function SimpleExample(): ReactElement {
  const { onDrop, onChange, stats } = useFileUpload();
  const { isOver, isDragging, dropzoneHandlers } = useDropzone({
    onDrop,

    // if you need to do any custom drop behavior, it can be done here.
    // onDrop(event) {
    //   // custom behavior
    //   onDrop(event);
    // },

    // When this is `true`, the `isDragging` flag will not update so the
    // dropzone only interacts to `dragEnter`/`dragOver`/`dragLeave`/`drop`
    // events. So if you want to help guide the user to the dropzone by adding
    // addition styles when **any** drag event occurs, omit this option or set
    // it to `false`
    //
    // Try uncommenting this next line to see the difference when dragging files
    // into the window and the first mouse event is not over the dropzone
    // disableDragging: true,
  });
  const isUploading =
    stats.length > 0 && stats.find((stat) => stat.status !== "complete");

  return (
    <Box
      {...dropzoneHandlers}
      justify="center"
      stacked
      fullWidth
      className={cnb(
        styles.container,
        isOver && styles.dragover,
        (isOver || isDragging) && styles.dragging,
        cssUtils({ textAlign: "center" })
      )}
    >
      {isUploading && (
        <LinearProgress
          aria-label="Uploading Files"
          className={styles.progress}
        />
      )}
      <Typography margin="none">Drag and drop some files!</Typography>
      <UploadIcon className={cnb(!isOver && styles.invisible)} />
      <Typography margin="top">Or upload them manually</Typography>
      <FileInput onChange={onChange} />
    </Box>
  );
}
