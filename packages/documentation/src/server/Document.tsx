import * as React from "react";
import App from "components/App";

export interface IDocumentAssets {
  scripts: string[];
  styles: string[];
}

export interface IDocumentProps {
  assets: IDocumentAssets;
}

function withLeadingSlash(path: string): string {
  if (/^(?!\/|http)/.test(path)) {
    return `/${path}`;
  }

  return path;
}

const FONTS = [
  "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"
];

export default class Document extends React.Component<IDocumentProps, null> {
  public render() {
    const { assets } = this.props;
    const styles = assets.styles.concat(FONTS)
      .map((path) => <link key={path} rel="stylesheet" href={withLeadingSlash(path)} />);

    const scripts = assets.scripts
      .map((path) => <script key={path} src={withLeadingSlash(path)} />);

    return (
      <html lang="en" dir="ltr" className="md-typography">
        <head>
          <title>react-md</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
          {styles}
        </head>
        <body>
          <div id="root"><App /></div>
          {scripts}
        </body>
      </html>
    );
  }
}
