export default function uniq(list, key) {
  const filtered = [];
  const found = {};
  list.forEach(item => {
    if (!found[item[key]]) {
      found[item[key]] = true;
      filtered.push(item);
    }
  });

  return filtered;
}
