import ItemsCarousel from "./ItemOnRecomended";
import style from "./RecomendedItems.module.css";

import arrow from "../../public/images/icons/arrow-right.png";
import arrowGrey from "../../public/images/icons/arrow-right-grey.png";

import { useEffect, useState } from "react";
import Image from "next/image";

function RecomendedItemsComputer(props) {
  const recomendedItems = props.recomendedItems;
  //console.log(recomendedItems, "comp");

  //console.log(window.innerWidth);

  const lengthOfRecemendedItems = recomendedItems.length;

  const [beginingSliderIndex, setBeginingSliderIndex] = useState(0);
  const [endSliderIndex, setEndSliderIndex] = useState(beginingSliderIndex + 2); //ovo treba promeniti

  const [greyArrowLeft, setGreyArrowLeft] = useState(false);
  const [greyArrowRight, setGreyArrowRight] = useState(false);

  useEffect(() => {
    if (lengthOfRecemendedItems <= 3) {
      //ovo
      setGreyArrowLeft(true);
      setGreyArrowRight(true);
    } else if (endSliderIndex === lengthOfRecemendedItems - 1) {
      setGreyArrowRight(true);
    } else if (beginingSliderIndex === 0) {
      setGreyArrowLeft(true);
      //setGreyArrowRight(true);
    }
  }, [
    endSliderIndex,
    lengthOfRecemendedItems,
    beginingSliderIndex,
    //smallestLengthPosible,
  ]);

  function nextSlide() {
    setBeginingSliderIndex(beginingSliderIndex + 1);
    setEndSliderIndex(beginingSliderIndex + 3); //ovo
    setGreyArrowLeft(false);
  }

  function previousSlide() {
    setBeginingSliderIndex(beginingSliderIndex - 1);
    setEndSliderIndex(beginingSliderIndex + 1);
    setGreyArrowRight(false);
  }

  const itemsList = recomendedItems.map((item, index) => (
    <ItemsCarousel
      key={item.id}
      id={index}
      navigationID={item.id}
      name={item.Name}
      price={item.Price}
      mainPhoto={item.MainPhoto}
      beginingSliderIndex={beginingSliderIndex}
      endSliderIndex={endSliderIndex}
    />
  ));

  if (lengthOfRecemendedItems === 0) {
    return;
  } else {
    return (
      <div className={style.recomended}>
        <h2>What we recomend!</h2>
        <div className={style.slider}>
          <div className={style.left}>
            {!greyArrowLeft && (
              <Image
                src={arrow}
                alt="leftArrow"
                onClick={previousSlide}
                height={50}
                width={50}
              ></Image>
            )}
            {greyArrowLeft && (
              <Image
                src={arrowGrey}
                alt="disabledArrow"
                height={50}
                width={50}
              ></Image>
            )}
          </div>
          <div className={style.container}>{itemsList}</div>
          <div className={style.right}>
            {!greyArrowRight && (
              <Image
                src={arrow}
                alt="rightArrow"
                height={50}
                width={50}
                onClick={nextSlide}
              ></Image>
            )}
            {greyArrowRight && (
              <Image
                src={arrowGrey}
                alt="disabledArrow"
                height={50}
                width={50}
              ></Image>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default RecomendedItemsComputer;
