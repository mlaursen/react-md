import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { showSearch, hideSearch, search, searchNext } from 'actions/search';
import Search from 'components/Search';

@connect(({ search }) => ({ ...search }), { search, searchNext, showSearch, hideSearch })
export default class SearchContainer extends PureComponent {
  static propTypes = Search.propTypes;

  render() {
    const { ...props } = this.props;
    delete props.dispatch;

    return <Search {...props} />;
  }
}
