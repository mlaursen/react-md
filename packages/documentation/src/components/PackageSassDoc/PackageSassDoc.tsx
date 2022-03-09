import type { ReactElement } from "react";
import { useMemo } from "react";

import type { PackageSassDoc as FoundSassDoc } from "utils/sassdoc";

import Find from "./Find";
import Section from "./Section";

import styles from "./PackageSassDoc.module.scss";

interface PackageSassDocProps extends FoundSassDoc {
  packageName: string;
}

export default function PackageSassDoc({
  packageName,
  mixins: mixinRecord,
  functions: functionRecord,
  variables: variableRecord,
}: PackageSassDocProps): ReactElement {
  const variables = useMemo(
    () =>
      Object.values(variableRecord).filter(
        ({ packageName, name }) =>
          // don't want the color variables since the SassDoc provides zero
          // additional info
          packageName !== "theme" || name.startsWith("rmd-theme")
      ),
    [variableRecord]
  );
  const mixins = useMemo(() => Object.values(mixinRecord), [mixinRecord]);
  const functions = useMemo(
    () => Object.values(functionRecord),
    [functionRecord]
  );

  const items = useMemo(
    () => [...variables, ...mixins, ...functions],
    [variables, mixins, functions]
  );

  return (
    <div className={styles.container}>
      <Find items={items} />
      <Section items={variables} type="Variables" packageName={packageName} />
      <Section items={mixins} type="Mixins" packageName={packageName} />
      <Section items={functions} type="Functions" packageName={packageName} />
    </div>
  );
}
