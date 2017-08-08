import React from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';

const Inbox = () => (
  <Card className="md-cell md-cell--12 md-text-container">
    <CardTitle title="Inbox" />
    <CardText>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas augue sapien,
        tristique sodales dui et, vulputate dignissim elit. Class aptent taciti sociosqu
        ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum pretium
        posuere velit. Vestibulum lobortis hendrerit lectus, nec commodo nunc aliquet non.
        Ut vel tortor dolor. Nulla id tincidunt tellus. Vivamus nec sem id ipsum
        consectetur consequat vel eget ligula. Duis nulla lacus, auctor nec semper ac,
        pulvinar eu diam. Etiam non nibh ut sapien accumsan euismod eget sit amet metus.
        Mauris euismod metus lacus, at tempor sem dapibus vitae. Fusce lobortis velit
        elementum finibus imperdiet. Mauris hendrerit pulvinar odio vel euismod. Nam quis
        eros ac nibh lobortis aliquam. Donec ullamcorper luctus magna, id mollis orci pretium
        eget.
      </p>
    </CardText>
  </Card>
);
export default Inbox;
