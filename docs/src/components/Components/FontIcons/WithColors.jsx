import React from 'react';
import FontIcon from 'react-md/lib/FontIcons';

const style = {
  color: '#f06292', // $md-pink-300
};

const WithColors = () => (
  <div className="icons__examples">
    <FontIcon primary>home</FontIcon>
    <FontIcon secondary>home</FontIcon>
    <FontIcon disabled>home</FontIcon>
    <FontIcon error>home</FontIcon>
    <div style={style}>
      <FontIcon inherit>home</FontIcon>
    </div>
  </div>
);
export default WithColors;
