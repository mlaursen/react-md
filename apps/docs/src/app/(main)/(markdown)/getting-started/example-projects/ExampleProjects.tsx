import { Box } from "@react-md/core/box/Box";
import { type ReactElement } from "react";

import { ExampleProject, type ExampleProjectProps } from "./ExampleProject.js";
import styles from "./ExampleProjects.module.scss";

const PROJECTS: ExampleProjectProps[] = [
  {
    js: "nextjs-js",
    ts: "nextjs-ts",
    title: "Next.js",
    framework: "nextjs",
  },
  {
    js: "vite-js",
    ts: "vite-ts",
    title: "Vite.js",
    framework: "vitejs",
  },
  {
    ts: "react-router-framework-mode",
    title: "React Router Framework Mode",
    framework: "reactrouter",
  },
  {
    ts: "mlaursen-nextjs",
    title: "mlaursen Next.js",
    framework: "nextjs",
  },
  {
    ts: "mlaursen-vite",
    title: "mlaursen Vite.js",
    framework: "vitejs",
  },
];

export function ExampleProjects(): ReactElement {
  return (
    <Box align="stretch" disablePadding className={styles.container}>
      {PROJECTS.map((project) => (
        <ExampleProject {...project} key={project.title} />
      ))}
    </Box>
  );
}
