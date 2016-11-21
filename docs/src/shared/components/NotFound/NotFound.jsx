import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import withRouter from 'react-router/lib/withRouter';
import Button from 'react-md/lib/Buttons/Button';
import Media from 'react-md/lib/Media/Media';
import InlineSVG from 'components/InlineSVG';

import './_not-found.scss';
import img from '!!raw!imgs/404.svg';
import { notFound } from 'actions/ui';

@withRouter
@connect(() => ({}), { notFound })
export default class NotFound extends PureComponent {
  static propTypes = {
    notFound: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.notFound();
  }

  _handleClick = () => {
    this.props.router.replace('/');
  };

  render() {
    return (
      <Media className="react-md-404-page">
        <InlineSVG src={img} />
        <p className="md-display-2">Uhhh...</p>
        <p className="md-headline">Looks like the page can not be found.</p>
        <Button
          secondary
          raised
          onClick={this._handleClick}
          label="Return Home"
        />
      </Media>
    );
  }
}
