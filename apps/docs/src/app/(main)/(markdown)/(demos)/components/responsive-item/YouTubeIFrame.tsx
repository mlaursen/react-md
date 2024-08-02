import { Card } from "@react-md/core/card/Card";
import { ResponsiveItem } from "@react-md/core/responsive-item/ResponsiveItem";
import { type ReactElement } from "react";

export default function YouTubeIFrame(): ReactElement {
  return (
    <Card fullWidth>
      <ResponsiveItem aspectRatio="16-9">
        <iframe
          src="https://www.youtube.com/embed/kyAn3fSs8_A"
          allowFullScreen
          title="Archer - Highway To The Dangerzone"
          style={{ border: 0 }}
        />
      </ResponsiveItem>
    </Card>
  );
}
