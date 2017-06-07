import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';
import shallowEqual from 'shallowequal';
import { get } from 'lodash/object';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';

import { sassdocRequest } from 'state/sassdocs';

export class PureSassDocPage extends PureComponent {
  static propTypes = {
    sassdocRequest: PropTypes.func.isRequired,
    component: PropTypes.string,
    section: PropTypes.string,
    sassdoc: PropTypes.shape({
      placeholders: PropTypes.array.isRequired,
      mixins: PropTypes.array.isRequired,
      functions: PropTypes.array.isRequired,
      variables: PropTypes.array.isRequired,
    }),
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { sassdocRequest, component, section } = this.props;
    sassdocRequest(component, section);
  }

  render() {
    const { sassdoc } = this.props;
    let children;
    let accessibilityProps;
    if (sassdoc === null) {
      accessibilityProps = {
        'aria-describedby': 'loading-sassdoc',
        'aria-busy': true,
      };
      children = <CircularProgress id="loading-sassdoc" key="loader" />;
    } else {
      children = <h1>Loaded!</h1>;
    }

    return (
      <section {...accessibilityProps} className="md-grid md-grid--40-16">
        {children}
      </section>
    );
  }
}

export default connectAdvanced((dispatch) => {
  let result;
  const actions = bindActionCreators({ sassdocRequest }, dispatch);

  return (state, props) => {
    const {
      match: {
        params: { component, section, location },
      },
    } = props;

    const ids = ['sassdocs', section, component, location].filter(id => !!id);
    const sassdoc = get(state, ids.join('.'), null);

    const nextResult = {
      ...actions,
      section,
      component: component || location,
      sassdoc,
    };

    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})(PureSassDocPage);
