export interface ScriptFlags {
  isClean: boolean;
  isCleanOnly: boolean;
  isWatch: boolean;
}

export function getScriptFlags(): ScriptFlags {
  const { argv } = process;
  const isCleanOnly = argv.includes("--clean-only");
  const isClean = argv.includes("--clean") || isCleanOnly;
  const isWatch = argv.includes("--watch");

  return {
    isClean,
    isCleanOnly,
    isWatch,
  };
}
