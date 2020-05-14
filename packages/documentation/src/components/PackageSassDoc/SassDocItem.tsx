import React, { FC } from "react";

import Code from "components/Code/Code";
import { Markdown } from "components/Markdown";
import GithubLink from "components/GithubLink";
import Heading from "components/Heading";
import { GITHUB_FILE_URL } from "constants/github";
import {
  FormattedSassDocItem,
  FormattedVariableItem,
  FormattedMixinItem,
  FormattedFunctionItem,
} from "utils/sassdoc";

import getId from "./getId";
import getType from "./getType";
import VariableCode from "./VariableCode";
import Examples from "./Examples";
import ExpandableCode from "./ExpandableCode";
import Parameters from "./Parameters";
import Returns from "./Returns";
import Links from "./Links";
import Throws from "./Throws";
import UsedBy from "./UsedBy";

import styles from "./SassDocItem.module.scss";

const SassDocItem: FC<FormattedSassDocItem> = (props) => {
  const {
    name,
    description,
    code,
    sourceCode,
    value,
    compiled,
    overridable,
    examples,
    parameters,
    source,
    packageName,
    type,
    returns,
    throws,
    usedBy,
    links,
    see,
  } = props as FormattedVariableItem &
    FormattedMixinItem &
    FormattedFunctionItem;

  const itemType = getType(type);
  const id = getId(name, itemType, packageName);
  const githubId = `${id}-source`;

  return (
    <>
      <Heading id={id} level={3} margin="top">
        {name}
      </Heading>
      <div className={styles.row}>
        <Code>{type}</Code>
        <GithubLink
          id={githubId}
          aria-label="Github source"
          href={`${GITHUB_FILE_URL}/${source}`}
        />
      </div>
      {description && <Markdown>{description}</Markdown>}
      {itemType === "variable" && (
        <VariableCode
          baseId={id}
          name={name}
          value={value}
          compiled={compiled}
          overridable={overridable}
        />
      )}
      {itemType !== "variable" && (
        <ExpandableCode code={code} sourceCode={sourceCode} />
      )}
      <Returns returns={returns} />
      <Parameters parameters={parameters} />
      <Throws throws={throws} />
      <Examples baseId={id} examples={examples} />
      <Links links={links} see={see} />
      <UsedBy usedBy={usedBy} />
    </>
  );
};

export default SassDocItem;
