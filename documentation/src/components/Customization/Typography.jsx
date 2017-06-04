import React from 'react';
import Markdown from 'components/Markdown';

const markdown = `
# Material Design Typography

The typography has been built off of the [typography specs](https://www.google.com/design/spec/style/typography.html).
The default font used in react-md is \`'Roboto'\`. This can be changed by overriding
[$md-font-name](/customization/typography?tab=1#variable-md-font-name) and/or
[$md-font-family](/customization/typography?tab=1#variable-md-font-family) before \`@include react-md-everything\`
or \`@include react-md-typography\`.

The base html tags will be modified by default unless you set the sass variable \`$md-typography-extended\`
to \`false\`. The tags will be implemented as:
- \`h1\` - \`.md-display-1\`
- \`h2\` - \`.md-headline\`
- \`h3\` - \`.md-title\`
- \`h4\` - \`.md-subheading-2\`
- \`h5\` - \`.md-subheading-1\`
- \`h6\` - \`.md-body-2\`
- \`p\` - \`.md-body-1\`
- \`caption\` - \`.md-caption\`


All the class names in order of largest to smallest are:
\`.md-display-4\`, \`.md-display-3\`, \`.md-display-2\`, \`.md-display-1\`, \`.md-headline\`,
\`.md-title\`, \`.md-subheading-2\`, \`.md-subheading-1\`, \`.md-body-2\`, \`.md-body-1\`,
and \`.md-caption\`.

#### Examples
`;

const helperMarkdown = `
If the \`$md-typography-include-utilities\` variable is \`true !default\`, the following utility
class names will be created:

- \`.md-text-left\` - aligns text left
- \`.md-text-center\` - aligns text center
- \`.md-text-right\` - aligns text right
- \`.md-text-justify\`, - aligns text by justify
- \`.md-text-capitalize\` - capitlizes the text
- \`.md-text-uppercase\` - uppercases the text
- \`.md-text-lowercase\` - lowercases the text
- \`.md-text-nowrap\` - does not allow line breaks
- \`.md-text-no-select\` - Does not allow use-select
- \`.md-font-light\` - the material design light font weight.
- \`.md-font-regular\` - the material design regular font weight.
- \`.md-font-medium\` - the material design medium font weight.
- \`.md-font-bold\` - the material design bold font weight.

If the \`$md-typography-include-text-container\` variable is \`true !default\`, a \`md-text-container\`
class name will be created to position text in the center of the page and keep the line length within
the \`$md-typography-max-line-length\` value.
`;

const Typography = () => (
  <div className="md-grid">
    <div className="md-cell md-cell--12">
      <section className="md-text-container">
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis finibus sapien nec
          tellus ornare, quis fringilla nibh sodales. Maecenas blandit leo at sem commodo,
          quis mattis augue bibendum. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Phasellus convallis efficitur viverra. Quisque nec ipsum ut ex feugiat
          congue. Nam vehicula risus in ex viverra, quis condimentum nulla tincidunt. Fusce
          sed lectus gravida, mattis metus non, dignissim massa. Donec placerat nulla metus.
          Praesent fringilla lectus vel velit congue consequat. Phasellus augue nisi, iaculis
          sit amet neque nec, viverra varius nisi.
        </p>
        <p className="md-body-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus nisl eget nisl
          blandit ornare. Integer id sodales tellus. Phasellus imperdiet mollis laoreet.
          Etiam accumsan lorem ac elit euismod rhoncus quis vel felis. Etiam ex lorem,
          scelerisque at tellus at, rhoncus egestas nulla. Curabitur elementum quis lectus
          vitae porta. Pellentesque dignissim velit ac arcu volutpat euismod. Donec tempus a
          dui in blandit. Curabitur commodo eget risus at fringilla. Aliquam in vestibulum
          mauris. Morbi ultricies purus vitae fringilla iaculis.
        </p>
        <table style={{ width: '100%' }}>
          <caption className="md-caption md-text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rutrum tincidunt
            ligula, sed suscipit dolor aliquet at. Nunc quis ex a turpis dapibus aliquam ac
            ut ipsum. Maecenas dictum, felis at sagittis semper, turpis dui lobortis sapien,
            ac gravida turpis turpis vel orci. Fusce mollis tortor et mauris facilisis
            pharetra. Nunc gravida odio non metus pharetra, ac tempus nisl eleifend. Praesent
            odio ex, lobortis sed egestas vel, gravida in justo. Mauris suscipit sodales
            vehicula. Duis non enim scelerisque, venenatis eros eu, scelerisque nulla. Duis
            elementum turpis ipsum, ut imperdiet magna pulvinar sed. Ut luctus lorem non eros
            ullamcorper, ut posuere nulla varius. Nunc lacus leo, euismod at augue aliquet,
            scelerisque facilisis turpis. Nunc diam lacus, accumsan eget blandit id, faucibus
            nec velit. Aliquam sollicitudin hendrerit augue, id facilisis ex dapibus vitae.
            Vestibulum vehicula erat eu eros viverra, eget pretium nisi porttitor. Donec ornare,
            nibh laoreet facilisis viverra, augue elit tincidunt diam, vel aliquam magna quam
            vel nunc. Vivamus mauris justo, elementum non rutrum quis, interdum vitae justo.
          </caption>
        </table>
        <h2>Helper Classes</h2>
        <Markdown markdown={helperMarkdown} component="article" />
      </section>
    </div>
  </div>
);

export default Typography;
