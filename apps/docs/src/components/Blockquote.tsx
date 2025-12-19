import { typography } from "@react-md/core/typography/typographyStyles";
import { cnb } from "cnbuilder";
import {
  Children,
  Fragment,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  cloneElement,
  isValidElement,
} from "react";

import styles from "./Blockquote.module.scss";
import {
  type BlockquoteTheme,
  BlockquoteThemeIcon,
} from "./BlockquoteThemeIcon.js";

const THEME_REGEX = /!(Warn|Info|Success|Error)!/;

const getTheme = (theme: string): BlockquoteTheme => {
  switch (theme) {
    case "Warn":
      return "warning";
    default:
      return theme.toLowerCase() as BlockquoteTheme;
  }
};

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
  let children = propChildren;
  if (!theme) {
    const nextChildren: ReactNode[] = [];
    Children.forEach(propChildren, (child, index) => {
      if (!isValidElement<{ children: ReactNode }>(child)) {
        nextChildren.push(child);
        return;
      }

      const childChildren = child.props.children;
      if (typeof childChildren === "string") {
        const [, themeMatch] = childChildren.match(THEME_REGEX) || [];
        if (themeMatch) {
          theme = getTheme(themeMatch);
          nextChildren.push(
            cloneElement(
              child,
              { key: index },
              childChildren.slice(Math.max(0, themeMatch.length + 2))
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
            const text = maybeTheme.slice(Math.max(0, themeMatch.length + 2));
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
            nextChildren.push(cloned);
            return;
          }
        }
      }

      nextChildren.push(child);
    });

    children = nextChildren;
  }

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
