import { Card } from "@react-md/core/card/Card";
import { ResponsiveItemContainer } from "@react-md/core/responsive-item/ResponsiveItemContainer";
import { type ReactElement } from "react";

export default function YouTubeIFrame(): ReactElement {
  return (
    <Card fullWidth>
      <ResponsiveItemContainer aspectRatio="16-9">
        <iframe
          src="https://www.youtube.com/embed/kyAn3fSs8_A"
          allowFullScreen
          title="Archer - Highway To The Dangerzone"
          style={{ border: 0 }}
        />
      </ResponsiveItemContainer>
    </Card>
  );
}
