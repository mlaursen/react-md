import {
  Children,
  type FC,
  type ReactElement,
  type ReactNode,
  memo,
} from "react";

export interface WalkChildrenRendererProps {
  match: RegExpExecArray;
}

export interface WalkChildrenProps {
  regex: RegExp;
  children: ReactNode;
  renderer: FC<WalkChildrenRendererProps>;
}

export const WalkChildren = memo(function WalkChildren(
  props: WalkChildrenProps
) {
  const { regex, children, renderer: Replacement } = props;

  return (
    <>
      {Children.map(children, (child) => {
        if (!child || typeof child !== "string") {
          return child;
        }

        const replacements: (ReactElement | string)[] = [];

        let start = 0;
        let match: RegExpExecArray | null;
        while ((match = regex.exec(child)) != null) {
          const [color] = match;
          const prefix = child.substring(start, match.index);
          start = match.index + color.length;

          replacements.push(prefix, <Replacement match={match} />);
        }

        if (replacements.length) {
          if (start) {
            replacements.push(child.substring(start));
          }

          return replacements;
        }

        return child;
      })}
    </>
  );
});
