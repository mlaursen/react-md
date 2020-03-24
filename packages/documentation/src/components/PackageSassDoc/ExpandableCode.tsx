import React, { FC, useState } from "react";
import { CodeBlock } from "components/Code";
import { Collapse } from "@react-md/transition";
import { UnstyledButton } from "@react-md/button";
import styles from "./styles";

export interface ExpandableCodeProps {
  code: string;
  sourceCode: string;
}

const ExpandableCode: FC<ExpandableCodeProps> = ({ code, sourceCode }) => {
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
      className={styles("expandable-source")}
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
};

export default ExpandableCode;
