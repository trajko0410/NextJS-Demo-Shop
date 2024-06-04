import { useContext } from "react";
import style from "./AddToCartButton.module.css";
import CartContext from "../../context/cartContextProvider";

function BuyButton(props) {
  const itemAvailable = props.available;
  const id =
    props.itemName + props.itemColor + props.itemMemory + props.itemPrice; //napravio sam custom id i on se kreira kada posaljem cartu
  //console.log(props);
  //console.log(id);

  //creiramo cart context kome saljemo ove info na click
  const cartCtx = useContext(CartContext);
  function addToCartHandler(amount) {
    cartCtx.addItem({
      id: id,
      itemName: props.itemName,
      itemColor: props.itemColor,
      itemMemory: props.itemMemory,
      itemPrice: props.itemPrice,
      itemPhoto: props.photo,
      quantity: amount,
      itemAvailable: props.available,
    });
  }

  //proveravamo itemAvailabe i ako jeste onda menjamo style i njega dobijamo od gore i loadera

  if (itemAvailable === true) {
    return (
      <div className={style.button} onClick={addToCartHandler}>
        <h4>Add to Cart</h4>
      </div>
    );
  } else {
    return (
      <div className={style.buttonNotAvailable}>
        <h4>Add to Cart</h4>
      </div>
    );
  }
}

export default BuyButton;
