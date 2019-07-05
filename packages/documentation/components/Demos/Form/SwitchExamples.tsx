import React, { FC, useState } from "react";
import { Form, Switch, useCheckboxState, SwitchProps } from "@react-md/form";
import { CircularProgress } from "@react-md/progress";
import { useTimeout } from "@react-md/utils";
import { UpdateRMDVariables } from "@react-md/theme";

// this is used while the loading state is enabled to "disable" the switch toggle.
// If we disable the entire switch, keyboard focus is lost which is not desired.
const noop = () => {};

const AsyncSwitch: FC<SwitchProps> = ({ onChange, ...props }) => {
  const [loading, setLoading] = useState(false);
  const { start } = useTimeout(() => setLoading(false), 4000);
  const [checked, handleChange] = useCheckboxState(false, event => {
    if (onChange) {
      onChange(event);
    }

    start();
    setLoading(true);
  });

  return (
    <UpdateRMDVariables
      variables={[
        { name: "progress-circular-width", value: "12" },
        { name: "progress-circular-size", value: "1.25rem" },
      ]}
    >
      <Switch
        {...props}
        labelDisabled={false}
        onChange={loading ? noop : handleChange}
        checked={checked}
      >
        {loading && (
          <CircularProgress
            id={`${props.id}-loading`}
            style={{
              borderRadius: "inherit",
              zIndex: 3,
              backgroundColor: "#fff",
              padding: 2,
            }}
            centered={false}
          />
        )}
      </Switch>
    </UpdateRMDVariables>
  );
};

const SwitchExamples: FC = () => {
  return (
    <Form>
      <Switch id="switch-1" name="switch" label="Switch" />
      <Switch id="switch-2" name="switch" label="Switch" defaultChecked />
      <Switch id="switch-3" name="switch" label="Switch" disabled />
      <Switch
        id="switch-4"
        name="switch"
        label="Switch"
        disabled
        defaultChecked
      />
      <AsyncSwitch id="switch-5" name="switch" label="Async Switch" />
    </Form>
  );
};

export default SwitchExamples;
