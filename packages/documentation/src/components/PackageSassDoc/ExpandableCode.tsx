import { ReactElement, useState } from "react";
import { UnstyledButton } from "@react-md/button";
import { Collapse } from "@react-md/transition";

import CodeBlock from "components/CodeBlock";

import styles from "./ExpandableCode.module.scss";

export interface ExpandableCodeProps {
  code: string;
  sourceCode: string;
}

export default function ExpandableCode({
  code,
  sourceCode,
}: ExpandableCodeProps): ReactElement {
  const [collapsed, setCollapsed] = useState(true);
  const [currentCode, setCurrentCode] = useState(code);

  return (
    <UnstyledButton
      aria-label="Source code"
      aria-pressed={!collapsed}
      onClick={() => {
        setCollapsed(!collapsed);
        setCurrentCode(sourceCode);
      }}
      className={styles.container}
    >
      <Collapse
        collapsed={collapsed}
        minHeight={56}
        minPaddingTop={16}
        minPaddingBottom={16}
        onExited={() => setCurrentCode(code)}
      >
        <CodeBlock language="scss">{currentCode}</CodeBlock>
      </Collapse>
    </UnstyledButton>
  );
}
