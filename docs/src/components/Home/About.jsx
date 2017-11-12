import React from 'react';
import { bem } from 'react-md';

const About = () => (
  <h3 className={bem('home', 'about', {}, 'md-text-container')}>
    This project&apos;s goal is to be able to create a fully accessible material design
    styled website using React Components and Sass. With the separation of styles in
    Sass instead of inline styles, it should hopefully be easy to create custom
    components with the existing styles.
  </h3>
);

export default About;
