import * as React from "react";
import { Text } from "@react-md/typography";

import Markdown from "components/Markdown";

import "./examples-page.scss";
import { default as Example, IExampleProps } from "./Example";

export type ExampleList = IExampleProps[];

export interface IExamplesPageProps {
  title: string;
  description?: string;
  examples: ExampleList;
}

const ExamplesPage: React.SFC<IExamplesPageProps> = ({ title, description, examples }) => (
  <section className="examples-page">
    <header className="rmd-text-container">
      <Text type="headline-2" className="examples-page__title">
        {title}
      </Text>
      {description && <Markdown className="rmd-text-container" markdown={description} />}
    </header>
    {examples.map((example, key) => <Example key={key} {...example} />)}
  </section>
);

export default ExamplesPage;
