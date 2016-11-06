export default function getMarkdownPage(state, cb) {
  if (__CLIENT__) {
    require.ensure(['components/MarkdownPage'], require => {
      cb(null, require('components/MarkdownPage').default);
    });
  } else {
    cb(null, require('components/MarkdownPage').default);
  }
}
