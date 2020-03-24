/* eslint-env jest */
import marked from 'marked';

import {
  makeIcon,
  makeLink,
  addHeaderQuickLinks,
  addExternalLinkRel,
} from '../postTransforms';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
});

describe('postTransforms', () => {
  // not really sure what the best way to test these are...
  describe('makeIcon', () => {
    it('should return an html string for a link\'s accessible icon', () => {
      const expected1 = '<i class="md-icon material-icons" title="Quick link to Hello, World!">link</i>';
      const expected2 = '<i class="md-icon material-icons" title="Quick link to He said: \\"Shazam!\\"">link</i>';
      expect(makeIcon('Hello, World!')).toBe(expected1);
      expect(makeIcon('He said: "Shazam!"')).toBe(expected2);
    });
  });

  describe('makeLink', () => {
    it('should return a link with an icon related to the provided id and text', () => {
      const expected1 = `<a href="#hello-world" class="quick-link__link quick-link__link--markdown">${makeIcon('Hello, World!')}</a>`;
      expect(makeLink('hello-world', 'Hello, World!')).toBe(expected1);
    });
  });

  describe('addHeaderQuickLinks', () => {
    it('should add the icon links before any h1, h2, h3, h4, h5, or h6 tags', () => {
      const h = (i, className, before = '') => `<h${i} id="hello-world"${className ? ` class="${className}"` : ''}>${before}Hello, world!</h${1}>`;
      const link = makeLink('hello-world', 'Hello, world!');
      const h1 = h(1);
      const h2 = h(2);
      const h3 = h(3);
      const h4 = h(4);
      const h5 = h(5);
      const h6 = h(6);

      const expected1 = h(1, 'quick-link quick-link__container', link);
      const expected2 = h(2, 'quick-link quick-link__container', link);
      const expected3 = h(3, 'quick-link quick-link__container', link);
      const expected4 = h(4, 'quick-link quick-link__container', link);
      const expected5 = h(5, 'quick-link quick-link__container', link);
      const expected6 = h(6, 'quick-link quick-link__container', link);
      expect(addHeaderQuickLinks(h1)).toBe(expected1);
      expect(addHeaderQuickLinks(h2)).toBe(expected2);
      expect(addHeaderQuickLinks(h3)).toBe(expected3);
      expect(addHeaderQuickLinks(h4)).toBe(expected4);
      expect(addHeaderQuickLinks(h5)).toBe(expected5);
      expect(addHeaderQuickLinks(h6)).toBe(expected6);
    });

    it('should replace all occurences in the markdown', () => {
      const markdown = `
# h1
Word.

## h2
Word.

### h3
Word.

#### h4
Word.

##### h5
Word.

###### h6
Word.
`;
      const html = marked(markdown);
      const expected = `<h1 id="h1" class="quick-link quick-link__container">${makeLink('h1', 'h1')}h1</h1>
<p>Word.</p>
<h2 id="h2" class="quick-link quick-link__container">${makeLink('h2', 'h2')}h2</h2>
<p>Word.</p>
<h3 id="h3" class="quick-link quick-link__container">${makeLink('h3', 'h3')}h3</h3>
<p>Word.</p>
<h4 id="h4" class="quick-link quick-link__container">${makeLink('h4', 'h4')}h4</h4>
<p>Word.</p>
<h5 id="h5" class="quick-link quick-link__container">${makeLink('h5', 'h5')}h5</h5>
<p>Word.</p>
<h6 id="h6" class="quick-link quick-link__container">${makeLink('h6', 'h6')}h6</h6>
<p>Word.</p>
`;
      expect(addHeaderQuickLinks(html)).toBe(expected);
    });
  });

  describe('addExternalLinkRel', () => {
    const link = url => `<a href="${url}">${url}</a>`;

    it('should add noopener and noreferrer to external links', () => {
      const expected1 = '<a href="https://google.com" rel="noopener noreferrer">https://google.com</a>';
      const expected2 = '<a href="https://github.com" rel="noopener noreferrer">https://github.com</a>';
      expect(addExternalLinkRel(link('https://google.com'))).toBe(expected1);
      expect(addExternalLinkRel(link('https://github.com'))).toBe(expected2);
    });

    it('should do nothing to links that are for localhost or react-md', () => {
      const localLink1 = link('http://localhost:8080');
      const localLink2 = link('http://localhost:8080/hello-world');
      const localLink3 = link(`http://localhost:8080?proxy=${encodeURIComponent('https://google.com')}`);

      const mdLink1 = link('https://react-md.dev/v1');
      const mdLink2 = link('https://react-md.dev/v1/localhost');
      const mdLink3 = link(`https://react-md.dev/v1?proxy=${encodeURIComponent('https://google.com')}`);

      expect(addExternalLinkRel(localLink1)).toBe(localLink1);
      expect(addExternalLinkRel(localLink2)).toBe(localLink2);
      expect(addExternalLinkRel(localLink3)).toBe(localLink3);

      expect(addExternalLinkRel(mdLink1)).toBe(mdLink1);
      expect(addExternalLinkRel(mdLink2)).toBe(mdLink2);
      expect(addExternalLinkRel(mdLink3)).toBe(mdLink3);
    });
  });
});
