import { useState } from 'react';
import checkedHeart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';

type SongCardProps = {
  trackId: number,
  previewUrl: string,
  trackName: string,
};

function MusicCard({ trackName, previewUrl, trackId }:SongCardProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div>
      <h3>{trackName}</h3>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
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
