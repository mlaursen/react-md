import appBar from "./app-bar/all.js";
import autocomplete from "./autocomplete/all.js";
import badge from "./badge/all.js";
import button from "./button/all.js";
import card from "./card/all.js";
import chip from "./chip/all.js";
import dialog from "./dialog/all.js";
import divider from "./divider/all.js";
import expansionPanel from "./expansion-panel/all.js";
import form from "./form/all.js";
import icon from "./icon/remove-deprecated-font-icon-props.js";
import link from "./link/all.js";
import list from "./list/all.js";
import media from "./media/all.js";
import menu from "./menu/all.js";
import overlay from "./overlay/all.js";
import portal from "./portal/all.js";
import prerequisites from "./prerequisites/all.js";
import progress from "./progress/all.js";
import table from "./table/all.js";
import tabs from "./tabs/all.js";
import tooltip from "./tooltip/all.js";
import transition from "./transition/all.js";
import tree from "./tree/all.js";
import typography from "./typography/all.js";
import utils from "./utils/all.js";

export function preset(
  icons: typeof prerequisites
): readonly (typeof prerequisites)[] {
  return [
    prerequisites,
    icon,
    icons,
    appBar,
    autocomplete,
    badge,
    button,
    card,
    chip,
    dialog,
    divider,
    expansionPanel,
    form,
    link,
    list,
    media,
    menu,
    overlay,
    portal,
    progress,
    table,
    tabs,
    tooltip,
    transition,
    tree,
    typography,
    utils,
  ];
}
