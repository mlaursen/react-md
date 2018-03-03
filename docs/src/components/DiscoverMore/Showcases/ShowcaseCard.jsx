import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActions,
  CardText,
  CardTitle,
  Media,
} from 'react-md';

import LinkButton from './LinkButton';

const ShowcaseCard = ({ link, demoLink, logo, name, author, description }) => {
  const authorName = author.name || author;
  let githubLink;
  if (author.github) {
    githubLink = <LinkButton icon iconClassName="fa fa-github" href={author.github} />;
  }

  const productDemoLink = demoLink || link;

  return (
    <Card className="showcase-card" component="li">
      <Media component="a" href={link} title={name}>
        <img src={logo} alt={name} />
      </Media>
      <CardTitle
        title={<a className="link" href={link}>{name}</a>}
        subtitle={authorName}
      >
        {githubLink}
      </CardTitle>
      <CardText>
        {description}
      </CardText>
      <CardActions>
        <LinkButton flat primary href={productDemoLink}>View Product Demo</LinkButton>
      </CardActions>
    </Card>
  );
};

ShowcaseCard.propTypes = {
  /**
   * A link to the main organization or website.
   */
  link: PropTypes.string.isRequired,

  /**
   * An optional link to use for showcasing react-md if it is different than the main organization
   * or website link.
   */
  demoLink: PropTypes.string,

  /**
   * The  organization's/website's logo. This should just be the value after importing
   * the logo.png
   */
  logo: PropTypes.string.isRequired,

  /**
   * The organization's/website's name.
   */
  name: PropTypes.string.isRequired,

  /**
   * The author (or organization) that is working for the organization. This can either
   * just be a author's name, or an object containing the author's name and a github link
   * if they want to link back to github.
   */
  author: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      github: PropTypes.string.isRequired,
    }),
  ]).isRequired,

  /**
   * The description of the organization/website. This should be between 1-3 sentences long
   * as your pitch for your organization.
   */
  description: PropTypes.string.isRequired,
};

export default ShowcaseCard;
