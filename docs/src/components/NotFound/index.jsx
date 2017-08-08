import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import Media from 'react-md/lib/Media/Media';

import { pageNotFound } from 'state/routing';
import InlineSVG from 'components/InlineSVG';
import notFound from '!!raw-loader!./404.svg';

import './_styles.scss';

@connect(null)
export default class NotFound extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.dispatch(pageNotFound());
  }

  goHome = () => {
    this.props.history.replace('/');
  };

  render() {
    return (
      <Media className="not-found">
        <InlineSVG src={notFound} />
        <h4 className="md-display-2 not-found__display">Uhhh...</h4>
        <h4 className="md-headline not-found__headline">Looks like the page can not be found.</h4>
        <Button
          id="return-home"
          className="not-found__return-home"
          secondary
          raised
          onClick={this.goHome}
        >
          Return Home
        </Button>
      </Media>
    );
  }
}
