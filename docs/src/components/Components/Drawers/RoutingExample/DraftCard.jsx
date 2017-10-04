import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, CardTitle } from 'react-md';

const DraftCard = ({ title, to, message }) => (
  <Card className="md-cell md-cell--12 md-text-container">
    <CardTitle title={`Subject: ${title}`} subtitle={`To: ${to}`} />
    <CardText>
      <p>{message}</p>
    </CardText>
  </Card>
);

DraftCard.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default DraftCard;
