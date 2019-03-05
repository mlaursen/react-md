import React, { FunctionComponent, ReactNode } from "react";
import { Text } from "@react-md/typography";

export interface ICardTextProps {
  children: ReactNode;
}

const CardText: FunctionComponent<ICardTextProps> = ({ children }) => (
  <Text className="home__card-text">{children}</Text>
);

export default CardText;
