"use client";

import { Box } from "@react-md/core/box/Box";
import { box } from "@react-md/core/box/styles";
import { Button } from "@react-md/core/button/Button";
import { Form } from "@react-md/core/form/Form";
import { FormMessage } from "@react-md/core/form/FormMessage";
import { Radio } from "@react-md/core/form/Radio";
import { useRadioGroup } from "@react-md/core/form/useRadioGroup";
import { type ReactElement, useState } from "react";

export default function FormLevelValidationMessage(): ReactElement {
  const [error, setError] = useState(false);
  const { getRadioProps, reset } = useRadioGroup({
    name: "choices",
    required: true,
    onInvalid: () => {
      setError(true);
    },
    onChange: () => {
      setError(false);
    },
  });

  return (
    <Form
      name="validation"
      className={box({ stacked: true, align: "stretch" })}
      onReset={() => {
        reset();
        setError(false);
      }}
    >
      <FormMessage role="alert" error>
        {error && "Please fill in the required fields."}
      </FormMessage>
      <Radio {...getRadioProps("a")} label="First" />
      <Radio {...getRadioProps("b")} label="Second" />
      <Radio {...getRadioProps("c")} label="Third" />
      <Radio {...getRadioProps("d")} label="Forth" />
      <Box disablePadding justify="space-between">
        <Button type="reset" theme="warning" themeType="outline">
          Reset
        </Button>
        <Button type="submit" theme="primary" themeType="contained">
          Submit
        </Button>
      </Box>
    </Form>
  );
}
