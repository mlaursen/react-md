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
    desc: PropTypes.string,
    details: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      propType: PropTypes.string,
    })).isRequired,
    allRemaining: PropTypes.bool,
    multiple: PropTypes.bool,
  }

  static defaultProps = {
    allRemaining: false,
    multiple: false,
  }

  stringToPropType = (s) => {
    switch(s) {
      case 'b':
      case 'ba':
        return 'bool';
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
        return s;
    }
  }

  render() {
    const { component, desc, details, allRemaining, multiple } = this.props;
    const { propTypes, defaultProps } = component;
    const detailNames = details.map(d => d.name);

    let extraProps = [];
    if('className' in propTypes && detailNames.indexOf('className') === -1) {
      extraProps.push({
        name: 'className',
        propType: 's',
        desc: 'An additional classes you want to pass to the component.',
      });
    }
    if('children' in propTypes && detailNames.indexOf('children') === -1) {
      extraProps.push({
        name: 'children',
        propType: 'no',
        desc: 'Any other children you want to pass to the component.',
      });
    }
    if(allRemaining) {
      extraProps.push({
        name: 'any other props',
        desc: 'Any other props that you pass to this component will be added to the top level node.',
      });
    }

    let items = details.concat(extraProps).map(settings => {
      const { name, propType, isRequired, desc } = settings;
      const defaultValue = defaultProps ? defaultProps[name] : undefined; //eslint-disable: undefined
      return (
        <tr key={name}>
          <td className="react-md-prop-name">{name}</td>
          <td>
            <div className="prop-info">
              <span className="prop-type">{this.stringToPropType(propType)}</span>
              {isRequired && <span className="prop-required" />}
              {typeof defaultValue !== 'undefined' && <span className="prop-default">default: {defaultValue.toString()}</span>}
              {propType === 'ba' && <span className="prop-default">(This boolean can be enabled by just having the prop on the component)</span>}
            </div>
            <p className="prop-desc">{desc}</p>
          </td>
        </tr>
      );
    });

    return (
      <Card className="react-md-doc-card">
        <CardText>
          <table className="md-data-table">
            <thead>
              <tr><th className="md-data-table-header" colSpan="2">Prop Types {multiple && `- ${component.name.split(/(?=[A-Z])/).join(' ')}`}</th></tr>
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
        {desc && <CardText><p>{desc}</p></CardText>}
      </Card>
    );
  }
}
