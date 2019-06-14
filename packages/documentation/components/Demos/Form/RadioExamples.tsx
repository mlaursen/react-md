import React, { FC } from "react";
import { Button } from "@react-md/button";
import { Radio } from "@react-md/form";

import Container from "./Container";

const RadioExamples: FC = () => {
  return (
    <form onSubmit={event => event.preventDefault()}>
      <Container>
        <Radio id="radio-1" name="radios" label="Radio 1" inline required />
        <Radio id="radio-2" name="radios" label="Radio 2" inline required />
        <Radio id="radio-3" name="radios" label="Radio 3" inline required />
        <Radio id="radio-4" name="radios" label="Radio 4" inline required />
      </Container>
      <Button type="reset">Reset</Button>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default RadioExamples;
