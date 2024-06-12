import { useState } from "react";
import style from "./NewsLetterForm.module.css";

import Modal from "../../Modals/Modal";

import { useRef } from "react";

function NewsletterForm() {
  //console.log(state);

  const [newsletterNotification, setNewsletterNotification] = useState(false);
  const [responseData, setResponseData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  //console.log(newsletterNotification, "parent");

  const emailInputRef = useRef();

  async function registrationHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    setIsLoading(true);
    setNewsletterNotification(true);

    await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json()) //getting acces to respnse
      .then((data) => setResponseData(data));
    setIsLoading(false);

    emailInputRef.current.value = "";
  }

  const modalStateFromChild = (modalState) => {
    setNewsletterNotification(modalState);
  }; //getting modalstate(false) from child when clicked on button

  return (
    <>
      <form className={style.newsletter} onSubmit={registrationHandler}>
        <input
          type="email"
          name="email"
          required
          placeholder="Sign up for newsletter..."
          aria-label="Sign up for newsletter"
          ref={emailInputRef}
        />
        <button>Sign up</button>
      </form>
      {newsletterNotification && (
        <Modal
          sucessText={"Succesfuly subscribed to our newsletter!"}
          failedText={"Failed to subscrbe to our newsletter"}
          responseData={responseData}
          modalState={newsletterNotification}
          modalStateFromChild={modalStateFromChild}
          typeofmodal={"NEWSLETTER"}
          isLoading={isLoading}
        />
      )}
    </>
  );
}

export default NewsletterForm;
