import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import Button from 'react-md/lib/Buttons';
import { Card, CardTitle, CardMedia } from 'react-md/lib/Cards';

export default class Section extends PureComponent {
  static propTypes = {
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

  render() {
    const { className, listClassName, cardClassName, title, data, titleIcon } = this.props;

    let titleChildren;
    if (titleIcon) {
      titleChildren = <Button icon>{titleIcon}</Button>;
    }

    const cards = data.map(({ img, ...props }, i) => (
      <Card raise={false} className={cardClassName} key={i}>
        <CardMedia aspectRatio={CardMedia.aspect.equal}>
          <img src={img} role="presentation" />
        </CardMedia>
        <CardTitle {...props} children={titleChildren} className={titleIcon ? 'with-icon' : null} />
      </Card>
    ));

    return (
      <section className={classnames('fun-section', className)}>
        <header className="title">
          <h1 className="md-title">{title}</h1>
          <Button flat label="More" primary />
        </header>
        <div className={classnames('md-card-list', listClassName)}>
          {cards}
        </div>
      </section>
    );
  }
}
