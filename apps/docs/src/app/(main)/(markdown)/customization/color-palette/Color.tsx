import { box } from "@react-md/core/box/styles";
import { contrastColor } from "@react-md/core/theme/utils";
import { cnb } from "cnbuilder";
import { type ReactElement, type ReactNode } from "react";

import styles from "./Color.module.scss";
import { ColorHeadingWrapper } from "./ColorHeadingWrapper.jsx";

const ACCENTS = [100, 200, 400, 700];

export interface ColorProps {
  i?: number;
  name?: string;
  value: string;
  heading?: ReactNode;
}

export function Color(props: ColorProps): ReactElement {
  const { i, name, value: propValue, heading } = props;

  let value = propValue;
  if (value.length === 4) {
    // ensure that hex colors are always 6 characters instead of their shortened
    // 3 character versions
    const [a, b, c] = value.substring(1);
    value = `#${a}${a}${b}${b}${c}${c}`;
  }

  let title: ReactNode = name;
  if (typeof i === "number") {
    let shade = 50;
    if (i > 9) {
      shade = ACCENTS[i - 10];
    } else if (i > 0) {
      shade = i * 100;
    }

    title = shade;
  }

  return (
    <li
      style={{
        background: value,
        color: contrastColor(value),
      }}
      className={cnb(
        !heading && box({ justify: "space-between" }),
        !!heading && box({ align: "start", stacked: true }),
        i === 10 && styles.accents
      )}
    >
      <ColorHeadingWrapper heading={heading}>
        <span>{title}</span>
        <span>{value.toUpperCase()}</span>
      </ColorHeadingWrapper>
    </li>
  );
}
