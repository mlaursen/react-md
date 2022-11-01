import { Box, Typography } from "@react-md/core";
import { Form, Radio, useRadioGroup } from "@react-md/form";
import type { ReactElement } from "react";
import { InlineCode } from "../Code";

type ExampleValue = "a" | "b" | "c" | "d";

const DEFAULT_VALUE: ExampleValue = "a";

// This isn't shown, but numbers work the same way
export function StrictTypescriptTypes(): ReactElement {
  const { getRadioProps } = useRadioGroup<ExampleValue>({
    name: "manual",
    defaultValue: "a",
  });

  // you can also infer the type by providing a typed defualtValue
  const { getRadioProps: getRadioPropsInferred } = useRadioGroup({
    name: "inferred",
    defaultValue: DEFAULT_VALUE,
  });

  return (
    <Form>
      <Typography type="headline-4" margin="none">
        Defined by type parameter
      </Typography>
      <Box stacked align="start">
        <Radio {...getRadioProps("a")} label="First" />
        <Radio {...getRadioProps("b")} label="Second" />
        <Radio {...getRadioProps("c")} label="Third" />
        <Radio {...getRadioProps("d")} label="Fourth" />
        <Radio
          label="Type Error"
          {
            // @ts-expect-error is not one of `ExampleValue`
            ...getRadioProps("unknown")
          }
          error
        />
        <Radio
          label="Type Error"
          {
            // @ts-expect-error is not one of `ExampleValue`
            ...getRadioProps(1)
          }
          error
        />
      </Box>
      <Typography type="headline-4" margin="top">
        Inferred by <InlineCode>defaultValue</InlineCode>
      </Typography>
      <Box stacked align="start">
        <Radio {...getRadioPropsInferred("a")} label="First" />
        <Radio {...getRadioPropsInferred("b")} label="Second" />
        <Radio {...getRadioPropsInferred("c")} label="Third" />
        <Radio {...getRadioPropsInferred("d")} label="Fourth" />
        <Radio
          label="Type Error"
          {
            // @ts-expect-error is not one of `ExampleValue`
            ...getRadioPropsInferred("unknown")
          }
          error
        />
        <Radio
          label="Type Error"
          {
            // @ts-expect-error is not one of `ExampleValue`
            ...getRadioPropsInferred(1)
          }
          error
        />
      </Box>
    </Form>
  );
}
