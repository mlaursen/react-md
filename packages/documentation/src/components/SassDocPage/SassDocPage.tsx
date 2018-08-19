import * as React from "react";
import { Text, TextContainer } from "@react-md/typography";

export interface ISassDocPageProps {
  name: string;
}

export default class SassDocPage extends React.Component<ISassDocPageProps> {
  public render() {
    const { name } = this.props;
    return (
      <TextContainer>
        <Text type="headline-2">{`${name} SassDoc`}</Text>
        <Text type="headline-3">Coming Soon!</Text>
      </TextContainer>
    );
  }
}
