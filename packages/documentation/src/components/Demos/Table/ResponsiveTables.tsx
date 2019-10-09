import React, { FC, Fragment } from "react";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@react-md/table";
import { Text } from "@react-md/typography";

import desserts from "constants/desserts";
import Code from "components/Code/Code";

const list = desserts.slice(0, 4);

const ResponsiveTables: FC = () => {
  return (
    <Fragment>
      <Text type="headline-6" margin="bottom">
        Default Table Container
      </Text>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat (g)</TableCell>
              <TableCell align="right">Carbs (g)</TableCell>
              <TableCell align="right">Protein (g)</TableCell>
              <TableCell align="right">Sodium (mgg)</TableCell>
              <TableCell align="right">Calcium (mgg)</TableCell>
              <TableCell align="right">Iron (mgg)</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map(
              ({
                name,
                calories,
                fat,
                carbs,
                protein,
                sodium,
                calcium,
                iron,
              }) => (
                <TableRow key={name} colSpan={2}>
                  <TableCell>{name}</TableCell>
                  <TableCell align="right">{calories}</TableCell>
                  <TableCell align="right">{fat}</TableCell>
                  <TableCell align="right">{carbs}</TableCell>
                  <TableCell align="right">{protein}</TableCell>
                  <TableCell align="right">{sodium}</TableCell>
                  <TableCell align="right">{calcium}</TableCell>
                  <TableCell align="right">{iron}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Text type="headline-6">
        Applying <Code>fullWidth</Code>
      </Text>
      <TableContainer>
        <Table fullWidth>
          <TableHeader>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat (g)</TableCell>
              <TableCell align="right">Carbs (g)</TableCell>
              <TableCell align="right">Protein (g)</TableCell>
              <TableCell align="right">Sodium (mg)</TableCell>
              <TableCell align="right">Calcium (mg)</TableCell>
              <TableCell align="right">Iron (mg)</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map(
              ({
                name,
                calories,
                fat,
                carbs,
                protein,
                sodium,
                calcium,
                iron,
              }) => (
                <TableRow key={name} colSpan={2}>
                  <TableCell>{name}</TableCell>
                  <TableCell align="right">{protein}</TableCell>
                  <TableCell align="right">{calories}</TableCell>
                  <TableCell align="right">{fat}</TableCell>
                  <TableCell align="right">{carbs}</TableCell>
                  <TableCell align="right">{sodium}</TableCell>
                  <TableCell align="right">{calcium}</TableCell>
                  <TableCell align="right">{iron}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Text type="headline-6">
        Applying <Code>grow</Code>
      </Text>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell grow>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat (g)</TableCell>
              <TableCell align="right">Carbs (g)</TableCell>
              <TableCell align="right">Protein (g)</TableCell>
              <TableCell align="right">Sodium (mg)</TableCell>
              <TableCell align="right">Calcium (mg)</TableCell>
              <TableCell align="right">Iron (mg)</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map(
              ({
                name,
                calories,
                fat,
                carbs,
                protein,
                sodium,
                calcium,
                iron,
              }) => (
                <TableRow key={name} colSpan={2}>
                  <TableCell>{name}</TableCell>
                  <TableCell align="right">{calories}</TableCell>
                  <TableCell align="right">{fat}</TableCell>
                  <TableCell align="right">{carbs}</TableCell>
                  <TableCell align="right">{protein}</TableCell>
                  <TableCell align="right">{sodium}</TableCell>
                  <TableCell align="right">{calcium}</TableCell>
                  <TableCell align="right">{iron}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default ResponsiveTables;
