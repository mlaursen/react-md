import React, { FunctionComponent, ReactNode } from "react";
import { Text } from "@react-md/typography";

export interface CardTextProps {
  children: ReactNode;
}

const CardText: FunctionComponent<CardTextProps> = ({ children }) => (
  <Text className="home__card-text">{children}</Text>
);

export default CardText;
