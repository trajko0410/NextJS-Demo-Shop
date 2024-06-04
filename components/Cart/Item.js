import style from "./Item.module.css";
import Image from "next/image";

function Item(props) {
  const item = props.item;
  //console.log(price);

  return (
    <div key={item.id} className={style.item}>
      <div className={style.img}>
        <Image
          src={item.itemPhoto}
          alt={item.itemName}
          fill
          objectFit="contain"
        ></Image>
      </div>
      <div className={style.about}>
        <div className={style.name}>
          <h4 className={style.name}>
            {item.itemName} {item.itemColor} {item.itemMemory}
          </h4>
        </div>
        <div className={style.price}>
          <div className={style.quantity}>
            <div
              onClick={() => props.removeItem(item.id)}
              className={style.button}
            >
              -
            </div>
            <h4>{item.quantity}</h4>
            <div onClick={() => props.addItem(item)} className={style.button}>
              +
            </div>
          </div>
          <div className={style.x}>
            <h4>x</h4>
          </div>

          <div className={style.priceDolar}>
            <h4>{item.itemPrice}$</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
