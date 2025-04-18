import { RootHtml } from "@react-md/core/RootHtml";
import { textContainer } from "@react-md/core/typography/textContainerStyles";
import { Typography } from "@react-md/core/typography/Typography";
import { typography } from "@react-md/core/typography/typographyStyles";
import { cnb } from "cnbuilder";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.scss";
import { RootLayout } from "./RootLayout";
import { RootProviders } from "./RootProviders";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootHtml
      beforeBodyChildren={
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
      }
    >
      <RootProviders>
        <RootLayout>{children}</RootLayout>
      </RootProviders>
      <ScrollRestoration />
      <Scripts />
    </RootHtml>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className={cnb(textContainer(), typography({ textAlign: "center" }))}>
      <Typography type="headline-1" margin="top">
        {message}
      </Typography>
      <Typography>{details}</Typography>
      {stack && (
        <pre style={{ overflow: "auto" }}>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
