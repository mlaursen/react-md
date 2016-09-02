import React from 'react';
import Divider from 'react-md/lib/Dividers';
import TextField from 'react-md/lib/TextFields';
import { List, ListItem } from 'react-md/lib/Lists';
import Subheader from 'react-md/lib/Subheaders';

import { randomAvatars } from 'utils/RandomUtils';

const avatars = randomAvatars(3);

const DividerExamples = () => (
  <div>
    <form className="divider-example-container">
      <TextField id="something" label="Something" block />
      <Divider />
      <TextField id="somethingElse" label="Something else" block />
      <Divider />
    </form>

    <List className="divider-example-container">
      <Subheader primaryText="Inset Example" />
      <ListItem primaryText="Item 1" leftAvatar={avatars[0]} />
      <ListItem primaryText="Item 2" leftAvatar={avatars[1]} />
      <Divider inset />
      <ListItem primaryText="Item 3" leftAvatar={avatars[2]} />
    </List>
  </div>
);

export default DividerExamples;
