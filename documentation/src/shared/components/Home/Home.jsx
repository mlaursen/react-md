import React from 'react';
import Link from 'react-router/lib/Link';
import Button from 'react-md/lib/Buttons/Button';

import { FIRST_ROUTE } from 'constants/navItems';
import './_home.scss';
import logo from './logo.png';
import gettingStarted from './getting-started.svg';
import customization from './customization.svg';
import components from './components.svg';
import ImgCard from './ImgCard';

const about = `
This project's goal is to be able to quickly style and set up a material
design website using React Components for user interaction and SASS for
styling. With the separation of styles in SASS instead of inline styles,
it should hopefully be easy to create custom components with the
existing styles.
`;

const Home = () => (
  <section className="home">
    <header className="banner">
      <h1 className="md-display-2">react-md</h1>
      <img src={logo} alt="react-md's logo" style={{ paddingBottom: '2em' }} />
      <Button component={Link} to={FIRST_ROUTE} raised secondary label="View Demo" type={null} />
    </header>
    <h3 className="md-text-container about">{about}</h3>
    <footer className="md-grid">
      <ImgCard
        to="getting-started/prerequisites"
        src={gettingStarted}
        alt="A Mac and a Macbook with design mock ups."
        title="Getting Started"
      />
      <ImgCard
        to="customization/colors"
        src={customization}
        alt="A chemistry set with material design colors flowing into a text editor."
        title="Customization"
      />
      <ImgCard
        to={FIRST_ROUTE}
        src={components}
        alt="A pickture of a data chip."
        title="Components"
      />
    </footer>
  </section>
);

export default Home;
