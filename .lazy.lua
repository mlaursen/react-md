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
}
