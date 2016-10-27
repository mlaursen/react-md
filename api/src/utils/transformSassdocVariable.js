module.exports = function transformSassdocVariable(sassdoc) {
  const {
    context: {
      name,
      type,
      value,
    },
    description,
    usedBy,
    file: { path },
  } = sassdoc;

  return {
    name,
    type,
    value,
    description,
    usedBy: usedBy ? usedBy.map(({ context: { type, name } }) => ({ type, name })) : [],
    path: `src/scss/${path}`,
  };
};
