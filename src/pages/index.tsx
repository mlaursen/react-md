/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import {
  ConfigurableThemeColorsName,
  DEFAULT_DARK_THEME,
  TextContainer,
  ThemeOverride,
  Typography,
  useColorScheme,
  useCSSVariables,
  useTheme,
} from "@react-md/core";
import type { ReactElement } from "react";
import { Button } from "src/components/Button";
import { SVGIcon } from "src/components/SVGIcon";

const overrides = Object.entries(DEFAULT_DARK_THEME).map<ThemeOverride>(
  ([name, value]) => ({
    name: name as ConfigurableThemeColorsName,
    value,
  }),
  []
);

export default function Home(): ReactElement {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  // useThemeOverride(overrides);
  // const style = useThemeOverride(overrides, true);
  // console.log("overrides:", overrides);
  // const style = useCSSVariables([{ name: "--test", value: "blue" }], true);
  console.log("theme:", theme);
  console.log("colorScheme:", colorScheme);
  return (
    <TextContainer>
      {/* <TextContainer style={style}> */}
      <main>
        <Button>Button</Button>
        <Button>Button</Button>
        <Typography type="headline-1">Headline 1</Typography>
        <Typography type="body-1">
          Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus accumsan auctor neque, eu dignissim ex. Etiam vitae nisl ex.
          Maecenas ut elit risus. In consequat augue quis dui ultrices, nec
          interdum ipsum lacinia. Sed cursus justo erat, vehicula vestibulum
          lacus mattis ut. Fusce id lacinia sem, nec volutpat nunc. Suspendisse
          nec sem libero. Pellentesque diam eros, ornare ut nunc vitae, finibus
          feugiat purus. Mauris finibus aliquam consequat.
        </Typography>
        <Typography type="headline-2">Headline 2</Typography>
        <Typography type="body-1">
          Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus accumsan auctor neque, eu dignissim ex. Etiam vitae nisl ex.
          Maecenas ut elit risus. In consequat augue quis dui ultrices, nec
          interdum ipsum lacinia. Sed cursus justo erat, vehicula vestibulum
          lacus mattis ut. Fusce id lacinia sem, nec volutpat nunc. Suspendisse
          nec sem libero. Pellentesque diam eros, ornare ut nunc vitae, finibus
          feugiat purus. Mauris finibus aliquam consequat.
        </Typography>
        <Typography type="headline-3">Headline 3</Typography>
        <Typography type="body-1">
          Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus accumsan auctor neque, eu dignissim ex. Etiam vitae nisl ex.
          Maecenas ut elit risus. In consequat augue quis dui ultrices, nec
          interdum ipsum lacinia. Sed cursus justo erat, vehicula vestibulum
          lacus mattis ut. Fusce id lacinia sem, nec volutpat nunc. Suspendisse
          nec sem libero. Pellentesque diam eros, ornare ut nunc vitae, finibus
          feugiat purus. Mauris finibus aliquam consequat.
        </Typography>
        <Typography type="headline-4">Headline 4</Typography>
        <Typography type="body-1">
          Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus accumsan auctor neque, eu dignissim ex. Etiam vitae nisl ex.
          Maecenas ut elit risus. In consequat augue quis dui ultrices, nec
          interdum ipsum lacinia. Sed cursus justo erat, vehicula vestibulum
          lacus mattis ut. Fusce id lacinia sem, nec volutpat nunc. Suspendisse
          nec sem libero. Pellentesque diam eros, ornare ut nunc vitae, finibus
          feugiat purus. Mauris finibus aliquam consequat.
        </Typography>
        <Typography type="headline-5">Headline 5</Typography>
        <Typography type="headline-6">Headline 6</Typography>
        <Typography type="subtitle-1">Subtitle 1</Typography>
        <Typography type="subtitle-2">Subtitle 2</Typography>
        <Typography type="body-1">
          Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus accumsan auctor neque, eu dignissim ex. Etiam vitae nisl ex.
          Maecenas ut elit risus. In consequat augue quis dui ultrices, nec
          interdum ipsum lacinia. Sed cursus justo erat, vehicula vestibulum
          lacus mattis ut. Fusce id lacinia sem, nec volutpat nunc. Suspendisse
          nec sem libero. Pellentesque diam eros, ornare ut nunc vitae, finibus
          feugiat purus. Mauris finibus aliquam consequat.
        </Typography>
        <Typography type="body-2">
          Body 2: Cras condimentum facilisis augue vel porta. Proin eget aliquam
          libero. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos. Donec elementum imperdiet erat, sed
          feugiat turpis sodales a. Aenean congue luctus venenatis. Phasellus
          congue nulla justo, nec facilisis mi porttitor eu. Mauris semper ex et
          ex scelerisque placerat. Cras id urna vulputate, euismod dolor a,
          laoreet odio. Etiam accumsan vehicula nulla, quis luctus ante iaculis
          id. Quisque hendrerit, odio sit amet rutrum vestibulum, metus purus
          ultrices risus, ac vulputate mi ante id purus. Cras in felis ut lorem
          aliquam dapibus ut id lacus. Ut maximus tortor libero, sit amet mollis
          ipsum euismod id. Morbi vulputate ac sapien nec bibendum. Interdum et
          malesuada fames ac ante ipsum primis in faucibus. Cras ipsum massa,
          tristique tincidunt finibus vitae, aliquam vitae est.
        </Typography>
        <Typography type="caption" as="h5">
          Caption text
        </Typography>
        <Typography type="overline" as="h5">
          Overline text
        </Typography>
        <br />
        <Button>Button</Button>
        <Button>
          <SVGIcon>
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </SVGIcon>
          <span>Button</span>
          <SVGIcon>
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </SVGIcon>
        </Button>
        <Button buttonType="icon">
          <SVGIcon>
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </SVGIcon>
        </Button>
        <SVGIcon>
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </SVGIcon>
        <a href="/coverage/lcov-report/index.html" target="_blank">
          Test Coverage
        </a>
        <a href="/docs/index.html" target="_blank">
          Typedoc
        </a>
      </main>
    </TextContainer>
  );
}
