import React, { PureComponent, PropTypes } from 'react';
import { withRouter } from 'react-router';
import logo from '../../imgs/logo.png';
import RaisedButton from 'react-md/lib/Buttons/RaisedButton';

@withRouter
export default class Banner extends PureComponent {
  static propTypes = {
    router: PropTypes.object.isRequired,
  };

  _viewDemo = () => {
    this.props.router.push('/components/autocompletes');
  };

  render() {
    return (
      <section className="banner">
        <h1 className="md-display-2">react-md</h1>
        <img src={logo} alt="react-md logo" className="logo" />
        <RaisedButton onClick={this._viewDemo} label="View Demo" secondary />
      </section>
    );
  }
}
