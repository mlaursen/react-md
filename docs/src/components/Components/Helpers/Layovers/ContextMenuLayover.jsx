import React, { PureComponent } from 'react';
import { Layover, List, ListItem } from 'react-md';

const anchor = {
  x: Layover.HorizontalAnchors.CENTER,
  y: Layover.VerticalAnchors.BOTTOM,
};

const Content = () => (
  <section>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae
      nulla nec risus accumsan tristique non eu mi. Integer sit amet nisi magna.
      Aenean ex nunc, dapibus vitae sollicitudin vel, feugiat vitae tellus.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut mi a
      odio pellentesque maximus. Donec vitae laoreet arcu. Morbi faucibus nibh
      justo, a cursus purus placerat a. In ac diam quis justo consectetur volutpat.
      Etiam vestibulum, ex tempor pretium scelerisque, magna purus lacinia sem,
      sagittis sollicitudin velit erat non augue. Vivamus commodo semper suscipit.
      Sed elementum sapien vel auctor dignissim. Sed hendrerit ligula ac vulputate
      placerat. Donec non orci sagittis, porttitor justo ac, accumsan elit. In
      vitae arcu sit amet massa semper interdum. Duis id elit aliquet, ultricies
      lorem at, lobortis tortor.
    </p>
    <p>
      Donec luctus sodales risus eget vulputate. Etiam molestie blandit augue a
      fringilla. Etiam at nisi feugiat quam congue dapibus eget a lectus. Proin
      interdum aliquam diam, imperdiet convallis nunc consequat eget. Curabitur
      sed massa aliquet, egestas metus eget, pretium erat. Suspendisse egestas
      molestie urna vitae pretium. Orci varius natoque penatibus et magnis dis
      parturient montes, nascetur ridiculus mus. Cras ut ex eget felis pretium
      egestas. In et dolor ullamcorper, rutrum purus ut, commodo elit. Vestibulum
      quis fringilla ipsum. Aliquam erat volutpat. Phasellus id malesuada erat.
      Donec interdum luctus lacus in tempus. Praesent sed leo in lorem iaculis
      consectetur. Sed in odio tempor, luctus lorem ac, rhoncus nisl.
    </p>
    <p>
      Cras tortor felis, fermentum in eros non, consectetur tincidunt mauris.
      Aenean et lacus vel sem ultrices sagittis ac ut augue. Maecenas laoreet leo
      eget risus imperdiet, non sodales quam condimentum. Aliquam fringilla sit
      amet enim sit amet lacinia. Pellentesque volutpat lacus vitae ex semper
      accumsan. Vestibulum scelerisque nulla condimentum eleifend vestibulum. In hac
      habitasse platea dictumst. Nunc scelerisque, ipsum vitae vestibulum euismod,
      dui ipsum suscipit quam, at rhoncus lorem risus vitae tellus. Vivamus
      sollicitudin quam bibendum eros facilisis, in lobortis nisi cursus. Quisque
      finibus metus non orci sollicitudin, sit amet pharetra ipsum viverra.
    </p>
  </section>
);

export default class ContextMenuLayover extends PureComponent {
  state = { visible: false };

  open = () => {
    this.setState({ visible: true });
  };

  close = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Layover
          id="context-menu-layover"
          onContextMenu={this.open}
          toggle={<Content />}
          onClose={this.close}
          visible={visible}
          anchor={anchor}
        >
          <List className="md-paper md-paper--2" inline onClick={this.close}>
            <ListItem primaryText="Copy" />
            <ListItem primaryText="Paste" />
          </List>
        </Layover>
      </div>
    );
  }
}
