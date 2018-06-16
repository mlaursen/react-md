import marked from 'marked';
import preTransforms from './preTransforms';
import postTransforms from './postTransforms';

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

export function reduce(transforms, markdown, options) {
  return transforms.reduce((formatted, transform) => transform(formatted, options), markdown);
}

export default function formatMarkdown(markdown, options) {
  return reduce(postTransforms, reduce([...preTransforms, marked], markdown, options), options);
}
