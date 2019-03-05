import React, { FunctionComponent, ReactNode } from "react";
import { Text } from "@react-md/typography";

export interface ICardProps {
  title: ReactNode;
  children: ReactNode;
}

const Card: FunctionComponent<ICardProps> = ({ title, children }) => (
  <div className="home__card">
    <Text type="headline-6" className="home__card-title">
      {title}
    </Text>
    {children}
  </div>
);

export default Card;
