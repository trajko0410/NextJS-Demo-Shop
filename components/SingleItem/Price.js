import style from "./Price.module.css";

function Price(props) {
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

  return (
    <div className={style.price}>
      <h3>Price:</h3>
      <div className={style.priceInner}>
        {price === null ? <p>Chose a model.</p> : <p>{price} $</p>}
      </div>
    </div>
  );
}

export default Price;
