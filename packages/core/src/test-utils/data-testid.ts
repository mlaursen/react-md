/// <reference types="react" />

declare module "react" {
  interface HTMLAttributes<T>
    extends React.AriaAttributes, React.DOMAttributes<T> {
    "data-testid"?: string | number;
  }
}
