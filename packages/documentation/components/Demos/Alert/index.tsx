import React, { ReactElement } from "react";

import description from "./README.md";
import DemoPage from "../DemoPage";

import SimpleMessageQueue from "./SimpleMessageQueue";
import simpleMessageQueue from "./SimpleMessageQueue.md";

import HandlingDuplicatedMessages from "./HandlingDuplicatedMessages";
import handlingDuplicatedMessages from "./HandlingDuplicatedMessages.md";

import UpdatingMessagePriority from "./UpdatingMessagePriority";
import updatingMessagePriority from "./UpdatingMessagePriority.md";

const demos = [
  {
    name: "Simple Message Queue",
    description: simpleMessageQueue,
    children: <SimpleMessageQueue />,
  },
  {
    name: "Handling Duplicated Messages",
    description: handlingDuplicatedMessages,
    children: <HandlingDuplicatedMessages />,
  },
  {
    name: "Updating Message Priority",
    description: updatingMessagePriority,
    children: <UpdatingMessagePriority />,
  },
];

export default (): ReactElement => (
  <DemoPage demos={demos} packageName="alert" description={description} />
);
