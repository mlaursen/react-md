// THIS FILE WAS GENERATED BY A SCRIPT AND SHOULD NOT BE UPDATED MANUALLY

import { usePrismThemeContext } from "@/components/RootProviders/PrismThemeProvider.jsx";
import { CircularProgress, Overlay } from "@react-md/core";
import dynamic, { type DynamicOptions } from "next/dynamic.js";
import { type ReactElement } from "react";

const options: DynamicOptions = {
  loading: () => (
    <Overlay visible disableTransition>
      <CircularProgress />
    </Overlay>
  ),
};

const A11YDark = dynamic(() => import("./A11YDark.jsx"), options);
const AtomDark = dynamic(() => import("./AtomDark.jsx"), options);
const Base16AteliersulphurpoolLight = dynamic(
  () => import("./Base16AteliersulphurpoolLight.jsx"),
  options
);
const Cb = dynamic(() => import("./Cb.jsx"), options);
const ColdarkCold = dynamic(() => import("./ColdarkCold.jsx"), options);
const ColdarkDark = dynamic(() => import("./ColdarkDark.jsx"), options);
const CoyWithoutShadows = dynamic(
  () => import("./CoyWithoutShadows.jsx"),
  options
);
const Darcula = dynamic(() => import("./Darcula.jsx"), options);
const Dracula = dynamic(() => import("./Dracula.jsx"), options);
const DuotoneDark = dynamic(() => import("./DuotoneDark.jsx"), options);
const DuotoneEarth = dynamic(() => import("./DuotoneEarth.jsx"), options);
const DuotoneForest = dynamic(() => import("./DuotoneForest.jsx"), options);
const DuotoneLight = dynamic(() => import("./DuotoneLight.jsx"), options);
const DuotoneSea = dynamic(() => import("./DuotoneSea.jsx"), options);
const DuotoneSpace = dynamic(() => import("./DuotoneSpace.jsx"), options);
const Ghcolors = dynamic(() => import("./Ghcolors.jsx"), options);
const GruvboxDark = dynamic(() => import("./GruvboxDark.jsx"), options);
const GruvboxLight = dynamic(() => import("./GruvboxLight.jsx"), options);
const HoliTheme = dynamic(() => import("./HoliTheme.jsx"), options);
const Hopscotch = dynamic(() => import("./Hopscotch.jsx"), options);
const Lucario = dynamic(() => import("./Lucario.jsx"), options);
const MaterialDark = dynamic(() => import("./MaterialDark.jsx"), options);
const MaterialLight = dynamic(() => import("./MaterialLight.jsx"), options);
const MaterialOceanic = dynamic(() => import("./MaterialOceanic.jsx"), options);
const NightOwl = dynamic(() => import("./NightOwl.jsx"), options);
const Nord = dynamic(() => import("./Nord.jsx"), options);
const OneDark = dynamic(() => import("./OneDark.jsx"), options);
const OneLight = dynamic(() => import("./OneLight.jsx"), options);
const Pojoaque = dynamic(() => import("./Pojoaque.jsx"), options);
const ShadesOfPurple = dynamic(() => import("./ShadesOfPurple.jsx"), options);
const SolarizedDarkAtom = dynamic(
  () => import("./SolarizedDarkAtom.jsx"),
  options
);
const Synthwave84 = dynamic(() => import("./Synthwave84.jsx"), options);
const Vs = dynamic(() => import("./Vs.jsx"), options);
const VscDarkPlus = dynamic(() => import("./VscDarkPlus.jsx"), options);
const Xonokai = dynamic(() => import("./Xonokai.jsx"), options);
const ZTouch = dynamic(() => import("./ZTouch.jsx"), options);
const Coy = dynamic(() => import("./Coy.jsx"), options);
const Dark = dynamic(() => import("./Dark.jsx"), options);
const Funky = dynamic(() => import("./Funky.jsx"), options);
const Okaidia = dynamic(() => import("./Okaidia.jsx"), options);
const Solarizedlight = dynamic(() => import("./Solarizedlight.jsx"), options);
const Tomorrow = dynamic(() => import("./Tomorrow.jsx"), options);
const Twilight = dynamic(() => import("./Twilight.jsx"), options);
const Default = dynamic(() => import("./Default.jsx"), options);
const VimSolarizedDark = dynamic(
  () => import("./VimSolarizedDark.jsx"),
  options
);

export function LoadPrismTheme(): ReactElement {
  const { prismTheme } = usePrismThemeContext();

  return (
    <>
      {prismTheme === "a11y-dark" && <A11YDark />}
      {prismTheme === "atom-dark" && <AtomDark />}
      {prismTheme === "base16-ateliersulphurpool.light" && (
        <Base16AteliersulphurpoolLight />
      )}
      {prismTheme === "cb" && <Cb />}
      {prismTheme === "coldark-cold" && <ColdarkCold />}
      {prismTheme === "coldark-dark" && <ColdarkDark />}
      {prismTheme === "coy-without-shadows" && <CoyWithoutShadows />}
      {prismTheme === "darcula" && <Darcula />}
      {prismTheme === "dracula" && <Dracula />}
      {prismTheme === "duotone-dark" && <DuotoneDark />}
      {prismTheme === "duotone-earth" && <DuotoneEarth />}
      {prismTheme === "duotone-forest" && <DuotoneForest />}
      {prismTheme === "duotone-light" && <DuotoneLight />}
      {prismTheme === "duotone-sea" && <DuotoneSea />}
      {prismTheme === "duotone-space" && <DuotoneSpace />}
      {prismTheme === "ghcolors" && <Ghcolors />}
      {prismTheme === "gruvbox-dark" && <GruvboxDark />}
      {prismTheme === "gruvbox-light" && <GruvboxLight />}
      {prismTheme === "holi-theme" && <HoliTheme />}
      {prismTheme === "hopscotch" && <Hopscotch />}
      {prismTheme === "lucario" && <Lucario />}
      {prismTheme === "material-dark" && <MaterialDark />}
      {prismTheme === "material-light" && <MaterialLight />}
      {prismTheme === "material-oceanic" && <MaterialOceanic />}
      {prismTheme === "night-owl" && <NightOwl />}
      {prismTheme === "nord" && <Nord />}
      {prismTheme === "one-dark" && <OneDark />}
      {prismTheme === "one-light" && <OneLight />}
      {prismTheme === "pojoaque" && <Pojoaque />}
      {prismTheme === "shades-of-purple" && <ShadesOfPurple />}
      {prismTheme === "solarized-dark-atom" && <SolarizedDarkAtom />}
      {prismTheme === "synthwave84" && <Synthwave84 />}
      {prismTheme === "vs" && <Vs />}
      {prismTheme === "vsc-dark-plus" && <VscDarkPlus />}
      {prismTheme === "xonokai" && <Xonokai />}
      {prismTheme === "z-touch" && <ZTouch />}
      {prismTheme === "coy" && <Coy />}
      {prismTheme === "dark" && <Dark />}
      {prismTheme === "funky" && <Funky />}
      {prismTheme === "okaidia" && <Okaidia />}
      {prismTheme === "solarizedlight" && <Solarizedlight />}
      {prismTheme === "tomorrow" && <Tomorrow />}
      {prismTheme === "twilight" && <Twilight />}
      {prismTheme === "default" && <Default />}
      {prismTheme === "vim-solarized-dark" && <VimSolarizedDark />}
    </>
  );
}