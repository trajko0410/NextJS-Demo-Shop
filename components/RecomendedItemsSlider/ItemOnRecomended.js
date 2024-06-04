import style from "./ItemOnRecomended.module.css";

import Link from "next/link";
import Image from "next/image";

function ItemOnRecomended(props) {
  return (
    <div
      className={
        props.id >= props.beginingSliderIndex &&
        props.id <= props.endSliderIndex
          ? style.container
          : style.notActive
      }
    >
      <div className={style.info}>
        <h3>{props.name}</h3>
        <div className={style.image}>
          <Image
            src={props.mainPhoto}
            alt="ItemImage"
            fill
            objectFit="contain"
          ></Image>
        </div>
        <h4>Price starts at:</h4>
        <h5>{props.price}$</h5>
        <Link
          href={`/shop/${props.navigationID}`}
          className={style.BuyItemButton}
        >
          Buy Item
        </Link>
      </div>
    </div>
  );
}

export default ItemOnRecomended;
