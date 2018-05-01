import * as React from "react";
import App from "components/App";

export interface IDocumentAssets {
  scripts: string[];
  styles: string[];
}

export interface IDocumentProps {
  assets: IDocumentAssets;
}

export default class Document extends React.Component<IDocumentProps, null> {
  public render() {
    const { assets } = this.props;
    const styles = assets.styles.map((path) => <link key={path} rel="stylesheet" href={`${path}`} />);
    const scripts = assets.scripts.map((path) => <script key={path} src={`${path}`} />);
    return (
      <html className="md-typography">
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
