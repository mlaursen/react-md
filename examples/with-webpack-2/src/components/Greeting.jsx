import React from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';

import './_greeting.scss';

const Greeting = () => (
  <Card className="greeting">
    <CardTitle title="Hello from react-md" />
    <CardText>
      <p>
        This is a simple app that is using the <code>NavigationDrawer</code> component
        for the layout and <code>Card</code>, <code>CardTitle</code>,
        and <code>CardText</code> for this message.
      </p>
    </CardText>
    <CardText>
      <p>
        You can edit <code>src/components/App.jsx</code> to start making an app.
        Edit <code>src/_globals.scss</code> for any Sass variable changes.
      </p>
    </CardText>
  </Card>
);

export default Greeting;
