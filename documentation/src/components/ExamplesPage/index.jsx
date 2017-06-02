import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { bindActionCreators } from 'redux';
import { connectAdvanced } from 'react-redux';
import shallowEqual from 'shallowequal';

import examplesShape from './examplesShape';
import { loadExamples, getExamples } from 'state/examples';
import ExampleCard from './ExampleCard';
import Markdown from 'components/Markdown';

@connectAdvanced((dispatch) => {
  let result;
  const actions = bindActionCreators({ loadExamples }, dispatch);

  return (state, props) => {
    const { component, section } = props.match.params;
    const examples = getExamples(state.examples, component, section);
    const nextResult = { component, section, examples, ...actions, ...props };
    if (!shallowEqual(result, nextResult)) {
      result = nextResult;
    }

    return result;
  };
})
export default class ExamplesPage extends PureComponent {
  static propTypes = {
    component: PropTypes.string.isRequired,
    section: PropTypes.string,
    loadExamples: PropTypes.func.isRequired,
    examples: examplesShape,
  };

  componentDidMount() {
    const { loadExamples, component, section } = this.props;
    loadExamples(component, section);
  }

  render() {
    const { style, className, readme, examples } = this.props.examples;

    const children = examples.map(example => <ExampleCard key={example.title} {...example} />);
    return (
      <section style={style} className={cn('md-grid md-grid--40-16 examples-page', className)}>
        <Markdown markdown={readme} component="header" className="md-cell md-cell--12 md-text-container" />
        {children}
      </section>
    );
  }
}
