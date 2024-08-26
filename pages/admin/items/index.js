import ShowAllItems from "../../../components/Admin/items/showAllItems";
import { getAllItems } from "../../../helpers/db-util";

export default function Edit(props) {
  return (
    <>
      <ShowAllItems items={props.items} />
    </>
  );
}

export async function getServerSideProps() {
  const items = await getAllItems();

  return {
    props: {
      items: items,
    },
    //revalidate: 60,
  };
}
