"use client";

// https://github.com/nihgwu/react-runner/tree/974ebc932db7b7c7d59f1b50a79aed705efbf75a
// This is pretty much everything from there except using the new JSX transform
// and I wanted to understand why things were implemented the way they were
import { Component, type ReactElement } from "react";

import { dangerouslyCreateElement } from "./dangerousCodeUtils.js";
import { type RunnableCodeScope } from "./types.js";
import { type DangerouslyRunCodeOptions } from "./useDangerousCodeRunner.js";

export interface DangerousCodeRunnerProps extends DangerouslyRunCodeOptions {
  onRendered: (error: Error | null) => void;
}

export interface DangerousCodeRunnerState {
  error: Error | null;
  element: ReactElement | null;
  prevCode: string;
  prevScope?: RunnableCodeScope;
}

export class DangerousCodeRunner extends Component<
  DangerousCodeRunnerProps,
  DangerousCodeRunnerState
> {
  state = {
    error: null,
    element: null,
    prevCode: "",
  };

  static getDerivedStateFromProps(
    nextProps: DangerousCodeRunnerProps,
    prevState: DangerousCodeRunnerState
  ): DangerousCodeRunnerState | null {
    const { code, scope } = nextProps;
    if (prevState.prevCode === code && prevState.prevScope === scope) {
      return null;
    }

    try {
      return {
        error: null,
        element: dangerouslyCreateElement({ code, scope }),
        prevCode: code,
        prevScope: scope,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error : new Error("Unknown error"),
        element: null,
        prevCode: code,
        prevScope: scope,
      };
    }
  }

  static getDerivedStateFromError(
    error: Error
  ): Partial<DangerousCodeRunnerState> {
    return { error };
  }

  // Note: This is different than the react-runner and was added so that errors
  // show up immediately if the demo code is broken
  componentDidMount(): void {
    this.props.onRendered(this.state.error);
  }

  componentDidUpdate(): void {
    this.props.onRendered(this.state.error);
  }

  render(): ReactElement | null {
    return this.state.error ? null : this.state.element;
  }
}
