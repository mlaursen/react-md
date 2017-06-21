import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';
import shallowEqual from 'shallowequal';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn } from 'react-md/lib/DataTables';

import Markdown from 'components/Markdown';
import { githubRateLimitRequest } from 'state/github';

import './_rate-limiting.scss';

const markdown = `
This example uses the [GitHub API](https://developer.github.com/v3/) and is subject
to [rate limiting](https://developer.github.com/v3/#rate-limiting). The current rate
limits are listed below (and automatically updated).
`;

export class AboutRateLimiting extends PureComponent {
  static propTypes = {
    githubRateLimitRequest: PropTypes.func.isRequired,
    rateLimits: PropTypes.shape({
      core: PropTypes.shape({
        limit: PropTypes.number.isRequired,
        remaining: PropTypes.number.isRequired,
        reset: PropTypes.number.isRequired,
      }).isRequired,
      search: PropTypes.shape({
        limit: PropTypes.number.isRequired,
        remaining: PropTypes.number.isRequired,
        reset: PropTypes.number.isRequired,
      }).isRequired,
    }),
  };

  constructor(props) {
    super(props);

    this.state = this.getResetTimes(props.rateLimits);
    this.timer = null;
  }

  componentDidMount() {
    this.props.githubRateLimitRequest();
    this.timer = setTimeout(this.refreshTimes, 500);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.timer = null;
  }

  getResetTime = ({ reset }) => {
    const diff = reset - Math.floor(Date.now() / 1000);
    if (diff <= 0) {
      return '-';
    }

    return `${Math.floor(diff / 60)}:${diff % 60}`;
  };

  getResetTimes = ({ core, search }) => ({
    coreResetTime: this.getResetTime(core),
    searchResetTime: this.getResetTime(search),
  });

  refreshTimes = () => {
    this.timer = setTimeout(this.refreshTimes, 500);
    this.setState(this.getResetTimes(this.props.rateLimits));
  };

  render() {
    const { coreResetTime, searchResetTime } = this.state;
    const { core, search } = this.props.rateLimits;
    return (
      <div className="github__rate-limits">
        <Markdown markdown={markdown} />
        <h4 id="github-rate-limits" className="github__rate-limits__title">Rate Limits</h4>
        <DataTable plain className="github__rate-limits__table" aria-labelledby="github-rate-limits">
          <TableHeader>
            <TableRow>
              <TableColumn />
              <TableColumn numeric>Core</TableColumn>
              <TableColumn numeric>Search</TableColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableColumn header scope="row">Limit</TableColumn>
              <TableColumn numeric>{core.limit}</TableColumn>
              <TableColumn numeric>{search.limit}</TableColumn>
            </TableRow>
            <TableRow>
              <TableColumn header scope="row">Remaining</TableColumn>
              <TableColumn numeric>{core.remaining}</TableColumn>
              <TableColumn numeric>{search.remaining}</TableColumn>
            </TableRow>
            <TableRow>
              <TableColumn header scope="row">Resets in</TableColumn>
              <TableColumn numeric>{coreResetTime}</TableColumn>
              <TableColumn numeric>{searchResetTime}</TableColumn>
            </TableRow>
          </TableBody>
        </DataTable>
      </div>
    );
  }
}

export default connectAdvanced((dispatch) => {
  let result;
  const actions = bindActionCreators({ githubRateLimitRequest }, dispatch);
  return (state) => {
    const { rateLimits } = state.github;

    const nextResult = { ...actions, rateLimits };
    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})(AboutRateLimiting);
