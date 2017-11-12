import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { updateLocation } from 'state/routing';

class History extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    updateLocation: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { history, updateLocation } = this.props;
    updateLocation(this.props.location);

    history.listen((location) => {
      updateLocation(location);

      if (typeof window.ga !== 'undefined') {
        window.ga('send', 'pageview', location.pathname);
      }
    });
  }

  render() {
    return null;
  }
}

export default withRouter(connect(null, { updateLocation })(History));
