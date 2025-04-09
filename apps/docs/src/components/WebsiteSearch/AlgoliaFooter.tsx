import { cssUtils } from "@react-md/core/cssUtils";
import { DialogFooter } from "@react-md/core/dialog/DialogFooter";
import { Divider } from "@react-md/core/divider/Divider";
import { Link } from "@react-md/core/link/Link";
import Image from "next/image.js";
import { type ReactElement } from "react";

import algolia from "./Algolia-logo-blue.svg";
import styles from "./AlgoliaFooter.module.scss";

export function AlgoliaFooter(): ReactElement {
  return (
    <>
      <Divider className={styles.divider} />
      <DialogFooter>
        <Link
          href="https://www.algolia.com/"
          target="_blank"
          flex
          className={cssUtils({
            textColor: "text-secondary",
            textDecoration: "none",
          })}
        >
          Search by{" "}
          <Image alt="algolia" src={algolia} className={styles.algolia} />
        </Link>
      </DialogFooter>
    </>
  );
}
