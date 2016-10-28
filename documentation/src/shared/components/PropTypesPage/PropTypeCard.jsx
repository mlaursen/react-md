import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import Fuse from 'fuse.js';
import Card from 'react-md/lib/Cards/Card';

import sort from 'utils/ListUtils/sort';
import docgenShape from './docgenShape';
import ComponentTitle from './ComponentTitle';
import PropTypeTable from './PropTypeTable';

export default class PropTypeCard extends PureComponent {
  static propTypes = {
    docgen: docgenShape,
    mobile: PropTypes.bool.isRequired,
    tablet: PropTypes.bool.isRequired,
    desktop: PropTypes.bool.isRequired,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);

    const propList = this._makePropList(props);
    this._fuse = new Fuse(props.docgen.props, {
      keys: [{ name: 'propName', weight: 0.75 }, { name: 'description', weight: 0.25 }],
    });

    this.state = {
      propList,
      deprecated: this._getDeprecated(props),
      propFilter: '',
      ascending: true,
      visibleProps: sort(propList, 'propName', true),
    };

    this._sortProps = this._sortProps.bind(this);
    this._filterProperties = this._filterProperties.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.docgen.props !== nextProps.docgen.props) {
      const propList = this._makePropList(nextProps);
      this._fuse.set(nextProps.docgen.props);
      this.setState({
        propList,
        deprecated: this._getDeprecated(nextProps),
        propFilter: '',
        ascending: true,
        visibleProps: sort(propList, 'propName', true),
      });
    }
  }

  _getDeprecated(props) {
    let deprecated;
    Object.keys(props.docgen.props).some(name => {
      if (name.indexOf('deprecated') !== -1) {
        deprecated = `> The \`${props.component}\` component has been deprecated and will be removed in the next release.`;
        deprecated += props.docgen.props[name].type.raw.replace(/(component)?deprecated|[()'+]|\r?\n/ig, '');
      }

      return deprecated;
    });
    return deprecated;
  }

  _makePropList(props) {
    return props.docgen.props.filter(({ propName }) => propName.indexOf('deprecated' === -1));
  }

  _filterProperties(propFilter) {
    this.setState({
      propFilter,
      visibleProps: propFilter
        ? this._fuse.search(propFilter)
        : sort(this.state.propList, 'propName', this.state.ascending),
    });
  }

  _sortProps() {
    const ascending = !this.state.ascending;
    this.setState({
      ascending,
      visibleProps: sort(this.state.visibleProps, 'propName', ascending),
    });
  }

  render() {
    const {
      className,
      docgen: {
        component,
        source,
      },
      mobile,
      tablet,
      desktop,
    } = this.props;
    const { propFilter, ascending, visibleProps } = this.state;

    return (
      <Card
        id={`#${component}-prop-types`}
        className={cn('md-cell md-cell--12', className)}
        tableCard
      >
        <ComponentTitle
          mobile={mobile}
          tablet={tablet}
          desktop={desktop}
          source={source}
          component={component}
          propFilter={propFilter}
          onPropFilter={this._filterProperties}
        />
        <PropTypeTable ascending={ascending} sortProps={this._sortProps} props={visibleProps} />
      </Card>
    );
  }
}
