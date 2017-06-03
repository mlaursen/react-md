import React, { PureComponent, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import CardText from 'react-md/lib/Cards/CardText';
import Button from 'react-md/lib/Buttons';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';

import { FOOD_DATA_URL } from 'constants/application';

export default class PaginationLoader extends PureComponent {
  static propTypes = {
    loaded: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
    onLoad: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  render() {
    const { loaded, fetching, onLoad, children } = this.props;

    let content;
    if (fetching) {
      content = (
        <CardText key="fetching">
          <p className="md-body-1">
            Fetching data from <a href={FOOD_DATA_URL}>{FOOD_DATA_URL}</a>. This will
            take awhile...
          </p>
          <CircularProgress id="pagination-loader" />
        </CardText>
      );
    } else if (!loaded) {
      content = (
        <CardText key="preload">
          <p className="md-body-1">
            This example will load around 130000 rows from the a food resource found
            on <a href="http://catalog.data.gov/dataset">data.gov</a>. Click the load
            button to see an example of pagination.
          </p>
          <Button raised primary onClick={onLoad}>Load Data</Button>
        </CardText>
      );
    } else {
      content = children;
    }

    return (
      <CSSTransitionGroup
        transitionName="md-cross-fade"
        component="div"
        transitionEnterTimeout={300}
        transitionLeave={false}
      >
        {content}
      </CSSTransitionGroup>
    );
  }
}
