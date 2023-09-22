const LINE_THRESHOLD = 3;

export const getLineCount = (code: string): number | undefined => {
  const lines = code.split(/\r?\n/).length;

  return lines > LINE_THRESHOLD ? lines : undefined;
};
