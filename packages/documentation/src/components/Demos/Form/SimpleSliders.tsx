import React, { ReactElement } from "react";
import { SimpleSlider, useSimpleSlider } from "@react-md/form";
import { VolumeUpSVGIcon } from "@react-md/material-icons";

import { useId } from "components/IdProvider";

export default function SimpleSliders(): ReactElement | null {
  const [, controls1] = useSimpleSlider();
  const [, controls2] = useSimpleSlider();
  const [, controls3] = useSimpleSlider();
  return (
    <>
      <SimpleSlider id={useId()} aria-label="" {...controls1} />
      <SimpleSlider
        id={useId()}
        aria-label=""
        {...controls2}
        beforeAddon={<VolumeUpSVGIcon />}
      />
      <SimpleSlider id={useId()} aria-label="" {...controls3} vertical />
    </>
  );
}
