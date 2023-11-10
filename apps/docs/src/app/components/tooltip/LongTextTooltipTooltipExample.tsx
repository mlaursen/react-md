"use client";
import { Button, Tooltip, useTooltip } from "@react-md/core";
import { type ReactElement } from "react";

export default function LongTextTooltipExample(): ReactElement {
  const { elementProps, tooltipProps } = useTooltip();

  return (
    <>
      <Button {...elementProps}>Button</Button>
      <Tooltip {...tooltipProps}>
        Nam laoreet, felis ut commodo tristique, dui lorem iaculis metus, vitae
        pharetra ipsum nulla sed mauris. Suspendisse ultrices vel dui id
        posuere. Aenean pellentesque urna ac nisi elementum fringilla. Sed quis
        vestibulum ex, in auctor lorem. Morbi a elit viverra, dignissim leo at,
        accumsan ligula. Aliquam velit ligula, molestie a lorem ut, commodo
        hendrerit est. Sed lobortis luctus orci quis ultricies. Nullam luctus
        urna quis libero aliquet, non tincidunt augue sagittis. Duis eleifend
        ultricies fermentum. Nulla volutpat tempor est, eget hendrerit nisi
        sodales vitae.
      </Tooltip>
    </>
  );
}
