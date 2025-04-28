import { type ReactElement } from "react";
import { WritingDirectionProvider, WritingDirectionProviderProps, DEFAULT_WRITING_DIRECTION, Dir, useDir } from "react-md";

export function Example1(props: WritingDirectionProviderProps): ReactElement {
  return <WritingDirectionProvider defaultDir={DEFAULT_WRITING_DIRECTION} {...props} />;
}

export function Example2(): ReactElement {
  let dir: Dir = "ltr";
  if (something) {
    dir = "rtl";
  }

  return <WritingDirectionProvider defaultDir={dir} />;
}

export function Example3(): ReactElement {
  const { dir, toggleDir } = useDir();

  return (
    <button type="button" onClick={toggleDir}>
      {dir}
    </button>
  );
}
