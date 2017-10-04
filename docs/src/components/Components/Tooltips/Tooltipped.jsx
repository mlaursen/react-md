import React from 'react';
import { Avatar, Tooltipped } from 'react-md';

const TooltippedExamples = () => (
  <section>
    <p>
      The wrapped component should render its children, or the tooltip will not be shown.
      <br />
      Use <code>setPosition</code> to automatically add <code>position: &#39;relative&#39;</code>
      to the <code>style</code> of the wrapped component.
    </p>
    <div style={{ position: 'relative' }}>
      <Tooltipped
        label="Tooltip for multi-line text with delay"
        position="top"
        delay={500}
      >
        <span style={{ position: 'absolute', top: '10px', left: '30%' }}>
            Some absolutely positioned text
            <div>Another line of text</div>
        </span>
      </Tooltipped>
      <Tooltipped
        label="Avatar's tooltip"
        position="right"
        setPosition
      >
        <span key="abc" style={{ marginLeft: '10px' }}>
          <Avatar random>T</Avatar>
        </span>
      </Tooltipped>
      <Tooltipped
        label="Empty element with tooltip"
        setPosition
      >
        <div style={{ height: '40px', background: '#ccc', margin: '10px 0 20px 0' }} />
      </Tooltipped>
    </div>
    <p>
      Tooltips will not appear on a wrapped component if the label is not specified.
    </p>
    <Tooltipped>
      <div>An element without tooltip</div>
    </Tooltipped>
  </section>
);

export default TooltippedExamples;
