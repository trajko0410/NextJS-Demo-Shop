import HeroSection from "../../components/ShopPage/HeroSection";
import ItemsNavigation from "../../components/ShopPage/SortItems";
import ItemsList from "../../components/ShopPage/ItemsList";
import { getAllItems } from "../..//helpers/db-util";

import { useState } from "react";

function shopPage(props) {
  const [sortValue, setSortValue] = useState("");
  //console.log(props.items);

  const itemSort = (sort) => {
    setSortValue(sort);
    //console.log(sortValue);
    //koristim za sortiranje itema
  };

  //console.log(sortValue);
  return (
    <>
      <HeroSection />
      <ItemsNavigation itemValueSort={itemSort}></ItemsNavigation>
      <ItemsList items={props.items} sortValue={sortValue} />
    </>
  );
}

export default shopPage;

export async function getStaticProps() {
  const items = await getAllItems();

  return {
    props: {
      items: items,
    },
    revalidate: 360,
  };
}
