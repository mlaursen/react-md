import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New ReactMD + React Router App" },
    { name: "description", content: "Welcome to ReactMD + React Router!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
