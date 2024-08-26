import ItemsFormEdit from "../../../../components/Admin/editItems/editItemsForm";
import { PhotoModalProvider } from "../../../../context/photoModalContext";
import { getItemById } from "../../../../helpers/db-util";

export async function getServerSideProps(context) {
  const { id } = context.params;
  // Fetch data from an API or database based on the `id`
  const response = await getItemById(id);
  //console.log(response);

  return {
    props: { itemData: response },
  };
}

export default function EditItemPage({ itemData }) {
  //const [formData, setFormData] = useState(itemData);

  // Pass `itemData` to the form component
  return (
    <div>
      <PhotoModalProvider>
        <ItemsFormEdit title={"Edit item"} itemData={itemData}></ItemsFormEdit>
      </PhotoModalProvider>
    </div>
  );
}
