import Loader from './Loader/Loader.jsx';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import fetchPost from '../shared/api';
import Modal from './Modal/Modal';
import { useState, useEffect } from 'react';

export const App = () => {
  const [search, setSearch] = useState(``);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [photoModal, setPhotoModal] = useState(``);
  const [notFound, setNotFound] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        const response = await fetchPost(search, page);
        setItems(prevItems => [...prevItems, ...response]);
        setNotFound(response.length === 0);
        if (response.length < page) {
          setHasMore(false);
        }else{setHasMore(true)}
      } catch (error) {
      } finally {
        setLoading(false);

      }
    };
    if (search) {
      fetchImages();
    }

  }, [search, page]);

  const updateSearch = searchValue => {
    if (searchValue === search) {
      return;
    }
    setSearch(searchValue);
    setItems([]);
    setPage(1);
  };

  const openModal = largeImageURL => {
    setModal(prev => !prev);
    setPhotoModal(largeImageURL);
  };

  const loadMore = () => {
  setPage(prevPage => prevPage + 1)
  }

  return (
    <>
      {modal && <Modal openModal={openModal} photoModal={photoModal} />}
      <header className="searchbar">
        <SearchBar updateSearch={updateSearch} />
      </header>
      {loading && <Loader />}
      {notFound && <h2>No results found</h2>}
      {items.length > 0 && <ImageGallery item={items} openModal={openModal} />}
      {hasMore && items.length > 0 && <Button loadMore={loadMore} />}
    </>
  );
};
