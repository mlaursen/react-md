import React from 'react';

export const NEWLINE = '{newline}';
export const PRE_START = '{{';
export const PRE_END = '}}';

function convertPre(text) {
  let converted = [];
  let start = text.indexOf(PRE_START);
  let end = text.indexOf(PRE_END);
  while(start !== -1 && end !== -1) {
    converted.push(<span key={`text-${start}`}>{text.substring(0, start)}</span>);
    converted.push(<span className="pre" key={`span-${start}`}>{text.substring(start + PRE_START.length, end)}</span>);
    text = text.substring(end + PRE_END.length, text.length);
    start = text.indexOf(PRE_START);
    end = text.indexOf(PRE_END);
  }
  if(text.length) {
    converted.push(<span key="remaining">{text}</span>);
  }
  return converted;
}

export function convertMarkdown(text) {
  return text.split(NEWLINE).map((paragraph, i) => (
    <p className="props-desc" key={`desc-${i}`}>
      {convertPre(paragraph)}
    </p>
  ));
}
