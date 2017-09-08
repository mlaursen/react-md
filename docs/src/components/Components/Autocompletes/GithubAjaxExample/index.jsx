import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { connect } from 'react-redux';
import { throttle } from 'lodash/function';
import Autocomplete from 'react-md/lib/Autocompletes';
import Avatar from 'react-md/lib/Avatars';
import Button from 'react-md/lib/Buttons/Button';

import { scrollTo } from 'utils/scrollRestoration';
import { userShape } from 'propTypes/github';
import { githubRequest, clearSearchResults } from 'state/github';
import AboutRateLimiting from 'components/Github/AboutRateLimiting';

import './_styles.scss';
import RepoCard from './RepoCard';

export class PureGithubAjaxExample extends PureComponent {
  static propTypes = {
    githubRequest: PropTypes.func.isRequired,
    repos: PropTypes.object.isRequired,
    results: PropTypes.arrayOf(userShape).isRequired,
    clearSearchResults: PropTypes.func.isRequired,
  };

  state = { username: '' };

  /**
   * This is a throttled version of the search query to only send a search over 500ms
   * when a user is typing. This is mostly to help with the fact that there are only
   * 10 searches allowed in a minute for the GitHub API.
   *
   * The `githubRequest` function is a simple wrapper of the fetching data from the
   * GitHub API, but doing some additional work behind the scenes to keep track of
   * the remaining queries to the GitHub API. You can just treat it as:
   *
   * fetch(`https://api.github.com/search/users?q=${encodeURIComponent(query)}`)
   *   .then(response => {
   *     if (response.ok) {
   *       return response.json();
   *     }
   *
   *     const error = new Error(response.statusText);
   *     error.response = response;
   *     throw error;
   *   }).then(json => {
   *     this.setState({ results: json.items });
   *   }).catch(error => {
   *     // display error
   *   });
   */
  search = throttle((query) => {
    this.props.githubRequest(`/search/users?q=${encodeURIComponent(query)}`);
  }, 500);

  handleSearch = (value) => {
    if (value) {
      if (this.state.username) {
        this.setState({ username: '' });
      }

      this.search(value);
    } else {
      this.props.clearSearchResults();
    }
  };

  /**
   * When one of the usernames for GitHub are selected, fetch all the repos
   * for that user and then display very simple cards to represent those repos.
   */
  handleAutocomplete = (value, index, matches) => {
    const username = matches[index].primaryText;
    this.props.clearSearchResults();
    this.props.githubRequest(`/users/${username}/repos`);
    this.setState({ username });
  };

  reset = () => {
    this.setState({ username: '' }, () => {
      scrollTo(document.getElementById('github-user-search'));
    });
  };

  render() {
    const data = this.props.results.map(({ login, avatar_url: avatarUrl }) => ({
      primaryText: login,
      leftAvatar: <Avatar src={avatarUrl} role="presentation" />,
    }));
    const repos = (this.props.repos[this.state.username] || []);

    let reset;
    if (repos.length) {
      reset = (
        <Button
          type="reset"
          floating
          onClick={this.reset}
          fixed
          secondary
          tooltipLabel="Remove GitHub repos"
          tooltipPosition="left"
        >
          delete
        </Button>
      );
    }

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
        <CSSTransitionGroup
          transitionName="md-cross-fade"
          component="output"
          className="md-grid"
          transitionEnterTimeout={300}
          transitionLeave={false}
        >
          {repos.map(repo => <RepoCard key={repo.full_name} {...repo} />)}
        </CSSTransitionGroup>
        {reset}
      </div>
    );
  }
}

export default connect(state => ({
  repos: state.github.cache.repos,
  results: state.github.cache.search,
}), { githubRequest, clearSearchResults })(PureGithubAjaxExample);
