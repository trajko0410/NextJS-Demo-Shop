import { useEffect, useState } from "react";
import style from "./ItemPhotoSliderEach.module.css";
//import { useSearchParams } from "react-router-dom";
import Image from "next/image";

function ItemPhotoSliderEach(props) {
  const defayltPhoto = props.defaultPhoto;
  const p = props.photos;
  //console.log(p, "p");
  //console.log(defayltPhoto);
  //const po = storage();

  const length = Object.keys(p).length; //proveravam duzinyu objekta photos
  //console.log(length);

  //console.log(length);

  const [photos, setPhotos] = useState([]);
  const [activePhoto, setActivePhoto] = useState(p.p1);

  //console.log(activePhoto);
  function setActivePhotoHandler(photo) {
    setActivePhoto(photo);
  }

  useEffect(() => {
    const loadedItems = [];
    for (const key in p) {
      loadedItems.push({
        id: key,
        picture: p[key],
      });
    }
    setPhotos(loadedItems);
  }, [p]);
  //console.log(photos);

  if (length === 0 || activePhoto === undefined) {
    return (
      <>
        <div className={style.mainImage}>
          <Image
            src={defayltPhoto}
            alt="ActivePhot"
            layout="fill"
            objectFit="contain"
            loading="eager"
          ></Image>
        </div>
        <div className={style.photos}>
          <div className={`${style.photoSlider} ${style.back}`}>
            <div className={`${style.singlePhoto} `}>
              <Image
                loading="eager"
                layout="fill"
                objectFit="contain"
                src={defayltPhoto}
                alt={`ItemPhoto`}
              ></Image>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={style.mainImage}>
          <Image
            loading="eager"
            src={activePhoto}
            alt="ActivePhot"
            layout="fill"
            objectFit="contain"
          ></Image>
        </div>
        <div className={style.photos}>
          {photos.map((photo) => (
            <div
              className={`${style.photoSlider} ${
                activePhoto === photo.picture ? style.back : undefined
              }`}
              key={photo.id}
            >
              <div className={`${style.singlePhoto} `}>
                <Image
                  loading="eager"
                  src={photo.picture}
                  alt={`ItemPhoto`}
                  onClick={() => setActivePhotoHandler(photo.picture)}
                  layout="fill"
                  objectFit="contain"
                ></Image>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  /*const [searchParams, setSearchParams] = useSearchParams();

  const colorParams = searchParams.get("phoneColor");
  console.log(`Params${colorParams}`);
  const length = props.length;
  const defaultPhoto = props.defaultPhoto;
  const color = props.color;

  const photosfromSlider = props.sliderPhotos;

  const [availablePhotos, setAvailablePhotos] = useState(photosfromSlider);

  useEffect(() => {
    setAvailablePhotos(photosfromSlider);
  }, [photosfromSlider]);

  console.log(photosfromSlider);
  const [activePhoto, setActivePhoto] = useState(availablePhotos[0]);

  function setActivePhotoHandler(photo) {
    setActivePhoto(photo);
  }
  //console.log(sliderPhotos);

  return (
    <>
      <div className={style.photosSlider}>
        {color === undefined ? (
          <div>
            <img src={activePhoto} alt="d"></img>

            <img
              className={style.singlePhoto}
              src={activePhoto.picture}
              alt="a"
            ></img>
          </div>
        ) : (
          <>
            <img className={style.singlePhoto} src={activePhoto} alt="a"></img>
            {props.sliderPhotos.map((photo) => (
              <div key={photo.id}>
                <img
                  className={style.singlePhoto}
                  src={photo.picture}
                  alt="slika"
                  onClick={() => setActivePhotoHandler(photo.picture)}
                ></img>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );*/
}

export default ItemPhotoSliderEach;
