import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';
import { Card, CardTitle, CardText } from 'react-md/lib/Cards';
import { IconButton } from 'react-md/lib/Buttons';

import { githubHref, toDashedName, toTitle } from '../utils';
import Markdown from '../Markdown';

export default class ComponentProperties extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  static propTypes = {
    sectionName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    desc: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    componentName: PropTypes.string,
    component: PropTypes.func.isRequired,
    details: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      pt: PropTypes.string,
      dv: PropTypes.string,
    })).isRequired,
    allRemaining: PropTypes.bool.isRequired,
    marked: PropTypes.func.isRequired,
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
    const { component, componentName, sectionName, details, allRemaining, marked, desc } = this.props;
    const name = (component.displayName || component.name);
    const { propTypes, defaultProps } = component;
    const detailNames = details.map(d => d.name);

    let extraProps = [];
    if('className' in propTypes && detailNames.indexOf('className') === -1) {
      extraProps.push({
        name: 'className',
        pt: 's',
        desc: 'An additional classes you want to pass to the component.',
      });
    }

    if('children' in propTypes && detailNames.indexOf('children') === -1) {
      extraProps.push({
        name: 'children',
        pt: 'no',
        desc: 'Any other children you want to pass to the component.',
      });
    }

    if(allRemaining && detailNames.indexOf('any other props') === -1) {
      extraProps.push({
        name: 'any other props',
        desc: 'Any other props that you pass to this component will be added to the top level node.',
      });
    }

    let items = details.concat(extraProps).map(settings => {
      const { name, pt, isRequired, desc, dv } = settings;
      let defaultValue;
      if(dv) {
        defaultValue = dv;
      } else if(pt !== 'f' && defaultProps && defaultProps[name]) {
        defaultValue = defaultProps[name];
      }

      const isAnyOtherProps = name === 'any other props';
      return (
        <tr key={name}>
          <td className="prop-name">{name}</td>
          <td className="prop-info">
            {!isAnyOtherProps &&
            <div>
              {pt && <span className="prop-type">{this.stringToPropType(pt)}</span>}
              {isRequired && <span className="prop-required" />}
              {typeof defaultValue !== 'undefined' && <span className="prop-default">default: {defaultValue === null ? 'null' : defaultValue.toString()}</span>}
              {pt === 'ba' && <span className="prop-default">(This boolean can be enabled by just having the prop on the component)</span>}
            </div>
            }
            <Markdown marked={marked} markdown={desc} className={classnames({ 'prop-desc': !isAnyOtherProps })} />
          </td>
        </tr>
      );
    });

    let componentDescription;
    if(desc) {
      const descriptions = typeof desc === 'string' ? [desc] : desc;
      componentDescription = (
        <CardText>
          {descriptions.map((desc, i) => (
            <Markdown marked={marked} markdown={desc} key={`component-desc-${i}`} />
          ))}
        </CardText>
      );
    }
    return (
      <Card className="full-width prop-types" id={`#prop-types-${toDashedName(name)}`} raise={false}>
        <CardTitle title={toTitle(componentName || name)}>
          <IconButton
            href={`${githubHref}/tree/master/src/js/${sectionName}/${name}.js`}
            iconClassName="fa fa-github"
          />
        </CardTitle>
        {componentDescription}
        <CardText className="with-table">
          <table className="md-data-table full-width striped">
            <thead>
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
