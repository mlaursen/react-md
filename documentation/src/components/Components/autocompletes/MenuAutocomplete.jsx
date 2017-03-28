import React, { PureComponent, PropTypes } from 'react';

import Autocomplete from 'react-md/lib/Autocompletes';

export default class MenuAutocomplete extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Autocomplete
        id="programming-languages"
        label="Programming languages"
        placeholder="Javascript"
        data={[]}
      />
    );
  }
}
