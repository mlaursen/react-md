import React, { FC } from "react";
import { Link } from "@react-md/link";
import { Tooltipped } from "@react-md/tooltip";

import Container from "./Container";

import "./LargeTooltips.scss";

const TOOLTIP_1 =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at magna ac odio sollicitudin mollis nec id libero. Morbi eu tempor ante. Nulla elementum sit amet urna et tincidunt. In est odio, euismod vel mollis vel, rhoncus nec leo. Nam ornare id nunc sed laoreet. Donec placerat erat at felis scelerisque bibendum. Suspendisse euismod velit dolor, vestibulum finibus eros egestas sed. Sed placerat tortor nisi, in efficitur dolor vulputate non.";

const LargeTooltips: FC = () => (
  <Container>
    <Tooltipped id="large-tooltip-1" tooltip={TOOLTIP_1}>
      <Link href="#" className="large-tooltips-link">
        {TOOLTIP_1}
      </Link>
    </Tooltipped>
  </Container>
);

export default LargeTooltips;
