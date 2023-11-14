export interface ScriptFlags {
  isClean: boolean;
  isCleanOnly: boolean;
  isWatch: boolean;
  isWatchOnly: boolean;
}

export function getScriptFlags(): ScriptFlags {
  const { argv } = process;
  const isCleanOnly = argv.includes("--clean-only");
  const isClean = isCleanOnly || argv.includes("--clean");
  const isWatchOnly = argv.includes("--watch-only");
  const isWatch = isWatchOnly || argv.includes("--watch");

  return {
    isClean,
    isCleanOnly,
    isWatch,
    isWatchOnly,
  };
}
