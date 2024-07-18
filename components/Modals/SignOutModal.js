import Image from "next/image";

import { createPortal } from "react-dom";

import style from "./SignOutModal.module.css";
import logOutImage from "../../public/images/icons/log-out.png";

import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

function SignOutModal(props) {
  const [modalState, setModalState] = useState(true);
  const router = useRouter();

  useEffect(() => {
    props.modalStateFromChild(modalState);
  }, [modalState, props]); //sending new modal state(false) to parent

  function closeModalStateHandler() {
    setModalState(false);
    //console.log("close");
  }

  function navigateToHomePage() {
    router.replace("/");
  }

  //console.log(modalState, "from MODAL");

  return (
    <>
      {createPortal(
        <div className={style.modalContainer} onClick={closeModalStateHandler}>
          <div className={style.modal}>
            <h3>Are you sure you want to log out of your account?</h3>

            <div className={style.image}>
              <Image
                src={logOutImage}
                alt="signOut"
                width={50}
                height={50}
              ></Image>
            </div>

            <div
              onClick={closeModalStateHandler}
              className={style.buttonsContainer}
            >
              <div
                className={`${style.button} ${style.signOut}`}
                onClick={() => {
                  signOut(), closeModalStateHandler();
                  navigateToHomePage();
                }}
              >
                <h4> Sign Out</h4>
              </div>

              <div
                className={`${style.button} ${style.closeModal}`}
                onClick={closeModalStateHandler}
              >
                <h4>Close Modal</h4>
              </div>
            </div>
          </div>
        </div>,
        document.getElementById("modal")
      )}
    </>
  );
}

export default SignOutModal;
