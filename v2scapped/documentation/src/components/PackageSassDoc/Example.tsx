import * as React from "react";
import { Text } from "@react-md/typography";

import Markdown from "components/Markdown";
import { ISassDocExample } from "types/sassdoc";

export interface IExampleProps {
  sassdocId: string;
  example: ISassDocExample;
}

export interface IExampleState {
  compiled: boolean;
}

export default class Example extends React.Component<IExampleProps, IExampleState> {
  constructor(props: IExampleProps) {
    super(props);

    this.state = { compiled: false };
  }

  public render() {
    const { compiled } = this.state;
    const { example, sassdocId } = this.props;
    const { description, type, htmlExample } = example;
    const code = compiled ? example.compiledCode : example.code;

    const inputId = `${sassdocId}-compiled`;
    return (
      <React.Fragment>
        <Text type="headline-6" className="sassdoc__example-title">
          {description}
        </Text>
        <Text type="overline">
          {({ className }) => (
            <label htmlFor={inputId} className={className}>
              View Compiled?
            </label>
          )}
        </Text>
        <input id={inputId} type="checkbox" checked={compiled} onChange={this.updateCompiled} />
        <Markdown className="sassdoc__example" markdown={`\`\`\`${type}\n${code}\n\`\`\``} />
        {htmlExample && (
          <Markdown
            className="sassdoc__example"
            markdown={`##### ${description} HTML\n\n\`\`\`html\n${htmlExample}\n\`\`\``}
          />
        )}
      </React.Fragment>
    );
  }

  private updateCompiled = (event: React.ChangeEvent<HTMLInputElement>) => {
    const compiled = event.target.checked;
    if (this.state.compiled !== compiled) {
      this.setState({ compiled });
    }
  };
}
