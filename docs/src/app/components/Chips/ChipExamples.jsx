import React from 'react';
import Chip from 'react-md/lib/Chips';
import Avatar from 'react-md/lib/Avatars';

export default function ChipExamples() {
  return (
    <div>
      <Chip label="Example chip">
        <Avatar random>A</Avatar>
      </Chip>
      <Chip label="Example chip" remove={() => console.log('Removing a chip')} />
      <Chip label="Example chip" remove={() => console.log('Removing a chip')}>
        <Avatar random>A</Avatar>
      </Chip>
    </div>
  );
}
