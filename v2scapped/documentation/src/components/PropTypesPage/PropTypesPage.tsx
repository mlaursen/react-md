import * as React from "react";
import { Text, TextContainer } from "@react-md/typography";

export interface IPropTypesPageProps {
  name: string;
}

export default class PropTypesPage extends React.Component<IPropTypesPageProps> {
  public render() {
    const { name } = this.props;
    return (
      <TextContainer>
        <Text type="headline-2">{`${name} PropTypes`}</Text>
        <Text type="headline-3">Coming Soon!</Text>
      </TextContainer>
    );
  }
}
