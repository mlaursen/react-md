import React, { PureComponent, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import Button from 'react-md/lib/Buttons/Button';
import TextField from 'react-md/lib/TextFields';
import Toolbar from 'react-md/lib/Toolbars';

export default class ComponentTitle extends PureComponent {
  static propTypes = {
    mobile: PropTypes.bool.isRequired,
    tablet: PropTypes.bool.isRequired,
    desktop: PropTypes.bool.isRequired,
    source: PropTypes.string.isRequired,
    component: PropTypes.string.isRequired,
    propFilter: PropTypes.string.isRequired,
    onPropFilter: PropTypes.func.isRequired,
    baseId: PropTypes.string.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      filtering: !props.mobile,
    };

    this._toggleFilter = this._toggleFilter.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.mobile === nextProps.mobile) {
      return;
    }

    this.setState({ filtering: !nextProps.mobile });
  }

  _toggleFilter() {
    this.setState({ filtering: !this.state.filtering });
  }

  render() {
    const { filtering } = this.state;
    const {
      component,
      source,
      propFilter,
      onPropFilter,
      mobile,
      baseId,
    } = this.props;

    let filter;
    if (filtering) {
      filter = (
        <TextField
          id={`propTypesFilter-${component}`}
          placeholder="Filter properties"
          value={propFilter}
          onChange={onPropFilter}
          className="md-cell--right"
          fullWidth={false}
        />
      );
    }

    let toggle;
    if (mobile) {
      toggle = (
        <Button
          icon
          key="toggle"
          className="md-cell--right"
          onClick={this._toggleFilter}
          tooltipLabel="Show the filter toolbar"
          tooltipPosition="left"
          waitForInkTransition
        >
          filter_list
        </Button>
      );
    }

    if (filter && mobile) {
      const back = (
        <Button
          icon
          key="back"
          waitForInkTransition
          onClick={this._toggleFilter}
          tooltipLabel="Hide the filter toolbar"
          tooltipPosition="left"
        >
          arrow_back
        </Button>
      );

      filter = (
        <Toolbar key="toolbar" className="filter-toolbar" actions={back} themed>
          {filter}
        </Toolbar>
      );
    }

    return (
      <CSSTransitionGroup
        id={`${baseId}-proptypes`}
        component={CardTitle}
        transitionName="drop-down"
        transitionEnterTimeout={150}
        transitionLeaveTimeout={150}
        title={component}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {toggle}
        {filter}
        <Button
          icon
          forceIconSize
          href={source}
          iconClassName="fa fa-github"
          tooltipLabel={`Github source for ${component}`}
          tooltipDelay={300}
          tooltipPosition="left"
        />
      </CSSTransitionGroup>
    );
  }
}
