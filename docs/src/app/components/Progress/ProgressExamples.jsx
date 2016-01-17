import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { LinearProgress, CircularProgress } from 'react-md/Progress';
import { RaisedButton } from 'react-md/Buttons';
import FontIcon from 'react-md/FontIcons';
import Snackbar from 'react-md/Snackbars';
import { RadioGroup, Radio } from 'react-md/SelectionControls';

const fakeContent = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquet et urna at dignissim. Phasellus hendrerit eleifend tincidunt. Donec id mi in neque fringilla posuere. Aliquam efficitur lectus eget est dapibus, congue efficitur ipsum sagittis. Nam malesuada nulla diam, quis blandit diam bibendum vel. Proin venenatis vel mi sit amet commodo. Cras luctus ultricies massa, at accumsan ipsum convallis sit amet. In ornare turpis non risus laoreet, sit amet cursus sem pellentesque. Ut sit amet tellus vitae enim cursus accumsan. Aenean ac molestie elit. Donec sed tellus imperdiet, tempor lectus vel, dignissim magna. Vivamus dolor metus, viverra sed condimentum vel, congue eget ante. In fringilla felis quis tortor vestibulum, id luctus erat imperdiet. Suspendisse eget nulla risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam tincidunt rhoncus leo et molestie.',
  'Donec scelerisque tempus arcu, vitae dapibus leo vestibulum nec. Nulla lacinia suscipit augue eget laoreet. Maecenas tristique quam eu blandit sollicitudin. Morbi in dignissim augue, sed lacinia mauris. Phasellus vulputate interdum est, id lacinia metus congue quis. Fusce commodo lectus tincidunt dapibus ullamcorper. Quisque finibus scelerisque ipsum, eget imperdiet sapien imperdiet eu. Curabitur eu metus dui.',
  'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean pharetra dui nunc, eu pellentesque libero vestibulum sed. Aliquam in imperdiet diam. Morbi porttitor ante eget enim imperdiet maximus. Aenean pellentesque tortor sit amet tellus finibus tincidunt. Donec non vehicula ligula. Duis non lobortis felis. Quisque facilisis ultricies enim, in gravida magna pretium sed. Sed in ullamcorper nunc. Phasellus ligula mi, vestibulum commodo ullamcorper eget, aliquet et nibh. Mauris sed ultrices nisi, in convallis libero.',
  'Vivamus vitae vulputate urna, sit amet elementum nunc. Nunc auctor purus sed aliquet sagittis. Sed hendrerit dignissim augue, sed fermentum purus consequat quis. Pellentesque in egestas nisi. Vestibulum luctus dui vitae ex dictum varius. Proin felis ex, feugiat ac tortor nec, fringilla interdum dolor. Proin nisi massa, eleifend non justo vel, rhoncus iaculis libero. Curabitur dignissim lacus at nunc laoreet pellentesque. Proin non tellus ligula. Phasellus arcu diam, scelerisque et finibus sed, tempus quis nibh.',
  'Sed at diam ultrices, dictum ex eget, interdum ex. Nulla semper quis odio sit amet consequat. Duis at sagittis lacus. Etiam placerat interdum risus vel fermentum. Nam auctor ornare nisl at scelerisque. Vestibulum vestibulum purus sed massa pharetra condimentum. Pellentesque tempor interdum odio sed ultricies. Pellentesque rhoncus ac nisl in consectetur. Nam nec laoreet felis. Morbi venenatis molestie massa, eu ultrices justo placerat vitae.',
];

