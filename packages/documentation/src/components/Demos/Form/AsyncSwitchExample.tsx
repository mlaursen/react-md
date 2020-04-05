import React, { FC, useState } from "react";
import { AsyncSwitch, Checkbox, useCheckboxState } from "@react-md/form";
import { useTimeout } from "@react-md/utils";

const AsyncSwitchExample: FC = () => {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [fail, handleFailChange] = useCheckboxState(false);
  const [start] = useTimeout(() => {
    setLoading(false);
    if (fail) {
      setChecked((prevChecked) => !prevChecked);
    }
  }, 5000);

  return (
    <>
      <Checkbox
        id="async-switch-fail"
        label={'Fail the "API" call'}
        checked={fail}
        onChange={handleFailChange}
      />
      <AsyncSwitch
        id="async-switch"
        name="switch"
        label="Async Switch"
        loading={loading}
        onChange={(event) => {
          start();
          setLoading(true);
          setChecked(event.currentTarget.checked);
        }}
        checked={checked}
      />
    </>
  );
};

export default AsyncSwitchExample;
