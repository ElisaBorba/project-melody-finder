import { useState } from 'react';
import checkedHeart from '../images/heartSolid.png';
import emptyHeart from '../images/heartRegular.png';
import { SongType } from '../types';
import styles from './MusicCard.module.css';

function MusicCard({ trackName, previewUrl, trackId }:SongType) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className={ styles.musicCard }>
      <div className={ styles.audio }>
        <h3>{trackName}</h3>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
      <label
        data-testid={ `checkbox-music-${trackId}` }
        htmlFor={ trackName }
        className="heart-checkbox"
      >
        <input
          type="checkbox"
          id={ trackName }
          name="favoriteSong"
          checked={ isChecked }
          onChange={ handleChange }
        />
        <img
          src={ isChecked ? checkedHeart : emptyHeart }
          alt="favorite"
        />
      </label>
    </div>
  );
}

export default MusicCard;
