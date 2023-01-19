import { Button } from "@react-md/core";
import { DialogContent, DialogHeader, DialogTitle } from "@react-md/dialog";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import type { ReactElement } from "react";
import { CodeBlock } from "../Code";
import styles from "./MatchedIconContent.module.scss";
import type { IconReference } from "./useMaterialIcons";

export interface MatchedIconContentProps extends IconReference {
  titleId: string;
  onRequestClose(): void;
}

export function MatchedIconContent(
  props: MatchedIconContentProps
): ReactElement {
  const { name, icon: Icon, titleId, onRequestClose } = props;
  return (
    <>
      <DialogHeader>
        <DialogTitle id={titleId}>{name}</DialogTitle>
        <Button aria-label="Close" onClick={onRequestClose} buttonType="icon">
          <CloseIcon />
        </Button>
      </DialogHeader>
      <CodeBlock language="ts">{`import ${name} from "@react-md/material-icons/${name}";`}</CodeBlock>
      <DialogContent>
        <div className={styles.preview}>
          <Icon />
        </div>
        <Icon dense />
        <Icon color="primary" />
        <Icon color="secondary" />
        <Icon color="warning" />
        <Icon color="success" />
        <Icon color="error" />
        <Icon color="hint" />
        <Icon color="disabled" />
      </DialogContent>
    </>
  );
}
