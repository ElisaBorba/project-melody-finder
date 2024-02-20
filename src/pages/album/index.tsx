import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../../services/musicsAPI';
import { SongType, AlbumType } from '../../types';
import Carregando from '../../components/Carregando';
import MusicCard from '../../components/MusicCard';
import styles from './Album.module.css';

function Album() {
  const [isLoading, setIsLoading] = useState(false);
  const [albumData, setAlbumData] = useState<AlbumType>();
  const [songs, setSongs] = useState<(AlbumType | SongType)[]>();
  const { id } = useParams<{ id:string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistData = await getMusics(id as string);
        setAlbumData(artistData[0]);
        setSongs(artistData.slice(1));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw new Error('Erro, API não resolvida');
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className={ styles.container }>
      {isLoading && <Carregando />}
      {albumData && (
        <div className={ styles.artist }>
          <h1 data-testid="artist-name">
            {albumData.artistName}
          </h1>
          <h2 data-testid="album-name">
            {albumData.collectionName}
          </h2>
          <img
            src={ albumData.artworkUrl100 }
            alt={ `Álbum: ${albumData.collectionName}` }
          />
        </div>
      )}

      {songs && (
        <div className={ styles.musicContainer }>
          {songs.map((song) => ('trackId' in song ? (
            <MusicCard
              key={ (song as SongType).trackId }
              previewUrl={ (song as SongType).previewUrl }
              trackName={ (song as SongType).trackName }
              trackId={ (song as SongType).trackId }
            />

          ) : (
            null
          )))}
        </div>
      )}
    </div>
  );
}

export default Album;
