import shouldNotChange from "another/scssVariables";

const color = "#fff";
const backgroundColor =
  "#323232";

const margin = "1rem";
const zIndex = 40;

const titleKeyline = "4.5rem";

const mediaOverlayPositions = ["top", "right", "bottom", "left", "middle", "center", "absolute-center"];
const mediaOverlayPosition = "bottom";
const aspectRatio = "16 9";

function Example() {
  return (
    (<div
      style={{
        backgroundColor:
          "var(--rmd-theme-primary, #9c27b0)",
      }}
    />)
  );
}
