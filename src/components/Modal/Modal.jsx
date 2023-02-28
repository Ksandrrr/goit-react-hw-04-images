import Style from './Modale.module.css';
import PropTypes from 'prop-types';
import { RotatingLines } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('root');
const Modal = ({ openModal, photoModal }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const closeModal = e => {
    if (e.target.nodeName === `IMG`) {
      return;
    }
    openModal();
  };
  const handleKeyDown = e => {
    if (e.keyCode === 27) {
      openModal();
    }
  };

  return createPortal(
    <div className={Style.overlay} onClick={closeModal}>
      <div className={Style.modal}>
        {!loaded && (
          <RotatingLines
            strokeColor="black"
            strokeWidth="5"
            animationDuration="0.75"
            width="60"
            visible={true}
            className={Style.RotatingLines}
          />
        )}
        <img
          className={Style.modaleImage}
          src={photoModal}
          alt=""
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? '1' : '0' }}
        />
      </div>
    </div>,
    modalRoot
  );
};
Modal.propTypes = {
  openModal: PropTypes.func,
  photoModal: PropTypes.string,
};
export default Modal;
