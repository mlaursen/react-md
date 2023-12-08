import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardSubtitle,
  CardTitle,
} from "@react-md/core";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import { type ReactElement } from "react";

export default function CardHeaderAddonsExample(): ReactElement {
  return (
    <Card style={{ maxWidth: "30rem" }} fullWidth>
      <CardHeader
        beforeAddon={<Avatar>A</Avatar>}
        afterAddon={
          <Button buttonType="icon">
            <CloseIcon />
          </Button>
        }
      >
        <CardTitle>
          A main title that should have trailing ellipsis since it is so long
        </CardTitle>
        <CardSubtitle>
          A subtitle that should have trailing ellipsis since it is so long
        </CardSubtitle>
      </CardHeader>
    </Card>
  );
}
