import React, {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react";

import styles from "./SlidersContainer.module.scss";

export interface SlidersContainerProps {
  vertical?: boolean;
  children: ReactNode;
}

export default function SlidersContainer({
  vertical = false,
  children,
}: SlidersContainerProps): ReactElement | null {
  return (
    <>
      {Children.map(children, (slider) => {
        if (!isValidElement(slider)) {
          return slider;
        }

        if (vertical) {
          // Note: vertical sliders to not "natively" support labels without
          // custom styles.
          return (
            <span className={styles.vertical}>
              {cloneElement(slider, {
                labelProps: { className: styles.label },
              })}
            </span>
          );
        }

        return cloneElement(slider, {
          className: styles.horizontal,
        });
      })}
    </>
  );
}
