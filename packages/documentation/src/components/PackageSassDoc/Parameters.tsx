import * as React from "react";
import * as SassDoc from "sassdoc";

import Markdown from "components/Markdown";

import SassDocTitle from "./SassDocTitle";

export interface IParametersProps {
  parameters?: SassDoc.IParameter[];
}

const Parameters: React.SFC<IParametersProps> = ({ parameters }) => {
  if (!parameters || !parameters.length) {
    return null;
  }

  return (
    <React.Fragment>
      <SassDocTitle>Parameters</SassDocTitle>
      <table className="sassdoc__parameters-table">
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
              <td>
                <code>${name}</code>
              </td>
              <td>
                <Markdown markdown={description} />
              </td>
              <td>
                <code>{type}</code>
              </td>
              <td>
                <code>{defaultValue && `${defaultValue.replace(/^rmd/, "$rmd")}`}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Parameters;
