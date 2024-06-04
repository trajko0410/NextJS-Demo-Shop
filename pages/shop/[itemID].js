import AboutItem from "../../components/SingleItem/AboutItem";
import { getItemById, getFeaturedItems } from "../../helpers/db-util";

function itemPage(props) {
  //console.log(props.selectedItem, "d");

  const itemData = props.selectedItem;
  return (
    <>
      <AboutItem itemData={itemData} />
    </>
  );
}

export default itemPage;

export async function getStaticProps(context) {
  const itemId = context.params.itemID;
  //console.log(itemId);
  const itemData = await getItemById(itemId);

  return {
    props: {
      selectedItem: itemData,
    },
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedItems();
  //console.log(events, "shop");

  const paths = events.map((event) => ({ params: { itemID: event.id } }));
  //console.log(paths, "paths");

  return {
    paths: paths,
    fallback: "blocking",
  };
}
