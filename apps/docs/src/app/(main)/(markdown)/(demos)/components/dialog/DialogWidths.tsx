import { Button } from "@react-md/core/button/Button";
import { Dialog } from "@react-md/core/dialog/Dialog";
import { DialogContent } from "@react-md/core/dialog/DialogContent";
import { DialogHeader } from "@react-md/core/dialog/DialogHeader";
import { DialogTitle } from "@react-md/core/dialog/DialogTitle";
import { type DialogWidth } from "@react-md/core/dialog/styles";
import { Option } from "@react-md/core/form/Option";
import { Select } from "@react-md/core/form/Select";
import { Typography } from "@react-md/core/typography/Typography";
import { useToggle } from "@react-md/core/useToggle";
import { useId, useState, type ReactElement } from "react";
import styles from "./DialogWidths.module.scss";

export default function DialogWidths(): ReactElement {
  const { toggled, enable, disable } = useToggle();
  const titleId = useId();
  const [width, setWidth] = useState<DialogWidth>("auto");

  return (
    <>
      <Button onClick={enable}>Show</Button>
      <Dialog
        aria-labelledby={titleId}
        width={width}
        visible={toggled}
        onRequestClose={disable}
        className={styles.container}
      >
        <DialogHeader>
          <DialogTitle id={titleId}>Dialog Widths</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <Select
            label="Width"
            inline
            value={width}
            onChange={(event) => setWidth(event.currentTarget.value)}
          >
            <Option value="auto">auto</Option>
            <Option value="small">small</Option>
            <Option value="medium">medium</Option>
            <Option value="large">large</Option>
            <Option value="extra-large">extra-large</Option>
          </Select>
          <Typography>
            Phasellus maximus non arcu sit amet tempus. Praesent eu pretium sem.
            Aliquam venenatis est sit amet turpis bibendum porta sit amet a
            tellus. Nulla a magna justo. Aliquam tempus eros in pulvinar
            condimentum. Etiam nec ipsum tincidunt, dapibus erat a, ullamcorper
            ipsum. Nam justo odio, iaculis ut justo id, varius facilisis massa.
            In vel sapien at metus laoreet fringilla. Sed condimentum ante at
            augue suscipit, vel sodales dui tempus. Etiam tincidunt leo rhoncus
            massa iaculis, at tristique sem pharetra. Etiam congue, leo ornare
            tincidunt tempor, urna ipsum aliquet urna, ut hendrerit elit turpis
            a metus. In tortor mauris, tincidunt vel tincidunt sagittis,
            vestibulum nec nibh. Aliquam erat volutpat. Quisque ac gravida urna.
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}
