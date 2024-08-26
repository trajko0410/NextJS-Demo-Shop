import NavBox from "./navBox";
import style from "./AdminPage.module.css";
import Link from "next/link";

import whiteBag from "../../public/images/icons/shopping-bag.png";
import order from "../../public/images/icons/clipboard.png";
import newsletter from "../../public/images/icons/email (1).png";
import AdminPanel from "../toDo/adminPanel";

export default function AdminPage(props) {
  const items = props.items;

  let itemsLength = 0;

  if (items === null || items === undefined) {
    itemsLength = 0;
  } else if (items) {
    itemsLength = items.length;
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.mainTitle}>
          <h2>Admin Dashbord</h2>
        </div>

        <div className={style.navBoxesContainer}>
          <div className={style.bacgroundColor1}>
            <NavBox
              heading={"Shop items"}
              paragraph1={`Curently there is ${itemsLength} items listed.`}
              paragraph2={
                "Click here to add, edit or delete alredy existing items"
              }
              img={whiteBag}
              link={"/admin/items"}
            />
          </div>
          <div className={style.bacgroundColor2}>
            <NavBox
              heading={"Orders"}
              paragraph1={"Amount of orders."}
              paragraph2={"Click here to see and edit orders."}
              img={order}
              link={"/admin/orders"}
            />
          </div>

          <div className={style.bacgroundColor3}>
            <NavBox
              heading={"Newsletter"}
              paragraph1={"Amount subsribed"}
              paragraph2={"Send an newsletter to subscribed customers"}
              img={newsletter}
              link={"/admin/newsletter"}
            />
          </div>
        </div>
      </div>
      <AdminPanel />
    </>
  );
}
