import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Media,
} from 'react-md';

const ShowcaseCard = ({ link, logo, name, author, description }) => (
  <Card className="showcase-card" component="li">
    <Media component="a" href={link} title={name}>
      <img src={logo} alt={name} />
    </Media>
    <CardTitle
      title={name}
      subtitle={author.name || author}
    >
      {author.github ? <Button icon iconClassName="fa fa-github" href={author.github} /> : null}
    </CardTitle>
    <CardText>
      {description}
    </CardText>
  </Card>
);

ShowcaseCard.propTypes = {
  link: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  author: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      github: PropTypes.string.isRequired,
    }),
  ]).isRequired,
  description: PropTypes.string.isRequired,
};

export default ShowcaseCard;
