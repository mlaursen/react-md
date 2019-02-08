import React, { FunctionComponent, Fragment, useState, ReactNode } from "react";
import cn from "classnames";
import { UpdateRMDVariables, ICSSVariable } from "@react-md/theme";
import { Button } from "@react-md/button";
import { TextContainer } from "@react-md/typography";

import "./theme.scss";

export interface IThemeVarible {
  label: ReactNode;
  name: string;
  type?: string;
}

const VARIABLES: IThemeVarible[] = [
  {
    label: "Backgroud color",
    name: "theme-background",
    type: "color",
  },
  {
    label: "Text color",
    name: "theme-text-primary-on-background",
    type: "color",
  },
  {
    label: "Text secondary color",
    name: "theme-text-secondary-on-background",
    type: "color",
  },
];

const Theme: FunctionComponent = () => {
  const [variables, setVariables] = useState<ICSSVariable[]>([]);

  return (
    <UpdateRMDVariables variables={variables}>
      <TextContainer>
        <form
          onChange={event => {
            const target = event.target as HTMLInputElement;
            if (!target) {
              return;
            }

            const { id, value } = target;
            const i = variables.findIndex(({ name }) => name === id);
            const variable = { name: id, value };
            if (i === -1) {
              setVariables(variables.concat(variable));
            } else {
              const nextVariables = variables.slice();
              nextVariables[i] = variable;
              setVariables(nextVariables);
            }
          }}
        >
          {VARIABLES.map(({ label, name, type = "text", ...props }) => (
            <div key={name} className="group">
              <label htmlFor={name} className="label">
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                {...props}
                className={`input input--${type}`}
              />
            </div>
          ))}
        </form>
      </TextContainer>
    </UpdateRMDVariables>
  );
};

export default Theme;
