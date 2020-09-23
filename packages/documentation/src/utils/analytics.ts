/* eslint-disable default-case */
import { kebabCase } from "lodash";
import { CodePreference } from "components/CodePreference";
import { ThemeMode } from "components/Theme";

export enum EventName {
  CreateSandbox = "create_sandbox",
  ViewCode = "view_code",
  CodePreference = "code_preference",
  ThemeChange = "theme",
  Version = "version",
}

export interface CodeEvent {
  name: EventName.CreateSandbox | EventName.ViewCode;
  demoName: string;
  packageName: string;
  lang: CodePreference;
}

export interface CodePreferenceEvent {
  name: EventName.CodePreference;
  lang: CodePreference;
}

export interface ThemeChangeEvent {
  name: EventName.ThemeChange;
  mode: ThemeMode;
}

export interface VersionEvent {
  name: EventName.Version;
  version: string;
}

export type AnalyticsEvent =
  | CodeEvent
  | CodePreferenceEvent
  | ThemeChangeEvent
  | VersionEvent;

const getLanguageName = (pref: CodePreference): string =>
  pref === "js" ? "Javascript" : "TypeScript";

const createCodeLabel = ({
  name,
  demoName,
  packageName,
  lang,
}: CodeEvent): string => {
  const isCode = name === EventName.ViewCode;
  const prefix = isCode ? "View" : "Create";
  const suffix = isCode ? "" : " sandbox";
  const pkg = `@react-md/${kebabCase(packageName)}`;
  const language = getLanguageName(lang);

  return `${prefix} "${demoName}"${suffix} from "${pkg}" using ${language}`;
};

const getEventParams = (event: AnalyticsEvent): Gtag.EventParams => {
  let label: string;
  let category: string;
  switch (event.name) {
    case EventName.ViewCode:
    case EventName.CreateSandbox:
      label = createCodeLabel(event);
      category = "code";
      break;
    case EventName.CodePreference:
      label = event.lang;
      category = event.name;
      break;
    case EventName.ThemeChange:
      label = `Changing to ${event.mode} mode`;
      category = event.name;
      break;
    case EventName.Version:
      label = `To ${event.version}`;
      category = event.name;
  }

  return {
    event_label: label,
    event_category: category,
  };
};

/**
 * Sends an analytics event using `gtag` but only in production.
 */
export function sendAnalyticsEvent(event: AnalyticsEvent): void {
  if (process.env.NODE_ENV !== "production" && !process.env.GA_CODE) {
    return;
  }

  if (typeof gtag === "undefined") {
    return;
  }

  gtag("event", event.name, getEventParams(event));
}

/**
 * This is used to send analytics to an `onClick` function by creating a
 * callback function.
 */
export function sendAnalytics(event: AnalyticsEvent): () => void {
  return () => sendAnalyticsEvent(event);
}
