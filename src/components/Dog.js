import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  CardActions,
  IconButton,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles(() => ({
  root: {
    width: 345,
    margin: 5,
  },
  media: {
    height: 140,
  }
}));

const Dog = ({ dog, show, onFavorite }) => {
  const classes = useStyles();
  const [image, setImage] = useState('');
  const [favorite, setFavorite] = useState(false);
  
  useEffect(() => {
    const url = `https://dog.ceo/api/breed/${dog.name}/images/random`;
    fetch(url)
    .then(res => res.json())
    .then(res => {
      setImage(res.message);
    })
  }, []);

  const handleFavorite = () => {
    setFavorite(!favorite);
    onFavorite(dog.name, !favorite);
  };

  return (
    <>
      {dog && show ? (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={image}
              title={dog.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {dog.name}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <IconButton size="small" color="primary" onClick={handleFavorite}>
              {favorite ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          </CardActions>
        </Card>
      ) : null}
    </>
  )
};

export default Dog;