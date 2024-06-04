import Image from "next/image";

import { createPortal } from "react-dom";

import style from "./Modal.module.css";
import sucessfulSubmitting from "../../public/images/icons/receive.png";
import failedSubmitting from "../../public/images/icons/failed.png";
import { useEffect, useState } from "react";
import CartContext from "../../context/cartContextProvider";
import { useContext } from "react";
import { useRouter } from "next/router";

function SuccesModal(props) {
  const typeofmodal = props.typeofmodal;
  const ctx = useContext(CartContext);
  const resetCart = ctx.clearCart;
  const [modalState, setModalState] = useState(props.modalState);
  const router = useRouter();

  useEffect(() => {
    props.modalStateFromChild(modalState);
  }, [modalState, props]); //sending new modal state(false) to parent

  //console.log(modalState, "child");

  //console.log(props.responseData);
  const responseData = props.responseData;
  // const message = responseData.message;

  const sucessText = props.sucessText;
  const failedText = props.failedText;

  //console.log(responseData, "responseDaata");

  if (!responseData) {
    return (
      <>
        {createPortal(
          <div
            className={style.modalContainer}
            onClick={changeModalStateHandler}
          >
            <div className={style.loading}>
              <h3>Loading...</h3>
              <span className={style.loader}></span>
            </div>
          </div>,
          document.getElementById("modal")
        )}
      </>
    );
  }

  function changeModalStateHandler() {
    setModalState(false);
    if (typeofmodal === "ORDER") {
      resetCart();
      router.replace("/");
    }
    //console.log("homepage");
  }

  return (
    <>
      {createPortal(
        <div className={style.modalContainer} onClick={changeModalStateHandler}>
          <div className={style.modal}>
            {responseData.status === 201 && (
              <h3>
                {!responseData ? `${sucessText}` : `${responseData.message}`}
              </h3>
            )}
            {responseData.status !== 201 && (
              <h3>
                {!responseData ? `${failedText}` : `${responseData.message}`}
              </h3>
            )}

            <div className={style.image}>
              <Image
                src={
                  responseData.status === 201
                    ? sucessfulSubmitting
                    : failedSubmitting
                }
                alt="newsletterstate"
                width={50}
                height={50}
              ></Image>
            </div>
            <div
              onClick={changeModalStateHandler}
              className={style.buttonContainer}
            >
              <div className={style.button}>
                {responseData.status === 201 ? "Perfect!" : "Close Modal"}
              </div>
            </div>
          </div>
        </div>,
        document.getElementById("modal")
      )}
    </>
  );
}

export default SuccesModal;
