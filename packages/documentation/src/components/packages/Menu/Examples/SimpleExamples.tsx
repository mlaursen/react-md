import * as React from "react";
import { MenuButton, MenuItem, MenuItemFile, Menu } from "@react-md/menu";
import { List, ListElement } from "@react-md/list";
import { Sheet } from "@react-md/sheet";
import { positionRelativeTo, HorizontalPosition, VerticalPosition } from "@react-md/utils";
import { EventListener } from "@react-md/listeners";
import { ContentCutSVGIcon, ContentCopySVGIcon, ContentPasteSVGIcon } from "@react-md/material-icons";

export interface ISimpleExamplesProps {}

export interface ISimpleExamplesState {
  style?: React.CSSProperties;
  focusFirstItem: boolean;
  visible: boolean;
}

export default class SimpleExamples extends React.Component<ISimpleExamplesProps, ISimpleExamplesState> {
  constructor(props: ISimpleExamplesProps) {
    super(props);

    this.state = { focusFirstItem: true, visible: false };
  }

  public componentDidUpdate(prevProps: ISimpleExamplesProps, prevState: ISimpleExamplesState) {
    if (this.state.visible && !prevState.visible) {
      this.setState({ style: this.createStyle() });
    }
  }

  public render() {
    const { style, visible, focusFirstItem } = this.state;
    return (
      <div className="example-group__example">
        <MenuButton
          id="example-menu-1-btn"
          aria-controls="example-menu-1"
          isMenuVisible={visible}
          onRequestToggleMenu={this.toggleVisibility}
        >
          Show the menu
        </MenuButton>
        <Sheet
          style={style}
          position="calculated"
          visible={visible}
          onRequestClose={this.close}
          overlay={false}
          className="rmd-menu-sheet"
          tabIndex={-1}
          onKeyDown={this.handleKeyDown}
          onEntering={this.handleEntered}
        >
          <EventListener type="click" onTriggered={this.handleOutsideClick} />
          <Menu
            id="example-menu-1"
            role="menu"
            aria-labelledby="example-menu-1-btn"
            dense={true}
            aria-orientation="vertical"
            visible={visible}
            onRequestClose={this.close}
          >
            <MenuItem height="content" leftIcon={<ContentCutSVGIcon />}>
              Cut
            </MenuItem>
            <MenuItem height="content" leftIcon={<ContentCopySVGIcon />}>
              Copy
            </MenuItem>
            <MenuItem height="content" leftIcon={<ContentPasteSVGIcon />}>
              Paste
            </MenuItem>
            <MenuItemFile
              id="example-content"
              value=""
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                console.log("event.currentTarget:", event.currentTarget);
                console.log("event.currentTarget.value:", event.currentTarget.value);
                // console.log("event.target.value:", event.target.value);
              }}
            >
              Hello
            </MenuItemFile>
          </Menu>
        </Sheet>
      </div>
    );
  }

  private handleEntered = (node: HTMLElement) => {
    const { focusFirstItem } = this.state;
    const query = `[role="menuitem"]:${focusFirstItem ? "first" : "last"}-of-type`;
    const focus = node.querySelector(query) as HTMLElement;
    if (focus) {
      focus.focus();
    }
  };

  private handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "Escape":
        this.close();
        break;
      case "Tab":
        this.setState({ visible: false });
        break;
    }
  };

  private createStyle = () => {
    const button = document.getElementById("example-menu-1-btn") as HTMLButtonElement;
    const menu = document.getElementById("example-menu-1");

    return positionRelativeTo(button, menu, {
      horizontalPosition: HorizontalPosition.INNER_RIGHT,
      verticalPosition: VerticalPosition.OVERLAP,
    });
  };

  private toggleVisibility = (focusFirstItem: boolean) => {
    const visible = !this.state.visible;
    let { style } = this.state;
    if (visible) {
      style = this.createStyle();
    }

    this.setState({ visible: !this.state.visible, focusFirstItem, style });
  };

  private close = () => {
    if (this.state.visible) {
      this.setState({ visible: false }, () => {
        window.requestAnimationFrame(() => {
          const button = document.getElementById("example-menu-1-btn") as HTMLButtonElement;
          if (button) {
            button.focus();
          }
        });
      });
    }
  };

  private handleOutsideClick = (event: Event | null) => {
    if (!event) {
      return;
    }

    const menu = document.getElementById("example-menu-1") as HTMLUListElement;
    if (!menu || !event.target || !menu.contains(event.target as HTMLElement)) {
      this.setState({ visible: false });
      return;
    }

    this.close();

    // const menuItem = '[role="menuitem"][tabindex="-1"]';

    // const target = event.target as HTMLElement;
    // console.log("target:", target);
    // console.log("target.matches(menuItem):", target.matches(menuItem));
    // if (target.matches(menuItem) || target.closest(menuItem)) {
    //   this.close();
    // }
  };
}
