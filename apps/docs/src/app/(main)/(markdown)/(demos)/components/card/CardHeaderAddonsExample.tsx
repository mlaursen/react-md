import { Avatar } from "@react-md/core/avatar/Avatar";
import { Button } from "@react-md/core/button/Button";
import { Card } from "@react-md/core/card/Card";
import { CardHeader } from "@react-md/core/card/CardHeader";
import { CardSubtitle } from "@react-md/core/card/CardSubtitle";
import { CardTitle } from "@react-md/core/card/CardTitle";
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
