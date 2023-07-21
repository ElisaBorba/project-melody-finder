import React from 'react';
import { Link } from 'react-router-dom';
import { AlbumType } from '../types';

type AlbumProps = {
  inputValue: string;
  albums: AlbumType[];
};

function AlbumCard({ inputValue, albums }: AlbumProps) {
  return (
    <div>
      <h2>
        Resultado de álbuns de:
        {' '}
        {inputValue}
      </h2>
      <ul>
        {albums.map((album) => (
          <li key={ album.collectionId }>
            <Link
              to={ `/album/${album.collectionId}` }
              data-id={ album.collectionId }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              <h4>{album.collectionName}</h4>
              <img src={ album.artworkUrl100 } alt={ `Álbum de ${album.artistName}` } />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlbumCard;
