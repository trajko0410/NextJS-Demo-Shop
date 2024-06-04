import { useContext, useEffect } from "react";
import CartContext from "../../context/cartContextProvider";
import styles from "./NumberOfItems.module.css";

function NumberOfItemsInCart(props) {
  const cartContext = useContext(CartContext);

  const totalCartItems = cartContext.items.reduce(
    (totalNumberOfItems, items) => {
      return totalNumberOfItems + items.quantity;
    },
    0 //pocetno stanje
  ); //funkcija koja proverava iteme u cartu i ispisuje je

  useEffect(() => {
    props.totalCartItems(totalCartItems);
  }, [props, totalCartItems]);
  return (
    <div className={styles.container}>
      <div>{totalCartItems}</div>
    </div>
  );
}

export default NumberOfItemsInCart;
