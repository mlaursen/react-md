import React, { FC, Fragment } from "react";
import qs from "qs";
import sandboxes from "constants/sandboxes";
import { toTitle, toId } from "utils/toTitle";
import {
  Card,
  CardHeader,
  CardTitle,
  CardActions,
  CardContent,
} from "@react-md/card";
import { Text } from "@react-md/typography";

import "./sandbox-list.scss";
import { bem } from "@react-md/theme";
import LinkButton from "components/LinkButton";
import { CodeSVGIcon, OpenInBrowserSVGIcon } from "@react-md/material-icons";
import { TextIconSpacing } from "@react-md/icon";

const block = bem("sandbox-list");

const SandboxList: FC = () => (
  <div className={block()}>
    {Object.entries(sandboxes).map(([packageName, lookups]) => {
      const pkgName = toTitle(packageName, " ", true);

      return (
        <Card key={pkgName} className={block("card")}>
          <CardHeader>
            <CardTitle id={`${toId(pkgName)}`}>{pkgName}</CardTitle>
          </CardHeader>
          <Fragment key={pkgName}>
            {Object.keys(lookups).map(demoName => {
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
