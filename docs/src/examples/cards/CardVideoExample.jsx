import React from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardMedia from 'react-md/lib/Cards/CardMedia';
import CardTitle from 'react-md/lib/Cards/CardTitle';

import './_embedded.scss';

const CardVideoExample = () => (
  <Card raise={false}>
    <CardMedia>
      <iframe
        allowFullScreen
        className="md-media-embedded"
        src="https://www.youtube.com/embed/kyAn3fSs8_A"
      />
    </CardMedia>
    <CardTitle title="Archer" subtitle="Highway to the Dangerzone" />
  </Card>
);

export default CardVideoExample;
