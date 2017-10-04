import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-md';

import './_styles.scss';
import GoogleDocsDialog from './GoogleDocsDialog';

const GoogleDocsClone = ({ show, hide, visible, desktop }) => {
  if (!desktop) {
    return (
      <h2>
        Sorry, I didn&apos;t feel like making this clone fully responsive. View on
        a desktop screen if it interests you.
      </h2>
    );
  }

  return (
    <div>
      <Button raised onClick={show}>
        Open Google Docs Clone
      </Button>
      <GoogleDocsDialog visible={visible} hide={hide} />
    </div>
  );
};

GoogleDocsClone.propTypes = {
  show: PropTypes.func,
  hide: PropTypes.func,
  visible: PropTypes.bool,
  desktop: PropTypes.bool,
};

export default GoogleDocsClone;
