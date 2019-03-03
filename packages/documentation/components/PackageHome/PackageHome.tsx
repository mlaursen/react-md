import React, { FunctionComponent } from "react";
import { Text, TextContainer } from "@react-md/typography";

export interface IPackageHomeProps {
  name: string;
}

const PackageHome: FunctionComponent<IPackageHomeProps> = ({ name }) => {
  return (
    <TextContainer>
      <Text type="headline-4">{name}</Text>
    </TextContainer>
  );
};

export default PackageHome;
