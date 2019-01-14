import * as React from "react";
import { delegateEvent, IDelegatedEventHandler } from "@react-md/utils";
import {
  KeyboardWiaAriaElement,
  IKeyboardTrackerContext,
  KeyboardContextFallbackElementFunction,
  KeyboardContextElementFunction,
} from "./types";

export interface IKeyboardTrackerProps {
  /**
   * This is being set to required since this component is basically useless if
   * there aren't any children.
   */
  children: React.ReactNode;
}

export const KeyboardContext = React.createContext<IKeyboardTrackerContext>({
  target: null,
  fallbackTarget: null,
  addElement: () => {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Attempted to add an element to the react-md `KeyboardTracker` without " +
          "initializing a `KeyboardTracker` component somewhere in the element's parent " +
          "tree. This should be fixed before moving to production since it will prevent " +
          "all keyboard specific features and fixes from working correctly."
      );
      console.warn(new Error().stack);
    }
  },
  removeElement: () => {},
  forceActiveElement: () => {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Attempted to force an element to be the current keyboard active element " +
          "in the react-md `KeyboardTracker` component without initializing a " +
          "`KeyboardTracker` component somewhere in the element's parent tree."
      );
      console.warn(new Error().stack);
    }
  },
  setFallbackElement: () => {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Attempted to set a fallback element to the react-md `KeyboardTracker` without " +
          "initializing a `KeyboardTracker` component somewhere in the element's parent " +
          " tree. This should be fixed before moving to production since it will prevent " +
          "all keyboard specific features and fixes from working correctly."
      );
      console.warn(new Error().stack);
    }
  },
});

export default class KeyboardTracker extends React.Component<
  IKeyboardTrackerProps,
  IKeyboardTrackerContext
> {
  private elements: Set<KeyboardWiaAriaElement>;
  private keydownHandler?: IDelegatedEventHandler;
  private mousedownHandler?: IDelegatedEventHandler;
  constructor(props: IKeyboardTrackerProps) {
    super(props);

    this.state = {
      target: null,
      fallbackTarget: null,
      addElement: this.addElement,
      removeElement: this.removeElement,
      forceActiveElement: this.forceActiveElement,
      setFallbackElement: this.setFallbackElement,
    };
    this.elements = new Set();
  }

  public componentDidMount() {
    // this.keydownHandler = delegateEvent("keydown", window, true);
    this.mousedownHandler = delegateEvent("mousedown", window, true);
    // this.keydownHandler.add(this.handleKeyDown);
    this.mousedownHandler.add(this.handleMouseDown);
  }

  public componentWillUnmount() {
    // this.keydownHandler && this.keydownHandler.remove(this.handleKeyDown);
    this.mousedownHandler && this.mousedownHandler.remove(this.handleMouseDown);
  }

  public render() {
    const { children } = this.props;
    return (
      <KeyboardContext.Provider value={this.state}>
        {children}
      </KeyboardContext.Provider>
    );
  }

  private addElement: KeyboardContextElementFunction = element => {
    this.elements.add(element);
  };

  private removeElement: KeyboardContextElementFunction = element => {
    if (!this.elements.has(element)) {
      if (process.env.NODE_ENV !== "production") {
        console.error(
          "Attempted to remove an element from the `KeyboardTracker` component" +
            "but it was not being tracked already. Not sure why? Help add info here."
        );
        console.error(new Error().stack);
      }
      return;
    }

    this.elements.delete(element);
  };

  private forceActiveElement: KeyboardContextElementFunction = element => {
    if (this.elements.has(element) && this.state.target !== element) {
      this.setState({ target: element });
    }
  };

  private setFallbackElement: KeyboardContextFallbackElementFunction = element => {
    if (this.state.fallbackTarget !== element) {
      this.setState({ fallbackTarget: element });
    }
  };

  // private handleKeyDown = (event: Event) => {
  //   const target = attemptMoveWithKeyboard(event as KeyboardEvent);
  //   if (target && this.state.target !== target) {
  //     this.setState({ target });
  //   }
  // };

  private handleMouseDown = () => {
    if (this.state.target) {
      this.setState({ target: null });
    }
  };
}
