import Link from "next/link";
import Image from "next/image";

import style from "./Cart.module.css";
import { createPortal } from "react-dom";

import ItemsInCart from "./ItemsInCart";
import TotalPrice from "./TotalPrice";
import { useEffect, useState } from "react";

import closeImage from "../../public/images/icons/close.png";
import emptyCartImage from "../../public/images/icons/emptyshopingbag.png";

//import { motion } from "framer-motion";

function Cart(props) {
  const cartState = props.cartState;
  const cartItemsLenght = props.cartItemsLenght;

  const [total, setTotal] = useState(0);
  const [isCartEmpty, setIsCartEmpty] = useState(false);

  const closeModal = props.cartHandler;

  useEffect(() => {
    if (cartItemsLenght === 0) {
      setIsCartEmpty(true);
    } else {
      setIsCartEmpty(false);
    }
  }, [cartItemsLenght]);

  const totalPrice = (totalPrice) => {
    setTotal(totalPrice);
  };

  return (
    <div
      className={`${
        cartState === undefined
          ? style.cartUndefined
          : !cartState
          ? style.cartOut
          : style.cart
      }`}
    >
      <div className={style.overlay}>
        <div className={style.closeBtnImage}>
          <Image
            src={closeImage}
            alt="closeModal"
            onClick={closeModal}
            width={30}
            height={30}
          ></Image>
        </div>

        <div className={style.cartNaslov}>
          <h2>Your Cart</h2>
        </div>

        {isCartEmpty && (
          <div className={style.cartIsEmpty}>
            <div className={style.cartIsEmptyImage}>
              <Image
                src={emptyCartImage}
                alt="emptyBag"
                width={200}
                height={200}
              ></Image>
            </div>
            <h4>Cart is empty!</h4>
            <Link href="/shop" onClick={closeModal} className={style.shopBtn}>
              Shop Now
            </Link>
          </div>
        )}
        {!isCartEmpty && (
          <div className={style.containerIfCartNotEmpty}>
            <ItemsInCart totalPrice={totalPrice} />
            <div className={style.centeredBotom}>
              <TotalPrice totalPrice={total} /> {/* ide dole*/}
              <div className={style.buttonNotNow} onClick={closeModal}>
                <h4>Not Now</h4>
              </div>
              <Link
                href="/checkout"
                onClick={closeModal}
                className={style.buttonAddToCart}
              >
                <h4>Check Out</h4>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} //nalayimo portal ovako i tu se orvara

export default Cart;
