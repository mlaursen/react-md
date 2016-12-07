import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import 'components/SassDocPage/_styles.scss';
import { fetchSassDoc } from 'actions/fetch';
import reduceKey from 'utils/StateUtils/reduceKey';
import SassDocPage from 'components/SassDocPage';

function getIdFromPath({ location: { pathname } }) {
  return pathname.substring(pathname.lastIndexOf('/') + 1);
}

function getKey(props) {
  const { params: { section, component } } = props;
  if (section && section.match(/progress|selection-controls|pickers/)) {
    return section;
  }

  return component || section
    ? [section, component].filter(s => !!s)
    : getIdFromPath(props);
}

@connect(({ documentation: { sassdocs } }, props) => ({
  sassdoc: reduceKey(sassdocs, getKey(props)),
}))
export default class SassDocPageContainer extends PureComponent {
  static propTypes = {
    location: PropTypes.shape({
      query: PropTypes.shape({
        tab: PropTypes.string,
      }).isRequired,
    }).isRequired,
    params: PropTypes.shape({
      component: PropTypes.string,
      section: PropTypes.string,
    }).isRequired,
    sassdoc: SassDocPage.propTypes.sassdoc,
    dispatch: PropTypes.func.isRequired,
  };

  static fetch(dispatch, params) {
    return dispatch(fetchSassDoc(params.component, params.section));
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    SassDocPageContainer.fetch(dispatch, params);
  }

  render() {
    const { sassdoc, ...props } = this.props;
    delete props.dispatch;
    delete props.fetchSassDoc;
    delete props.route;
    delete props.routes;
    delete props.routeParams;
    delete props.router;
    delete props.params;
    delete props.location;

    return <SassDocPage sassdoc={sassdoc} {...props} />;
  }
}
