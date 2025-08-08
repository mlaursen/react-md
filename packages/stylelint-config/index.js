export default {
  extends: ["stylelint-config-recommended-scss"],
  plugins: ["stylelint-order", "stylelint-scss"],
  rules: {
    "no-descending-specificity": null,
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["global", "local"] },
    ],
    "order/properties-alphabetical-order": true,
    // if this is not enabled, I cannot create "paragraphs" of comments
    "scss/comment-no-empty": null,
    "scss/operator-no-newline-before": null,
    "scss/operator-no-newline-after": null,
  },
};
