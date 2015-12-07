import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { Card, CardText } from '../../../src/js/index';

export default class DocProps extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    component: PropTypes.func.isRequired,
    details: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      propType: PropTypes.string,
    })).isRequired,
    allRemaining: PropTypes.bool,
  }

  static defaultProps = {
    allRemaining: false,
  }

  stringToPropType = (s) => {
    switch(s) {
      case 'o':
        return 'object';
      case 'f':
        return 'func';
      case 'nu':
        return 'number';
      case 'no':
        return 'node';
      case 's':
        return 'string';
      default:
        return '???';
    }
  }

  render() {
    const { component, details, allRemaining } = this.props;
    const { propTypes, defaultProps } = component;

    let extraProps = [];
    if('className' in propTypes) {
      extraProps.push({
        name: 'className',
        propType: 's',
        desc: 'An additional classes you want to give to the component',
      });
    }
    if('children' in propTypes) {
      extraProps.push({
        name: 'children',
        propType: 'no',
        desc: 'Any other children you want to give to the component',
      });
    }
    if(allRemaining) {
      extraProps.push({
        name: 'any other props',
      });
    }

    let items = details.concat(extraProps).map(settings => {
      const { name, propType, isRequired, desc } = settings;
      const defaultValue = defaultProps[name];
      return (
        <tr key={name}>
          <td>{name}{isRequired && <span className="prop-required" />}</td>
          <td>
            <div className="prop-info">
              <span className="prop-type">{this.stringToPropType(propType)}</span>
              {typeof defaultValue !== 'undefined' && <span className="prop-default">default: {defaultValue}</span>}
            </div>
            <p className="prop-desc">{desc}</p>
          </td>
        </tr>
      );
    });

    return (
      <Card className="react-md-props-card">
        <CardText>
          <table className="md-data-table">
            <thead>
              <tr><th className="md-data-table-header" colSpan="2">Prop Types</th></tr>
              <tr>
                <th>Prop Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {items}
            </tbody>
          </table>
        </CardText>
      </Card>
    );
  }
}
