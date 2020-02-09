import React, { FC } from "react";
import { Divider } from "@react-md/divider";
import { TextArea, TextField } from "@react-md/form";
import { useIsUserInteractionMode } from "@react-md/utils";

import Phone from "components/Phone/Phone";

import styles from "./styles";
import To from "./To";

const InputChips: FC = () => {
  const isTouch = useIsUserInteractionMode("touch");
  return (
    <Phone
      id="input-chips"
      statusBar
      contentClassName={styles()}
      disableFocusOnMount={isTouch}
    >
      <To isTouch={isTouch} />
      <Divider />
      <TextField
        id="input-chips-subject"
        name="subject"
        theme="none"
        inputClassName={styles("subject")}
        placeholder="Subject"
        defaultValue="Re: Vacation Request"
      />
      <Divider />
      <TextArea
        id="input-chips-message"
        placeholder="Message"
        theme="none"
        className={styles("message")}
        areaClassName={styles("message-area")}
        resize="none"
      />
    </Phone>
  );
};

export default InputChips;
