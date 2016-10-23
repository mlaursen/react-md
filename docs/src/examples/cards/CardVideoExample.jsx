import React from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import Media from 'react-md/lib/Media';

const CardVideoExample = () => (
  <Card>
    <Media>
      <iframe allowFullScreen src="https://www.youtube.com/embed/kyAn3fSs8_A" />
    </Media>
    <CardTitle title="Archer" subtitle="Highway to the Dangerzone" />
  </Card>
);

export default CardVideoExample;
