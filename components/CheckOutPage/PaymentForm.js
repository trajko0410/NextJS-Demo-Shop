import style from "./PaymentForm.module.css";

import continueImage from "../../public/images/icons/arrow-right-white.png";
import shippingInfo from "../../public/images/icons/delivery-truck.png";

import Image from "next/image";

function PaymentForm(props) {
  return (
    <div className={style.container}>
      <h3>Payment</h3>
      <p>Implement strype or some other payment method!</p>
      <div className={style.buttons}>
        <div className={style.editShipping} onClick={props.back}>
          <p>Back to shipping info</p>
          <Image
            src={shippingInfo}
            alt="shippingTruck"
            height={30}
            width={30}
          ></Image>
        </div>
        <div className={style.continue} onClick={props.continue}>
          <p>Continue</p>
          <Image
            src={continueImage}
            alt="continue"
            height={30}
            width={30}
          ></Image>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
