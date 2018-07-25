import * as React from "react";
import { Text } from "@react-md/typography";

import "./examples-page.scss";
import { default as Example, IExampleProps } from "./Example";

export interface IExamplesPageProps {
  title: string;
  examples: IExampleProps[];
}

const ExamplesPage: React.SFC<IExamplesPageProps> = ({
  title,
  examples,
}) => (
  <section className="examples-page">
    <Text type="headline-2" className="examples-page__block">{title}</Text>
    {examples.map((example, key) => <Example key={key} {...example} />)}
  </section>
);

export default ExamplesPage;
