import { typography } from "react-md";
import CheckCircleOutlinedIcon from "@react-md/material-icons/CheckCircleOutlinedIcon";
import ErrorOutlineOutlinedIcon from "@react-md/material-icons/ErrorOutlineOutlinedIcon";
import InfoOutlinedIcon from "@react-md/material-icons/InfoOutlinedIcon";
import WarningOutlinedIcon from "@react-md/material-icons/WarningOutlinedIcon";
import { cnb } from "cnbuilder";
import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import styles from "./Blockquote.module.scss";

const THEME_REGEX = /!(Warn|Info|Success|Error)!/;

type BlockquoteTheme = "warning" | "info" | "success" | "error";

const getTheme = (theme: string): BlockquoteTheme => {
  switch (theme) {
    case "Warn":
      return "warning";
    default:
      return theme.toLowerCase() as BlockquoteTheme;
  }
};

function BlockquoteThemeIcon({
  theme,
}: {
  theme: BlockquoteTheme;
}): ReactElement {
  switch (theme) {
    case "info":
      return <InfoOutlinedIcon />;
    case "warning":
      return <WarningOutlinedIcon />;
    case "success":
      return <CheckCircleOutlinedIcon />;
    case "error":
      return <ErrorOutlineOutlinedIcon />;
  }
}

export interface BlockquoteProps extends HTMLAttributes<HTMLElement> {
  theme?: BlockquoteTheme;
}

export function Blockquote(props: BlockquoteProps): ReactElement {
  const {
    className,
    theme: propTheme,
    children: propChildren,
    ...remaining
  } = props;

  let theme = propTheme;
  const children: ReactNode[] = [];
  Children.forEach(propChildren, (child, index) => {
    if (!isValidElement<{ children: ReactNode }>(child)) {
      children.push(child);
      return;
    }

    const childChildren = child.props.children;
    if (typeof childChildren === "string") {
      const [, themeMatch] = childChildren.match(THEME_REGEX) || [];
      if (themeMatch) {
        theme = getTheme(themeMatch);
        children.push(
          cloneElement(
            child,
            { key: index },
            childChildren.substring(themeMatch.length + 2)
          )
        );
        return;
      }
    } else {
      const [maybeTheme, ...remaining] = Children.toArray(childChildren);
      if (typeof maybeTheme === "string") {
        const [, themeMatch] = maybeTheme.match(THEME_REGEX) || [];
        if (themeMatch) {
          theme = getTheme(themeMatch);
          const text = maybeTheme.substring(themeMatch.length + 2);
          const cloned = cloneElement(
            child,
            {
              ...child.props,
              key: child.key || index,
            },
            <>
              {text}
              {remaining.map((item, index) => (
                <Fragment key={index}>{item}</Fragment>
              ))}
            </>
          );
          children.push(cloned);
          return;
        }
      }
    }

    children.push(child);
  });

  if (theme) {
    return (
      <div
        {...remaining}
        className={cnb(
          styles.blockquote,
          styles.themed,
          theme === "info" && styles.info,
          theme === "warning" && styles.warning,
          theme === "success" && styles.success,
          theme === "error" && styles.error,
          typography({ type: "subtitle-2" }),
          className
        )}
      >
        <BlockquoteThemeIcon theme={theme} />
        {children}
      </div>
    );
  }

  return (
    <blockquote
      {...remaining}
      className={cnb(
        styles.blockquote,
        typography({ type: "subtitle-2" }),
        className
      )}
    >
      {children}
    </blockquote>
  );
}
