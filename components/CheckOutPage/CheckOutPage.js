import ItemsOverview from "./ItemsOverview";
import OrientalSlider from "./OrientalSlider";
import OverviewOfOrder from "./OverviewOfOrder";
import PaymentForm from "./PaymentForm";
import ShippingForm from "./ShippingForm";

import CartContext from "../../context/cartContextProvider";

import style from "./CheckOutPage.module.css";

import { useState } from "react";
import { useContext } from "react";
import { useRouter } from "next/navigation";

function CheckOutPage() {
  const cartCtx = useContext(CartContext);
  const router = useRouter();
  const items = cartCtx.items;
  const resetCart = cartCtx.clearCart;

  //if (items.length <= 0) {
  //router.push("/shop");
  //console.log("replace");
  //}
  //console.log(cartCtx.items.length, "cart lenght");

  const [activeIndex, setActiveIndex] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({});

  //const indexValue = (index) => {
  // setActiveIndex(index);
  //};
  //console.log("activeind", activeIndex);
  const personData = (data) => {
    setShippingInfo(data);
  }; //podigli smo iy color eache

  //continue button gde svaki put kada stisnemo dodamo 1 na indx i na osnovu toga prikayujemo dtugaciji element
  function continueHandler() {
    if (activeIndex < 4) {
      setActiveIndex(activeIndex + 1);
    } //else {
    //console.log("sybmit form moglismo odvde da stavimo submit cod ya POST");
    //}
    return;
  }

  function backHandler() {
    setActiveIndex(activeIndex - 1);
  }

  return (
    <div className={style.maincontainer}>
      <OrientalSlider activeIndex={activeIndex} />
      {activeIndex === 1 && (
        <ItemsOverview items={items} continue={continueHandler} />
      )}

      {activeIndex === 2 && (
        <ShippingForm
          personData={personData}
          continue={continueHandler}
          back={backHandler}
        />
      )}
      {activeIndex === 3 && (
        <PaymentForm continue={continueHandler} back={backHandler} />
      )}
      {activeIndex === 4 && (
        <OverviewOfOrder
          shippingInfo={shippingInfo}
          back={backHandler}
          items={items}
          resetCart={resetCart}
        />
      )}
    </div>
  );
}

export default CheckOutPage;
