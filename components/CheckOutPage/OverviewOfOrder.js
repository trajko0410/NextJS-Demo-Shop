import ItemsInCart from "../Cart/ItemsInCart";
import TotalPrice from "../Cart/TotalPrice";
import Modal from "../Modals/Modal";
import Loading from "../Modals/Loading";

import React, { useCallback } from "react";
import _ from "lodash";

//import FailedModal from "./FailedModal";

import style from "./OverviewOfOrder.module.css";
//import SuccesModal from "./SuccesModal";

import checked from "../../public/images/icons/checked.png";
import emptyCartImage from "../../public/images/icons/emptyshopingbag.png";
import whiteBag from "../../public/images/icons/whiteBag.png";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

//import { AnimatePresence } from "framer-motion";

function OverviwOfOrder(props) {
  const items = props.items; //cart itemi dolazi iy ctx
  //const resetCart = props.resetCart; //resetovanje carta iy cart ctx

  const itemsCartLength = items.length;
  //console.log(itemsCartLength);

  const [total, setTotal] = useState(0);
  const [shippingData, setData] = useState({});
  const [responseData, setResponseData] = useState();

  const [newsletterNotification, setNewsletterNotification] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const shipping = props.shippingInfo;
  const timestamp = new Date().toISOString();
  //console.log(timestamp);

  /* function modalHandler() {
    setSuccesModal(false);
    setModalFaild(false);
    resetCart();
  }//sredutu */

  useEffect(() => {
    setData(shipping);
  }, [props, shipping]); //moramo ovo da bi se updatovali info o shipingu svaki put kada ih promenimo

  const totalPrice = (totalPrice) => {
    setTotal(totalPrice);
  };

  //const [error, setError] = useState(null);

  //console.log(shippingData, "posled");

  async function addOrderToServer() {
    //event.preventDefault();
    setIsLoading(true);
    setNewsletterNotification(true);
    await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify({
        orderedItems: items,
        shippingInfo: shippingData,
        timeStamp: timestamp,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json()) //getting acces to respnse
      .then((data) => setResponseData(data));
    setIsLoading(false);
  }
  //console.log(responseData);

  function clickButton() {
    //console.log("click");
    addOrderToServer();
  }

  const debounceOrderToServer = useCallback(
    _.debounce(() => {
      clickButton();
    }, 500), // Adjust the delay as needed
    [clickButton]
  );

  const modalStateFromChild = (modalState) => {
    setNewsletterNotification(modalState);
  }; //getting modalstate(false) from child when clicked on button
  /*const modalHandler = () => {
    setNewsletterNotification(true);
  };*/
  /*
  const addOrderToServer = async () => {
    try {
      //async function addOrderToServer() {
      //saljemo post firebasu u Orders tabelu
      const response = await fetch(
        "https://shop-4e5c6-default-rtdb.europe-west1.firebasedatabase.app/Orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            orderedItems: items, //pazi kako prosledjujes // 1. key predstavalja tabelu u kojoj ce se pisati ove info
            shippingInfo: shippingData,
            timeStamp: timestamp,
          }),
          headers: {
            "Content-Type": "application/js",
          },
        }
      );
      const data = await response.json();
      //resetCart();
      //console.log(data);
      //console.log(response, "post response");

      if (response.ok) {
        setSuccesModal(true);
      } else {
        setModalFaild(true);
        throw new Error("Failed to post data to the server!");

        //console.log("greska");
      } //ako uspe modal postavicemo ga
    } catch (error) {
      setError(error.message);
      setModalFaild(true);
    }
  };*/

  //console.log(modal);

  //console.log("ime", shippingData.name);
  //console.log(error);
  //console.log(modalFailed);

  return (
    <>
      <div className={style.containerForShopingBag}>
        <h2>Overview of your order!</h2>
        <div className={style.ship}>
          <h3>Almost done!</h3>
          <Image src={checked} alt="free" width={30} height={30}></Image>
        </div>
        {itemsCartLength > 0 && (
          <>
            <ItemsInCart totalPrice={totalPrice} itemsInCart={items} />
            <div className={style.totalPrice}>
              <TotalPrice totalPrice={total} />
            </div>
            <div className={style.shippingInfo}>
              <h3>Shipping Info</h3>
              <h4>Name: {shippingData.name}</h4>
              <h4>Email: {shippingData.email}</h4>
              <h4>Address: {shippingData.address}</h4>
              <h4>City: {shippingData.city}</h4>
              <h4>Zip: {shippingData.zip}</h4>
              <h4>Phone number: {shippingData.phone}</h4>
            </div>
            <div className={style.buttons}>
              <div onClick={props.back} className={style.editShopingBag}>
                <p>Back to payment info</p>
              </div>
              <div
                className={style.continue}
                onClick={() => {
                  debounceOrderToServer();
                }}
              >
                <p>Submit</p>
              </div>
            </div>
          </>
        )}
        {itemsCartLength === 0 && (
          <>
            <div className={style.emptybagContainer}>
              <div className={style.cartIsEmpty}>
                <div className={style.cartIsEmptyImage}>
                  <Image src={emptyCartImage} alt="emptyBag" fill></Image>
                </div>
              </div>
              <h3>Your cart is empty!</h3>
            </div>
            <div className={style.buttons}>
              <Link href="/shop" className={style.editShopingBag}>
                <p>Back to shoping page</p>
                <div className={style.backgroundOfIcon}>
                  <Image
                    src={whiteBag}
                    alt="backToShopingPage"
                    width={30}
                    height={30}
                  ></Image>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
      <Suspense fallback={<Loading />}>
        {newsletterNotification && (
          <Modal
            sucessText={"Your order has successfully been submitted"}
            failedText={
              "Sorry something went wrong! Try again later to submit your order!"
            }
            responseData={responseData}
            modalStateFromChild={modalStateFromChild}
            modalState={newsletterNotification}
            typeofmodal={"ORDER"}
            isLoading={isLoading}
          />
        )}
      </Suspense>
    </>
  ); //modal mozemo staviti u posebni element
}

export default OverviwOfOrder;

/*

      {modalFailed && <FailedModal modalHandler={modalHandler} error={error} />}
      <AnimatePresence>
        {modalSuccess && <SuccesModal modalHandler={modalHandler} />}
      </AnimatePresence>
*/
