import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ACCENTABLE_COLORS, PRIMARY_COLORS } from 'constants/colors';
import { getCompiledStylesName } from 'utils/strings';
import Markdown from 'components/Markdown';

import './_styles.scss';
import Preview from './Preview';

const ABOUT_THEME_BUILDER = `
### Custom CSS Theme Builder

Select a primary color, a secondary color, the secondary color's hue, and optionally toggle the light theme
to view a specific theme. When you have selected colors you like, either reference [Using with Sass](#using-with-sass)
or [pre-compiled themes](#pre-compiled-themes). Not all themes will already be compiled and hosted on \`unpkg\`.
`;

const DEFAULT_STATE = {
  primary: 'light-blue',
  secondary: 'deep-orange',
  hue: 200,
  light: true,
  saveDisabled: true,
};
// const DIFF_KEYS = Object.keys(DEFAULT_STATE).filter(key => key !== 'saveDisabled');


export default class ThemeBuilder extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    const { primary, secondary, hue, light } = DEFAULT_STATE;

    this.state = {
      ...DEFAULT_STATE,
      primaryColor: `$md-${primary}-500`,
      secondaryColor: `$md-${secondary}-a-${hue}`,
      compiledName: getCompiledStylesName(primary, secondary, light),
      warningVisible: false,
      filteredPrimaries: this.filter(PRIMARY_COLORS, DEFAULT_STATE.secondary),
      filteredSecondaries: this.filter(ACCENTABLE_COLORS, DEFAULT_STATE.primary),
      saved: false,
    };
  }

  filter = (list, invalid) => list.filter(color => color !== invalid);

  render() {
    const { primaryColor, secondaryColor, compiledName, ...state } = this.state;
    const { hue, light } = state;

    let howToUse = `
#### Using with Sass

\`\`\`scss
@import '~react-md/src/scss/react-md';
${light ? '' : '\n$md-light-theme: false;'}
$md-primary-color: ${primaryColor};
$md-secondary-color: ${secondaryColor};

@include react-md-everything;

// Or for a subsection
${light
  ? `
.custom-theme {
  @include react-md-theme-everything(${primaryColor}, ${secondaryColor});
}`
  : `@include react-md-theme-everything(${primaryColor}, ${secondaryColor}, false, 'custom-theme');`}
\`\`\`

#### Pre-compiled Themes
    `;

    if (hue === 400 && light) {
      howToUse = `${howToUse}
##### SCSS Import
\`\`\`scss
@import '~react-md/dist/${compiledName}';
\`\`\`

##### CDN
\`\`\`html
<link rel="stylesheet" href="//unpkg.com/react-md/dist/${compiledName}">
\`\`\`
`;
    } else {
      howToUse = `${howToUse}
This current theme is unavailable as a precomiled package. Only accents of \`400\` and the \`light-theme\` have been
precompiled.
`;
    }
    return (
      <div className="md-grid">
        <section className="md-cell md-cell--8 md-cell--6-desktop">
          <Markdown markdown={ABOUT_THEME_BUILDER} className="md-text-container" />
          <Preview />
        </section>
        <Markdown markdown={howToUse} className="md-cell md-cell--12" />
      </div>
    );
  }
}
