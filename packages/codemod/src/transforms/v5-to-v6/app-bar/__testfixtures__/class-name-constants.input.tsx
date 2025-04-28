import cn from "classnames";
import { useState } from "react";
import {
  APP_BAR_OFFSET_CLASSNAME,
  APP_BAR_OFFSET_DENSE_CLASSNAME,
  APP_BAR_OFFSET_PROMINENT_CLASSNAME,
  APP_BAR_OFFSET_PROMINENT_DENSE_CLASSNAME,
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
          [APP_BAR_OFFSET_CLASSNAME]: !dense && !prominent,
          [APP_BAR_OFFSET_DENSE_CLASSNAME]: dense && !prominent,
          [APP_BAR_OFFSET_PROMINENT_CLASSNAME]: !dense && prominent,
          [APP_BAR_OFFSET_PROMINENT_DENSE_CLASSNAME]: dense && prominent,
        },
        !dense && !prominent && APP_BAR_OFFSET_CLASSNAME,
        dense && !prominent && APP_BAR_OFFSET_DENSE_CLASSNAME,
        !dense && prominent && APP_BAR_OFFSET_PROMINENT_CLASSNAME,
        dense && prominent && APP_BAR_OFFSET_PROMINENT_DENSE_CLASSNAME
      )}
    >
      content
    </div>
  );
}
