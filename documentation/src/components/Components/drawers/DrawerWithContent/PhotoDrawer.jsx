/* eslint-disable jsx-a11y/img-has-alt */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';
import Drawer from 'react-md/lib/Drawers';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import Media, { MediaOverlay } from 'react-md/lib/Media';
import Toolbar from 'react-md/lib/Toolbars';

const actions = [
  <Button key="share" icon>person_add</Button>,
  <Button key="delete" icon>delete</Button>,
  <Button key="download" icon>file_download</Button>,
  <Button key="kebab" icon>more_vert</Button>,
];

const PhotoDrawer = ({ visible, onVisibilityChange, photo }) => (
  <Drawer
    type={Drawer.DrawerTypes.TEMPORARY}
    visible={visible}
    onVisibilityChange={onVisibilityChange}
    position="right"
    renderNode={document.querySelector('.phone-emulator__content')}
  >
    <Toolbar
      colored
      fixed
      nav={<Button icon onClick={() => onVisibilityChange(false)}>close</Button>}
      title={photo.filename}
      actions={actions}
      prominentTitle
    />
    <section className="md-toolbar-relative--prominent dialogs__content drawers__content__scrollable">
      <Media aspectRatio="1-1">
        <img src={`https://unsplash.it/360/520/?image=${photo.id}`} role="presentation" />
        <MediaOverlay>
          <CardTitle title={photo.author} subtitle={photo.post_url} />
        </MediaOverlay>
      </Media>
      <div className="md-grid">
        <p className="md-cell md-cell--12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum tortor ipsum,
          et lobortis magna vestibulum nec. Nullam eu feugiat nibh. Pellentesque eget sem mollis,
          feugiat lectus in, bibendum sapien. Sed fringilla iaculis turpis, eget semper nunc
          pharetra a. Phasellus convallis nisi sem, vitae dapibus sem efficitur vitae. Nulla id
          condimentum massa. Nullam commodo sed lorem id placerat. Aliquam posuere volutpat elit
          sed tempus.
        </p>
        <p className="md-cell md-cell--12">
          Duis at lobortis libero, malesuada rhoncus nisi. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia Curae; Aenean sodales ex quis tincidunt ultricies.
          Praesent ac ex ultrices libero ullamcorper maximus ut vitae mi. Praesent sit amet elit
          eget quam porta gravida ut non ante. Aenean at elementum eros. Proin ultricies tempor nisi
          quis ullamcorper. Mauris interdum augue in pharetra ornare. Maecenas a lectus rhoncus quam
          commodo faucibus ut eleifend nisl. Morbi finibus purus vel lectus rhoncus tristique. Sed
          euismod eget est sed sodales. Vestibulum vestibulum eget arcu at vehicula. Proin sed
          felis quis lorem bibendum suscipit ac vel massa. Integer vel imperdiet sem. Morbi
          sollicitudin sapien non risus volutpat, id rutrum nisl lacinia. Cras ac iaculis neque.
        </p>
      </div>
    </section>
  </Drawer>
);

PhotoDrawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  onVisibilityChange: PropTypes.func.isRequired,
  photo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    filename: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    post_url: PropTypes.string.isRequired,
  }),
};

PhotoDrawer.defaultProps = {
  photo: {
    id: -1,
    filename: 'fakefilename.jpg',
    author: 'Fake Author',
    post_url: '',
  },
};

export default PhotoDrawer;
