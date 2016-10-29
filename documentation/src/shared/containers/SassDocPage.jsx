import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchSassDoc } from 'actions/fetch';
import reduceKey from 'utils/StateUtils/reduceKey';
import SassDocPage from 'components/SassDocPage';

function getIdFromPath({ location: { pathname } }) {
  return pathname.substring(pathname.lastIndexOf('/') + 1);
}

function getKey(props) {
  const { params: { section, component } } = props;

  return component || section
    ? [section, component].filter(s => !!s)
    : getIdFromPath(props);
}

@connect(({ documentation: { sassdocs } }, props) => ({
  sassdoc: reduceKey(sassdocs, getKey(props)),
}), { fetchSassDoc })
export default class SassDocPageContainer extends PureComponent {
  static propTypes = {
    fetchSassDoc: PropTypes.func.isRequired,
    location: PropTypes.shape({
      query: PropTypes.shape({
        tab: PropTypes.string,
      }).isRequired,
    }).isRequired,
    params: PropTypes.shape({
      component: PropTypes.string,
      section: PropTypes.string,
    }).isRequired,
    sassdoc: PropTypes.object,
  };

  componentWillMount() {
    const { sassdoc, fetchSassDoc, params: { component, section } } = this.props;

    if (sassdoc) {
      return;
    } else if (component || section) {
      fetchSassDoc(component, section);
    } else {
      fetchSassDoc(getIdFromPath(this.props));
    }
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
