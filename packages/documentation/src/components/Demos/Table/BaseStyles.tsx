import React, { FC, Fragment } from "react";
import {
  Caption,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@react-md/table";
import { Text, TextContainer } from "@react-md/typography";

import contacts from "constants/contacts";

const list = contacts.slice(0, 4);

const BaseConfiguration: FC = () => (
  <Fragment>
    <TextContainer>
      <Text type="subtitle-2">Default styles</Text>
    </TextContainer>
    <Table>
      <Caption>Contacts</Caption>
      <TableHeader>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Phone</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map(({ name, phone }) => (
          <TableRow key={name} colSpan={2}>
            <TableCell>{name}</TableCell>
            <TableCell>{phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <TextContainer>
      <Text type="subtitle-2">No hover styles</Text>
    </TextContainer>
    <Table hoverable={false}>
      <Caption>Contacts</Caption>
      <TableHeader>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Phone</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map(({ name, phone }) => (
          <TableRow key={name} colSpan={2}>
            <TableCell>{name}</TableCell>
            <TableCell>{phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <TextContainer>
      <Text type="subtitle-2">No border styles</Text>
    </TextContainer>
    <Table bordered={false}>
      <Caption>Contacts</Caption>
      <TableHeader>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Phone</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map(({ name, phone }) => (
          <TableRow key={name} colSpan={2}>
            <TableCell>{name}</TableCell>
            <TableCell>{phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <TextContainer>
      <Text type="subtitle-2">Less Padding</Text>
    </TextContainer>
    <Table extraPadding={false}>
      <Caption>Contacts</Caption>
      <TableHeader>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Phone</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map(({ name, phone }) => (
          <TableRow key={name} colSpan={2}>
            <TableCell>{name}</TableCell>
            <TableCell>{phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <TextContainer>
      <Text type="subtitle-2">Dense</Text>
    </TextContainer>
    <Table dense>
      <Caption>Contacts</Caption>
      <TableHeader>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Phone</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map(({ name, phone }) => (
          <TableRow key={name} colSpan={2}>
            <TableCell>{name}</TableCell>
            <TableCell>{phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Fragment>
);

export default BaseConfiguration;
