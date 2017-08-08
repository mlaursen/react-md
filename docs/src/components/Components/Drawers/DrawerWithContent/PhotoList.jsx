import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-md/lib/Avatars';
import FontIcon from 'react-md/lib/FontIcons';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';

const ariaProps = {
  'aria-busy': true,
  'aria-describedby': 'loading-image-list',
};

const PhotoList = ({ items, onItemClick, fetching }) => (
  <List {...(fetching ? ariaProps : undefined)}>
    {items.map(photo => (
      <ListItem
        key={photo.id}
        primaryText={photo.filename}
        secondaryText={photo.author}
        leftAvatar={<Avatar src={`https://unsplash.it/40?image=${photo.id}`} role="presentation" />}
        rightIcon={<FontIcon>info</FontIcon>}
        onClick={() => onItemClick(photo)}
      />
    ))}
  </List>
);

PhotoList.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.number,
    filename: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool,
};

export default PhotoList;
