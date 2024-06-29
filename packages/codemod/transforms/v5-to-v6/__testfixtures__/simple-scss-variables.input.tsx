import alertVariables from "@react-md/alert/dist/scssVariables";
import appBarVariables from "@react-md/app-bar/dist/scssVariables";
import mediaVariables from "@react-md/media/dist/scssVariables";
import shouldNotChange from "another/scssVariables";

const color = alertVariables["rmd-alert-theme-values"].color;
const backgroundColor =
  alertVariables["rmd-alert-theme-values"]["background-color"];

const margin = alertVariables["rmd-snackbar-margin"];
const zIndex = alertVariables["rmd-snackbar-z-index"];

const titleKeyline = appBarVariables["rmd-app-bar-title-keyline"];

const mediaOverlayPositions = mediaVariables["rmd-media-overlay-positions"];
const mediaOverlayPosition = mediaVariables["rmd-media-overlay-positions"][2];
const aspectRatio = mediaVariables["rmd-media-default-aspect-ratios"]['"16-9"'];

function Example() {
  return (
    <div
      style={{
        backgroundColor:
          appBarVariables["rmd-app-bar-primary-background-color"],
      }}
    />
  );
}
