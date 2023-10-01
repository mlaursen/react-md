import { ResponsiveItemContainer, cssUtils } from "@react-md/core";
import type { ReactElement } from "react";
import styles from "./not-found.module.scss";

export default function NotFound(): ReactElement {
  return (
    <ResponsiveItemContainer>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 1920 1080"
      >
        <defs>
          <filter
            id="d"
            width="200%"
            height="200%"
            x="-50%"
            y="-50%"
            filterUnits="objectBoundingBox"
          >
            <feOffset
              dx="5"
              dy="-9"
              in="SourceAlpha"
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
              values="0 0 0 0 0.749495111 0 0 0 0 0.300766508 0 0 0 0 0.294900775 0 0 0 1 0"
            />
          </filter>
          <filter
            id="f"
            width="200%"
            height="200%"
            x="-50%"
            y="-50%"
            filterUnits="objectBoundingBox"
          >
            <feGaussianBlur
              in="SourceAlpha"
              result="shadowBlurInner1"
              stdDeviation=".5"
            />
            <feOffset
              dx="3"
              dy="-3"
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
              values="0 0 0 0 0.752941176 0 0 0 0 0.305882353 0 0 0 0 0.298039216 0 0 0 1 0"
            />
          </filter>
          <filter
            id="i"
            width="200%"
            height="200%"
            x="-50%"
            y="-50%"
            filterUnits="objectBoundingBox"
          >
            <feGaussianBlur
              in="SourceAlpha"
              result="shadowBlurInner1"
              stdDeviation="1"
            />
            <feOffset
              dy="-5"
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
              values="0 0 0 0 0.752941176 0 0 0 0 0.305882353 0 0 0 0 0.298039216 0 0 0 1 0"
            />
          </filter>
          <filter
            id="k"
            width="200%"
            height="200%"
            x="-50%"
            y="-50%"
            filterUnits="objectBoundingBox"
          >
            <feOffset
              dx="3"
              dy="-3.5"
              in="SourceAlpha"
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
              values="0 0 0 0 0.752941176 0 0 0 0 0.305882353 0 0 0 0 0.298039216 0 0 0 1 0"
            />
          </filter>
          <filter
            id="n"
            width="200%"
            height="200%"
            x="-50%"
            y="-50%"
            filterUnits="objectBoundingBox"
          >
            <feOffset
              dx="-1"
              dy="2.5"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            />
            <feColorMatrix
              in="shadowOffsetOuter1"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
            />
          </filter>
          <filter
            id="o"
            width="200%"
            height="200%"
            x="-50%"
            y="-50%"
            filterUnits="objectBoundingBox"
          >
            <feOffset
              dx="1"
              dy="-2"
              in="SourceAlpha"
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
              values="0 0 0 0 0.0202350295 0 0 0 0 0.133358698 0 0 0 0 0.391927083 0 0 0 1 0"
            />
          </filter>
          <filter
            id="q"
            width="200%"
            height="200%"
            x="-50%"
            y="-50%"
            filterUnits="objectBoundingBox"
          >
            <feOffset
              dx="-1"
              dy="2.5"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            />
            <feColorMatrix
              in="shadowOffsetOuter1"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
            />
          </filter>
          <filter
            id="r"
            width="200%"
            height="200%"
            x="-50%"
            y="-50%"
            filterUnits="objectBoundingBox"
          >
            <feOffset
              dx="1"
              dy="-2"
              in="SourceAlpha"
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
              values="0 0 0 0 0.0202350295 0 0 0 0 0.133358698 0 0 0 0 0.391927083 0 0 0 1 0"
            />
          </filter>
          <circle id="c" cx="252" cy="280" r="58" />
          <circle id="e" cx="743.5" cy="490.5" r="22.5" />
          <circle id="h" cx="28.5" cy="26.5" r="22.5" />
          <circle id="j" cx="1108.5" cy="659.5" r="22.5" />
          <circle id="m" cx="978" cy="499" r="8" />
          <circle id="p" cx="949" cy="515" r="8" />
          <linearGradient
            id="b"
            x1="82.093%"
            x2="51.806%"
            y1="75.079%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFF" stopOpacity="0" />
            <stop offset="48.245%" stopColor="#FFF" />
            <stop offset="100%" stopColor="#FFF" />
          </linearGradient>
          <linearGradient id="g" x1="50%" x2="50%" y1="0%" y2="95.873%">
            <stop offset="0%" stopColor="#FFF" />
            <stop offset="100%" stopColor="#FFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="l" x1="50%" x2="50%" y1="11.442%" y2="100%">
            <stop offset="15.828%" stopColor="#FFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#FFF" />
          </linearGradient>
          <path
            id="a"
            d="M963.48 527.196c0-4.418 3.465-8.896 7.737-10.002l4.188-1.083 4.9 1.193c4.294 1.045 7.774 5.483 7.774 9.892 0 4.419-3.577 8-8.004 8h-8.592c-4.42 0-8.004-3.59-8.004-8Z"
          />
          <mask
            id="s"
            width="24.6"
            height="19.085"
            x="0"
            y="0"
            fill="#fff"
            maskContentUnits="userSpaceOnUse"
            maskUnits="objectBoundingBox"
          >
            <use xlinkHref="#a" />
          </mask>
        </defs>
        <g fill="none" fillRule="evenodd">
          <g transform="translate(709 259)">
            <ellipse cx="251" cy="280.085" stroke="#FFF" rx="251" ry="99.574" />
            <path
              stroke="url(#b)"
              d="M247.623 374.19c50.45 0 101.458-1.412 145.936-5.86 77.737-7.773 120.578-9.629 120.578-9.629s-45.594-131.736-126.1-159.317c-43.152-14.783-92.04-24.342-140.414-24.342-138.624 0-251 44.58-251 99.574s112.376 99.575 251 99.575Z"
              transform="rotate(-60 255.38 274.616)"
            />
            <ellipse
              cx="251.501"
              cy="281.334"
              stroke="#FFF"
              rx="251"
              ry="99.574"
              transform="rotate(-120 251.501 281.334)"
            />
            <use xlinkHref="#c" className={styles.oval} />
            <use xlinkHref="#c" fill="#000" filter="url(#d)" />
          </g>
          <use xlinkHref="#e" className={styles.oval} />
          <use xlinkHref="#e" fill="#000" filter="url(#f)" />
          <path
            fill="url(#g)"
            d="M26.232 119.817c.186.52.502.524.703.014C26.935 119.83 56 46.569 56 30 56 13.431 43.464 0 28 0S0 13.431 0 30c0 16.569 26.232 89.817 26.232 89.817Z"
            transform="rotate(24 231.033 2960.74)"
          />
          <g transform="rotate(24 231.033 2960.74)">
            <use xlinkHref="#h" className={styles.oval} />
            <use xlinkHref="#h" fill="#000" filter="url(#i)" />
          </g>
          <use xlinkHref="#j" className={styles.oval} />
          <use xlinkHref="#j" fill="#000" filter="url(#k)" />
          <path
            fill="url(#l)"
            d="m1187.453 306.92-70.093 159.883-9.582-2.979z"
          />
          <text
            fill="#FFF"
            fontFamily="VarelaRound-Regular, Varela Round"
            fontSize="525"
            letterSpacing="8.75"
          >
            <tspan x="372" y="722">
              4
            </tspan>
          </text>
          <text
            fill="#FFF"
            fontFamily="VarelaRound-Regular, Varela Round"
            fontSize="525"
            letterSpacing="8.75"
          >
            <tspan x="1222" y="722">
              4
            </tspan>
          </text>
          <use xlinkHref="#m" fill="#000" filter="url(#n)" />
          <use xlinkHref="#m" fill="#0B3F8E" />
          <use xlinkHref="#m" fill="#000" filter="url(#o)" />
          <use xlinkHref="#p" fill="#000" filter="url(#q)" />
          <use xlinkHref="#p" fill="#0B3F8E" />
          <use xlinkHref="#p" fill="#000" filter="url(#r)" />
          <use
            xlinkHref="#a"
            fill="#FC89B7"
            stroke="#98403D"
            mask="url(#s)"
            transform="rotate(-32 975.78 525.654)"
          />
          <circle cx="980" cy="496" r="2" fill="#FFF" />
          <circle cx="951" cy="512" r="2" fill="#FFF" />
          <path
            stroke="#973F3D"
            d="m934.108 513.097 10.784-12.194m20.661-11.376 16.006-2.97"
          />
        </g>
      </svg>
    </ResponsiveItemContainer>
  );
}
