import React from 'react';

import ShowcaseCard from '../ShowcaseCard';

import logo from './logo.png';

const description = `
Hostfully is a content generation and guest communications platform built for
vacation rental management companies. Using Hostfully, managers upload
property-specific content and local recommendations that travelers can use
while they are at the destination. Companies also use Hostfully as a channel
for guest communication – instead of overloading guests with too many details
about the property, managers direct their guests to well-structured content in
each property’s customized online guidebook – accessible on mobile, desktop, and
in print.
`;

const author = {
  name: 'Hostfully',
  github: 'https://github.com/hostfully',
};

const Hostfully = props => (
  <ShowcaseCard
    {...props}
    name="Hostfully"
    link="https://hostfully.com"
    demoLink="https://v2.hostfully.com/california-dreaming"
    logo={logo}
    author={author}
    description={description}
  />
);

export default Hostfully;
