import * as React from "react";
import { Button } from "@react-md/button";
import { Sheet, SheetPosition } from "@react-md/sheet";
import { List, ListItem } from "@react-md/list";
import { ShareSVGIcon, EditSVGIcon, LinkSVGIcon, DeleteSVGIcon } from "@react-md/material-icons";

export interface ISimpleSheetsProps {}

export interface ISimpleSheetsState {
  position: SheetPosition;
  visible: boolean;
}

export default class SimpleSheets extends React.Component<ISimpleSheetsProps, ISimpleSheetsState> {
  constructor(props: ISimpleSheetsProps) {
    super(props);

    this.state = { visible: false, position: "bottom" };
  }

  public render() {
    const { visible, position } = this.state;
    return (
      <React.Fragment>
        <Button className="example-group__example" onClick={this.showTop}>
          Show Top
        </Button>
        <Button className="example-group__example" onClick={this.showRight}>
          Show Right
        </Button>
        <Button className="example-group__example" onClick={this.showBottom}>
          Show Bottom
        </Button>
        <Button className="example-group__example" onClick={this.showLeft}>
          Show Left
        </Button>
        <Sheet visible={visible} onRequestClose={this.close} position={position}>
          <List>
            <ListItem onClick={this.close} leftIcon={<ShareSVGIcon />}>
              Share
            </ListItem>
            <ListItem onClick={this.close} leftIcon={<LinkSVGIcon />}>
              Get Link
            </ListItem>
            <ListItem onClick={this.close} leftIcon={<EditSVGIcon />}>
              Edit Name
            </ListItem>
            <ListItem onClick={this.close} leftIcon={<DeleteSVGIcon />}>
              Delete Collection
            </ListItem>
          </List>
        </Sheet>
      </React.Fragment>
    );
  }

  private showTop = () => {
    this.setState({ visible: true, position: "top" });
  };

  private showRight = () => {
    this.setState({ visible: true, position: "right" });
  };

  private showBottom = () => {
    this.setState({ visible: true, position: "bottom" });
  };

  private showLeft = () => {
    this.setState({ visible: true, position: "left" });
  };

  private close = () => {
    this.setState({ visible: false });
  };
}
