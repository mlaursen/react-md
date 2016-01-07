import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Card, CardTitle, IconButton } from 'react-md';

import './_prop-types.scss';
import { githubHref } from '../utils';
import { convertMarkdown } from './';

export default class ComponentProperties extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    sectionName: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    details: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      pt: PropTypes.string,
    })).isRequired,
    allRemaining: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    allRemaining: false,
  };

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
  };

  render() {
    const { component, sectionName, details, allRemaining } = this.props;
    const name = (component.displayName || component.name).replace('Ripple', '');
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
      const { name, pt, isRequired, desc } = settings;
      const defaultValue = defaultProps ? defaultProps[name] : undefined; // eslint-disable-line no-undefined
      return (
        <tr key={name}>
          <td className="react-md-prop-name">{name}</td>
          <td>
            <div className="prop-info">
              <span className="prop-type">{this.stringToPropType(pt)}</span>
              {isRequired && <span className="prop-required" />}
              {typeof defaultValue !== 'undefined' && <span className="prop-default">default: {defaultValue.toString()}</span>}
              {pt === 'ba' && <span className="prop-default">(This boolean can be enabled by just having the prop on the component)</span>}
            </div>
            {convertMarkdown(desc)}
          </td>
        </tr>
      );
    });
    return (
      <Card className="full-width prop-types">
        <CardTitle title={`Prop Types - ${name.split(/(?=[A-Z])/).join(' ')}`}>
          <IconButton
            href={`${githubHref}/tree/master/src/js/${sectionName}/${name}.js`}
            iconClassName="fa fa-github"
            />
        </CardTitle>
        <table className="md-data-table full-width striped">
          <tbody>
            <tr>
              <th>Prop Name</th>
              <th>Description</th>
            </tr>
            {items}
          </tbody>
        </table>
      </Card>
    );
  }
}
