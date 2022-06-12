import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import EventCard from '../../components/EventCard';

import { experimentalStyled as styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import '../../styles/Events.scss';

function Events(props) {
  const campaigns = props.campaigns;

  useEffect(() => {}, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="events">
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 2, md: 12 }}
        >
          {campaigns &&
            campaigns.map((campaign) => (
              <Grid item xs={1} sm={2} md={4} key={campaign.id}>
                <EventCard campaign={campaign} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Events;
