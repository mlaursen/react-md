module.exports = function transformSassdocVariable(sassdoc, file) {
  const {
    context: {
      name,
      type,
      value,
      scope,
    },
    description,
    usedBy,
    file: { path },
  } = sassdoc;

  let { code } = sassdoc.context;

  if (!code) {
    code = `$${name}: ${value}${scope === 'default' ? ' !default' : ''};`;
  }

  return {
    name,
    type,
    code,
    description,
    usedBy: usedBy ? usedBy.map(({ context: { type, name } }) => ({ type, name })) : [],
    path: `src/scss/${path}`,
  };
};
