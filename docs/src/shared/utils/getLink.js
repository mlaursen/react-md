export default function getLink(id) {
  let link = document.getElementById(id);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('id', id);
    link.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  return link;
}
