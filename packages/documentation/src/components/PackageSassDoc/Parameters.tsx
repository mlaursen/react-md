import * as React from "react";

import Markdown from "components/Markdown";
import { IParameter } from "types/sassdoc";

import SassDocTitle from "./SassDocTitle";

export interface IParametersProps {
  parameters?: IParameter[];
}

const Parameters: React.SFC<IParametersProps> = ({ parameters }) => {
  if (!parameters || !parameters.length) {
    return null;
  }

  return (
    <React.Fragment>
      <SassDocTitle>Parameters</SassDocTitle>
      <table>
        <thead>
          <tr>
            <th role="tableheader">Name</th>
            <th role="tableheader">Description</th>
            <th role="tableheader">Type</th>
            <th role="tableheader">Default value</th>
          </tr>
        </thead>
        <tbody>
          {parameters.map(({ name, description, type, default: defaultValue }) => (
            <tr key={name}>
              <td><pre>${name}</pre></td>
              <td>
                <Markdown markdown={description} />
              </td>
              <td><pre>{type}</pre></td>
              <td><pre>{defaultValue}</pre></td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Parameters;
