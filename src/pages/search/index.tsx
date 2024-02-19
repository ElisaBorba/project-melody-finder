import React, { useState } from 'react';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';
import AlbumCard from '../../components/AlbumCard';
import styles from './Search.module.css';
import Carregando from '../../components/Carregando';
import searchBtn from '../../images/searchBtn.svg';

const INITIAL_SEARCH_STATE = {
  search: '',
};

export type SearchValueType = {
  search?: string | undefined,
};

function Search() {
  const [searchValue, setSearchValue] = useState<SearchValueType>(INITIAL_SEARCH_STATE);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const { search } = searchValue;
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [showAlbum, setShowAlbum] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const albumsResult: AlbumType[] = await searchAlbumsAPI(String(search));
      setLoading(false);
      setAlbums(albumsResult);
      setSearchValue(INITIAL_SEARCH_STATE);
      setShowAlbum(true);
    } catch (error: any) {
      setLoading(false);
      throw new Error('Nenhum álbum foi encontrado');
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchValue({
      ...searchValue,
      [name]: value,
    });
    setInputValue(value);
    validateSearch();
  };

  const validateSearch = (): boolean => {
    let valid = true;

    if (String(search).length < 2) {
      valid = false;
    }
    return valid;
  };

  if (loading) {
    <Carregando />;
  }

  return (
    <div>
      <form className={ styles.search } onSubmit={ onSubmit }>
        <label htmlFor="search">
          <input
            data-testid="search-artist-input"
            type="text"
            name="search"
            placeholder="Nome do Artista"
            value={ search }
            onChange={ onChange }
            required
          />
        </label>
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ !validateSearch() }
          className={ styles.searchBtn }
        >
          <img src={ searchBtn } alt="icon search" />
        </button>
      </form>

      {showAlbum && (albums.length > 0
        ? (<AlbumCard inputValue={ inputValue } albums={ albums } />)
        : (<h3>Nenhum álbum foi encontrado </h3>))}
    </div>
  );
}

export default Search;
