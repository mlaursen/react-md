// https://github.com/nihgwu/react-runner/tree/974ebc932db7b7c7d59f1b50a79aed705efbf75a
// This is pretty much everything from there except using the new JSX transform
// and I wanted to understand why things were implemented the way they were
"use client";
import { Component, type ReactElement } from "react";
import {
  dangerouslyCreateElement,
  type DangerouslyRunCodeOptions,
  type RunnableCodeScope,
} from "./utils.jsx";

export interface DangerouslyRunCodeResult {
  error: Error | null;
  element: ReactElement | null;
}

export interface DangerouslyRunCodeState extends DangerouslyRunCodeResult {
  code: string;
  scope?: RunnableCodeScope;
}

export interface DangerouslyRunCodeProps extends DangerouslyRunCodeOptions {
  onRendered(error: Error | null): void;
}

export class DangerouslyRunCode extends Component<
  DangerouslyRunCodeProps,
  DangerouslyRunCodeState
> {
  state: DangerouslyRunCodeState = {
    code: "",
    error: null,
    element: null,
  };

  static getDerivedStateFromProps(
    nextProps: DangerouslyRunCodeOptions,
    prevState: DangerouslyRunCodeState
  ): DangerouslyRunCodeState | null {
    if (
      prevState.code === nextProps.code &&
      prevState.scope === prevState.scope
    ) {
      return null;
    }

    let error: Error | null = null;
    let element: ReactElement | null = prevState.element;
    try {
      element = dangerouslyCreateElement(nextProps);
    } catch (e) {
      error = e as Error;
    }

    return {
      code: nextProps.code,
      scope: nextProps.scope,
      error,
      element,
    };
  }

  componentDidMount(): void {
    this.props.onRendered(this.state.error);
  }

  componentDidUpdate(): void {
    this.props.onRendered(this.state.error);
  }

  static getDerivedStateFromError(
    error: Error
  ): Partial<DangerouslyRunCodeState> {
    return { error };
  }

  shouldComponentUpdate(
    nextProps: DangerouslyRunCodeOptions,
    nextState: DangerouslyRunCodeState
  ): boolean {
    return (
      this.props.code !== nextProps.code ||
      this.props.scope !== nextProps.scope ||
      this.state.error !== nextState.error
    );
  }

  render(): ReactElement | null {
    return this.state.error ? null : this.state.element;
  }
}
