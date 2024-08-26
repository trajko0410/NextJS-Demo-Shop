import React, { createContext, useState, useContext } from "react";

const PhotoModalContext = createContext({
  oppenModal: (imageUrl) => {},
  closeModal: () => {},
  photoModalImage: null,
  photoModalIsOpen: false,
});

export function PhotoModalProvider({ children }) {
  const [photoModalIsOpen, setPhotoModalIsOpen] = useState(false);
  const [photoModalImage, setPhotoModalImage] = useState(null);

  const oppenModal = (imageUrl) => {
    setPhotoModalIsOpen(true);
    setPhotoModalImage(imageUrl);
  };

  const closeModal = () => {
    setPhotoModalImage(null);
    setPhotoModalIsOpen(false);
  };

  const cartContextValue = {
    photoModalIsOpen,
    photoModalImage,
    oppenModal,
    closeModal,
  };

  return (
    <PhotoModalContext.Provider value={cartContextValue}>
      {children}
    </PhotoModalContext.Provider>
  );
}

export default PhotoModalContext;
