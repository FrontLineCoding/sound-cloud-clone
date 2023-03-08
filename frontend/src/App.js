import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import ListSongs from './components/Songs/ListSongs';
import MySongs from './components/MyStuff/MySongs';
import ListAlbums from './components/Albums/ListAlbums';
import MyAlbums from './components/MyAlbums/MyAlbums';
import SplashPage from './components/Splash/SplashPage';
import Footer from './components/Footer/Footer';
import Player from './components/MusicPlayer/MusicPlayer';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  const cur = useSelector((state) => state.session.user);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && cur ? (
        <Switch>
          <Route path={[`/:username/songs`, '/:username/songs/:songId']}>
            <MySongs></MySongs>
            <Player />
          </Route>
          <Route path={[`/:username/albums`, '/:username/albums/:albumId']}>
            <MyAlbums></MyAlbums>
            <Player />
          </Route>
          <Route exact path={['/', '/songs', '/songs/:songId']}>
            <ListSongs />
            <Player />
          </Route>
          <Route exact path={['/albums', '/albums/:albumId']}>
            <ListAlbums />
            <Player />
          </Route>
        </Switch>
      ) : (
        <>
          <Route exact path="/">
            <SplashPage></SplashPage>
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </>
      )}
      <Footer />
    </>
  );
}

export default App;
