import React from 'react';
import {
  Avatar,
  List,
  ListItem,
  ListItemControl,
  Checkbox,
  Switch,
  FontIcon,
} from 'react-md';

const chat = <FontIcon key="chat">chat</FontIcon>;

const CLASS_NAME = 'md-cell md-cell--6 md-paper md-paper--1';

const SimpleListControls = () => (
  <div className="md-grid">
    <List className={CLASS_NAME}>
      <ListItemControl
        rightIcon={chat}
        primaryAction={(
          <Checkbox
            id="list-control-chat-1"
            name="list-control-primary"
            label="Line Item 1"
            defaultChecked
          />
        )}
      />
      <ListItemControl
        rightIcon={chat}
        primaryAction={
          <Checkbox
            id="list-control-chat-2"
            name="list-control-primary"
            label="Line Item 2"
          />
        }
      />
      <ListItemControl
        rightIcon={chat}
        primaryAction={(
          <Checkbox
            id="list-control-chat-3"
            name="list-control-primary"
            label="Line Item 3"
            defaultChecked
          />
        )}
      />
    </List>
    <List className={CLASS_NAME}>
      <ListItemControl
        leftAvatar={<Avatar suffix="deep-blue">D</Avatar>}
        secondaryAction={
          <Checkbox
            id="list-control-secondary-1"
            name="list-control-secondary"
            label="Line Item 1"
            labelBefore
            defaultChecked
          />
        }
      />
      <ListItemControl
        leftAvatar={<Avatar suffix="brown">W</Avatar>}
        secondaryAction={
          <Checkbox
            id="list-control-secondary-2"
            name="list-control-secondary"
            label="Line Item 2"
            labelBefore
          />
        }
      />
      <ListItemControl
        leftAvatar={<Avatar suffix="teal">T</Avatar>}
        secondaryAction={
          <Checkbox
            id="list-control-secondary-3"
            name="list-control-secondary"
            label="Line Item 3"
            labelBefore
            defaultChecked
          />
        }
      />
    </List>
    <List className={CLASS_NAME}>
      <ListItemControl
        leftIcon={<FontIcon key="wifi">wifi</FontIcon>}
        secondaryAction={
          <Switch
            id="toggle-wifi"
            name="services"
            label="Wi-Fi"
            labelBefore
            defaultChecked
          />
        }
      />
      <ListItemControl
        leftIcon={<FontIcon key="bluetooth">bluetooth</FontIcon>}
        secondaryAction={
          <Switch
            id="toggle-bluetooth"
            name="services"
            label="Bluetooth"
            labelBefore
          />
        }
      />
      <ListItem
        primaryText="Data Usage"
        leftIcon={<FontIcon key="data">data_usage</FontIcon>}
      />
    </List>
  </div>
);

export default SimpleListControls;
