import { ColorPreview } from "@react-md/code/ColorPreview";
import { InlineCode } from "@react-md/code/InlineCode";
import { Box } from "@react-md/core/box/Box";
import { type ReactElement } from "react";
import {
  type FormattedSassDocItem,
  type ItemReturn,
  type ItemThrow,
  type ParameterizedItemParameter,
  type SupportedItemDataType,
} from "sassdoc-generator/types";

import { GithubLink } from "@/components/GithubLink.jsx";
import { LinkableHeading } from "@/components/LinkableHeading.jsx";
import { Markdown } from "@/components/Markdown.jsx";
import { MarkdownCode } from "@/components/MarkdownCode.jsx";
import { slug } from "@/utils/slug.js";

import { ExpandableCodeBlock } from "./ExpandableCodeBlock.jsx";
import { SassDocExamples } from "./SassDocExamples.jsx";
import styles from "./SassDocItem.module.scss";
import { SassDocLinks } from "./SassDocLinks.jsx";
import { SassDocParameters } from "./SassDocParameters.jsx";
import { SassDocReturns } from "./SassDocReturns.jsx";
import { SassDocThrows } from "./SassDocThrows.jsx";
import { VariableCodeBlock } from "./VariableCodeBlock.jsx";

const RGB_REGEX = /^rgb\(((\b([01]?\d\d?|2[0-4]\d|25[0-5])\b),?){3}\)$/;
const VERBOSE_REGEX = /^#([a-f\d]{3})([a-f\d]{3})?$/i;

function isColorValue(value: string): boolean {
  return RGB_REGEX.test(value) || VERBOSE_REGEX.test(value);
}

export interface SassDocItemProps {
  baseId: string;
  item: FormattedSassDocItem;
}

export function SassDocItem(props: SassDocItemProps): ReactElement {
  const { item, baseId } = props;
  const {
    name,
    type,
    source,
    examples,
    description,
    see,
    links,
    usedBy,
    requires,
  } = item;
  const itemId = slug(`${baseId}-${name}`);

  let code: string;
  let sourceCode = "";
  let color: string | undefined;
  let isVariable = false;
  let compiled: string | undefined;
  let throws: ItemThrow | undefined;
  let returns: ItemReturn<SupportedItemDataType> | undefined;
  let parameters: readonly ParameterizedItemParameter[] | undefined;
  if (type === "function" || type === "mixin") {
    ({ code, sourceCode, parameters, throws } = item);
    if (type === "function") {
      ({ returns } = item);
    }
  } else {
    isVariable = true;
    code = `$${name}: ${item.value}${item.overridable ? " !default" : ""};`;
    compiled = item.compiled ? `$${name}: ${item.compiled};` : undefined;
    if (isColorValue(item.value)) {
      color = item.value;
    } else if (
      item.value.startsWith("colors.") ||
      isColorValue(item.compiled ?? "")
    ) {
      color = item.compiled;
    }
  }

  return (
    <>
      <LinkableHeading id={itemId} level={2} className={styles.heading}>
        {name}
        <GithubLink file={source} float />
      </LinkableHeading>
      <Box disablePadding disableGap className={styles.spacing}>
        <InlineCode>{type}</InlineCode>
        {color && (
          <ColorPreview className={styles.color} color={color} disableCode />
        )}
      </Box>
      {isVariable && !compiled && (
        <MarkdownCode language="scss">{code}</MarkdownCode>
      )}
      {isVariable && !!compiled && (
        <VariableCodeBlock code={code} compiled={compiled} />
      )}
      {!isVariable && (
        <ExpandableCodeBlock code={code} sourceCode={sourceCode} />
      )}
      {description && <Markdown source={description} />}
      <SassDocReturns itemId={itemId} returns={returns} />
      <SassDocParameters itemId={itemId} parameters={parameters} />
      <SassDocThrows itemId={itemId} throws={throws} />
      <SassDocExamples itemId={itemId} examples={examples} />
      <SassDocLinks itemId={itemId} see={see} links={links}>
        See Also
      </SassDocLinks>
      <SassDocLinks itemId={itemId} see={usedBy}>
        Used By
      </SassDocLinks>
      <SassDocLinks itemId={itemId} see={requires}>
        Requires
      </SassDocLinks>
    </>
  );
}
