import { contrastColor } from "@react-md/core";
import {
  Children,
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import { InlineCode } from "./InlineCode.jsx";
import styles from "./InlineColorPreview.module.scss";

// https://stackoverflow.com/a/1636354/744230
const HEX_CODE_REGEX = /#(?:[0-9a-fA-F]{3}){1,2}/gim;

export interface InlineColorPreviewProps {
  children?: ReactNode;
}

export function InlineColorPreview(
  props: InlineColorPreviewProps
): ReactElement {
  const { children } = props;
  return (
    <>
      {Children.map(children, (child) => {
        if (!child) {
          return child;
        }

        if (typeof child === "string") {
          const replacements: (ReactElement | string)[] = [];

          let start = 0;
          let match: RegExpExecArray | null;
          while ((match = HEX_CODE_REGEX.exec(child)) != null) {
            const [color] = match;
            const prefix = child.substring(start, match.index);
            start = match.index + color.length;

            replacements.push(
              prefix,
              <span
                className={styles.container}
                style={
                  {
                    "--color": color,
                    "--text-color": contrastColor(color),
                  } as CSSProperties
                }
              >
                <InlineCode>{color}</InlineCode>
              </span>
            );
          }

          if (replacements.length) {
            if (start) {
              replacements.push(child.substring(start));
            }

            return replacements;
          }

          return child;
        }

        if (!isValidElement<unknown>(child)) {
          return child;
        }

        return child;
      })}
    </>
  );
}
