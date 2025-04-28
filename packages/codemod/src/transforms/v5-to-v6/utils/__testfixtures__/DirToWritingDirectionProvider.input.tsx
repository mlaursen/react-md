import { type ReactElement } from "react";
import { Dir, DirProps, DEFAULT_DIR, WritingDirection, useDir } from "react-md";

export function Example1(props: DirProps): ReactElement {
  return <Dir defaultDir={DEFAULT_DIR} {...props} />;
}

export function Example2(): ReactElement {
  let dir: WritingDirection = "ltr";
  if (something) {
    dir = "rtl";
  }

  return <Dir defaultDir={dir} />;
}

export function Example3(): ReactElement {
  const { dir, toggleDir } = useDir();

  return (
    <button type="button" onClick={toggleDir}>
      {dir}
    </button>
  );
}
