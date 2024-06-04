import HomePage from "../components/HomePage/HomePage";

import { getFeaturedItems } from "../helpers/db-util";

export default function Home(props) {
  return <HomePage feturedItems={props.feturedItems} />;
}

export async function getStaticProps() {
  const items = await getFeaturedItems();
  //console.log(items, "fetured");

  return {
    props: {
      feturedItems: items,
    },
  };
}
