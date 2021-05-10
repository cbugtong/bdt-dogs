import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  AppBar,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import Dog from '../components/Dog';


const useStyles = makeStyles(() => ({
  main: {
    backgroundColor: '#EEE2DF',
  },
  dogs: {
    backgroundColor: '#EED7C5',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
  }
}));

const Main = () => {
  const classes = useStyles();
  const [dogs, setDogs] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [showFavorites, setShowFavorites] = useState(false);
  const [toShow, setToShow] = useState(20);
  
  useEffect(() => {
    const url = 'https://dog.ceo/api/breeds/list/all';
    fetch(url)
    .then(res => res.json())
    .then(res => {
        if (res) {
          setDogs(Object.keys(res?.message).map(name => ({ name })));
        }  
    })
    // .error(err => { console.err(err); });
  }, []);

  window.onscroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && toShow < dogs.length) {
      setToShow(toShow + 20);
    }
  };

  const onFavorite = (dogName, favorite) => {
    const lookup = favorites;
    lookup[dogName] = favorite;
    setFavorites(lookup);
  };

  const handleChange = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <div className={classes.main}>
      <Typography variant="h5">Welcome to the Dog Show!</Typography>
      <AppBar position="static">
        <FormControlLabel
          control={
            <Switch
              checked={showFavorites}
              onChange={handleChange}
              name="favoriteToggle"
              color="secondary"
            />
          }
          label="Filter Favorites"
        />
      </AppBar>
      <div className={classes.dogs}>
        {(dogs || [])
        .slice(0, toShow)
        .map((dog) => {
          return (
            <Dog
              key={dog.name}
              dog={dog}
              onFavorite={onFavorite}
              show={!showFavorites || favorites[dog.name]}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Main;