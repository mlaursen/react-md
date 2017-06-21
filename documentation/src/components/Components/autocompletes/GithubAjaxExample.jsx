import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-md/lib/Autocompletes';
import Avatar from 'react-md/lib/Avatars';
import { fetchGithub } from 'utils/api';
import { throttle } from 'lodash/function';

export default class GithubAjaxExample extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = { data: [] };
  }

  search = throttle((query) => {
    fetchGithub(`/search/users?q=${encodeURIComponent(query)}`)
      .then((json) => {
        const data = json.items.map(({ login, avatar_url: avatarUrl }) => ({
          primaryText: login,
          leftAvatar: <Avatar src={avatarUrl} alt={`${login}'s avatar'`} />,
        }));
        this.setState({ data });
      }).catch((e) => {
        console.log('e:', e);
      });
  }, 500);

  handleSearch = (value) => {
    if (value) {
      this.search(value);
    }
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <Autocomplete
          id="github-user-search"
          label="Search GitHUb"
          placeholder="mlaursen"
          data={data}
          filter={null}
          onChange={this.handleSearch}
          onAutocomplete={this.handleAutocomplete}
        />
      </div>
    );
  }
}
