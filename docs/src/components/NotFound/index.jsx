import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Media, bem } from 'react-md';

import { pageNotFound } from 'state/routing';
import InlineSVG from 'components/InlineSVG';
import notFound from '!!raw-loader!./404.svg';

import './_styles.scss';

const base = 'not-found';

class NotFound extends PureComponent {
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
      <Media className={base}>
        <InlineSVG src={notFound} />
        <h4 className={bem(base, 'display', {}, 'md-display-2')}>Uhhh...</h4>
        <h4 className={bem(base, 'headline', {}, 'md-headline')}>Looks like the page can not be found.</h4>
        <Button
          id="return-home"
          className={bem(base, 'return-home')}
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

export default connect(null)(NotFound);
