import { Link } from "@react-md/core/link/Link";
import { objectFit } from "@react-md/core/objectFit";
import Image from "next/image.js";
import { type ReactElement } from "react";

import colorPicker from "./material-design-color-picker.png";

export function ColorPickerLink(): ReactElement {
  return (
    <Link
      flex
      href="https://m2.material.io/inline-tools/color/"
      target="_blank"
    >
      <Image
        alt="Material Design Color Picker"
        src={colorPicker}
        className={objectFit()}
      />
    </Link>
  );
}
