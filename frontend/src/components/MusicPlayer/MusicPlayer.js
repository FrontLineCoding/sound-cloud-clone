import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useSelector } from 'react-redux';
import './MusicPlayer.css';
import { selectedSong } from '../Songs/ListSongs';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Player = () => {
  const { songId } = useParams();
  return (
    <div className="media-player">
      <AudioPlayer
        src={selectedSong?.url}
        header={selectedSong?.title}
        showSkipControls={true}
        showJumpControls={false}
        showFilledVolume={true}
      />
    </div>
  );
};

export default Player;
