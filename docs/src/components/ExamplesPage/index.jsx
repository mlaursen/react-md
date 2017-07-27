import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import shallowEqual from 'shallowequal';

import Markdown from 'components/Markdown';

import './_styles.scss';
import ExampleCard from './ExampleCard';

export default class ExamplesPage extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    description: PropTypes.string,
    examples: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      description: PropTypes.string,
      children: PropTypes.node,
      tableCard: PropTypes.bool,
    })).isRequired,
    children: PropTypes.node,
  };

  constructor(props) {
    super();

    this.state = { style: props.style };
  }

  componentDidMount() {
    this.updateMinHeight(this.props);

    window.addEventListener('resize', this.handleResize);
    if (__DEV__) {
      window.addEventListener('load', () => this.updateMinHeight(this.props));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.style !== nextProps.style) {
      this.updateMinHeight();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  updateMinHeight = (props) => {
    const toolbar = document.getElementById('main-toolbar');
    const footer = document.getElementById('main-footer');
    if (!toolbar || !footer) { // tests
      return;
    }

    const minHeight = window.innerHeight - toolbar.offsetHeight - footer.offsetHeight;

    const style = { ...props.style, minHeight };
    if (!shallowEqual(this.state.style, style)) {
      this.setState({ style });
    }
  };

  handleResize = () => {
    this.updateMinHeight(this.props);
  };

  render() {
    const { style } = this.state;
    const {
      className,
      description,
      examples,
      children,
    } = this.props;
    const cards = examples.map(example => <ExampleCard key={example.title} {...example} />);

    let componentDescription;
    if (description) {
      componentDescription = (
        <Markdown
          key="description"
          component="header"
          className="md-text-container md-cell md-cell--12"
          markdown={description}
        />
      );
    }

    return (
      <section style={style} className={cn('md-grid md-grid--40-16 examples-page', className)}>
        {componentDescription}
        {cards}
        {children}
      </section>
    );
  }
}
