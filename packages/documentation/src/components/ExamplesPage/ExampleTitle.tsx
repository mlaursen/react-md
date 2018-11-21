import * as React from "react";
import { Text } from "@react-md/typography";

export interface IExampleTitleProps {
  children: React.ReactNode;
}

const ExampleTitle: React.FunctionComponent<IExampleTitleProps> = ({ children }) => (
  <Text type="headline-6">{children}</Text>
);

export default ExampleTitle;
