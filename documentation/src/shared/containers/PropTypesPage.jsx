import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchDocgen } from 'actions/fetch';

@connect(({ documentation: { docgens } }, props) => ({
  docgen: docgens[props.params.component],
}), { fetchDocgen })
export default class PropTypesPage extends PureComponent {
  static propTypes = {
    docgen: PropTypes.arrayOf(PropTypes.shape({
      placeholder: PropTypes.array.isRequired,
      variables: PropTypes.array.isRequired,
      functions: PropTypes.array.isRequired,
      mixins: PropTypes.array.isRequired,
    })),

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
    console.log('this.props:', this.props);
    return (
      <div />
    );
  }
}
