/* tslint:disable:no-console */
import * as React from "react";
import { Link } from "react-router-dom";
import { ITreeViewItem } from "@react-md/tree-view";
import { StatesConsumer } from "@react-md/states";
import { List, ListItem, ListItemText, ListLink } from "@react-md/list";
import { Collapse } from "@react-md/transition";
import { KeyboardClickable } from "@react-md/a11y";

export default class NavigationItem extends React.Component<ITreeViewItem, {}> {
  public render() {
    const {
      item: { itemId, name },
      expanded,
      selected,
      renderChildren,
      onItemSelect,
      onItemExpandedChange,
      ...props
    } = this.props;

    if (!renderChildren) {
      return (
        <ListLink {...props} liRole="none" component={Link} to={itemId} className="navigation__link">
          {name}
        </ListLink>
      );
    }

    return (
      <li role="none">
        <StatesConsumer className="navigation__item rmd-list-item rmd-list-item--stateful">
          {statesProps => (
            <KeyboardClickable role="treeitem">
              {clickableProps => (
                <div {...clickableProps} {...statesProps} onClick={this.handleClick}>
                  <ListItemText>{name}</ListItemText>
                </div>
              )}
            </KeyboardClickable>
          )}
        </StatesConsumer>
        <Collapse collapsed={!expanded}>
          {({ refCallback, ...groupProps }) => (
            <List role="group" {...groupProps} ref={refCallback}>
              {renderChildren()}
            </List>
          )}
        </Collapse>
      </li>
    );

    return (
      <ListItem clickable={false} role="none">
        {name}
      </ListItem>
    );
  }

  private handleClick = () => {
    const {
      onItemExpandedChange,
      onItemSelect,
      item: { itemId },
      expanded,
    } = this.props;
    console.log("expanded:", expanded);
    console.log("itemId:", itemId);
    onItemSelect(itemId);
    onItemExpandedChange(itemId, !expanded);
  };
}
