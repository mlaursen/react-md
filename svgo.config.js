export default {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeUselessStrokeAndFill: {
            removeNone: true,
          },
        },
      },
    },
  ],
};
