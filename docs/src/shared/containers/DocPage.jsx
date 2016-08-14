import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';

import { loadDocumentation } from 'actions/documentation';

import DocPage from 'components/DocPage';
@connect(({ documentation }) => ({ ...documentation }), {
  loadDocumentation,
})
export default class DocPageContainer extends PureComponent {
  static propTypes = {
    params: PropTypes.object.isRequired,
    loadDocumentation: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const { component, section } = this.props.params;
    this.props.loadDocumentation(component, section);
  }

  render() {
    const { ...props } = this.props;
    delete props.dispatch;
    delete props.loadDocumentation;

    return <DocPage {...props} />;
  }
}
