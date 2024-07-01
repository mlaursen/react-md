// TODO: Add styles for app bar offset
import cn from "classnames";
import { useState } from "react";
import styles from "./styles.module.scss";

export default function Example() {
  const [dense, setDense] = useState(false);
  const [prominent, setProminent] = useState(false);

  return (
    (<div
      className={cn(styles.content, {})}
    >content
          </div>)
  );
}
