import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';

import { loadDocumentation } from 'actions/documentation';

import DocPage from 'components/DocPage';

@connect(({ documentation, ui: { media: { mobile, tablet } } }) => ({ ...documentation, mobile, tablet }), {
  loadDocumentation,
})
export default class DocPageContainer extends PureComponent {
  static propTypes = {
    params: PropTypes.object.isRequired,
    mobile: PropTypes.bool.isRequired,
    loadDocumentation: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { examples: [] };
  }

  componentWillMount() {
    const { component, section } = this.props.params;
    let folder = (section ? `${section}/` : '') + component;
    if (component === 'selection-control') {
      folder = `${component}s`;
    }

    // Can not have the examples in the redux state since it is not serializable.
    // So either async require example for client, or bundle for server.
    if (__CLIENT__) {
      this.props.loadDocumentation(component, section);

      require.ensure([], require => {
        const examples = require(`examples/${folder}/index.js`).default;
        this.setState({ examples });
      });
    } else {
      const examples = require(`examples/${folder}/index.js`).default;
      this.setState({ examples });
    }
  }

  render() {
    const { ...props } = this.props; // eslint-disable-line no-useless-rename
    delete props.dispatch;
    delete props.loadDocumentation;

    return <DocPage {...this.state} {...props} />;
  }
}
