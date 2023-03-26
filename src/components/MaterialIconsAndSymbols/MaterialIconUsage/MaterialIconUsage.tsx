import {
  Slide,
  SlideContainer,
  Tab,
  TabList,
  Typography,
  useTabs,
} from "@react-md/core";
import InfoIcon from "@react-md/material-icons/InfoIcon";
import type { ReactElement } from "react";
import { Blockquote } from "src/components/Blockquote";
import { CodeBlock } from "src/components/Code/CodeBlock";
import { FormattedCodeBlock } from "src/components/Code/FormattedCodeBlock";

import { useMaterialIconsAndSymbols } from "../MaterialIconsAndSymbolsProvider";
import { getFontStylesheet } from "../useMaterialFontLoader";
import { getMaterialIconComponentName } from "../utils";
import { AdditionalChanges } from "./AdditionalChanges";
import styles from "./MaterialIconUsage.module.scss";
import { TwoToneWarning } from "./TwoToneWarning";

export function MaterialIconUsage(): ReactElement {
  const { getTabProps, getTabListProps, getTabPanelProps, getTabPanelsProps } =
    useTabs();
  const { selectedIconName, iconFamily, isFontFamilyChanged } =
    useMaterialIconsAndSymbols();

  const href = getFontStylesheet({
    iconType: "icon",
    iconFamily,
  });
  const componentName = getMaterialIconComponentName({
    iconName: selectedIconName,
    iconFamily,
  });

  return (
    <>
      <TabList {...getTabListProps()}>
        <Tab {...getTabProps(0)}>SVG Icon Usage</Tab>
        <Tab {...getTabProps(1)}>Font Icon Usage</Tab>
      </TabList>
      <SlideContainer {...getTabPanelsProps()} className={styles.container}>
        <Slide {...getTabPanelProps(0)}>
          <Typography type="headline-4" margin="none">
            Usage
          </Typography>
          <FormattedCodeBlock language="tsx" lineWrap>
            {`import ${componentName} from "@react-md/material-icons/${componentName}"`}
          </FormattedCodeBlock>
          <FormattedCodeBlock language="tsx" lineWrap stripTrailingSemi>
            {`<${componentName} />`}
          </FormattedCodeBlock>
          {iconFamily === "two-tone" && <TwoToneWarning />}
          <Typography type="headline-4" margin="top">
            Installation
          </Typography>
          <CodeBlock language="bash" lineWrap>
            {`npm install --save @react-md/material-icons`}
          </CodeBlock>
          <Blockquote>
            <Typography>
              <InfoIcon className={styles.info} />
              If you use a lot of icons in your app, you might be able to reduce
              your bundle size and dependencies by using the font icons instead.
            </Typography>
          </Blockquote>
        </Slide>
        <Slide {...getTabPanelProps(1)}>
          <FormattedCodeBlock language="tsx" lineWrap>
            {`import { MaterialIcon } from "@react-md/core";`}
          </FormattedCodeBlock>
          <FormattedCodeBlock language="tsx" lineWrap stripTrailingSemi>
            {`<MaterialIcon name="${selectedIconName}" />`}
          </FormattedCodeBlock>
          <Typography type="headline-5" margin="top">
            Stylesheet
          </Typography>
          <Typography>
            Add the font stylesheet request to your head tag.
          </Typography>
          <FormattedCodeBlock language="html" lineWrap>
            {`<link rel="stylesheet" href="${href}" />`}
          </FormattedCodeBlock>
          {iconFamily === "two-tone" && <TwoToneWarning />}
          {isFontFamilyChanged && <AdditionalChanges />}
        </Slide>
      </SlideContainer>
    </>
  );
}
