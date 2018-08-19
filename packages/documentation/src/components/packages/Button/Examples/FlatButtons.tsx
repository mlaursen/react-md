import * as React from "react";
import { Button } from "@react-md/button";
import { ChatBubbleOutlineFontIcon, ChatBubbleOutlineSVGIcon } from "@react-md/material-icons";
import { Text } from "@react-md/typography";

const FlatButtons: React.SFC<any> = () => (
  <React.Fragment>
    <Text type="headline-6">Theme Examples</Text>
    <Button id="flat-button-1" className="example-group__example">
      Hello, World!
    </Button>
    <Button id="flat-button-2" className="example-group__example" theme="primary" icon={<ChatBubbleOutlineSVGIcon />}>
      Chat
    </Button>
    <Button id="flat-button-3" theme="secondary" icon={<ChatBubbleOutlineFontIcon />} iconAfter={true}>
      Chat
    </Button>
    <Text type="headline-6">Disabled Examples</Text>
    <Button id="flat-button-4" className="example-group__example" disabled={true}>
      Disabled Button
    </Button>
    <Button id="flat-button-5" className="example-group__example" disabled={true} theme="primary">
      Disabled Button
    </Button>
    <Button id="flat-button-6" className="example-group__example" disabled={true} theme="secondary">
      Disabled Button
    </Button>
    <Button
      id="flat-button-7"
      className="example-group__example"
      disabled={true}
      theme="default"
      icon={<ChatBubbleOutlineSVGIcon />}
    >
      Disabled Button
    </Button>
    <Text type="headline-6">Rendering as Divs Examples</Text>
    <Button id="flat-button-8" className="example-group__example">
      Hello, World!
    </Button>
    <Button id="flat-button-9" className="example-group__example" theme="primary" icon={<ChatBubbleOutlineSVGIcon />}>
      Chat
    </Button>
    <Button
      id="flat-button-10"
      className="example-group__example"
      theme="secondary"
      icon={<ChatBubbleOutlineFontIcon />}
      iconAfter={true}
    >
      Chat
    </Button>
    <Text type="headline-6">Rendering as disabled Divs Examples</Text>
    <Button id="flat-button-11" className="example-group__example" disabled={true} asDiv={true}>
      Disabled Button
    </Button>
    <Button id="flat-button-12" className="example-group__example" disabled={true} asDiv={true} theme="primary">
      Disabled Button
    </Button>
    <Button id="flat-button-13" className="example-group__example" disabled={true} asDiv={true} theme="secondary">
      Disabled Button
    </Button>
    <Button
      id="flat-button-14"
      className="example-group__example"
      disabled={true}
      asDiv={true}
      theme="default"
      icon={<ChatBubbleOutlineSVGIcon />}
    >
      Disabled Button
    </Button>
  </React.Fragment>
);

export default FlatButtons;
