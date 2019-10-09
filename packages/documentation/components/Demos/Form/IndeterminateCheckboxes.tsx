import React, { FC, useState } from "react";
import { Fieldset, Checkbox } from "@react-md/form";

const condiments = ["Lettuce", "Tomato", "Mustard", "Sprouts"];

const IndeterminateCheckboxes: FC = () => {
  const [checked, setChecked] = useState<typeof condiments>(["Sprouts"]);
  const indeterminate =
    checked.length > 0 && checked.length !== condiments.length;

  return (
    <Fieldset legend="Sandwich Condiments" disableLegendSROnly unstyled={false}>
      <Checkbox
        id="condiments-all"
        label="All Condiments"
        indeterminate={indeterminate}
        checked={checked.length > 0}
        onChange={() => {
          if (checked.length === 0 || indeterminate) {
            setChecked(condiments);
          } else {
            setChecked([]);
          }
        }}
        aria-controls={condiments.map((_, i) => `condiment-${i}`).join(" ")}
        aria-checked={indeterminate ? "mixed" : undefined}
      />
      <ul role="none" style={{ listStyleType: "none" }}>
        {condiments.map((condiment, i) => (
          <li key={condiment}>
            <Checkbox
              id={`condiment-${i}`}
              label={condiment}
              name="condiment"
              checked={checked.includes(condiment)}
              onChange={() => {
                const i = checked.indexOf(condiment);
                const nextChecked = checked.slice();
                if (i === -1) {
                  nextChecked.push(condiment);
                } else {
                  nextChecked.splice(i, 1);
                }

                setChecked(nextChecked);
              }}
            />
          </li>
        ))}
      </ul>
    </Fieldset>
  );
};

export default IndeterminateCheckboxes;
