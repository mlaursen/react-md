import React, { PureComponent, PropTypes } from 'react';

import { ACCENTABLE_COLORS, PRIMARY_COLORS } from 'constants/colors';
import hasStorage from 'utils/hasStorage';
import loadCustomTheme from 'utils/loadCustomTheme';
import { THEME_STORAGE_KEY } from 'constants/application';
import Markdown from 'components/Markdown';
import Preview from './Preview';

import Configuration from './Configuration';

const DEFAULT_STATE = {
  primary: 'light-blue',
  secondary: 'deep-orange',
  hue: 200,
  light: true,
  saveDisabled: true,
};

const DIFF_KEYS = Object.keys(DEFAULT_STATE).filter(key => key !== 'saveDisabled');

function filter(list, invalid) {
  return list.filter(color => color !== invalid);
}

const ABOUT_THEME_BUILDER = `
### Custom CSS Theme Builder

Select a primary color, a secondary color, the secondary color's hue, and optionally toggle the light theme
to view a specific theme. When you have selected colors you like, either reference [Using with Sass](#using-with-sass)
or [pre-compiled themes](#pre-compiled-themes). Not all themes will already be compiled and hosted on \`unpkg\`.
`;

export default class ThemeBuilder extends PureComponent {
  static propTypes = {
    setCustomTheme: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    let state = DEFAULT_STATE;
    const storedTheme = hasStorage() && localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme) {
      state = JSON.parse(storedTheme);
      state.saveDisabled = false;
    }

    this.state = {
      ...state,
      warningVisible: false,
      filteredPrimaries: filter(PRIMARY_COLORS, DEFAULT_STATE.secondary),
      filteredSecondaries: filter(ACCENTABLE_COLORS, DEFAULT_STATE.primary),
      saved: hasStorage() && localStorage.getItem(THEME_STORAGE_KEY) !== null,
    };

    this._closeWarning = this._closeWarning.bind(this);
    this._handleHueChange = this._handleHueChange.bind(this);
    this._handleLightChange = this._handleLightChange.bind(this);
    this._handleSavedChange = this._handleSavedChange.bind(this);
    this._handlePrimaryChange = this._handlePrimaryChange.bind(this);
    this._handleSecondaryChange = this._handleSecondaryChange.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    const { primary, secondary, hue, light } = nextState;

    loadCustomTheme(primary, secondary, hue, light);
    this.props.setCustomTheme(true);
    this._updateLocalStorage(nextState);

    if (primary !== this.state.primary || secondary !== this.state.secondary) {
      const filteredPrimaries = filter(PRIMARY_COLORS, secondary);
      const filteredSecondaries = filter(ACCENTABLE_COLORS, primary);

      this.setState({ filteredPrimaries, filteredSecondaries });
    }
  }

  componentWillUnmount() {
    if (!this.state.saved) {
      this.props.setCustomTheme(false);
    }
  }

  _updateLocalStorage(state) {
    if (hasStorage()) {
      const { primary, secondary, hue, light, saved } = state;
      const keys = DIFF_KEYS;
      if (saved && keys.filter(key => DEFAULT_STATE[key] === state[key]).length !== keys.length) {
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ primary, secondary, hue, light }));
      } else {
        localStorage.removeItem(THEME_STORAGE_KEY);
      }
    }
  }

  _handlePrimaryChange(primary) {
    const state = Object.assign({}, this.state, { primary });
    const saveDisabled = !DIFF_KEYS.some(key => state[key] !== DEFAULT_STATE[key]);
    this.setState({ primary, saveDisabled });
  }

  _handleSecondaryChange(secondary) {
    const state = Object.assign({}, this.state, { secondary });
    const saveDisabled = !DIFF_KEYS.some(key => state[key] !== DEFAULT_STATE[key]);
    this.setState({ secondary, saveDisabled });
  }

  _handleHueChange(hue) {
    const state = Object.assign({}, this.state, { hue });
    const saveDisabled = !DIFF_KEYS.some(key => state[key] !== DEFAULT_STATE[key]);
    this.setState({ hue, saveDisabled });
  }

  _handleLightChange(light) {
    const state = Object.assign({}, this.state, { light });
    const saveDisabled = !DIFF_KEYS.some(key => state[key] !== DEFAULT_STATE[key]);
    this.setState({ light, saveDisabled });
  }

  _handleSavedChange(saved) {
    this.setState({ saved });
  }

  _closeWarning() {
    this.setState({ warningVisible: false });
  }

  render() {
    const { primary, secondary, hue, light } = this.state;
    const primaryVal = `$md-${primary}-500`;
    const secondaryVal = `$md-${secondary}-a-${hue}`;
    const compiledName = `react-md.${primary.replace('-', '_')}-${secondary.replace('-', '_')}${light ? '' : '.dark'}.min.css`;

    let howToUse = `
#### Using with Sass

\`\`\`scss
@import '~react-md/src/scss/react-md';

${light ? '' : '$md-light-theme: false;'}
$md-primary-color: ${primaryVal};
$md-secondary-color: ${secondaryVal};

@include react-md-everything;

// Or for a subsection
${light
  ? `
.custom-theme {
  @include react-md-theme-everything(${primaryVal}, ${secondaryVal});
}`
  : `@include react-md-theme-everything(${primaryVal}, ${secondaryVal}, false, 'custom-theme');`}
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
        <Configuration
          {...this.state}
          onLightChange={this._handleLightChange}
          onSaveChange={this._handleSavedChange}
          onPrimaryChange={this._handlePrimaryChange}
          onSecondaryChange={this._handleSecondaryChange}
          onHueChange={this._handleHueChange}
        />
        <section className="md-cell md-cell--8 md-cell--6-desktop">
          <Markdown markdown={ABOUT_THEME_BUILDER} className="md-text-container" />
          <Preview />
        </section>
        <Markdown markdown={howToUse} className="md-cell md-cell--12" />
      </div>
    );
  }
}
