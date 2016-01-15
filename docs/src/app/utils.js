import React from 'react';
export const githubHref = 'https://github.com/mlaursen/react-md';

const lorems = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at placerat nulla. Morbi eu erat diam. Donec malesuada mauris in neque efficitur luctus. Vestibulum porttitor elit velit, pellentesque imperdiet tellus maximus in. Phasellus consectetur lacus nunc, quis efficitur felis feugiat ac. Vivamus non erat laoreet, volutpat tellus sit amet, porttitor orci. Sed scelerisque id arcu at ornare. Suspendisse potenti. Phasellus eu posuere mi. Fusce venenatis odio dui, ac accumsan lacus dapibus et. Praesent euismod nulla at porta elementum. Nunc ullamcorper velit aliquam velit faucibus tempus.',
  'Duis ligula elit, elementum a nisl a, venenatis fermentum libero. Cras bibendum dignissim nisl, sed sodales tellus scelerisque sed. Sed at enim semper, imperdiet elit et, venenatis magna. Morbi vestibulum purus in ante placerat viverra. Nullam molestie arcu ut dolor rutrum varius. Sed vehicula laoreet volutpat. Quisque feugiat, nisl in sollicitudin consectetur, mi metus aliquet urna, ac sagittis nulla nulla in diam. Fusce id enim auctor ante fringilla auctor in et quam.',
  'Donec pulvinar ligula augue, et tincidunt velit bibendum non. Aenean id metus nunc. Donec non feugiat nisl. In accumsan ligula purus, ut vulputate elit tempus sit amet. Nullam volutpat semper lectus. Nunc a libero tellus. Duis posuere nisi diam, nec euismod risus interdum sit amet. Pellentesque at lacus bibendum, cursus ante non, maximus arcu. Morbi id leo nulla. Integer quis feugiat quam. Etiam auctor pharetra vestibulum.',
  'Nulla sodales metus metus. Sed a metus quis ipsum sagittis placerat. Nunc sit amet molestie purus, nec rutrum quam. Praesent elementum risus eget mattis condimentum. Morbi dignissim, dolor et finibus sollicitudin, nulla enim molestie est, eget tincidunt magna libero et dolor. Fusce tempor sapien et urna sodales, at laoreet nunc egestas. Aenean eget arcu in felis ultrices vehicula. Maecenas interdum viverra sem vitae sodales. Duis tincidunt varius nunc sed viverra. Duis sit amet semper ex, ultrices aliquet mi. Donec a congue sem, ac facilisis ex.',
  'Proin venenatis tortor et ex viverra, ac facilisis mi ullamcorper. Aenean eget est bibendum, fermentum enim eget, semper orci. Nunc magna mauris, fermentum sit amet diam ut, semper malesuada justo. Fusce faucibus tellus eget arcu imperdiet, aliquet placerat massa molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas gravida quam id ultricies accumsan. Sed porta accumsan libero sed venenatis. Morbi scelerisque, ex in gravida porttitor, ipsum erat sodales urna, mattis mattis nibh ligula quis tellus. Pellentesque consequat et metus scelerisque dapibus. Praesent at maximus ligula. Phasellus vel orci tortor.',
  'Mauris posuere nisl sit amet justo condimentum volutpat. Aliquam venenatis rhoncus est, tristique semper tortor iaculis et. Donec pretium metus nec sodales mollis. Ut vel ipsum sapien. Fusce sit amet libero efficitur orci aliquet scelerisque a ut arcu. In hac habitasse platea dictumst. Sed turpis libero, dictum nec imperdiet nec, maximus eget urna. Sed vel lorem sit amet nisi vulputate mattis. In in odio erat. Aenean euismod lorem nec viverra auctor. Mauris id ipsum maximus, tempus dui nec, mollis felis. Etiam sodales metus sit amet lacus aliquet tristique. Nulla in lacus massa. Morbi quis lorem vitae dolor maximus luctus vel vel eros. Phasellus posuere in purus eget convallis.',
  'Aliquam mauris justo, ornare quis quam fermentum, mollis volutpat dolor. Donec sagittis velit non nisl porttitor, id lacinia tortor vulputate. Suspendisse posuere at felis eu fermentum. Donec at vehicula leo, id sollicitudin ipsum. Donec dapibus sodales erat at malesuada. Mauris sollicitudin velit sed arcu molestie congue. Suspendisse ac arcu enim. Sed ac urna id mi rutrum ornare sit amet in nisl. Phasellus at tempus magna. Nulla facilisi. Mauris pharetra finibus mi ut facilisis. Duis mattis odio id quam vestibulum, id consequat ex fringilla. Aenean sollicitudin accumsan sollicitudin. Duis euismod maximus tempor. Phasellus mi enim, bibendum at nisi vel, cursus venenatis sem. Praesent sagittis, nunc at rhoncus maximus, ligula turpis imperdiet eros, pharetra tincidunt tortor magna id sem.',
  'Sed eleifend sapien condimentum iaculis cursus. In vel pretium turpis. Duis molestie euismod turpis id consectetur. Nunc pharetra sapien libero, a volutpat erat finibus eget. Duis euismod eleifend felis consequat fringilla. Sed varius diam ligula, quis rutrum ex mollis non. Phasellus ac malesuada nibh. Praesent sit amet auctor urna. Quisque eget magna id ex dapibus vulputate eget vel magna.',
  'Ut viverra tempor placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras neque diam, auctor eget sapien et, tincidunt blandit turpis. Nam non volutpat velit. Aliquam iaculis euismod nisl non facilisis. Ut blandit dignissim turpis in finibus. Cras neque augue, tempus non neque eu, ornare ultrices sem. Nullam ultricies mi quis semper pellentesque. Mauris mauris lacus, ullamcorper a iaculis quis, tempus id tellus. Phasellus in orci orci. Fusce consequat suscipit ipsum ac bibendum. Maecenas et leo eu leo iaculis varius. Nam consectetur laoreet nisl blandit condimentum.',
  'Ut dictum, sapien vel malesuada posuere, tortor tellus blandit risus, eget hendrerit quam diam eu nibh. Aliquam erat volutpat. Ut rhoncus augue ac nunc porttitor hendrerit. Pellentesque enim risus, auctor quis turpis eget, pulvinar malesuada urna. Nullam tortor mi, elementum id sodales eget, aliquam et nulla. Pellentesque efficitur mi eros, in rutrum metus ultrices vel. Proin vitae diam sit amet nunc pretium malesuada. Fusce at nisi scelerisque, ultrices tortor nec, finibus velit. Donec molestie augue eget leo rutrum, nec ornare arcu gravida. Quisque tincidunt risus elit, ut condimentum eros egestas congue.',
];
export function loremIpsum(paras = 3) {
  let ipsums = [];
  for(let i = 0; i < paras; i++) {
    ipsums.push((
      <p key={i}>{lorems[Math.floor(Math.random() * lorems.length)]}</p>
    ));
  }
  return ipsums;
}

export const numstr = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

export const randomImage = ({ width, height, time } = {}) => {
  width = !width ? 200 : width;
  height = !height ? 200 : height;
  time = typeof time === 'undefined' ? Date.now() : time;
  return `https://unsplash.it/${width}/${height}/?random&time=${time}`;
};
