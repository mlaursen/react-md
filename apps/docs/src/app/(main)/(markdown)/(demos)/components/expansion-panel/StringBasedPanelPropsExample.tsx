"use client";
import { type Dessert, desserts } from "@/constants/desserts.js";
import { ExpansionList } from "@react-md/core/expansion-panel/ExpansionList";
import { ExpansionPanel } from "@react-md/core/expansion-panel/ExpansionPanel";
import { useExpansionPanels } from "@react-md/core/expansion-panel/useExpansionPanels";
import { Table } from "@react-md/core/table/Table";
import { TableBody } from "@react-md/core/table/TableBody";
import { TableCell } from "@react-md/core/table/TableCell";
import { TableContainer } from "@react-md/core/table/TableContainer";
import { TableHeader } from "@react-md/core/table/TableHeader";
import { TableRow } from "@react-md/core/table/TableRow";
import { type ReactElement } from "react";

export default function StringBasedPanelPropsExample(): ReactElement {
  const { getPanelProps } = useExpansionPanels({
    multiple: true,
    defaultExpandedIds: () => desserts.map(({ name }) => name),
  });
  return (
    <ExpansionList style={{ width: "100%" }}>
      {desserts.map((dessert) => {
        const { name } = dessert;
        return (
          <ExpansionPanel
            {...getPanelProps(name)}
            key={name}
            headerChildren={`${name} nutrition`}
            disableContentPadding
          >
            <NutritionFacts {...dessert} />
          </ExpansionPanel>
        );
      })}
    </ExpansionList>
  );
}

function NutritionFacts(props: Dessert): ReactElement {
  const { calories, fat, carbs, protein } = props;

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Calories</TableCell>
            <TableCell>Fat</TableCell>
            <TableCell>Carbs</TableCell>
            <TableCell>Protein</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{calories}</TableCell>
            <TableCell>{fat}</TableCell>
            <TableCell>{carbs}</TableCell>
            <TableCell>{protein}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
