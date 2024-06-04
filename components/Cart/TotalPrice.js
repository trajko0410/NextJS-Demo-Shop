import style from "./TotalPrice.module.css";

function TotalPrice(props) {
  const totalPrice = props.totalPrice;

  return (
    <div className={style.container}>
      <h4>Total:</h4>
      <h4>{totalPrice} $</h4>
    </div>
  );
}

export default TotalPrice;
