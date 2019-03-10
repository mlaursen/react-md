import React, { FunctionComponent, ReactNode } from "react";
import { Text } from "@react-md/typography";

export interface CardProps {
  title: ReactNode;
  children: ReactNode;
}

const Card: FunctionComponent<CardProps> = ({ title, children }) => (
  <div className="home__card">
    <Text type="headline-6" className="home__card-title">
      {title}
    </Text>
    {children}
  </div>
);

export default Card;
