import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';
import shallowEqual from 'shallowequal';
import { get } from 'lodash/object';
import { Button, bem } from 'react-md';

import sassdocPageShape from 'propTypes/sassdocPageShape';
import { sassdocRequest } from 'state/sassdocs';
import DocumentationPage from 'components/DocumentationPage';

import './_styles.scss';
import Section from './Section';
import Finder from './Finder';

export class PureSassDocPage extends PureComponent {
  static propTypes = {
    sassdocRequest: PropTypes.func.isRequired,
    component: PropTypes.string,
    section: PropTypes.string,
    sassdoc: sassdocPageShape,
    desktop: PropTypes.bool.isRequired,
    toolbarTitle: PropTypes.string.isRequired,
    fabOffset: PropTypes.bool,
  };

  state = { finderVisible: false };

  componentDidMount() {
    const { sassdocRequest, component, section } = this.props;
    sassdocRequest(component, section);
  }

  toggleFinder = () => {
    this.setState({ finderVisible: !this.state.finderVisible });
  };

  render() {
    const { sassdoc, toolbarTitle, fabOffset } = this.props;
    const { placeholders, variables, mixins, functions } = sassdoc || {};

    return (
      <DocumentationPage title={`${toolbarTitle} SassDoc`} loading={sassdoc === null}>
        <Section key="placeholders" title="Placeholders" data={placeholders} />
        <Section key="variables" title="Variables" data={variables} />
        <Section key="functions" title="Functions" data={functions} />
        <Section key="mixins" title="Mixins" data={mixins} />
        <Button
          key="fab"
          floating
          secondary
          fixed
          className={bem('sassdoc', 'fab', { offset: fabOffset })}
          onClick={this.toggleFinder}
          tooltipPosition="left"
          tooltipLabel="Find SassDoc in Page"
        >
          find_in_page
        </Button>
        <Finder
          key="finder"
          visible={this.state.finderVisible}
          onVisibilityChange={this.toggleFinder}
          placeholders={placeholders}
          variables={variables}
          functions={functions}
          mixins={mixins}
        />
      </DocumentationPage>
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

    const ids = ['sassdocs', section, component === section ? null : component, location]
      .filter(id => !!id && !id.match(/date|time|linear|circular|checkbox|radio|switch/));
    const sassdoc = get(state, ids.join('.'), null);

    const nextResult = {
      ...actions,
      section,
      component: component || location,
      sassdoc,
      fabOffset: state.sassdocFab && state.media.mobile,
      desktop: state.media.desktop,
      toolbarTitle: state.drawer.toolbarTitle,
    };

    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})(PureSassDocPage);
