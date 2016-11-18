import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchDocgen } from 'actions/fetch';
import reduceKey from 'utils/StateUtils/reduceKey';

// For some reason if I add the styles ONLY for this one in the 'components/PropTypesPage',
// webpack whines that it "Cannot read property 'apply' of undefined" so they have to be imported
// here
import 'components/PropTypesPage/_styles.scss';
import PropTypesPage from 'components/PropTypesPage';

@connect(({ documentation: { docgens }, ui: { drawer: { mobile, tablet, desktop } } }, { params: { component, section } }) => ({
  mobile,
  tablet,
  desktop,
  docgen: reduceKey(docgens, [section, component].filter(s => !!s)),
}))
export default class PropTypesPageContainer extends PureComponent {
  static propTypes = {
    docgen: PropTypesPage.propTypes.docgen,
    mobile: PropTypes.bool.isRequired,
    tablet: PropTypes.bool.isRequired,
    desktop: PropTypes.bool.isRequired,

    dispatch: PropTypes.func.isRequired,
    params: PropTypes.shape({
      component: PropTypes.string.isRequired,
      section: PropTypes.string,
    }).isRequired,
  };

  static fetch(dispatch, params) {
    return Promise.all([
      dispatch(fetchDocgen(params.component, params.section)),
    ]);
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    PropTypesPageContainer.fetch(dispatch, params);
  }

  render() {
    const { ...props } = this.props;
    delete props.dispatch;
    delete props.route;
    delete props.routes;
    delete props.routeParams;
    delete props.router;
    delete props.params;
    delete props.location;

    return <PropTypesPage {...props} />;
  }
}
