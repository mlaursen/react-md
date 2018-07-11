import * as React from "react";
import { Button } from "@react-md/button";
import { FontIcon } from "@react-md/icon";
import { FavoriteSVGIcon, AspectRatioFontIcon } from "@react-md/material-icons";
import { Text } from "@react-md/typography";

const IconButtons: React.SFC<any> = () => (
  <React.Fragment>
    <Text type="headline-6">Theme Examples</Text>
    <Button id="icon-button-1" className="example-group__example" btnType="icon">
      <FavoriteSVGIcon />
    </Button>
    <Button id="icon-button-2" className="example-group__example" btnType="icon" theme="primary">
      <AspectRatioFontIcon />
    </Button>
    <Button id="icon-button-3" className="example-group__example" btnType="icon" theme="secondary">
      <FontIcon iconClassName="fa fa-star-o" />
    </Button>
    <Button id="icon-button-4" className="example-group__example" btnType="icon" themeType="outline">
      <FavoriteSVGIcon />
    </Button>
    <Button id="icon-button-5" className="example-group__example" btnType="icon" themeType="outline" theme="primary">
      <AspectRatioFontIcon />
    </Button>
    <Button id="icon-button-6" className="example-group__example" btnType="icon" themeType="outline" theme="secondary">
      <FontIcon iconClassName="fa fa-star-o" />
    </Button>
    <Button id="icon-button-7" className="example-group__example" btnType="icon" themeType="contained">
      <FavoriteSVGIcon />
    </Button>
    <Button id="icon-button-8" className="example-group__example" btnType="icon" themeType="contained" theme="primary">
      <AspectRatioFontIcon />
    </Button>
    <Button
      id="icon-button-9"
      className="example-group__example"
      btnType="icon"
      themeType="contained"
      theme="secondary"
    >
      <FontIcon iconClassName="fa fa-star-o" />
    </Button>
    <Text type="headline-6">Disabled Examples</Text>
    <Button id="icon-button-10" className="example-group__example" btnType="icon" disabled={true}>
      <FavoriteSVGIcon />
    </Button>
    <Button id="icon-button-11" className="example-group__example" btnType="icon" disabled={true} theme="primary">
      <AspectRatioFontIcon />
    </Button>
    <Button id="icon-button-12" className="example-group__example" btnType="icon" disabled={true} theme="secondary">
      <FontIcon iconClassName="fa fa-star-o" />
    </Button>
    <Button id="icon-button-13" className="example-group__example" btnType="icon" disabled={true} themeType="outline">
      <FavoriteSVGIcon />
    </Button>
    <Button
      id="icon-button-14"
      className="example-group__example"
      btnType="icon"
      disabled={true}
      themeType="outline"
      theme="primary"
    >
      <AspectRatioFontIcon />
    </Button>
    <Button
      id="icon-button-15"
      className="example-group__example"
      btnType="icon"
      disabled={true}
      themeType="outline"
      theme="secondary"
    >
      <FontIcon iconClassName="fa fa-star-o" />
    </Button>
    <Button id="icon-button-16" className="example-group__example" btnType="icon" disabled={true} themeType="contained">
      <FavoriteSVGIcon />
    </Button>
    <Button
      id="icon-button-17"
      className="example-group__example"
      btnType="icon"
      disabled={true}
      themeType="contained"
      theme="primary"
    >
      <AspectRatioFontIcon />
    </Button>
    <Button
      id="icon-button-18"
      className="example-group__example"
      btnType="icon"
      disabled={true}
      themeType="contained"
      theme="secondary"
    >
      <FontIcon iconClassName="fa fa-star-o" />
    </Button>
    <Text type="headline-6">Rendering as Divs Examples</Text>
    <Button id="icon-button-19" className="example-group__example" btnType="icon" asDiv={true}>
      <FavoriteSVGIcon />
    </Button>
    <Button id="icon-button-20" className="example-group__example" btnType="icon" asDiv={true} theme="primary">
      <AspectRatioFontIcon />
    </Button>
    <Text type="headline-6">Rendering as disabled Divs Examples</Text>
    <Button id="icon-button-21" className="example-group__example" btnType="icon" asDiv={true} disabled={true}>
      <FavoriteSVGIcon />
    </Button>
    <Button
      id="icon-button-22"
      className="example-group__example"
      btnType="icon"
      asDiv={true}
      theme="primary"
      disabled={true}
    >
      <AspectRatioFontIcon />
    </Button>
  </React.Fragment>
);

export default IconButtons;
