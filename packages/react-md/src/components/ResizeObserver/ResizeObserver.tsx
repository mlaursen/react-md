import * as React from "react";
import * as PropTypes from "prop-types";
import ResizeObserverAPI from "resize-observer-polyfill";

export interface IResizeObserverData {
  height: number;
  width: number;
  scrollHeight: number;
  scrollWidth: number;
  el: Element;
}

export interface IResizeObserverProps {
  id?: string;
  watchHeight?: boolean;
  watchWidth?: boolean;
  target?: HTMLElement | null;
  targetId?: string;
  targetQuery?: string;

  onResize: (resizeData: IResizeObserverData) => void;
}

export interface IDefaultResizeObserverProps {
  watchHeight: boolean;
  watchWidth: boolean;
}

export type ResizeObserverWithDefaultProps = IResizeObserverProps & IDefaultResizeObserverProps;

export default class ResizeObserverComponent extends React.Component<ResizeObserverWithDefaultProps, null> {
  public static propTypes = {
    watchHeight: PropTypes.bool,
    watchWidth: PropTypes.bool,
    target: PropTypes.object,
    targetId: PropTypes.string,
    targetQuery: PropTypes.string,
    onResize: PropTypes.func,
  };

  public static defaultProps = {
    watchHeight: false,
    watchWidth: false,
  };

  private targetRef: React.RefObject<HTMLSpanElement>;
  private container: HTMLElement | null;
  private observer: ResizeObserver | null;
  private target: HTMLElement | null;
  private height: number | null;
  private width: number | null;
  private scrollHeight: number | null;
  private scrollWidth: number | null;

  constructor(props: ResizeObserverWithDefaultProps) {
    super(props);

    this.targetRef = React.createRef();
    this.container = null;
    this.observer = null;
    this.target = null;
    this.height = null;
    this.width = null;
    this.scrollHeight = null;
    this.scrollWidth = null;
  }

  public componentDidMount() {
    this.target = this.findTarget(this.props);
    this.observer = new ResizeObserverAPI(this.measure);
    if (this.target) {
      this.observer.observe(this.target);
    }
  }

  public render() {
    const { id } = this.props;
    return <span id={id} ref={this.targetRef} aria-hidden="true" />;
  }

  private isHeightChange = (height: number, scrollHeight: number): boolean => this.props.watchHeight
    && (height !== this.height || scrollHeight !== this.scrollHeight)
  private isWidthChange = (width: number, scrollWidth: number): boolean => this.props.watchWidth
    && (width !== this.width || scrollWidth !== this.scrollWidth)

  private findTarget = ({ target, targetId, targetQuery }: IResizeObserverProps): HTMLElement | null => {
    if (typeof target !== "undefined") {
      return target;
    }

    let t = null;
    if (targetId) {
      t = document.getElementById(targetId);
    } else if (targetQuery) {
      t = document.querySelector(targetQuery);
    }

    if (process.env.NODE_ENV !== "production" && !t) {
      const key = targetId ? "targetId" : "targetQuery";
      const value = this.props[key];
      throw new Error((
        "An HTMLElement is required for the `ResizeObserver`'s watch target but none were provided or found. " +
        "Please update either the \`targetId\` or \`targetQuery\` props to find a valid HTMLElement. Provided " +
        `\`${key}\`: \`${value}\`.`
      ));
    }

    return t;
  }

  private measure = (entries: ResizeObserverEntry[]): void => {
    if (!this.observer || !this.target) {
      return;
    }

    for (const entry of entries) {
      if (!entry) {
        return;
      }

      const { height, width } = entry.contentRect;
      const { scrollHeight, scrollWidth } = entry.target;
      if (this.isHeightChange(height, scrollWidth) || this.isWidthChange(width, scrollWidth)) {
        this.height = height;
        this.width = width;
        this.scrollHeight = scrollHeight;
        this.scrollWidth = scrollWidth;

        this.props.onResize({
          height,
          width,
          scrollHeight,
          scrollWidth,
          el: entry.target,
        });
      }
    }
  }
}
