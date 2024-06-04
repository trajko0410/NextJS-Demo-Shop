import style from "./item.module.css";
import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";

function Item({ sortValue, category, name, id, shortDescription, mainPhoto }) {
  const [activCategory, setActiveCategory] = useState(false);

  useEffect(() => {
    const sortCategory = sortValue;
    const categoryOfItem = category;
    //console.log(sortCategory);
    //console.log(category);
    if (sortCategory === "") {
      setActiveCategory(true);
    } else if (sortCategory === categoryOfItem) {
      setActiveCategory(true);
    } else {
      setActiveCategory(false);
    }
  }, [setActiveCategory, sortValue, category]);
  //ovo je ya sortiranje i stavljam ga u useeffect da bi proverio svaki put kada se promeni stanje propa nekog

  return (
    <div className={` ${activCategory ? style.container : style.notActive}`}>
      <Link href={`/shop/${id}`} className={style.link}>
        <div className={style.wrappingItem}>
          <div className={style.text}>
            <h3>{name}</h3>
            <p>{shortDescription}</p>
            <button>Buy</button>
          </div>
          <div className={style.productImage}>
            <Image
              src={mainPhoto}
              alt={name}
              layout="fill"
              objectFit="contain"
            ></Image>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Item;
