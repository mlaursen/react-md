import type { ReactElement } from "react";
import { Radio, useChoice } from "@react-md/form";
import { Portal } from "@react-md/portal";
import { Typography } from "@react-md/typography";

import Code from "components/Code";

import styles from "./CustomPortalContainer.module.scss";

const values = [
  { intoId: "example-portal-container-1" },
  { into: "#example-portal-container-2" },
  {
    into: () =>
      document.getElementById("example-portal-container-3") as HTMLDivElement,
  },
];

export default function CustomPortalContainer(): ReactElement {
  const [selected, handleChange] = useChoice<"0" | "1" | "2">("0");

  return (
    <>
      <Radio
        id="use-into-id"
        label="Use intoId"
        name="portalInto"
        value="0"
        checked={selected === "0"}
        onChange={handleChange}
      />
      <Radio
        id="use-into-query"
        label="Use into query"
        name="portalInto"
        value="1"
        checked={selected === "1"}
        onChange={handleChange}
      />
      <Radio
        id="use-into-function"
        label="Use into function"
        name="portalInto"
        value="2"
        checked={selected === "2"}
        onChange={handleChange}
      />
      <Portal {...values[parseInt(selected, 10)]}>
        <Typography type="subtitle-1" margin="none">
          Portal content!
        </Typography>
      </Portal>
      <div id="example-portal-container-1" className={styles.container}>
        <Code>&quot;example-portal-container-1&quot;</Code>
      </div>
      <div id="example-portal-container-2" className={styles.container}>
        <Code>&quot;example-portal-container-2&quot;</Code>
      </div>
      <div id="example-portal-container-3" className={styles.container}>
        <Code>&quot;example-portal-container-3&quot;</Code>
      </div>
    </>
  );
}
