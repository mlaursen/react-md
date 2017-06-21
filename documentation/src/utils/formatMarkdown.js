import marked from 'marked';
import { GITHUB_URL } from 'constants/application';

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

export default function formatMarkdown(markdown) {
  return marked(markdown)
    .replace(/#(commit|pull|issues)-(\w+)/g, `${GITHUB_URL}/$1/$2`)
    .replace(/<a (href=".*")>/g, '<a $1 class="link">');
}
