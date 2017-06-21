import React from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';

import Markdown from 'components/Markdown';
import ExpandableSource from 'components/ExpandableSource';
import sassdocShape from 'propTypes/sassdocShape';
import ParameterTable from './ParameterTable';
import ReferenceList from './ReferenceList';

function preventDefault(e) {
  e.preventDefault();
  window.location = e.target.getAttribute('href');
}

const SassDoc = ({
  sassdoc: {
    code,
    oneLineCode,
    name,
    type,
    variableType,
    description,
    parameters,
    returns,
    examples,
    usedBy,
    requires,
    links,
    see,
  },
}) => {
  const children = [];
  if (description) {
    children.push(<h4 className="md-title" key="description-title">Description</h4>);
    children.push(<Markdown key="description" markdown={description} className="sassdoc__section" />);
  }

  if (variableType) {
    let color;
    if (variableType.match(/color/i)) {
      const subst = code.substring(code.indexOf(':') + 1, code.length - 1);

      // too lazy to program fetching right color.
      if (subst.indexOf('$') === -1) {
        color = <div className="sassdoc__color md-cell--right" style={{ background: `${subst}` }} />;
      }
    }

    children.push(<h4 className="md-title md-grid md-grid--no-spacing" key="type-title">Type {color}</h4>);
    children.push(<pre key="variable-type" className="sassdoc__section sassdoc__variable md-text--theme-primary">{variableType}</pre>);
  }

  if (parameters) {
    children.push(<h4 className="md-title" key="parameters-title">Parameters</h4>);
    children.push(<ParameterTable key="parameters" parameters={parameters} />);
  }

  if (returns) {
    children.push(<h4 className="md-title" key="returns-title">Returns</h4>);
    children.push(
      <div key="returns" className="sassdoc__section sassdoc__returns">
        <pre className="sassdoc__variable md-text--primary-color">{returns.type}</pre>
        {'\u2014'}
        <Markdown markdown={returns.description} />
      </div>
    );
  }

  if (examples) {
    children.push(<h4 className="md-title" key="examples-title">Examples</h4>);
    const cards = examples.map(({ code: exampleCode, description: exampleDescription, type: exampleType }, i) => {
      let markdown = exampleCode;
      if (exampleType !== 'markdown') {
        markdown = `\`\`\`${exampleType}\n${exampleCode}\n\`\`\``;
      }

      /* eslint-disable react/no-array-index-key */
      return (
        <Card key={i} className="md-cell md-cell--12">
          <CardTitle title={exampleDescription} />
          <Markdown component={CardText} markdown={markdown} />
        </Card>
      );
    });

    children.push(<section key="examples" className="md-grid sassdoc__examples sassdoc__section">{cards}</section>);
  }

  if (requires && requires.length) {
    children.push(<h4 className="md-title" key="requires-title">Requires</h4>);
    children.push(<ReferenceList key="requires" references={requires} />);
  }

  if (usedBy && usedBy.length) {
    children.push(<h4 className="md-title" key="usedby-title">Used by</h4>);
    children.push(<ReferenceList key="usedby" references={usedBy} />);
  }

  if (see && see.length) {
    children.push(<h4 className="md-title" key="see-title">See</h4>);
    children.push(<ReferenceList key="see" references={see} />);
  }

  if (links) {
    children.push(<h4 className="md-title" key="links-title">Links</h4>);
    children.push(<ReferenceList key="links" references={links} />);
  }

  return (
    <div className="sassdoc" id={`${type}-${name}`}>
      <a href={`#${type}-${name}`} className="md-display-1 link" onClick={preventDefault}>{name}</a>
      <ExpandableSource code={code} oneLineCode={oneLineCode} />
      {children}
    </div>
  );
};

SassDoc.propTypes = {
  sassdoc: sassdocShape.isRequired,
};

export default SassDoc;
