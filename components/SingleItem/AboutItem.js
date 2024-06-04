//import { useLoaderData } from "react-router-dom";
import { useState } from "react";

import ItemPhotoSlider from "./ItemPhotoSlider";
import Model from "./Model";
import Colors from "./Colors";
import Price from "./Price";
import AddToCartButton from "./AddToCartButton";
import Avaliable from "./Available";

import style from "./AboutItem.module.css";

function AboutItem(props) {
  const itemData = props.itemData;
  //console.log(loaderData);

  const [itemPrice, setItemPrice] = useState();
  const [itemColor, setItemColor] = useState();
  const [itemMemory, setItemMemory] = useState();

  const choseItemPrice = (price) => {
    setItemPrice(price);
  };

  const chosenItemMemory = (memory) => {
    setItemMemory(memory);
  };

  const chosenItemColor = (color) => {
    setItemColor(color);
  }; //podigli smo iy color eache

  return (
    <div className={style.container}>
      <div className={style.aboutItem}>
        <div className={style.img}>
          <ItemPhotoSlider colorChosen={itemColor} itemData={itemData} />
        </div>

        <div className={style.textData}>
          <h2 className={style.name}>{itemData.Name}</h2>
          <h3 className={style.shortDescription}>
            {itemData.ShortDescription}
          </h3>
          <div className={style.memory_color}>
            <Model
              loaderData={itemData}
              choseItemPrice={choseItemPrice}
              chosenItemMemory={chosenItemMemory}
            />
          </div>
          <div className={style.memory_color}>
            <Colors chosenItemColor={chosenItemColor} loaderData={itemData} />
          </div>
          <Price itemPrice={itemPrice} />
          <AddToCartButton
            itemPrice={itemPrice}
            itemColor={itemColor}
            itemName={itemData.Name}
            photo={itemData.MainPhoto}
            itemMemory={itemMemory}
            available={itemData.Available}
          />
          <Avaliable loaderData={itemData} />
        </div>
      </div>
    </div>
  );
}

//console.log(itemColor);
// primili smo ga iz modela koji je primio iy model each i sada cemo ga poslati dole do sekcije koja ce prikayati cene

export default AboutItem;
