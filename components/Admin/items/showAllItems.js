import style from "../items/showAllItems.module.css";
import Image from "next/image";
import noItems from "../../../public/images/icons/no-results.png";

import { Suspense, useState } from "react";

import Link from "next/link";

import Modal from "../../Modals/Modal";
import Loading from "../../Modals/Loading";

export default function showAllItems(props) {
  const [newsletterNotification, setNewsletterNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState();

  const items = props.items;

  //console.log(items);
  let itemsList;

  //function deleteHandler(id){
  //setCurentItemId(id)
  //}

  async function deleteItemById(id) {
    setIsLoading(true);
    setNewsletterNotification(true);

    //setNewsletterNotification(true)
    const response = await fetch(`/api/admin/deleteItem/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const data = await response.json();
      setResponseData(data);
      setIsLoading(false);

      return;
    } else {
      const data = await response.json();

      setResponseData(data);
    }
    setIsLoading(false);
  }

  const modalStateFromChild = (modalState) => {
    setNewsletterNotification(modalState);
  }; //getting modalstate(false) from child when clicked on button

  if (items === undefined || items.length === 0) {
    itemsList = (
      <div className={style.containerNoItems}>
        <div className={style.noItemsImage}>
          <Image src={noItems} alt="emptyBag" width={180} height={180}></Image>
        </div>
        <h4>We can't find any items!</h4>
      </div>
    );
  } else {
    itemsList = items.map((item) => (
      <div className={style.item} key={item.id}>
        <div className={style.mainImage}>
          <Image
            src={item.MainPhoto}
            alt="ActivePhot"
            layout="fill"
            objectFit="contain"
            loading="eager"
          ></Image>
        </div>

        <div className={style.aboutItem}>
          <h2 className={style.title}>{item.Name}</h2>
          {item.Available === true ? (
            <p>Item is available for sale.</p>
          ) : (
            <p>Item is currently unavailable for sale.</p>
          )}

          {item.Recomend === true ? (
            <p>Item is recommended.</p>
          ) : (
            <p>Item is not recomended.</p>
          )}
        </div>

        <div className={style.buttons}>
          <Link href={`/admin/items/edditItem/${item.id}`}>
            <button className={style.button}>Edit</button>
          </Link>
          <button
            onClick={() => {
              deleteItemById(item.id);
            }}
            className={`${style.button} ${style.delite}`}
          >
            Delete
          </button>
        </div>
      </div>
    ));
  }

  return (
    <>
      <div className={style.container}>
        <h2>Items on shop page</h2>
        <div className={style.listContainer}>{itemsList} </div>
        <Link href={"/admin/items/addItem"}>
          <button className={style.addItem}>Add New Item</button>
        </Link>
      </div>
      <Suspense fallback={<Loading />}>
        {newsletterNotification && (
          <Modal
            sucessText={"Item has been deleted succesfuly!"}
            failedText={"Failed to delete item!"}
            responseData={responseData}
            modalStateFromChild={modalStateFromChild}
            modalState={newsletterNotification}
            typeofmodal={"CreateItem"}
            isLoading={isLoading}
          />
        )}
      </Suspense>
    </>
  );
}
