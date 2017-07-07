/* eslint-disable jsx-a11y/img-has-alt */
import React from 'react';
import Button from 'react-md/lib/Buttons/Button';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import Media from 'react-md/lib/Media';

import { randomImage } from 'utils/random';
import books from 'constants/books';

const booksTransformed = books.map(({ title, author }, index) => ({
  title,
  subtitle: `By ${author}`,
  img: randomImage({ width: 100, height: 150, time: index }),
}));

const styles = {
  media: { width: 100 },
  title: { paddingTop: 16 },
};

const Books = () => (
  <section className="md-grid">
    {booksTransformed.map(({ title, subtitle, img }) => (
      <Card key={title} className="md-cell md-cell--12 bottom-navigations__dynamic__book-card">
        <div>
          <Media aspectRatio="2-3" style={styles.media}>
            <img src={img} role="presentation" />
          </Media>
        </div>
        <div>
          <CardTitle title={title} subtitle={subtitle} style={styles.title} />
          <CardActions>
            <Button flat primary>Free Sample</Button>
            <Button flat primary>Review</Button>
          </CardActions>
        </div>
      </Card>
    ))}
  </section>
);


export default Books;
