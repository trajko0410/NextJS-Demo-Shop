import style from "./TotalPrice.module.css";
import { CalculatePercentage } from "../../helpers/discauntCalculation";
import { useSession } from "next-auth/react";

function TotalPrice(props) {
  const session = useSession();
  const totalPrice = props.totalPrice.toFixed(2);

  const discount = CalculatePercentage(totalPrice, 0.1).toFixed(2);
  const newPrice = totalPrice - discount;
  const formatedNewPrice = newPrice.toFixed(2);

  return (
    <div className={style.container}>
      {session.status === "unauthenticated" ? (
        <div className={style.row}>
          <h4>Total:</h4>
          <h4>{totalPrice} $</h4>
        </div>
      ) : (
        <>
          <div className={style.row}>
            <h4>Total:</h4>
            <h4>{totalPrice} $</h4>
          </div>
          <div className={style.row}>
            <h4>Discount:</h4>
            <h4 className={style.discount}>- {discount} $</h4>
          </div>
          <div className={`${style.row} ${style.discountedPrice}`}>
            <h4>Discounted price:</h4>
            <h4>{formatedNewPrice} $</h4>
          </div>
        </>
      )}
    </div>
  );
}

export default TotalPrice;
