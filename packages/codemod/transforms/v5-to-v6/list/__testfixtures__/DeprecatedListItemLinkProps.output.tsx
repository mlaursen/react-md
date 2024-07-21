import { type ReactElement } from "react";
import { ListItemLink } from "react-md";
import styles from "./styles.module.scss";

export default function Example(): ReactElement {
  return (
    (<ListItemLink
      to="/example"
      onClick={() => {
        // do something
      }}>Hello, world!
          </ListItemLink>)
  );
}
