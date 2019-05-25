import React, { FC, useState, useCallback } from "react";
import { TextIconSpacing } from "@react-md/icon";
import { Portal } from "@react-md/portal";
import { Text } from "@react-md/typography";
import Code from "components/Code/Code";

import "./custom-portal-container.scss";

const values = [
  { intoId: "example-portal-container-1" },
  { into: ".portal-container-example .custom-portal-container:nth-of-type(2)" },
  {
    into: () =>
      document.getElementById("example-portal-container-3") as HTMLDivElement,
  },
];

type SelectedIndex = 0 | 1 | 2;

const CustomPortalContainer: FC = () => {
  const [selected, setSelected] = useState<SelectedIndex>(0);
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { id } = event.target;
      let index: SelectedIndex = 0;
      if (id === "use-into-query") {
        index = 1;
      } else if (id === "use-into-callback") {
        index = 2;
      }
      setSelected(index);
    },
    []
  );

  return (
    <div className="portal-container-example">
      <TextIconSpacing
        icon={
          <input
            id="use-into-id"
            name="portal-props"
            type="radio"
            checked={selected === 0}
            onChange={handleChange}
          />
        }
        iconAfter
      >
        <label htmlFor="use-into-id">into id</label>
      </TextIconSpacing>
      <TextIconSpacing
        icon={
          <input
            id="use-into-query"
            name="portal-props"
            type="radio"
            checked={selected === 1}
            onChange={handleChange}
          />
        }
        iconAfter
      >
        <label htmlFor="use-into-query">into query</label>
      </TextIconSpacing>
      <TextIconSpacing
        icon={
          <input
            id="use-into-callback"
            name="portal-props"
            type="radio"
            checked={selected === 2}
            onChange={handleChange}
          />
        }
        iconAfter
      >
        <label htmlFor="use-into-callback">into function</label>
      </TextIconSpacing>
      <Portal {...values[selected]}>
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
