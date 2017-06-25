/* eslint-env jest */
import {
  MANUAL_DOCGEN_DEFINTIION_REGEX,
  createHash,
  stripManualDocgenDefinitions,
  addComponentEnums,
  addExternalEnums,
  addComponentProps,
  addExternalProps,
} from '../updateMarkdownLinks';

describe('createHash', () => {
  it('should correctly create a hash', () => {
    const expected = '#autocomplete-proptypes-total';
    expect(createHash('Autocomplete', 'total', 'proptypes')).toBe(expected);
  });

  it('should default to \'proptypes\' if the type param is omitted', () => {
    const expected = '#autocomplete-proptypes-total';
    expect(createHash('Autocomplete', 'total')).toBe(expected);
  });

  it('should caterpillarize the second param', () => {
    const expected = '#layover-proptypes-horizontal-anchor';
    expect(createHash('Layover', 'horizontalAnchor', 'proptypes')).toBe(expected);
  });

  it('should work when there is no name provided', () => {
    const expected = '#autocomplete-proptypes';
    expect(createHash('Autocomplete')).toBe(expected);
  });
});

describe('addComponentEnums', () => {
  it('should not modify a description that does not have any links', () => {
    const s = 'Hello, world!';
    expect(addComponentEnums(s)).toBe(s);
  });

  it('should correctly create a GitHub flavored markdown link', () => {
    const s1 = '{@link #VerticalAnchors}';
    const s2 = `
    There is some stuff here.

    @see {@link #HorizontalAnchors}
    `;

    const expected1 = '[Layover.VerticalAnchors](#layover-enums-vertical-anchors)';
    const expected2 = `
    There is some stuff here.

    @see [Layover.HorizontalAnchors](#layover-enums-horizontal-anchors)
    `;

    expect(addComponentEnums(s1, 'Layover')).toBe(expected1);
    expect(addComponentEnums(s2, 'Layover')).toBe(expected2);
  });
});

describe('stripManualDocgenDefinitions', () => {
  it('should not update a string that does not have manual docgen creation', () => {
    const s1 = 'fjkdasfjkldasfjkla ';
    const s2 = 'This is some text\n\nAnd other stuff';
    expect(stripManualDocgenDefinitions(s1)).toBe(s1);
    expect(stripManualDocgenDefinitions(s2)).toBe(s2);
  });

  it('should correctly remove the manual docgen block', () => {
    const s = `The data that will be used for autocomplete suggestions. This can either be
an array of string, number, or object. If it is an array of objects, the key
\`dataLabel\` is required.

\`\`\`docgen
PropTypes.arrayOf(PropTypes.oneOfType([
  PropTypes.element,
  PropTypes.string,
  PropTypes.number,
  PropTypes.shape({
    [dataLabel]: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  }),
])).isRequired
\`\`\``;
    const expected = `The data that will be used for autocomplete suggestions. This can either be
an array of string, number, or object. If it is an array of objects, the key
\`dataLabel\` is required.

`;
    expect(stripManualDocgenDefinitions(s)).toBe(expected);
  });
});

describe('addExternalEnums', () => {
  it('should not modify a string that does not have any links', () => {
    const s = 'Hello, world!';
    expect(addExternalEnums(s)).toBe(s);
  });

  it('should correctly create a GitHub flavored markdown link', () => {
    const s1 = '{@link Helpers/Layover#VerticalAnchors}';
    const s2 = '{@link Autocomplete#Positions}';
    const s3 = `
    This is some text.

    @see ${s1}
    `;
    const s4 = `
    This is some text.

    @see ${s2}
    `;

    const expected1 = '[Layover.VerticalAnchors](/components/helpers/layovers?tab=1#layover-enums-vertical-anchors)';
    const expected2 = '[Autocomplete.Positions](/components/autocompletes?tab=1#autocomplete-enums-positions)';
    const expected3 = `
    This is some text.

    @see ${expected1}
    `;
    const expected4 = `
    This is some text.

    @see ${expected2}
    `;
    expect(addExternalEnums(s1)).toBe(expected1);
    expect(addExternalEnums(s2)).toBe(expected2);
    expect(addExternalEnums(s3)).toBe(expected3);
    expect(addExternalEnums(s4)).toBe(expected4);
  });
});

describe('addComponentProps', () => {
  it('should not modify a string without links', () => {
    const s = 'Hello, world!';
    expect(addComponentProps(s)).toBe(s);
  });

  it('should correctly create a GitHub flavored markdown link', () => {
    const s1 = '{@link #inkDisabled}';
    const s2 = '{@link #data}';
    const s3 = `
    This is some text.

    @see ${s1}
    `;
    const s4 = `
    This is some text.

    @see ${s2}
    `;

    const expected1 = '[inkDisabled](#list-item-proptypes-ink-disabled)';
    const expected2 = '[data](#autocomplete-proptypes-data)';
    const expected3 = `
    This is some text.

    @see ${expected1}
    `;
    const expected4 = `
    This is some text.

    @see ${expected2}
    `;

    expect(addComponentProps(s1, 'ListItem')).toBe(expected1);
    expect(addComponentProps(s2, 'Autocomplete')).toBe(expected2);
    expect(addComponentProps(s3, 'ListItem')).toBe(expected3);
    expect(addComponentProps(s4, 'Autocomplete')).toBe(expected4);
  });
});

describe('addExternalProps', () => {
  it('should not modify a string without links', () => {
    const s = 'Hello, world!';
    expect(addExternalProps(s)).toBe(s);
  });

  it('should correctly create a GitHub flavored markdown link', () => {
    const s1 = '{@link Lists/ListItem#inkDisabled}';
    const s2 = '{@link Autocomplete#data}';
    const s3 = `
    This is some text.

    @see ${s1}
    `;
    const s4 = `
    This is some text.

    @see ${s2}
    `;

    const expected1 = '[ListItem#inkDisabled](/components/lists?tab=1#list-item-proptypes-ink-disabled)';
    const expected2 = '[Autocomplete#data](/components/autocompletes?tab=1#autocomplete-proptypes-data)';
    const expected3 = `
    This is some text.

    @see ${expected1}
    `;
    const expected4 = `
    This is some text.

    @see ${expected2}
    `;

    expect(addExternalProps(s1)).toBe(expected1);
    expect(addExternalProps(s2)).toBe(expected2);
    expect(addExternalProps(s3)).toBe(expected3);
    expect(addExternalProps(s4)).toBe(expected4);
  });
});
