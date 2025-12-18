import { box, boxStyles } from "@react-md/core/box/styles";
import { Divider } from "@react-md/core/divider/Divider";
import { Fieldset } from "@react-md/core/form/Fieldset";
import { Form } from "@react-md/core/form/Form";
import { Legend } from "@react-md/core/form/Legend";
import { Radio } from "@react-md/core/form/Radio";
import { TextField } from "@react-md/core/form/TextField";
import { type FormTheme } from "@react-md/core/form/types";
import { useRadioGroup } from "@react-md/core/form/useRadioGroup";
import { typography } from "@react-md/core/typography/typographyStyles";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

export default function FloatingLabelOptionsExample(): ReactElement {
  const { value: theme, getRadioProps } = useRadioGroup<FormTheme>({
    name: "theme",
    defaultValue: "outline",
  });
  return (
    <Form className={box({ fullWidth: true })}>
      <Fieldset
        floatingLegend
        {...boxStyles({
          grid: true,
          fullWidth: true,
          gridColumns: { phone: 1 },
          gridItemSize: { tablet: "8rem" },
        })}
      >
        <Legend
          floating
          theme={theme}
          // active
          gap
          // error
          // stacked
          // disabled
          // reversed
        >
          I am legend
          <FavoriteIcon theme="currentcolor" />
        </Legend>
        <TextField placeholder="Field 1" theme={theme} />
        <TextField placeholder="Field 2" theme={theme} />
        <TextField placeholder="Field 3" theme={theme} />
      </Fieldset>
      <Divider />
      <Fieldset
        fullWidth
        className={box({ align: "start", stacked: true, disableGap: true })}
      >
        <Legend>Form Theme</Legend>
        {themes.map((theme) => (
          <Radio
            key={theme}
            {...getRadioProps(theme)}
            label={theme}
            className={typography({ type: null, textTransform: "capitalize" })}
          />
        ))}
      </Fieldset>
    </Form>
  );
}

const themes: readonly FormTheme[] = ["underline", "filled", "outline"];
