import React, { PropTypes } from 'react';
import cn from 'classnames';
import Button from 'react-md/lib/Buttons/Button';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import Media from 'react-md/lib/Media';

const Section = ({ className, listClassName, cardClassName, title, data, titleIcon, ...props }) => {
  let titleChildren;
  if (titleIcon) {
    titleChildren = <Button icon className="md-cell--right" style={{ marginRight: -16 }}>{titleIcon}</Button>;
  }

  const cards = data.map(({ img, ...cardProps }, i) => (
    <Card key={i} className={cardClassName}>
      <Media aspectRatio="1-1">
        <img src={img} role="presentation" />
      </Media>
      <CardTitle {...cardProps}>{titleChildren}</CardTitle>
    </Card>
  ));

  return (
    <section className={cn('md-cell md-cell--12 bottom-nav-section', className)} {...props}>
      <header className="md-cell md-cell--12 section-header">
        <h3 style={{ marginBottom: 0 }}>{title}</h3>
        <Button flat label="More" className="md-cell--right" primary />
      </header>
      <div className={cn('md-grid', listClassName)}>
        {cards}
      </div>
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
  titleIcon: PropTypes.string,
};

export default Section;
