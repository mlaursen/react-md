import { release } from "@mlaursen/release-script";

await release({
  repo: "react-md",
  cleanCommand: "clean-release-dist",
  buildCommand: "build-release-packages",
});
