/* eslint-disable no-console */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { throttle } from 'lodash/function';
import Autocomplete from 'react-md/lib/Autocompletes';
import Avatar from 'react-md/lib/Avatars';
import { Card, CardTitle } from 'react-md/lib/Cards';
import IconSeparator from 'react-md/Helpers/IconSeparator';
import FontIcon from 'react-md/lib/FontIcons';

import githubUserShape from 'propTypes/githubUserShape';
import { githubRequest } from 'state/github';
import AboutRateLimiting from 'components/Github/AboutRateLimiting';

export class GithubAjaxExample extends PureComponent {
  static propTypes = {
    githubRequest: PropTypes.func.isRequired,
    repos: PropTypes.object.isRequired,
    results: PropTypes.arrayOf(githubUserShape).isRequired,
  };

  state = { username: '' };

  search = throttle((query) => {
    this.props.githubRequest(`/search/users?q=${encodeURIComponent(query)}`);
  }, 500);

  handleSearch = (value) => {
    if (value) {
      this.search(value);
    }
  };

  handleAutocomplete = (value, index, matches) => {
    const username = matches[index].primaryText;
    this.props.githubRequest(`/users/${username}/repos`);
    this.setState({ username });
  };

  render() {
    const data = this.props.results.map(({ login, avatar_url: avatarUrl }) => ({
      primaryText: login,
      leftAvatar: <Avatar src={avatarUrl} role="presentation" />,
    }));
    const repos = (this.props.repos[this.state.username] || []);
    return (
      <div>
        <AboutRateLimiting />
        <Autocomplete
          id="github-user-search"
          label="Search GitHub Users"
          placeholder="mlaursen"
          data={data}
          filter={null}
          onChange={this.handleSearch}
          onAutocomplete={this.handleAutocomplete}
          clearOnAutocomplete
        />
        <output className="md-grid">
          {repos.map(({ open_issues_count: issues, full_name: name, stargazers_count: stargazers }) => (
            <Card key={name}>
              <CardTitle
                title={name}
                subtitle={<IconSeparator label={stargazers}><FontIcon>star</FontIcon></IconSeparator>}
              />
            </Card>
          ))}
        </output>
      </div>
    );
  }
}

export default connect(state => ({
  repos: state.github.cache.repos,
  results: state.github.cache.search,
}), { githubRequest })(GithubAjaxExample);
