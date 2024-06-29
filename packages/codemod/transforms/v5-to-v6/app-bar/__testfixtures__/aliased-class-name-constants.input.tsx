import cn from "classnames";
import { useState } from "react";
import {
  APP_BAR_OFFSET_CLASSNAME as aboc,
  APP_BAR_OFFSET_DENSE_CLASSNAME as abodc,
  APP_BAR_OFFSET_PROMINENT_CLASSNAME as abopc,
  APP_BAR_OFFSET_PROMINENT_DENSE_CLASSNAME as abopdc,
} from "react-md";
import styles from "./styles.module.scss";

export default function Example() {
  const [dense, setDense] = useState(false);
  const [prominent, setProminent] = useState(false);

  return (
    <div
      className={cn(
        styles.content,
        {
          [aboc]: !dense && !prominent,
          [abodc]: dense && !prominent,
          [abopc]: !dense && prominent,
          [abopdc]: dense && prominent,
        },
        !dense && !prominent && aboc,
        dense && !prominent && abodc,
        !dense && prominent && abopc,
        dense && prominent && abopdc
      )}
    >
      content
    </div>
  );
}
