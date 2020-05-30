import React, { FC } from "react";
import { Divider } from "@react-md/divider";
import { TextArea, TextField, FormThemeProvider } from "@react-md/form";
import { useIsUserInteractionMode } from "@react-md/utils";

import Phone from "components/Phone/Phone";

import styles from "./InputChips.module.scss";

import To from "./To";

const InputChips: FC = () => {
  const isTouch = useIsUserInteractionMode("touch");
  return (
    <FormThemeProvider theme="none">
      <Phone
        id="input-chips"
        statusBar
        contentClassName={styles.container}
        disableFocusOnMount={isTouch}
      >
        <To />
        <Divider />
        <TextField
          id="input-chips-subject"
          name="subject"
          inputClassName={styles.padded}
          placeholder="Subject"
          defaultValue="Re: Vacation Request"
        />
        <Divider />
        <TextArea
          id="input-chips-message"
          placeholder="Message"
          className={styles.message}
          areaClassName={styles.padded}
          resize="none"
        />
      </Phone>
    </FormThemeProvider>
  );
};

export default InputChips;
