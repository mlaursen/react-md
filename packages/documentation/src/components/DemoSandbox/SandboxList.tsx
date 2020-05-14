import React, { FC, Fragment } from "react";
import qs from "qs";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardTitle,
} from "@react-md/card";
import { TextIconSpacing } from "@react-md/icon";
import { CodeSVGIcon, OpenInBrowserSVGIcon } from "@react-md/material-icons";
import { Text } from "@react-md/typography";

import LinkButton from "components/LinkButton";
import sandboxes from "constants/sandboxes";
import { toId, toTitle } from "utils/toTitle";

import styles from "./SandboxList.module.scss";

const SandboxList: FC = () => (
  <div className={styles.container}>
    {Object.entries(sandboxes).map(([packageName, lookups]) => {
      const pkgName = toTitle(packageName, " ", true);

      return (
        <Card key={pkgName} className={styles.card}>
          <CardHeader>
            <CardTitle id={`${toId(pkgName)}`}>{pkgName}</CardTitle>
          </CardHeader>
          <Fragment key={pkgName}>
            {Object.keys(lookups).map((demoName) => {
              const name = toTitle(demoName, " ", true);
              const href = `/sandbox?${qs.stringify({ pkg: pkgName, name })}`;
              const demoHref = `/packages/${toTitle(
                packageName,
                "-",
                true
              ).toLowerCase()}/demos#${toId(name)}-title`;

              return (
                <Fragment key={name}>
                  <CardContent>
                    <Text type="headline-6" margin="none">
                      {name}
                    </Text>
                  </CardContent>
                  <CardActions>
                    <LinkButton href={href}>
                      <TextIconSpacing icon={<CodeSVGIcon />}>
                        View Code
                      </TextIconSpacing>
                    </LinkButton>
                    <LinkButton href={demoHref}>
                      <TextIconSpacing icon={<OpenInBrowserSVGIcon />}>
                        View Demo
                      </TextIconSpacing>
                    </LinkButton>
                  </CardActions>
                </Fragment>
              );
            })}
          </Fragment>
        </Card>
      );
    })}
  </div>
);

export default SandboxList;
