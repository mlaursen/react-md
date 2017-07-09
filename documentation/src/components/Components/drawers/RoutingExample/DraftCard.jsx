import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';

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
