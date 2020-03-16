import React, { FC } from "react";
import { Button } from "@react-md/button";
import { Overlay } from "@react-md/overlay";
import { useToggle } from "@react-md/utils";

const SimpleExample: FC = () => {
  const [toggled, , disable, toggle] = useToggle(false);
  return (
    <>
      <Button
        id="simple-overlay-button"
        onClick={toggle}
        theme="primary"
        themeType="contained"
      >
        Show Overlay
      </Button>
      <Overlay id="simple-overlay" visible={toggled} onRequestClose={disable} />
    </>
  );
};

export default SimpleExample;
