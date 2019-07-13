import React, { FC, Fragment } from "react";
import {
  TextField,
  TextFieldTheme,
  Form,
  Fieldset,
  NativeSelect,
  useChoice,
  Radio,
} from "@react-md/form";
import {
  PersonSVGIcon,
  PhoneSVGIcon,
  LocationOnSVGIcon,
  EmailSVGIcon,
} from "@react-md/material-icons";
import { bem } from "@react-md/theme";

import Phone from "components/Phone";
import states from "constants/states";

import "./ExampleForm.scss";

const block = bem("example-form");

const themes: TextFieldTheme[] = ["none", "underline", "filled", "outline"];

const ExampleForm: FC = () => {
  const [currentTheme, handleChange] = useChoice<TextFieldTheme>("outline");
  const isUnstyled = currentTheme === "none";

  return (
    <Fragment>
      <Fieldset legend="Theme options" disableLegendSROnly unstyled={false}>
        {themes.map(theme => (
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
        <Form className={block()}>
          <PersonSVGIcon />
          <TextField
            id="contact-name"
            name="name"
            label={!isUnstyled && "Name"}
            placeholder="John Snow"
            theme={currentTheme}
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
            theme={currentTheme}
          />
          <LocationOnSVGIcon className={block("address-icon")} />
          <Fieldset legend="Full Address">
            <TextField
              id="contact-address"
              name="address"
              label={!isUnstyled && "Address"}
              placeholder="Some place street"
              theme={currentTheme}
            />
            <TextField
              id="contact-city"
              name="city"
              label={!isUnstyled && "City"}
              placeholder="Denver"
              className={block("address-field")}
              theme={currentTheme}
            />
            <NativeSelect
              id="contact-state"
              defaultValue=""
              name="state"
              inline
              label="State"
              className={block("address-field", { inline: true, first: true })}
              theme={currentTheme}
            >
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
              className={block("address-field", { inline: true })}
              theme={currentTheme}
            />
          </Fieldset>
          <EmailSVGIcon />
          <TextField
            id="contact-email"
            name="email"
            label={!isUnstyled && "Email"}
            placeholder="jsnow@email.com"
            theme={currentTheme}
          />
        </Form>
      </Phone>
    </Fragment>
  );
};

export default ExampleForm;
