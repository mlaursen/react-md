import React from 'react';

import DraftCard from './DraftCard';

const messages = [{
  title: 'This is a draft',
  to: 'mlaursen03@gmail.com',
  message: `
Hey Mikkel,

I am trying to use react-md for my website but something weird is
  `,
}, {
  title: 'Fire!!',
  to: 'someamazingemail@example.com',
  message: `
Greetings Fire Department!

I hope this isn't a bother, but there seems to be a fire in my trash can
and it is spreading throughout the office. I would be excited if you could
send some help when it best suits you. It appears to be spreadi
  `,
}, {
  title: 'Lorem Ipsum',
  to: 'fake.email@example.com',
  message: `
Aenean tincidunt massa velit, sed sagittis metus pulvinar ut. Aliquam erat
volutpat. Fusce iaculis leo at leo blandit pulvinar. In hac habitasse
platea dictumst. Vivamus tempus purus et justo vulputate, eu interdum sapien
pulvinar. Nam vehicula est nec nibh vulputate, vel
  `,
}];

const Drafts = () => (
  <div className="md-grid">
    {messages.map(message => <DraftCard {...message} key={message.title} />)}
  </div>
);

export default Drafts;
