import { Button } from "react-md";
import styles from "./styles.module.scss";

export default function Example() {
  return (
    <Button
      onClick={() => {
        // do something
      }}
      disableRipple>Hello, world!
          </Button>
  );
}
