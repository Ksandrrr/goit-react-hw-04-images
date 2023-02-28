import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
const  ImageGalleryItem = ({webformatURL, largeImageURL, tags, openModal }) =>  {

    return (
      <li className={css.gallaryItem}>
        <img
          className={css.gallaryLargeImage}
          src={webformatURL}
          alt={tags}
          onClick={() => openModal(largeImageURL)}
        />
      </li>
    );
  }

ImageGalleryItem.propTypes = {
  openModal: PropTypes.func,
  id: PropTypes.number,
  tags: PropTypes.string,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
};

export default ImageGalleryItem;
