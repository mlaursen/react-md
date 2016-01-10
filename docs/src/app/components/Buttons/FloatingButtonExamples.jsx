import React from 'react';
import { FloatingButton } from 'react-md/Buttons';

export default function FloatingButtonExamples() {
  return (
    <div>
      <FloatingButton default>home</FloatingButton>
      <FloatingButton primary>grade</FloatingButton>
      <FloatingButton secondary>favorite</FloatingButton>
      <FloatingButton secondary iconClassName="fa fa-star-o" />
      <FloatingButton primary disabled>favorite</FloatingButton>
    </div>
  );
}
