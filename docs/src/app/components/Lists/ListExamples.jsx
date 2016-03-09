import React from 'react';
import { IconButton } from 'react-md/lib/Buttons';
import { List, ListItem, ListSubheader } from 'react-md/lib/Lists';
import Divider from 'react-md/lib/Dividers';
import FontIcon from 'react-md/lib/FontIcons';
import Avatar from 'react-md/lib/Avatars';
import Paper from 'react-md/lib/Papers';

import { randomImage, randomAvatars } from '../../utils';

const avatars = randomAvatars(3);

export default function ListExamples() {
  return (
    <div className="paper-container">
      <Paper>
        <List textOnly>
          <ListItem primaryText="Inbox" />
          <ListItem primaryText="Starred" />
          <ListItem primaryText="Sent Mail" />
          <ListItem primaryText="Drafts" />
        </List>
      </Paper>
      <Paper>
        <List>
          <ListItem leftIcon={<FontIcon>inbox</FontIcon>} primaryText="Inbox" />
          <ListItem leftIcon={<FontIcon>access_time</FontIcon>} primaryText="Snoozed" />
          <ListItem leftIcon={<FontIcon>done</FontIcon>} primaryText="Done" />
          <Divider />
          <ListItem leftIcon={<FontIcon>drafts</FontIcon>} primaryText="Drafts" />
          <ListItem leftIcon={<FontIcon>send</FontIcon>} primaryText="Sent" />
          <ListItem leftIcon={<FontIcon>touch_app</FontIcon>} primaryText="Reminders" />
          <ListItem leftIcon={<FontIcon>delete</FontIcon>} primaryText="Trash" />
          <ListItem leftIcon={<FontIcon>report</FontIcon>} primaryText="Spam" />
        </List>
      </Paper>
      <Paper>
        <List>
          <ListItem
            leftAvatar={avatars[0]}
            primaryText="Abbey Christensen"
            rightIcon={<FontIcon>chat</FontIcon>}
            onClick={() => console.log('Clicked me!')}
          />
          <ListItem
            leftAvatar={avatars[1]}
            primaryText="Abbey Christensen"
            rightIcon={<FontIcon>chat</FontIcon>}
            onClick={() => console.log('Clicked me!')}
          />
          <ListItem
            leftAvatar={avatars[2]}
            primaryText="Abbey Christensen"
            rightIcon={<FontIcon>chat</FontIcon>}
            onClick={() => console.log('Clicked me!')}
          />
        </List>
      </Paper>
      <Paper>
        <List subheader="Folders" primarySubheader={true}>
          <ListItem
            leftAvatar={<Avatar icon={<FontIcon>folder</FontIcon>} />}
            rightIcon={<FontIcon>info</FontIcon>}
            primaryText="Photos"
            secondaryText="Jan 9, 2014"
          />
          <ListItem
            leftAvatar={<Avatar icon={<FontIcon>folder</FontIcon>} />}
            rightIcon={<FontIcon>info</FontIcon>}
            primaryText="Recipes"
            secondaryText="Jan 17, 2014"
          />
          <ListItem
            leftAvatar={<Avatar icon={<FontIcon>folder</FontIcon>} />}
            rightIcon={<FontIcon>info</FontIcon>}
            primaryText="Work"
            secondaryText="Jan 28, 2014"
          />
          <Divider inset />
          <ListSubheader primaryText="Files" />
        </List>
      </Paper>
      <Paper>
        <List className="three-line-example">
          <ListItem
            leftAvatar={<Avatar src={randomImage({ width: 40, height: 40 })} alt="some image" />}
            rightIcon={<IconButton>star</IconButton>}
            primaryText="Brunch this weekend?"
            secondaryText="Ali Connors"
            secondaryText2="I'll be in your neighborhood sometime this week"
          />
          <ListItem
            leftAvatar={<Avatar src={randomImage({ width: 40, height: 40 })} alt="some image" />}
            rightIcon={<IconButton>star</IconButton>}
            primaryText="Summer BBQ"
            secondaryText="to Alex, Scott, Jennifer"
            secondaryText2="Wish I could come, but I'm out of town this weekend."
          />
          <ListItem
            leftAvatar={<Avatar src={randomImage({ width: 40, height: 40 })} alt="some image" />}
            rightIcon={<IconButton>star</IconButton>}
            primaryText="Oui Oui"
            secondaryText="Sandra Adams - Do you have Paris"
            secondaryText2="recommendations? Have you ever been?"
          />
        </List>
      </Paper>
    </div>
  );
}
