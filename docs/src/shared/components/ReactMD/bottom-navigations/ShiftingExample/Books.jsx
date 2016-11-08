import React from 'react';
import Button from 'react-md/lib/Buttons/Button';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import Media from 'react-md/lib/Media';

import randomImage from 'utils/RandomUtils/randomImage';
import books from 'constants/books';

const booksTransformed = books.map(({ title, author }, index) => ({
  title,
  subtitle: `By ${author}`,
  img: randomImage({ width: 100, height: 150, time: index }),
}));

const Books = () => (
  <section className="md-grid">
    {booksTransformed.map(({ title, subtitle, img }) => (
      <Card key={title} className="md-cell md-cell--12 book-card">
        <div>
          <Media aspectRatio="2-3" style={{ width: 100 }}>
            <img src={img} role="presentation" />
          </Media>
        </div>
        <div>
          <CardTitle title={title} subtitle={subtitle} style={{ paddingTop: 16 }} />
          <CardActions style={{ marginTop: 1 }}>
            <Button flat label="Free Sample" primary />
            <Button flat label="Review" primary />
          </CardActions>
        </div>
      </Card>
    ))}
  </section>
);


export default Books;
