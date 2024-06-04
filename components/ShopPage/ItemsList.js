import style from "./ItemsList.module.css";

import Item from "./item";

//import errorFetching from "../../img/no-results.png";

function ItemsOnShopPage(props) {
  const dataItems = props.items;

  //console.log(dataItems, "dataitems");

  const itemsList = dataItems.map((item) => (
    <Item
      key={item.id}
      id={item.id}
      name={item.Name}
      description={item.Description}
      price={item.Price}
      color={item.Color}
      category={item.Category}
      memory={item.Memory}
      shortDescription={item.ShortDescription}
      mainPhoto={item.MainPhoto}
      sortValue={props.sortValue}
    />
  ));

  //console.log(itemsList);
  return (
    <div className={style.itemsContainer}>
      <div className={style.items}>
        <div>
          <div className={style.container}>
            <div className={style.item}>{itemsList}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemsOnShopPage;

//mapiram da dobijem ya svaki item
