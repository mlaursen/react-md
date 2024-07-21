import { type ReactElement } from "react";
import { ListItem } from "react-md";
import styles from "./styles.module.scss";

export default function Example(): ReactElement {
  return (
    <ListItem
      onClick={() => {
        // do something
      }}
      disableRipple
      disableProgrammaticRipple
      disableEnterClick
      disableSpacebarClick
      disablePressedFallback
      enablePressedAndRipple
      rippleTimeout={100}
      rippleClassName={styles.ripple}
      rippleClassNames={{ enter: "", exit: "" }}
      rippleContainerClassName="example"
    >
      Hello, world!
    </ListItem>
  );
}
