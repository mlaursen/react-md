import React from 'react';
import Avatar from 'react-md/lib/Avatars';
import Button from 'react-md/lib/Buttons';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';

import { randomImage } from 'utils/random';

const style = { maxWidth: 600 };
const avatar = randomImage();

const Expandable = () => (
  <Card style={style} className="md-block-centered">
    <CardTitle
      title="Card Title"
      subtitle="Card Subtitle"
      avatar={<Avatar src={avatar} role="presentation" />}
    />
    <CardActions expander>
      <Button flat>Action 1</Button>
      <Button flat>Action 2</Button>
    </CardActions>
    <CardText expandable>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec laoreet orci
        elit, sed eleifend nunc blandit auctor. Phasellus sodales vestibulum aliquet.
        Cras neque leo, congue eu risus non, lobortis sagittis dui. Curabitur auctor
        nibh at dignissim scelerisque. Duis urna risus, sodales vitae viverra vitae,
        placerat eu nulla. Nam eget ante congue enim interdum consectetur. In pharetra
        viverra tempor.
      </p>
      <p>
        Morbi elementum libero ac turpis mollis, vitae commodo justo vehicula. In
        convallis nulla lorem, in tristique lorem scelerisque vitae. Integer non rhoncus
        nunc. Aenean mollis dolor et ex rhoncus imperdiet. Aenean elit nisl, rutrum quis
        mi vel, pharetra tempus nibh. Pellentesque cursus magna sit amet euismod congue.
        Vivamus lorem mi, viverra sed aliquet in, convallis non sapien.
      </p>
      <p>
        Integer ante arcu, ultricies eleifend nisl vitae, dapibus pellentesque ex. Aenean
        turpis lorem, accumsan et tincidunt id, facilisis vel ante. Morbi turpis lacus,
        posuere ut odio et, sagittis tincidunt ante. Morbi laoreet fermentum dolor, ac
        eleifend ligula egestas maximus. Aenean vel leo tellus. Duis semper rutrum arcu
        at fringilla. Proin tincidunt vestibulum purus eu placerat. Mauris nec porta nunc.
        Proin pulvinar, lorem nec pharetra fermentum, lorem nunc vulputate felis, eu malesuada
        libero nulla sit amet lectus. Quisque nec ultrices lectus. Maecenas in commodo velit.
      </p>
      <p>
        Aenean bibendum nulla at velit tincidunt, faucibus scelerisque mi consectetur. Morbi
        convallis nibh ac lacus pharetra, sed semper augue sollicitudin. Sed purus dui,
        tincidunt ac nunc ut, vehicula sollicitudin tellus. Pellentesque vestibulum est non ornare
        ultrices. Donec vehicula neque a sem posuere, ac ultrices dolor venenatis. Duis pretium,
        justo quis ultrices egestas, ligula libero dignissim nibh, rutrum congue magna diam id
        leo. Quisque nec est tempus, tristique massa vitae, vehicula lorem.
      </p>
    </CardText>
  </Card>
);
export default Expandable;
