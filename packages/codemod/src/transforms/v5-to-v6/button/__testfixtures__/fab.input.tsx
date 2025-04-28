import { ReactNode, ReactElement } from "react";
import { FAB, FABProps, FABPosition } from "react-md";

interface CustomProps extends FABProps {
  altPosition?: FABPosition;
  children: ReactNode;
}

export function Custom(props: CustomProps): ReactElement {
  const { children, altPosition, ...remaining } = props;

  return (
    <FAB {...remaining} position={altPosition}>
      {children}
    </FAB>
  );
}
