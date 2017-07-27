import React from 'react';

import Helmet from 'react-helmet';

import Banner from './Banner';
import About from './About';
import Footer from './Footer';

import './_styles.scss';

const link = [{
  rel: 'stylesheet',
  href: 'https://fonts.googleapis.com/css?family=Montserrat:700',
}];

const Home = () => (
  <section className="home">
    <Helmet link={link} />
    <Banner />
    <About />
    <Footer />
  </section>
);

export default Home;
