import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import { slugify } from '../helpers/helperFunctions';

export default function EventCard(props) {
  const event = props.campaign;

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={slugify(event.title)}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="175"
            image={event.banner}
            alt={event.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {event.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
