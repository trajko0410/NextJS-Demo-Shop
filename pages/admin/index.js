import { getAllItems } from "../../helpers/db-util";
import AdminPageComponent from "../../components/Admin/AdminPage";

export default function AdminPage(props) {
  const items = props.items;
  return (
    <>
      <AdminPageComponent items={items} />
    </>
  );
}

export async function getServerSideProps() {
  const items = await getAllItems();

  return {
    props: {
      items: items,
    },
    // revalidate: 60,
  };
}
