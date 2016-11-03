import React from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';

import Markdown from 'components/Markdown';
import sassdocShape from './sassdocShape';
import VariableFormat from './VariableFormat';
import ExpandableSource from './ExpandableSource';
import ParameterTable from './ParameterTable';
import ReferenceList from './ReferenceList';

function preventDefault(e) {
  e.preventDefault();
  window.location = e.target.getAttribute('href');
}

const SassDoc = ({
  sassdoc: {
    code,
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
    children.push(<Markdown key="description" markdown={description} className="sassdoc-section-end" />);
  }

  if (variableType) {
    let color;
    if (variableType.match(/color/i)) {
      const subst = code.substring(code.indexOf(':') + 1, code.length - 1);

      // too lazy to program fetching right color.
      if (subst.indexOf('$') === -1) {
        color = <div className="sassdoc-color" style={{ background: `${subst}` }} />;
      }
    }

    children.push(<h4 className="md-title flex-between" key="type-title">Type {color}</h4>);
    children.push(<VariableFormat key="variable-type" className="sassdoc-section-end">{variableType}</VariableFormat>);
  }

  if (parameters) {
    children.push(<h4 className="md-title" key="parameters-title">Parameters</h4>);
    children.push(<ParameterTable key="parameters" parameters={parameters} />);
  }

  if (returns) {
    children.push(<h4 className="md-title" key="returns-title">Returns</h4>);
    children.push(
      <div key="returns" className="sassdoc-returns sassdoc-section-end">
        <VariableFormat>{returns.type}</VariableFormat>
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

      return (
        <Card key={i} className="md-cell md-cell--12">
          <CardTitle title={exampleDescription} />
          <Markdown component={CardText} markdown={markdown} key={i} />
        </Card>
      );
    });

    children.push(<section key="examples" className="md-grid sassdoc-examples sassdoc-section-end">{cards}</section>);
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
    console.log('see:', see);
    children.push(<h4 className="md-title" key="see-title">See</h4>);
    children.push(<ReferenceList key="see" references={see} />);
  }

  if (links) {
    children.push(<h4 className="md-title" key="links-title">Links</h4>);
    children.push(
      <ul className="md-list-unstyled sassdoc-section-end" key="links">
        {links.map(({ caption, url }) => (
          <a href={url} key={`${url}`}>{caption || url}</a>
        ))}
      </ul>
    );
  }

  return (
    <div className="sassdoc" id={`${type}-${name}`}>
      <a href={`#${type}-${name}`} className="md-display-1 sassdoc-link" onClick={preventDefault}>{name}</a>
      <ExpandableSource code={code} />
      {children}
    </div>
  );
};

SassDoc.propTypes = {
  sassdoc: sassdocShape,
};

export default SassDoc;
