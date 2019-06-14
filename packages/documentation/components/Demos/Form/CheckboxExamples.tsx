import React, { FC } from "react";
import { Button } from "@react-md/button";
import { Checkbox } from "@react-md/form";
import { CheckBoxSVGIcon } from "@react-md/material-icons";

import Container from "./Container";

const CheckboxExamples: FC = () => (
  <form onSubmit={event => event.preventDefault()}>
    <Container>
      {Array.from(new Array(5), (_, i) => (
        <Checkbox
          key={i}
          id={`checkbox-${i}`}
          name="checkboxes"
          label={`Checkbox ${i + 1}`}
          defaultChecked={i % 4 === 0}
          icon={<CheckBoxSVGIcon />}
        />
      ))}
      <Checkbox
        id="checkbox-6"
        name="checkboxes"
        label="Disabled"
        disabled
        icon={<CheckBoxSVGIcon />}
      />
    </Container>
    <Button type="reset">Reset</Button>
    <Button type="submit">Submit</Button>
  </form>
);

export default CheckboxExamples;
