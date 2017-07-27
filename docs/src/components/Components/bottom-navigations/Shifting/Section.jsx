/* eslint-disable jsx-a11y/img-has-alt, react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Button from 'react-md/lib/Buttons/Button';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import Media from 'react-md/lib/Media';

const Section = ({ className, listClassName, cardClassName, title, data, titleIcon, ...props }) => {
  let titleChildren;
  if (titleIcon) {
    titleChildren = <Button icon className="md-cell--right bottom-navigations__dynamic__kebab">more_vert</Button>;
  }

  const cards = data.map(({ img, ...cardTitleProps }, i) => (
    <Card key={i} className={cardClassName}>
      <Media aspectRatio="1-1">
        <img src={img} role="presentation" />
      </Media>
      <CardTitle {...cardTitleProps}>{titleChildren}</CardTitle>
    </Card>
  ));

  return (
    <section className={cn('md-cell md-cell--12 bottom-navigations__dynamic__section', className)} {...props}>
      <header className="md-cell md-cell--12 bottom-navigations__dynamic__section__header">
        <h3>{title}</h3>
        <Button flat className="md-cell--right" primary>More</Button>
      </header>
      <ul className={cn('md-list-unstyled md-grid', listClassName)}>
        {cards}
      </ul>
    </section>
  );
};

Section.propTypes = {
  className: PropTypes.string,
  listClassName: PropTypes.string,
  cardClassName: PropTypes.string,
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
  })).isRequired,
  titleIcon: PropTypes.bool,
};
export default Section;
