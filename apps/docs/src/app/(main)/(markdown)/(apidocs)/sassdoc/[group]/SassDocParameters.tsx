import { InlineCode } from "@react-md/code/InlineCode";
import { Table } from "@react-md/core/table/Table";
import { TableBody } from "@react-md/core/table/TableBody";
import { TableCell } from "@react-md/core/table/TableCell";
import { TableContainer } from "@react-md/core/table/TableContainer";
import { TableHeader } from "@react-md/core/table/TableHeader";
import { TableRow } from "@react-md/core/table/TableRow";
import { type ReactElement } from "react";
import { type ParameterizedItemParameter } from "sassdoc-generator/types";

import { LinkableHeading } from "@/components/LinkableHeading.jsx";
import { Markdown } from "@/components/Markdown.jsx";
import { M_DASH } from "@/constants/unicode.js";

import styles from "./SassDocParameters.module.scss";

export interface SassDocParametersProps {
  itemId: string;
  parameters: readonly ParameterizedItemParameter[] | undefined;
}

export function SassDocParameters({
  itemId,
  parameters,
}: SassDocParametersProps): ReactElement | null {
  if (!parameters?.length) {
    return null;
  }

  return (
    <TableContainer>
      <Table disableHover fullWidth>
        <LinkableHeading
          id={`${itemId}-parameters`}
          level={3}
          as="caption"
          textAlign="left"
        >
          Parameters
        </LinkableHeading>
        <TableHeader>
          <TableRow>
            <TableCell className={styles.name}>Name</TableCell>
            <TableCell grow>Description</TableCell>
            <TableCell className={styles.type}>Type</TableCell>
            <TableCell>Default Value</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody vAlign="top">
          {parameters.map((param) => {
            const { name, type, description, default: defaultValue } = param;

            return (
              <TableRow key={name}>
                <TableCell>
                  <InlineCode>${name}</InlineCode>
                </TableCell>
                <TableCell lineWrap>
                  <Markdown source={description} />
                </TableCell>
                <TableCell>
                  <InlineCode>{type}</InlineCode>
                </TableCell>
                <TableCell>
                  {defaultValue ? (
                    <InlineCode>{defaultValue}</InlineCode>
                  ) : (
                    M_DASH
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
