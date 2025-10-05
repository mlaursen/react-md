return {
  {
    "nvim-neotest/neotest",
    dependencies = {
      "marilari88/neotest-jest",
    },
    opts = {
      adapters = {
        ["neotest-jest"] = {},
      },
    },
  },
  {
    "neovim/nvim-lspconfig",
    opts = {
      servers = {
        vtsls = {
          settings = {
            typescript = {
              preferences = {
                autoImportSpecifierExcludeRegexes = {
                  -- i normally want vitest or jest instead
                  "^node:test$",

                  -- require `node:` for the core modules
                  "^(child_process|fs|path)$",

                  -- I don't need node internals for 99% of my projects, so remove from auto-imports and suggestions
                  "^(node:)?(assert|async_hooks|buffer|cluster|console|constants|crypto|dgram|diagnostics_channel|dns|domain|events|http|http2|https|inspector|module|net|os|perf_hooks|process|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|trace_events|tty|url|util|v8|vm|wasi|worker_threads|zlib)",

                  -- I don't need imports from these most of the time
                  "^(node_modules/|next/dist/|typescript)",

                  -- use my custom Link instead
                  "^next/link.js$",
                  "^@react-md/core/link/Link$",

                  -- use app dir imports
                  "^next/(document|head|router|form).js$",
                },
              },
            },
          },
        },
      },
    },
  },
}
