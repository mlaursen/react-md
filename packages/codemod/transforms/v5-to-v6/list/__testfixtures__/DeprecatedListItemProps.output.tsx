import { type ReactElement } from "react";
import { ListItem } from "react-md";
import styles from "./styles.module.scss";

export default function Example(): ReactElement {
  return (
    (<ListItem
      onClick={() => {
        // do something
      }}>Hello, world!
          </ListItem>)
  );
}
