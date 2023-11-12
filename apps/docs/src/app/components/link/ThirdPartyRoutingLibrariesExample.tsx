import { link } from "@react-md/core";
import Link from "next/link.js";
import { type ReactElement } from "react";

export default function ThirdPartyRoutingLibrariesExample(): ReactElement {
  return (
    <Link
      href="https://nextjs.org"
      className={link()}
      // className={link({
      //   flex: true,
      //   className: "",
      // })}
    >
      Next.js
    </Link>
  );
}
