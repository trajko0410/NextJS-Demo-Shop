import { useRef, useState } from "react";

import Image from "next/image";
import logo from "../../public/favicon.png";

import classes from "./AuthForm.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import profileImageSignUpSuccesfuly from "../../public/images/icons/active-user.png";

class CustomError extends Error {
  constructor({ message, status }) {
    super(message);
    this.status = status;
  }
} //ako ne napravis ovo dobijes object objecft

async function createUser(email, password, repeatePassword, name) {
  const response = await fetch("/api/auth/signUp", {
    method: "POST",
    body: JSON.stringify({ email, password, repeatePassword, name }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new CustomError({
      message: data.message || "Something went wrong!",
      status: data.status || 500,
    });
  }
  return data;
}

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [succesModal, setSuccesModal] = useState(false);
  const [resMessage, setResponseMessage] = useState({
    message: undefined,
    status: undefined,
  });

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();
  const repeatePasswordRef = useRef();

  const session = useSession();
  //console.log(session, "sessija");
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
    setResponseMessage({ message: undefined, status: undefined });
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  }
  function successModalHandlerTurningOff() {
    setResponseMessage({ message: undefined, status: undefined });
    setSuccesModal(false);
    setIsLogin(true);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
      //console.log("login");
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });
      if (!result.error) {
        router.replace("/");
      }

      if (result.error) {
        //console.log(result);
        setResponseMessage({ message: result.error, status: result.status });
      }

      //console.log(result);
    } else {
      //it is signup in this case
      const enteredName = nameInputRef.current.value;
      const repeatePassword = repeatePasswordRef.current.value;
      try {
        const result = await createUser(
          enteredEmail,
          enteredPassword,
          repeatePassword,
          enteredName
        );
        //redirect to a page and sign in
        //mozda dodati modal
        //console.log(result, "result");
        setResponseMessage({ message: result.message, status: result.status });
        setSuccesModal(true);
      } catch (error) {
        //ispisati gresku
        //console.log(error, "error");
        setResponseMessage({ message: error.message, status: error.status });
      }
    }
  }
  //console.log(resMessage, "rESMESSAGE");
  //console.log(isLogin);
  //console.log(session.status);
  if (session.status === "loading") {
    console.log("loading");
  }

  return (
    <div className={classes.authFormContainer}>
      <div className={classes.backgroundImageLoginPage}>
        {!isLogin ? (
          <h2>Sign up for better universe!</h2>
        ) : (
          <h2>Log in for better prices!</h2>
        )}
        <Image src={logo} height={60} width={60} alt={"spaceImage"}></Image>
      </div>
      {!succesModal && (
        <section className={classes.auth}>
          <h2>{isLogin ? "Log In" : "Sign Up"}</h2>
          {session.status !== "loading" && (
            <form onSubmit={submitHandler}>
              <div className={classes.control}>
                <label htmlFor="email">Your Email</label>
                <input type="email" id="email" required ref={emailInputRef} />
              </div>
              <div className={classes.control}>
                <label htmlFor="password">Your Password</label>
                <input
                  type="password"
                  id="password"
                  minLength={6}
                  required
                  ref={passwordInputRef}
                />
              </div>
              {!isLogin && (
                <>
                  <div className={classes.control}>
                    <label htmlFor="password">Repeate Password</label>
                    <input
                      type="password"
                      id="repeatePassword"
                      minLength={6}
                      required
                      ref={repeatePasswordRef}
                    />
                  </div>
                  <div className={classes.control}>
                    <label htmlFor="name">Your Name</label>
                    <input type="text" id="name" ref={nameInputRef} />
                  </div>
                </>
              )}
              {resMessage.message !== undefined && (
                <p
                  className={
                    resMessage.status > 200 && resMessage.status < 300
                      ? classes.succestext
                      : classes.errortext
                  }
                >
                  {resMessage.message}
                </p>
              )}
              <div className={classes.actions}>
                <button>{isLogin ? "Sign In" : "Create Account"}</button>
                <button
                  type="button"
                  className={classes.toggle}
                  onClick={switchAuthModeHandler}
                >
                  {isLogin
                    ? "Create new account"
                    : "Login with existing account"}
                </button>
              </div>
            </form>
          )}
          {session.status === "loading" && <p>Loading</p>}
        </section>
      )}

      {succesModal === true && (
        <div className={classes.acountCreatedContainer}>
          <div className={classes.imageBacground}>
            <div className={classes.img}>
              <Image
                src={profileImageSignUpSuccesfuly}
                alt="profileIcon"
                fill
                objectFit="contain"
              ></Image>
            </div>
          </div>
          <p className={classes.acountCreated}>{resMessage.message}</p>
          <div className={classes.actions}>
            <button onClick={successModalHandlerTurningOff}>
              Go to log in form!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
