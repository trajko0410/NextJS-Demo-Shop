import Image from "next/image";

import { createPortal } from "react-dom";

import style from "./PhotoModal.module.css";

import { useEffect, useState } from "react";

import closeImage from "../../public/images/icons/close.png";
import Loader from "../ui/loader";

function PhotoModal(props) {
  const photoModalCTX = props.photoModalCTX;
  const [loading, setLoading] = useState(true);

  return (
    <>
      {createPortal(
        <div
          className={style.modalContainer}
          onClick={photoModalCTX.closeModal}
        >
          <div className={style.modal}>
            <div className={style.closeImage}>
              <Image
                src={closeImage}
                alt="closeImage"
                width={30}
                height={30}
                onClick={photoModalCTX.closeModal}
              ></Image>
            </div>
            <div className={style.image}>
              {loading && (
                <div className={style.loaderContainer}>
                  <Loader />
                </div>
              )}
              <Image
                src={photoModalCTX.photoModalImage}
                alt="image"
                width={380}
                height={380}
                onLoadingComplete={() => setLoading(false)}
              ></Image>
            </div>
          </div>
        </div>,
        document.getElementById("modal")
      )}
    </>
  );
}

export default PhotoModal;
