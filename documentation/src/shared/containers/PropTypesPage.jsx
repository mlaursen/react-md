import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchDocgen } from 'actions/fetch';
import reduceKey from 'utils/StateUtils/reduceKey';

import 'components/PropTypesPage/_styles.scss';
import PropTypesPage from 'components/PropTypesPage';

@connect(({ documentation: { docgens }, ui: { drawer: { mobile, tablet, desktop } } }, { params: { component, section } }) => ({
  mobile,
  tablet,
  desktop,
  docgen: reduceKey(docgens, [section, component].filter(s => !!s)),
}), { fetchDocgen })
export default class PropTypesPageContainer extends PureComponent {
  static propTypes = {
    docgen: PropTypesPage.propTypes.docgen,
    mobile: PropTypes.bool.isRequired,
    tablet: PropTypes.bool.isRequired,
    desktop: PropTypes.bool.isRequired,

    fetchDocgen: PropTypes.func.isRequired,
    params: PropTypes.shape({
      component: PropTypes.string.isRequired,
      section: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    const { docgen, fetchDocgen, params: { component, section } } = this.props;
    if (docgen) {
      return;
    }

    fetchDocgen(component, section);
  }

  render() {
    const { ...props } = this.props;
    delete props.dispatch;
    delete props.fetchDocgen;
    delete props.route;
    delete props.routes;
    delete props.routeParams;
    delete props.router;
    delete props.params;
    delete props.location;

    return <PropTypesPage {...props} />;
  }
}
