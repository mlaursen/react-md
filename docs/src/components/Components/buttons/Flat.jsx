import React from 'react';
import Button from 'react-md/lib/Buttons/Button';

const Flat = () => (
  <div className="buttons__group">
    <h5>Theme Examples</h5>
    <Button flat>Hello, World!</Button>
    <Button flat primary iconChildren="chat_bubble_outline">Chat</Button>
    <Button flat secondary iconBefore={false} iconChildren="chat_bubble_outline">Chat</Button>
    <h5>Disabled Examples</h5>
    <Button flat disabled>Disabled Button</Button>
    <Button flat disabled iconChildren="close">Disabled Button</Button>
    <h5>Theme Swapped Examples</h5>
    <Button flat primary swapTheming>Hello</Button>
    <Button flat secondary swapTheming>World</Button>
  </div>
);

export default Flat;
