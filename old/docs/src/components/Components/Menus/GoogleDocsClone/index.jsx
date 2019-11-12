import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PureGoogleDocsClone from './GoogleDocsClone';

class GoogleDocsClone extends PureComponent {
  static propTypes = {
    desktop: PropTypes.bool.isRequired,
  };

  state = { visible: false };

  show = () => {
    this.setState({ visible: true });
  };

  hide = () => {
    this.setState({ visible: false });
  };

  render() {
    const { desktop } = this.props;
    return (
      <PureGoogleDocsClone
        {...this.state}
        show={this.show}
        hide={this.hide}
        desktop={desktop}
      />
    );
  }
}
export default connect(({ media: { desktop } }) => ({ desktop }))(GoogleDocsClone);
