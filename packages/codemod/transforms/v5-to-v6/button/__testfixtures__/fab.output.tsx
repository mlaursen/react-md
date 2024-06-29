import { ReactNode, ReactElement } from "react";
import { FloatingActionButton, FloatingActionButtonProps, FloatingActionButtonPosition } from "react-md";

interface CustomProps extends FloatingActionButtonProps {
  altPosition?: FloatingActionButtonPosition;
  children: ReactNode;
}

export function Custom(props: CustomProps): ReactElement {
  const { children, altPosition, ...remaining } = props;

  return (
    (<FloatingActionButton {...remaining} position={altPosition}>
      {children}
    </FloatingActionButton>)
  );
}
