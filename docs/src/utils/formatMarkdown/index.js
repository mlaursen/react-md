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

export function reduce(transforms, markdown) {
  return transforms.reduce((formatted, transform) => transform(formatted), markdown);
}

export default function formatMarkdown(markdown) {
  return reduce(postTransforms, reduce([...preTransforms, marked], markdown));
}
