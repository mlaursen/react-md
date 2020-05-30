import React, { FC } from "react";
import cn from "classnames";
import {
  Fieldset,
  Form,
  NativeSelect,
  Radio,
  TextField,
  FormTheme,
  useChoice,
  FormThemeProvider,
} from "@react-md/form";
import {
  EmailSVGIcon,
  LocationOnSVGIcon,
  PersonSVGIcon,
  PhoneSVGIcon,
} from "@react-md/material-icons";

import Phone from "components/Phone";
import states from "constants/states";

import styles from "./ExampleForm.module.scss";

const themes: FormTheme[] = ["none", "underline", "filled", "outline"];

const ExampleForm: FC = () => {
  const [currentTheme, handleChange] = useChoice<FormTheme>("outline");
  const isUnstyled = currentTheme === "none";

  return (
    <FormThemeProvider theme={currentTheme}>
      <Fieldset legend="Theme options" unstyled={false}>
        {themes.map((theme) => (
          <Radio
            id={`form-theme-${theme}`}
            key={theme}
            name="theme"
            onChange={handleChange}
            value={theme}
            checked={currentTheme === theme}
            label={theme}
          />
        ))}
      </Fieldset>
      <Phone id="example-form-phone">
        <Form className={styles.form}>
          <PersonSVGIcon />
          <TextField
            id="contact-name"
            name="name"
            label={!isUnstyled && "Name"}
            placeholder="John Snow"
          />
          <PhoneSVGIcon />
          <TextField
            id="contact-phone"
            type="tel"
            name="phone"
            label={!isUnstyled && "Phone"}
            placeholder="123-4567"
            pattern="\d{3}-\d{4}"
            maxLength={8}
          />
          <LocationOnSVGIcon className={styles.icon} />
          <Fieldset legend="Full Address" legendClassName={styles.legend}>
            <TextField
              id="contact-address"
              name="address"
              label={!isUnstyled && "Address"}
              placeholder="Some place street"
            />
            <TextField
              id="contact-city"
              name="city"
              label={!isUnstyled && "City"}
              placeholder="Denver"
              className={styles.field}
            />
            <NativeSelect
              id="contact-state"
              defaultValue=""
              name="state"
              inline
              label="State"
              className={cn(styles.field, styles.inline, styles.first)}
            >
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <option value="" disabled hidden />
              {states.map(({ name, abbreviation }) => (
                <option key={abbreviation} value={abbreviation}>
                  {name}
                </option>
              ))}
            </NativeSelect>
            <TextField
              id="contact-zip"
              name="zip"
              label={!isUnstyled && "Zip"}
              placeholder="12345"
              inline
              pattern="\d{5}"
              maxLength={5}
              className={cn(styles.field, styles.inline)}
            />
          </Fieldset>
          <EmailSVGIcon />
          <TextField
            id="contact-email"
            name="email"
            label={!isUnstyled && "Email"}
            placeholder="jsnow@email.com"
          />
        </Form>
      </Phone>
    </FormThemeProvider>
  );
};

export default ExampleForm;
