module.exports = function filter(filename) {
  return filename.endsWith('.ts') || filename.endsWith('.tsx');
}
