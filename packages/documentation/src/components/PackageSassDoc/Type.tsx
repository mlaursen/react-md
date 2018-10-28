import * as React from "react";
import { Text } from "@react-md/typography";

export interface ITypeProps {
  children?: React.ReactNode;
}

const Type: React.SFC<ITypeProps> = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <Text type="subtitle-1" component="span" className="sassdoc__type">
      {children}
    </Text>
  );
};

export default Type;
