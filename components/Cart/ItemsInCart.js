import { useContext, useEffect } from "react";
import CartContext from "../../context/cartContextProvider";
import Item from "./Item";
import { useState } from "react";

import style from "./ItemsInCart.module.css";

function IndividualItems(props) {
  const cartCtx = useContext(CartContext);
  const items = cartCtx.items;

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;

    for (let item of items) {
      total += item.quantity * item.itemPrice;
    }

    setTotalPrice(total);
  }, [items]); //racunamo total

  //console.log(items);
  useEffect(() => {
    props.totalPrice(totalPrice);
    //props.items(items);
  }, [totalPrice, props]); //saljemo gore

  //console.log(totalPrice);

  return (
    <div className={style.containerItems}>
      {items.map((item) => (
        <Item
          item={item}
          addItem={cartCtx.addItem}
          removeItem={cartCtx.removeItem}
          key={item.id}
        ></Item>
      ))}
    </div> //saljemo cartCtx dole svim mapiranim proizvodima u cartu
  );
}

export default IndividualItems;
