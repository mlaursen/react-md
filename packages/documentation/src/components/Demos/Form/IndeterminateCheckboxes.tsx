import React, { FC } from "react";
import { Checkbox, Fieldset, useIndeterminateChecked } from "@react-md/form";

const condiments = ["Lettuce", "Tomato", "Mustard", "Sprouts"];

const IndeterminateCheckboxes: FC = () => {
  const {
    getProps,
    rootProps,
    // checkedValues,
    // setCheckedValues,
  } = useIndeterminateChecked(condiments, ["Sprouts"]);

  return (
    <Fieldset legend="Sandwich Condiments" unstyled={false}>
      <Checkbox id="condiments-all" label="All Condiments" {...rootProps} />
      <ul role="none" style={{ listStyleType: "none" }}>
        {condiments.map((condiment, i) => (
          <li key={condiment}>
            <Checkbox
              id={`condiment-${i}`}
              label={condiment}
              name="condiment"
              {...getProps(condiment)}
            />
          </li>
        ))}
      </ul>
    </Fieldset>
  );
};

export default IndeterminateCheckboxes;
