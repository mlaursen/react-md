import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

import getField from '../utils/getField';
import fixedToShape from '../Helpers/fixedToShape';
import findTable from './findTable';
import findFixedTo from './findFixedTo';
import getDisplayName from '../utils/StringUtils/getDisplayName';

/**
 * This is a utility HOC to fix the components that use the `Menu` component behind the scenes. This will
 * correctly add the `id` and `fixedTo` props if they are omitted from the child component's props.
 *
 * If the id prop is omitted, it will default to the `${rowId}-${cellIndex}-${suffix}` and when the
 * `fixedTo` prop is omitted, it will automatically set it to the responsive table wrapper so that
 * it will stay in viewport as expected.
 *
 * This component also attempts to find the `cellIndex` prop if it is not correctly cloned into the
 * component.
 *
 * @param {function|Class} ComposedComponent - the component to compose with the tooltip functionality.
 * @param {String} suffix - the id suffix to apply.
 * @return {Class} the ComposedComponent with some fixes applied.
 */
export default function withTableFixes(ComposedComponent, suffix) {
  return class TableFixesComponent extends PureComponent {
    static Positions = ComposedComponent.Positions;
    static HorizontalAnchors = ComposedComponent.HorizontalAnchors;
    static VerticalAnchors = ComposedComponent.VerticalAnchors;
    static displayName = getDisplayName(ComposedComponent, 'TableFixes');
    static propTypes = {
      id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      cellIndex: PropTypes.number,
      fixedTo: fixedToShape,
    };

    static contextTypes = {
      rowId: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
    }

    state = { cellIndex: undefined };

    componentDidMount() {
      const { cellIndex, fixedTo, id } = this.props;
      const isIndexed = !!id || cellIndex === 0 || !!cellIndex;
      const isFixed = fixedTo === null || !!fixedTo;
      if (isIndexed && isFixed) {
        // all is good
        return;
      }

      const column = findDOMNode(this);
      const table = findTable(column);
      this._fixedTo = findFixedTo(table);

      // If a developer creates their own component to wrap the component that uses a menu, the cellIndex prop
      // might not be defined if they don't pass ...props
      if (!isIndexed) {
        const columns = [].slice.call(column.parentNode.querySelectorAll('th,td'));
        this.setState({ cellIndex: columns.indexOf(column) }); // eslint-disable-line react/no-did-mount-set-state
      } else if (this._fixedTo) {
        // need to apply the _fixedTo for the select field
        this.forceUpdate();
      }
    }

    _fixedTo = null;

    render() {
      const { rowId } = this.context;
      const {
        /* eslint-disable no-unused-vars */
        id: propid,
        fixedTo: propFixedTo,
        cellIndex: propCellIndex,
        /* eslint-enable no-unused-vars */
        ...props
      } = this.props;

      let { id } = this.props;
      const fixedTo = this._fixedTo === null || propFixedTo ? propFixedTo : this._fixedTo;
      const cellIndex = getField(this.props, this.state, 'cellIndex');
      if (!id) {
        id = `${rowId}-${cellIndex}-${suffix}`;
      }

      return <ComposedComponent {...props} id={id} fixedTo={fixedTo} />;
    }
  };
}
