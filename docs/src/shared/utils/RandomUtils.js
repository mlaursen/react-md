import React from 'react';
import Avatar from 'react-md/lib/Avatars';

export function getRandomInt({ min, max } = { min: 0, max: 10 }) {
  return Math.floor(Math.random() * max) + min;
}

export function randomImage({ width, height, time, section } = { width: 40 }) {
  width = !width ? 40 : width;
  height = !height ? width : height;
  section = !section ? '' : section;
  time = typeof time === 'undefined' ? Date.now() : time;


  const size = `${width}/${height}`;
  if (section) {
    return `http://lorempixel.com/${size}/${section}`;
  } else {
    return `https://unsplash.it/${width}/${height}/?random&time=${time}`;
  }
}

export function randomImages(amt, options = { width: 40 }) {
  const time = Date.now();
  return Array.apply(null, new Array(amt)).map((_, i) => {
    return randomImage(Object.assign({}, options, { time: time + i }));
  });
}

export function randomAvatar(className) {
  const src = randomImage();
  return <Avatar key={src} src={src} alt="Some Avatar" className={className} />;
}

export function randomAvatars(amt, className) {
  return randomImages(amt).map(src => <Avatar key={src} src={src} className={className} />);
}

export function getRandomBoolean() {
  return Math.random() < 0.5;
}

export function getRandomBooleans(size) {
  return Array.apply(null, new Array(size)).map(() => getRandomBoolean());
}
