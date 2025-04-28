import { type ReactElement } from "react";
import { Link } from "react-md";

export default function Example(): ReactElement {
  return (
    <>
      <Link href="#">Link 1</Link>
      <Link href="#" flexCentered>
        Link 1
      </Link>
      <Link href="#" flexCentered={flexCentered}>
        Link 1
      </Link>
      <Link href="#" preventMaliciousTarget={false}>
        Link 1
      </Link>
    </>
  );
}
