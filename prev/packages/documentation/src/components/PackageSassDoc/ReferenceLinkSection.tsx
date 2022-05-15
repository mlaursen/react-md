import type { ReactElement, ReactNode } from "react";
import { useState } from "react";
import { Button } from "@react-md/button";
import { IconRotator } from "@react-md/icon";
import { ChevronLeftSVGIcon } from "@react-md/material-icons";
import { Collapse } from "@react-md/transition";
import { Typography } from "@react-md/typography";

import type { ItemReferenceLink } from "utils/sassdoc";

import ReferenceLinkList from "./ReferenceLinkList";
import styles from "./ReferenceLinkSection.module.scss";

export interface ReferenceLinkSectionProps {
  links: ItemReferenceLink[] | undefined;
  children: ReactNode;
}

export default function ReferenceLinkSection({
  children,
  links,
}: ReferenceLinkSectionProps): ReactElement | null {
  const [collapsed, setCollapsed] = useState(true);
  if (!links || !links.length) {
    return null;
  }

  return (
    <>
      <Typography type="headline-6" margin="top" className={styles.container}>
        {children}
        <Button
          aria-label="Expand"
          aria-pressed={!collapsed}
          onClick={() => setCollapsed((p) => !p)}
          buttonType="icon"
        >
          <IconRotator rotated={!collapsed}>
            <ChevronLeftSVGIcon className={styles.chevron} />
          </IconRotator>
        </Button>
      </Typography>
      <Collapse collapsed={collapsed}>
        <ul>
          <ReferenceLinkList links={links} />
        </ul>
      </Collapse>
    </>
  );
}
