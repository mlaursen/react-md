import React, { FC } from "react";
import { useRadioState } from "@react-md/form";
import { Portal } from "@react-md/portal";
import { Text } from "@react-md/typography";

import Code from "components/Code/Code";
import Radio from "components/Radio";

import "./custom-portal-container.scss";

const values = [
  { intoId: "example-portal-container-1" },
  { into: "#example-portal-container-2" },
  {
    into: () =>
      document.getElementById("example-portal-container-3") as HTMLDivElement,
  },
];

const CustomPortalContainer: FC = () => {
  const [selected, handleChange] = useRadioState<"0" | "1" | "2">("0");

  return (
    <div className="portal-container-example">
      <Radio
        id="use-into-id"
        label="Use intoId"
        name="portalInto"
        value="0"
        checked={selected === "0"}
        onChange={handleChange}
        fullWidth
      />
      <Radio
        id="use-into-query"
        label="Use into query"
        name="portalInto"
        value="1"
        checked={selected === "1"}
        onChange={handleChange}
        fullWidth
      />
      <Radio
        id="use-into-function"
        label="Use into function"
        name="portalInto"
        value="2"
        checked={selected === "2"}
        onChange={handleChange}
        fullWidth
      />
      <Portal {...values[parseInt(selected, 10)]}>
        <Text type="subtitle-1" margin="none">
          Portal content!
        </Text>
      </Portal>
      <div id="example-portal-container-1" className="custom-portal-container">
        <Code>"example-portal-container-1"</Code>
      </div>
      <div id="example-portal-container-2" className="custom-portal-container">
        <Code>"example-portal-container-2"</Code>
      </div>
      <div id="example-portal-container-3" className="custom-portal-container">
        <Code>"example-portal-container-3"</Code>
      </div>
    </div>
  );
};

export default CustomPortalContainer;
