//import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";

import ItemPhotoSliderEach from "./ItemPhotoSliderEach";

function Colors(props) {
  const itemData = props.itemData;
  const ColorData = itemData.Color;
  const chosenColor = props.colorChosen;
  const defaultPhoto = itemData.MainPhoto;

  const [sliderPhotos, setSliderPhotos] = useState([]);

  useEffect(() => {
    const loadedItems = [];
    for (const key in ColorData) {
      loadedItems.push({
        id: key,
        pictures: ColorData[key].Photos,
        color: ColorData[key].Color,
      });
    }
    setSliderPhotos(loadedItems);
  }, [ColorData]);

  //console.log(itemData);
  //console.log(sliderPhotos);
  //console.log(chosenColor);

  return (
    <>
      {sliderPhotos.map((photo) => (
        <div key={photo.id}>
          {chosenColor === photo.color && (
            <div>
              <ItemPhotoSliderEach
                photos={photo.pictures}
                defaultPhoto={defaultPhoto}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
}

/*const loaderData = useLoaderData();

  const photos = loaderData.PhotosSlider;
  const defaultPhoto = loaderData.MainPhoto;
  const chosenColor = props.colorChosen;

  console.log(`mainphoto ${defaultPhoto}`);
  const photosChosenColorPhoto = photos[chosenColor]; //umesto . stavio sam [] i dobio sam isto samo sto chosen Color se menja na kluku u color eact

  //console.log(chosenColor);

  const length = Object.keys(photos).length; //proveravam duzinyu objekta photos
  //console.log(length);

  //console.log(photos);
  //console.log(photosChosenColorPhoto);
  //console.log(chosenColor);

  const [sliderPhotos, setSliderPhotos] = useState([]);

  useEffect(() => {
    const loadedItems = [];
    for (const key in photosChosenColorPhoto) {
      loadedItems.push({
        id: key,
        picture: photosChosenColorPhoto[key],
      });
    }
    setSliderPhotos(loadedItems);
  }, [photosChosenColorPhoto]);
  //console.log(`photoSlider ${sliderPhotos[0].picture}`);

  //const firstPhoto = photosChosenColorPhoto;

  return (
    <ItemPhotoSliderEach
      className={style.photosSlider}
      length={length}
      defaultPhoto={defaultPhoto}
      photosChosenColorPhoto={photosChosenColorPhoto}
      sliderPhotos={sliderPhotos}
      color={chosenColor}
    ></ItemPhotoSliderEach>
  );*/

export default Colors;
