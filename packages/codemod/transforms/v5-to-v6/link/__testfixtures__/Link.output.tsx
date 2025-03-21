import { type ReactElement } from "react";
import { Link } from "react-md";

export default function Example(): ReactElement {
  return (
    <>
      <Link href="#">Link 1</Link>
      <Link href="#" flex>
        Link 1
      </Link>
      <Link href="#" flex={flexCentered}>
        Link 1
      </Link>
      <Link href="#">
        Link 1
      </Link>
    </>
  );
}