export default class LinearProgressExamples extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      value: null,
      refresh: false,
      query: false,
      toasts: [],
      contents: [0, 2, 3],
      progressType: 'linear',
    };
  }

  componentWillUnmount() {
    const { interval, timeout, refreshTimeout, queryTimeout } = this.state;
    interval && clearInterval(interval);
    timeout && clearTimeout(timeout);
    refreshTimeout && clearTimeout(refreshTimeout);
    queryTimeout && clearTimeout(queryTimeout);
  }

  createToast = (text = 'You have fetched some file.', action = 'Neat') => {
    this.setState({
      toasts: this.state.toasts.concat([{
        text,
        action,
      }]),
    });
  };

  dismiss = () => {
    let toasts = this.state.toasts.slice();
    toasts.shift();
    this.setState({ toasts });
  };

  fakeFetchFile = () => {
    if(this.state.interval) { return; }

    const interval = setInterval(() => {
      let { value, interval } = this.state;
      let timeout;
      if(value >= 100) {
        clearInterval(interval);
        interval = null;

        timeout = setTimeout(() => {
          this.setState({ value: null, query: false });
        }, 3000);

        this.createToast();
      }

      value = Math.min(100, value + 3);

      this.setState({ value, interval, timeout });
    }, 100);

    this.setState({ value: 0, interval });
  };

  getRandom = (min = 0, max = fakeContent.length) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  fakeRefresh = () => {
    if(this.state.refreshTimeout) { return; }

    const refreshTimeout = setTimeout(() => {
      let contents = [];
      const amt = this.getRandom(1, 4);
      for(let i = 0; i <= amt; i++) {
        contents.push(this.getRandom());
      }

      this.setState({ refresh: false, contents, refreshTimeout: null });
    }, 4000);

    this.setState({ refreshTimeout, refresh: true });
  };

  switchProgressType = (value) => {
    const { progressType, interval, timeout, refreshTimeout, queryTimeout } = this.state;
    if(progressType === value) { return; }
    interval && clearInterval(interval);
    timeout && clearTimeout(timeout);
    refreshTimeout && clearTimeout(refreshTimeout);
    queryTimeout && clearTimeout(queryTimeout);

    this.setState({
      progressType: value,
      refresh: false,
      query: false,
      value: null,
      interval: null,
      timeout: null,
      refreshTimeout: null,
    });
  };

  fakeLoadPage = () => {
    const { interval, timeout, queryTimeout } = this.state;
    if(queryTimeout) { return; }
    interval && clearInterval(interval);
    timeout && clearTimeout(timeout);

    const newQueryTimeout = setTimeout(() => {
      this.fakeFetchFile();
      this.setState({ queryTimeout: null });
    }, 4000);
    this.setState({ query: true, queryTimeout: newQueryTimeout, value: null, timeout: null, interval: null });
  };

  render() {
    const { value, refresh, toasts, contents, progressType, query } = this.state;
    const isLinear = progressType === 'linear';
    return (
      <div>
        <h4 className="md-title">Select a Progress Type</h4>
        <RadioGroup onChange={this.switchProgressType} defaultChecked={progressType}>
          <Radio label="Linear" value="linear" />
          <Radio label="Circular" value="ciruclar" />
        </RadioGroup>
        <CSSTransitionGroup
          component="section"
          className="progress-section"
          transitionName="opacity"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
          >
          <h4 className="md-title">Determinate Example</h4>
          <RaisedButton onClick={this.fakeFetchFile} label="Fetch some file">
            <FontIcon>file_download</FontIcon>
          </RaisedButton>
          {!query && value !== null && (
            isLinear ?
            <LinearProgress key="linear-determinate" value={value} /> :
            <CircularProgress key="circular-determinate" value={value} style={{ transition: 'transform .1s' }} />
          )}
        </CSSTransitionGroup>
        {isLinear &&
          <CSSTransitionGroup
            component="section"
            className="progress-section"
            transitionName="opacity"
            transitionEnterTimeout={150}
            transitionLeaveTimeout={150}
            >
            <h4 className="md-title">Query Indeterminate Example</h4>
            <RaisedButton onClick={this.fakeLoadPage} label="Load some page">
              <FontIcon>refresh</FontIcon>
            </RaisedButton>
            {query &&
              <LinearProgress query value={value} />
            }
          </CSSTransitionGroup>
        }
        <section className="progress-section">
          <h4 className="md-title">Indeterminate Example</h4>
          <RaisedButton onClick={this.fakeRefresh} label="Fake refesh of content">
            <FontIcon>refresh</FontIcon>
          </RaisedButton>
          <CSSTransitionGroup
            component="section"
            className="fake-content"
            transitionName="opacity"
            transitionEnterTimeout={150}
            transitionLeaveTimeout={150}
            >
            {!query && refresh && (
              isLinear ?
              <LinearProgress key="linear-indeterminate" /> :
              <CircularProgress key="circular-indeterminate" />
            )}
            {contents.map((id, i) => <p key={i}>{fakeContent[id]}</p>)}
          </CSSTransitionGroup>
        </section>
        <Snackbar toasts={toasts} dismiss={this.dismiss} />
      </div>
    );
  }
}
