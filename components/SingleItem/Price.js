import style from "./Price.module.css";
import { useSession } from "next-auth/react";

import { CalculatePercentage } from "../../helpers/discauntCalculation";

function Price(props) {
  const session = useSession();
  const price = props.itemPrice;
  //console.log(price);
  /*
  if (price === null) {
    return (
      <div>
        <h3>Chose a model.</h3>
      </div>
    );
  } else {
    return <h3>{price} $</h3>;
  }*/

  const discount = CalculatePercentage(price, 0.1).toFixed(2);
  const newPrice = price - discount;
  const formatedPrice = newPrice.toFixed(2);

  return (
    <div className={style.container}>
      {price === null ? (
        <p>Chose a model.</p>
      ) : session.status === "unauthenticated" ? (
        <div className={style.priceNotLogIN}>
          <h3>Price:</h3>
          <div className={style.priceInner}>
            <p>{price} $</p>
          </div>
        </div>
      ) : session.status === "authenticated" ? (
        <div className={style.discountContainer}>
          <div className={style.price}>
            <h3>Price:</h3>

            <div className={style.priceInner}>
              <p>{price} $</p>
            </div>
          </div>
          <div className={style.discount}>
            <h3>Discount:</h3>
            <div>- {discount} $</div>
          </div>
          <div className={style.discountedPrice}>
            <h3>Discounted Price</h3>
            <div className={style.priceInner}>
              <p>{formatedPrice} $</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Chose a model</p>
      )}
    </div>
  );
}

export default Price;
