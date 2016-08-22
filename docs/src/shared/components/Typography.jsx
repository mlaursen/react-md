import React, { PureComponent } from 'react';
import Markdown from 'components/Markdown';

const markdown = `
# Material Design Typography

The typography has been built off of the [typography specs](https://www.google.com/design/spec/style/typography.html).
Class extenders and default classes have been included by default. To help with
conflicting css frameworks, no default html tags have been updated with these
classes. You can manually add each class or do a global extend.

Here is a list of the classes/extenders:
- md-display-4
- md-display-3
- md-display-2
- md-display-1
- md-headline
- md-title
- md-subheading-2
- md-subheading-1
- md-body-2
- md-body-1
- md-caption


#### Example extends

\`\`\`scss
h1 {
  @extend %md-display-1;
}

h2 {
  @extend %md-headline;
}

h3 {
  @extend %md-title;
}

h4 {
  @extend %md-subheading-2;
}

h5 {
  @extend %md-subheading-1;
}

p {
  @extend %md-body-1;
}

caption {
  @extend %md-caption;
}
\`\`\`

#### Examples in order
`;

export default class Typography extends PureComponent {
  render() {
    return (
      <main className="markdown-page">
        <section className="text-container container">
          <Markdown markdown={markdown} component="article" />
          <h1 className="md-display-4">Lorem</h1>
          <h2 className="md-display-3">Ipsum</h2>
          <h3 className="md-display-2">Cras sed</h3>
          <h4 className="md-display-1">Phasellus</h4>
          <h5 className="md-headline">Ut convallis</h5>
          <h6 className="md-title">Proin quis cursus purus. Fusce.</h6>
          <h6 className="md-subheading-2">In in augue tincidunt, rhoncus.</h6>
          <h6 className="md-subheading-1">Vivamus elementum ligula vel justo.</h6>
          <p className="md-body-2">
            Sed feugiat enim et pretium venenatis. Cras ac quam sodales,
            rutrum turpis et, dignissim mauris. Fusce commodo aliquet efficitur.
            Quisque fringilla ante dignissim libero commodo auctor. Sed ligula augue,
            tincidunt sit amet leo ac, egestas vestibulum quam. Phasellus fermentum,
            tortor non blandit gravida, massa mauris lacinia magna, in vestibulum justo
            magna id odio. Morbi et felis urna. Integer eu ipsum ut ligula imperdiet
            iaculis.
          </p>
          <p className="md-body-1">
            Suspendisse feugiat viverra dui, rutrum eleifend urna lacinia sed. Sed
            pharetra enim tellus, nec gravida sem viverra eu. Curabitur sagittis id
            risus nec iaculis. In in mi sed lacus porta mattis. Phasellus mollis
            dapibus efficitur. Integer ut ultricies lectus. Nunc non sollicitudin
            augue. Nulla id mi nec justo sodales dignissim at et nibh. Maecenas nunc
            lectus, bibendum in justo et, convallis euismod quam. In hendrerit libero
            odio, eget consectetur ipsum dictum in. Pellentesque feugiat ex metus,
            rhoncus venenatis diam ornare sit amet. Proin pretium finibus dui, at
            ornare nibh suscipit ut. Etiam a erat in nisl sodales faucibus a nec nibh.
            Phasellus in pulvinar nisl. Maecenas consectetur dolor faucibus nunc volutpat,
            id consequat erat dignissim. Pellentesque faucibus pharetra sem vitae tempus.
          </p>
          <table style={{ width: '100%' }}>
            <caption className="md-caption">
              Vivamus interdum non justo non malesuada. Morbi pellentesque tellus ac arcu
              sollicitudin, non porttitor purus convallis. Nulla ac nulla vestibulum.
            </caption>
          </table>
        </section>
      </main>
    );
  }
}
