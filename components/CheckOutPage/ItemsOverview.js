import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import ItemsInCart from "../Cart/ItemsInCart";
import TotalPrice from "../Cart/TotalPrice";

import whiteBag from "../../public/images/icons/whiteBag.png";
import continueImage from "../../public/images/icons/arrow-right-white.png";
import emptyCartImage from "../../public/images/icons/emptyshopingbag.png";

import style from "../CheckOutPage/ItemsOverview.module.css";

function ItemsOverview(props) {
  const [total, setTotal] = useState(0);
  const items = props.items;
  //console.log(items.length);

  const totalPrice = (totalPrice) => {
    setTotal(totalPrice);
  };

  return (
    <div className={style.containerForShopingBag}>
      <h2>Your shoping bag</h2>
      <div className={style.ship}>
        {items.length === 0 ? <h3>Cart is empty!</h3> : <h3>Greate Choice!</h3>}
      </div>
      <ItemsInCart
        className={style.itemsInCart}
        totalPrice={totalPrice}
      ></ItemsInCart>
      {items.length > 0 && (
        <div className={style.totalPrice}>
          <TotalPrice totalPrice={total} />
        </div>
      )}
      {items.length === 0 && (
        <div className={style.emptybagContainer}>
          <div className={style.cartIsEmpty}>
            <div className={style.cartIsEmptyImage}>
              <Image src={emptyCartImage} alt="emptyBag" fill></Image>
            </div>
          </div>
        </div>
      )}
      <div className={style.buttons}>
        <Link href="/shop" className={style.editShopingBag}>
          <p>Back to shoping page</p>
          <div className={style.backgroundOfIcon}>
            <Image
              src={whiteBag}
              alt="backToShopingPage"
              height={30}
              width={30}
            ></Image>
          </div>
        </Link>
        {items.length > 0 && (
          <div className={style.continue} onClick={props.continue}>
            <p>Continue</p>
            <Image
              src={continueImage}
              alt="continue"
              height={30}
              width={30}
            ></Image>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemsOverview;
