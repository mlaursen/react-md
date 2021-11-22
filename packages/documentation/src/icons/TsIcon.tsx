import { ReactElement } from "react";
import { SVGIcon, SVGIconProps } from "@react-md/icon";

export default function TsIcon(props: SVGIconProps): ReactElement {
  return (
    <SVGIcon {...props} viewBox="0 0 72 96">
      <path
        fill="#4065aa"
        d="M0 2v92c0 1.1.9 2 2 2h68c1.1 0 2-.9 2-2V28H50c-1.1 0-2-.9-2-2V0H2C.9 0 0 .9 0 2z"
      />
      <path fill="#4065aa" d="M71.9 24c-.1-.4-.2-.7-.4-1L52 1.2V24h19.9z" />
      <path
        d="M6 41h60v49H6zM8.9 9.3H5.7V6.4h9.6v2.9h-3.2v11.4H8.9V9.3zm9.9 7.4c.6.6 1.4 1.2 2.3 1.2s1.3-.6 1.3-1.2c0-2-4.8-2.1-4.8-6.2 0-2.4 1.7-4.3 4.5-4.3 1.2 0 2.4.3 3.4 1l-1.2 2.9c-.5-.4-1.4-.9-2.2-.9-.9 0-1.3.6-1.3 1.2 0 2.1 4.8 2 4.8 6.1 0 2.3-1.5 4.4-4.4 4.4-1.4 0-2.9-.5-4-1.4l1.6-2.8z"
        fill="#fff"
      />
      <path
        fill="#4065aa"
        d="M37.9 55.1v-7.6H33c-.1.3-.2.6-.2 1-.1.2-.1.3-.1.5-.5 2.8-2 4.8-4.5 5.9-.7.3-1.4.4-2.1.3v6.1h3.6c.1 8.6.1 13.1.1 13.3v.5c.5 3.8 2.4 6 5.9 6.9 1.4.4 2.9.6 4.5.6 2-.1 3.9-.4 5.8-1v-7.2c-1.1.3-2.1.6-3 .9-1.7.5-3.2.2-4.4-1-.1-.2-.3-.4-.3-.6-.2-.9-.3-1.9-.3-2.8v-9.6h7.8v-6.1h-7.9v-.1z"
      />
    </SVGIcon>
  );
}
