import { typography } from "@react-md/core/typography/typographyStyles";
import { cnb } from "cnbuilder";
import { useId, type HTMLAttributes, type ReactElement } from "react";
import styles from "./ReactMDLogo.module.scss";

export interface ReactMDLogoProps extends HTMLAttributes<SVGSVGElement> {
  configurable?: boolean;
}

export function ReactMDLogo(props: ReactMDLogoProps): ReactElement {
  const { configurable, className, ...remaining } = props;

  const filter1Id = useId();
  const filter2Id = useId();
  const mainPathId = useId();
  const circlePathId = useId();
  const linearGradientId = useId();
  const shadowColor = configurable ? "var(--logo-shadow)" : undefined;
  const outlineColor = configurable ? "var(--logo-outline)" : "#fff";

  return (
    <svg
      {...remaining}
      className={cnb(styles.logo, className)}
      focusable="false"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 206 206"
    >
      <defs>
        <filter
          id={filter1Id}
          width="200%"
          height="200%"
          x="-50%"
          y="-50%"
          filterUnits="objectBoundingBox"
        >
          <feMorphology
            in="SourceAlpha"
            radius="1"
            result="shadowSpreadInner1"
          />
          <feGaussianBlur
            in="shadowSpreadInner1"
            result="shadowBlurInner1"
            stdDeviation=".5"
          />
          <feOffset
            dx="1"
            dy="1"
            in="shadowBlurInner1"
            result="shadowOffsetInner1"
          />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            k2="-1"
            k3="1"
            operator="arithmetic"
            result="shadowInnerInner1"
          />
          <feColorMatrix
            in="shadowInnerInner1"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
          />
        </filter>
        <filter
          id={filter2Id}
          width="200%"
          height="200%"
          x="-50%"
          y="-50%"
          filterUnits="objectBoundingBox"
        >
          <feOffset
            dx="1"
            dy="1"
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          />
          <feGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation=".5"
          />
          <feColorMatrix
            in="shadowBlurOuter1"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
          />
        </filter>
        <linearGradient
          id={linearGradientId}
          x1="50%"
          x2="50%"
          y1="0%"
          y2="77.982%"
        >
          <stop offset="0%" stopOpacity=".239" stopColor={shadowColor} />
          <stop offset="100%" stopOpacity=".081" stopColor={shadowColor} />
        </linearGradient>
        <circle id={circlePathId} cx="101.5" cy="97.5" r="16.5" />
        <path
          id={mainPathId}
          d="M80.28 84.752c2.264-4.018 7.604-11.897 7.604-11.897s11.74-.65 18.304-.348c6.564.303 9.278.348 9.278.348l9.1 13.88 4.734 10.543-1.655 4.625-7.497 13.822-4.177 5.282s-3.908 1.215-12.891.888c-4.607-.168-13.852-.38-13.852-.38s-1.37.253-1.847-.132c-1.101-.89-2.89-3.69-2.89-3.69l-7.114-13.162-3.584-7.253s4.044-8.186 6.488-12.526Z"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(2 2)">
          <circle
            fill={"var(--rmd-primary-color)"}
            cx="101.5"
            cy="97.5"
            r="40"
          />
          <path
            d="M37.531 102.213c.246 5.686 10.618 5.393 12.105 10.517.962 3.312 13.277 2.797 14.443 5.987 1.142 3.129-1.55 9.999-.57 13.06.297.923-1.13 2.636-1.286 3.87-.423 3.315-.441 6.718.534 8.86 3.91 8.59 4.882 9.243 14.677 11.562 2.404.569 5.626-5.138 9.93-3.772 2.13.677 5.933-8.959 8.162-6.632 2.08 2.17 4.11-4.17 5.474-4.17 3.32 0 5.645 5.496 8.81 5.34 2.861-.14 8.858 6.937 11.582 6.562 2.653-.366 7.513 2.604 9.958 1.885 4.155-1.222 8.016-3.39 9.494-8.915.414-1.548.456-5.26.544-9.616.039-1.967-1.732-4.154-.281-6.178 1.592-2.223-3.626-9.484-1.256-11.856 3.01-3.012 10.095-4.628 14.432-7.002.199-.109 11.446-4.45 8.879-6.691-1.863-1.626 8.495-8.52 3.306-9.52-1.757-.339-.174-6.742-3.306-6.497-2.527.199-4.415-6.95-7.662-5.915-2.39.762-4.28-5.081-6.79-3.38-1.994 1.351-4.004-5.404-5.914-3.11-.396.476-18.352-5.1-24.526-4.533-2.806.258 5.373 6.27 3.713 6.812-2.375.776 2.492 3.767 2.25 4.211-1.19 2.19 3.563 5.135 3.987 6.854 1.01 4.102 3.35 5.768 3.13 6.322-1.877 4.732-11.085 20.691-11.636 21.785-.432.857-.446 3.044-3.194 3.867-5.501 1.647-16.178 1.652-22.624 1.357-13.081-.597-15.365-15.344-16.462-16.52-3.03-3.254-2.568-4.544-4.44-8.202-2.184-4.265 5.028-11.195 5.448-11.822 2.189-3.263 7.7-12.242 8.033-13.23 1.398-4.143 10.152-.955 11.442-1.434 4.612-1.712 16.576 1.244 19.668.744 3.093-.5 27.814 6.366 23.259 2.842-3.172-2.455 3.519-9.646 0-12.046-2.115-1.441 2.514-8.096 0-9.263-2.127-.989.182-8.773-2.42-9.412-1.892-.465-3.372-4.515-5.576-4.648-6.343-.383-6.52.08-13.856 1.492-3.525.678-4.68 4.323-9.182 4.935-2.108.287-4.894 6.956-7.281 6.842-3.422-.164-5.768-3.139-8.633-5.454-2.75-2.222-6.059-3.778-7.421-4.423-1.904-.903-4.153-2.058-7.158-2.885-3.006-.827-3.52-1.073-4.45-.983-5.2.504-6.694 3.507-10.788 5.124-1.92.757.422 24.47-1.322 25.423-.759.415 2.065 4.542 1.322 4.896-6.116 2.908-12.207 6.821-17.344 7.84-3.572.707-5.338 4.358-7.582 5.914-1.709 1.186-1.827 3.91-2.772 6.497-.38 1.043.563 2.051.563 4.081 0 .934.547 1.704.587 2.628Z"
            className={styles.secondary}
          />
          <use xlinkHref={`#${mainPathId}`} fill="#03A9F4" fillOpacity="0" />
          <use
            xlinkHref={`#${mainPathId}`}
            fill="#000"
            filter={`url(#${filter1Id})`}
          />
          <path
            fill={`url(#${linearGradientId})`}
            d="M77.814 71.706s.963 6.244 6.857 11.968c2.688 2.61 7.476 4.71 11.767 6.77 1.386.666 11.023 4.396 11.023 4.396s-2.232 16.58-2.23 18.106c.01 8.909 2.99 16.814 9.323 17.45 6.158.618 6.24.65 11.593-.759.129-.034 6.428-3.866 6.564-3.883 3.14-.403 12.528-9.528 12.528-9.528s7.732 7.202 8.928 7.202c1.197 0 19.257 14.447 28.173 3.01 2.467-3.165 3.333-5.88 3.931-8.216.993-3.876.577-6.89.577-10.512 0-5.806-2.217-14.161-2.217-14.161 5.836 0 22.751-10.891 22.751-10.891l3.174-3.707 2.157-7.245-2.157 7.245-18.331 81.253-33.145 12.302-23.738 2.058s-26.266-6.334-38.904-11.91c-2.968-1.31-8.526-4.416-8.526-4.416L77.814 71.706Z"
            transform="rotate(-60 145.263 123.135)"
          />
          <ellipse
            cx="101.5"
            cy="97"
            stroke="#FFF"
            strokeWidth="3"
            rx="65.5"
            ry="26"
          />
          <ellipse
            cx="101.631"
            cy="97.326"
            stroke="#FFF"
            strokeWidth="3"
            rx="65.5"
            ry="26"
            transform="rotate(-60 101.63 97.326)"
          />
          <ellipse
            cx="101.631"
            cy="97.326"
            stroke="#FFF"
            strokeWidth="3"
            rx="65.5"
            ry="26"
            transform="rotate(-120 101.63 97.326)"
          />
          <use
            xlinkHref={`#${circlePathId}`}
            fill="#000"
            filter={`url(#${filter2Id}`}
          />
          <use xlinkHref={`#${circlePathId}`} fill="#FFF" />
          <text
            x="103"
            y="103"
            className={cnb(
              typography({ type: "headline-6", fontWeight: "bold" }),
              styles.text,
              styles.secondary
            )}
          >
            MD
          </text>
        </g>
        <circle
          cx="103"
          cy="103"
          r="100"
          stroke={outlineColor}
          strokeWidth="3"
        />
      </g>
    </svg>
  );
}
