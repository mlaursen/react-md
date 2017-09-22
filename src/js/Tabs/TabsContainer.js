import React, { PureComponent, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import SwipeableViews from 'react-swipeable-views';

import getField from '../utils/getField';
import controlled from '../utils/PropTypes/controlled';
import between from '../utils/PropTypes/between';
import ResizeObserver from '../Helpers/ResizeObserver';
import Paper from '../Papers/Paper';
import TabPanel from './TabPanel';

/**
 * The `TabsContainer` component is used when you want to have your `Tabs` connected with
 * the `SwipeableViews`. This component will traverse the children subtree and extract out
 * the `children` from each tab, and render them in a swipeable container. However,
 * since this is using the `React.Children` traversal, You will have to keep the `Tabs`
 * and `Tab` component as a direct descendent. You are unable to make a separate component
 * that encompasses the `Tab` component.
 *
 * ```js
 * // valid
 * <TabsContainer>
 *   <Tabs>
 *     <Tab />
 *   </Tabs>
 * </TabsContainer>
 *
 * // invalid
 * <TabsContainer>
 *   <Tabs>
 *     <MyCustomTab />
 *   </Tabs>
 * </TabsContainer>
 * ```
 *
 * This is because it seems you are unable to access the `MyCustomTab`'s child Tab props correctly.
 * You can however have the tab's children as a separate component if you wish.
 */
export default class TabsContainer extends PureComponent {
  static propTypes = {
    /**
     * An optional style to apply to the container.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the container.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to each `TabPanel` that gets generated. Each tab's children
     * will get wrapped in a `TabPanel` component.
     */
    panelStyle: PropTypes.object,

    /**
     * An optional className to apply to each each `TabPanel` that gets generated. Each tab's
     * children will get wrapped in a `TabPanel` component.
     */
    panelClassName: PropTypes.string,

    /**
     * An optional style to apply to the header component when the tabs are fixed to the top of the page.
     * The optional toolbar and tabs get wrapped in a `Paper` component.
     */
    headerStyle: PropTypes.object,

    /**
     * An optional className to apply to the header component when the tabs are fixed to the top of the page.
     * The optional toolbar and tabs get wrapped in a `Paper` component.
     */
    headerClassName: PropTypes.string,

    /**
     * An optional style to apply to the `SwipeableViews`.
     *
     * @see https://github.com/oliviertassinari/react-swipeable-views#user-content-swipeableviews-
     */
    swipeableViewsStyle: PropTypes.object,

    /**
     * An optional className to apply to the `SwipeableViews` container.
     */
    swipeableViewsClassName: PropTypes.string,

    /**
     * An optional style to apply to each slide component or a function that returns such style.
     *
     * Default style and height of slide component will be passed in the function.
     * The function should return a style that will be merged with default style, or `null`.
     *
     * @see https://github.com/oliviertassinari/react-swipeable-views#user-content-swipeableviews-
     */
    slideStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
    ]),

    /**
     * The property that should be used to set height of a slide component.
     */
    slideHeightProp: PropTypes.oneOf(['height', 'minHeight', 'maxHeight']),

    /**
     * This should be a `Tabs` component with children of `Tab`. This is used to figure out which
     * tab's content is currently visible.
     */
    children: PropTypes.element.isRequired,

    /**
     * The component to render the container as.
     */
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]).isRequired,

    /**
     * The component to render each `TabPanel` as.
     */
    panelComponent: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]),

    /**
     * An optional toolbar to render above the tabs.
     */
    toolbar: PropTypes.element,

    /**
     * An optional active tab index to use. If this is defined, the component will be controlled
     * and require the `onTabChange` prop to be defined.
     */
    activeTabIndex: controlled(PropTypes.number, 'onTabChange', 'defaultTabIndex'),

    /**
     * An optional function to call when a new tab is selected by swiping or clicking a tab. When
     * a new tab has been clicked, the callback will include the active tab index, the tab's `id`,
     * the tab's `controlsId`, the tab's `children`, and the click event.
     *
     * If the tab was changed by swiping, it will only contain the new active tab index.
     *
     * ```js
     * onTabChange(newActiveTabIndex, tabId, tabControlsId, tabChildren, event);
     * ```
     */
    onTabChange: PropTypes.func,

    /**
     * The default tab index to use when the component is uncontrolled.
     */
    defaultTabIndex: PropTypes.number.isRequired,

    /**
     * Boolean if the `toolbar` and `Tabs` should be cloned with `colored: true`.
     */
    colored: PropTypes.bool,

    /**
     * Boolean if the `toolbar` should be applied with the theme color. This _really_ only
     * applies when you create a `fixed` tabs container.
     */
    themed: PropTypes.bool,

    /**
     * Boolean if the tabs and the optional toolbar should be fixed to the top of the page.
     */
    fixed: PropTypes.bool,

    /**
     * A boolean if a `fixed` `TabsContainer` has tabs with a label and an icon.
     */
    labelAndIcon: PropTypes.bool,

    /**
     * An optional component to render the fixed tabs header as.
     */
    headerComponent: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]),

    /**
     * The zDepth for the fixed tabs header.
     */
    headerZDepth: between(PropTypes.number, 0, 5),

    /**
     * Any additional props to apply to the SwipeableViews component. View the
     * [SwipeableViews API](https://github.com/oliviertassinari/react-swipeable-views#api)
     * for valid attributes.
     *
     * You will not be able to set the `style`, `className`, `slideStyle`, `index`,
     * or `onChangeIndex` props for the SwipeableViews.
     *
     * The styling and classnames can be updated with the other TabsContainer props.
     */
    swipeableViewsProps: PropTypes.object,
  };

  static defaultProps = {
    component: 'section',
    defaultTabIndex: 0,
    headerZDepth: 1,
    slideHeightProp: 'height',
  };

  constructor(props) {
    super(props);

    this.state = {};
    if (typeof props.activeTabIndex === 'undefined') {
      this.state.activeTabIndex = props.defaultTabIndex;
    }
  }

  componentDidMount() {
    this._resizePanel();
  }

  componentDidUpdate(prevProps, prevState) {
    const prevIndex = getField(prevProps, prevState, 'activeTabIndex');
    const currIndex = getField(this.props, this.state, 'activeTabIndex');

    if (prevIndex !== currIndex) {
      this._resizePanel();
    }
  }

  _handleTabChange = (index, tabId, tabControlsId, tabChildren, event) => {
    if (this.props.onTabChange) {
      this.props.onTabChange(index, tabId, tabControlsId, tabChildren, event);
    }

    if (typeof this.props.activeTabIndex === 'undefined') {
      this.setState({ activeTabIndex: index });
    }
  };

  _handleSwipeChange = (activeTabIndex) => {
    this._handleTabChange(activeTabIndex);
  };

  _setContainer = (container) => {
    this._container = findDOMNode(container);
  };

  _resizePanel = () => {
    if (!this._container) {
      return;
    }

    const activePanel = this._container.querySelector('.md-tab-panel[aria-hidden=false]');
    if (activePanel && this.state.panelHeight !== activePanel.offsetHeight) {
      this.setState({ panelHeight: activePanel.offsetHeight });
    }
  };

  render() {
    const { panelHeight } = this.state;
    const {
      component: Component,
      style,
      className,
      panelStyle,
      panelClassName,
      panelComponent,
      headerStyle,
      headerClassName,
      slideStyle,
      slideHeightProp,
      swipeableViewsStyle,
      swipeableViewsClassName,
      headerComponent,
      headerZDepth,
      children,
      colored,
      fixed,
      labelAndIcon,
      swipeableViewsProps,
      themed,
      /* eslint-disable no-unused-vars */
      toolbar: propToolbar,
      activeTabIndex: propActiveTabeIndex,
      onTabChange,
      defaultTabIndex,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;
    let { toolbar } = this.props;

    const activeTabIndex = getField(this.props, this.state, 'activeTabIndex');

    const tabsEl = Children.only(children);
    const tabId = tabsEl.props.tabId;
    const content = Children.map(tabsEl.props.children, (tab, index) => {
      if (!tab) {
        return tab;
      }

      return (
        <TabPanel
          id={tab.props.controlsId || `${tabId}-panel-${index}`}
          active={activeTabIndex === index}
          style={panelStyle}
          className={panelClassName}
          component={panelComponent}
          controlledById={tab.props.id || `${tabId}-${index}`}
        >
          <ResizeObserver watchHeight onResize={this._resizePanel} />
          {tab.props.children}
        </TabPanel>
      );
    });

    const childrenProps = Children.only(children).props;
    const tabs = cloneElement(children, {
      colored: typeof childrenProps.colored !== 'undefined' ? childrenProps.colored : colored,
      onTabChange: this._handleTabChange,
      activeTabIndex,
    });

    let prominentToolbar = false;
    if (toolbar) {
      const toolbarProps = Children.only(toolbar).props;
      toolbar = cloneElement(toolbar, {
        component: toolbarProps.component || 'div',
        colored: typeof toolbarProps.colored !== 'undefined' ? childrenProps.colored : colored,
      });

      prominentToolbar = toolbarProps.prominent || toolbarProps.prominentTitle;
    }

    let header;
    if (fixed) {
      header = (
        <Paper
          style={headerStyle}
          className={cn('md-tabs-fixed-container', {
            'md-toolbar--themed': themed,
          }, headerClassName)}
          zDepth={headerZDepth}
          component={headerComponent}
        >
          {toolbar}
          {tabs}
        </Paper>
      );
    }

    const baseSlideStyle = { [slideHeightProp]: panelHeight };

    return (
      <Component
        style={style}
        className={cn('md-tabs-container', className)}
        {...props}
        ref={this._setContainer}
      >
        {header}
        {header ? null : toolbar}
        {header ? null : tabs}
        <SwipeableViews
          {...swipeableViewsProps}
          style={swipeableViewsStyle}
          className={cn('md-tabs-content', {
            'md-tabs-content--offset': !toolbar && !labelAndIcon && fixed,
            'md-tabs-content--offset-icon': !toolbar && fixed && labelAndIcon,
            'md-tabs-content--offset-toolbar': toolbar && fixed && !prominentToolbar && !labelAndIcon,
            'md-tabs-content--offset-toolbar-prominent': toolbar && fixed && prominentToolbar && !labelAndIcon,
            'md-tabs-content--offset-toolbar-icon': fixed && toolbar && labelAndIcon && !prominentToolbar,
            'md-tabs-content--offset-toolbar-prominent-icon': fixed && toolbar && labelAndIcon && prominentToolbar,
          }, swipeableViewsClassName)}
          slideStyle={{
            ...baseSlideStyle,
            ...(typeof slideStyle === 'function' ? slideStyle(baseSlideStyle, panelHeight) : slideStyle),
          }}
          index={activeTabIndex}
          onChangeIndex={this._handleSwipeChange}
        >
          {content}
        </SwipeableViews>
      </Component>
    );
  }
}
