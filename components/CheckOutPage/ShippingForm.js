import style from "./ShippingForm.module.css";

import useInput from "../Hooks/use-InputForm";

import blacArrow from "../../public/images/icons/arrow-right.png";
import whiteArrow from "../../public/images/icons/arrow-right-white.png";
import edit from "../../public/images/icons/pen.png";
import freeImage from "../../public/images/icons/free.png";

import { useEffect, useState } from "react";
import Image from "next/image";

function ShipingForm(props) {
  const [personData, setPersonData] = useState({});
  const [ok, setOk] = useState(false);
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    enteredValueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    resetValue: resetNameInput,
  } = useInput((value) => value.trim() !== "" && value.length > 2); //ovo dobija hook kao proveru

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailHasError,
    enteredValueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetValue: resetEmailInput,
  } = useInput((value) => value.includes("@") && value.trim() !== "");

  const {
    value: enteredAddress,
    isValid: enteredAddressIsValid,
    hasError: addressHasError,
    enteredValueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    resetValue: resetAdress,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredZIP,
    isValid: enteredZIPIsValid,
    hasError: ZIPHasError,
    enteredValueChangeHandler: ZIPChangeHandler,
    inputBlurHandler: ZIPBlurHandler,
    resetValue: resetZIP,
  } = useInput((value) => value.trim() !== "" && value.length > 4);

  const {
    value: enteredPhone,
    isValid: enteredPhoneIsValid,
    hasError: phoneHasError,
    enteredValueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    resetValue: resetPhone,
  } = useInput((value) => value.trim() !== "" && value.length > 6);

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityHasError,
    enteredValueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    resetValue: resetCity,
  } = useInput((value) => value.trim() !== "");
  let formIsValid = false;
  //useEffect(() => {
  if (
    enteredNameIsValid &&
    enteredEmailIsValid &&
    enteredAddressIsValid &&
    enteredPhoneIsValid &&
    enteredZIPIsValid &&
    enteredCityIsValid
  ) {
    //setFormIsValid(true);
    formIsValid = true;
  } else {
    //setFormIsValid(false);
    formIsValid = false;
  }

  function formSubmitionHandler(event) {
    event.preventDefault();

    if (
      !enteredNameIsValid &&
      !enteredEmailIsValid &&
      !enteredAddressIsValid &&
      !enteredPhoneIsValid &&
      !enteredZIPIsValid &&
      !enteredCityIsValid
    ) {
      return;
    } else {
      const formData = new FormData(event.target);
      const formDataCustom = Object.fromEntries(formData.entries());
      //console.log(formDataCustom);

      setPersonData(formDataCustom);
      setOk(true);

      //da bi formdata radio moramo dodati name atribut svim inputima
    }

    resetNameInput();
    //setEnteredName("");  /// ovo se obavlja u resetNameINPUT
    //setEnteredNameTouched(false);

    resetEmailInput();
    resetAdress();
    resetPhone();
    resetZIP();
    resetCity();
    //setInputEmail("");
    //setEnteredEmailTouched(false);
    //nameInputRef.current.value = "" =>Not ideal, Dont manipulate the dom
  }

  if (ok === true) {
    props.continue();
  } //Ovo bi bilo dobro uz use navigate ali onda bih trebao ovo u stranicama da napravim

  useEffect(() => {
    //saljemo gore info o shippingu

    props.personData(personData);
  }, [props, personData]);
  //console.log("persondata", personData);
  return (
    <div className={style.container}>
      <h2>Shiping info</h2>
      <div className={style.ship}>
        <h3>We ship for free!</h3>
        <Image src={freeImage} alt="free" height={30} width={30}></Image>
      </div>
      <form onSubmit={formSubmitionHandler}>
        <div
          className={
            nameInputHasError
              ? `${style.formcontrol} ${style.invalid}`
              : style.formcontrol
          }
        >
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler} //pokkrece se kada god  nput izgubi fokus
            value={enteredName}
          />
          {nameInputHasError && (
            <p className={style.errortext}>
              Name can't be empty or shorter than two caracters.
            </p>
          )}
        </div>
        <div
          className={
            emailHasError
              ? `${style.formcontrol} ${style.invalid}`
              : style.formcontrol
          }
        >
          <label htmlFor="email"> E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={emailChangeHandler}
            value={enteredEmail}
            onBlur={emailBlurHandler}
          ></input>
          {emailHasError && (
            <p className={style.errortext}>Entered E-mail is invalid.</p>
          )}
        </div>
        <div
          className={
            addressHasError
              ? `${style.formcontrol} ${style.invalid}`
              : style.formcontrol
          }
        >
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            onChange={addressChangeHandler}
            onBlur={addressBlurHandler} //pokkrece se kada god  nput izgubi fokus
            value={enteredAddress}
          />
          {nameInputHasError && (
            <p className={style.errortext}>Address can't be empty.</p>
          )}
        </div>
        <div
          className={
            cityHasError
              ? `${style.formcontrol} ${style.invalid}`
              : style.formcontrol
          }
        >
          <label htmlFor="city">City</label>

          <input
            type="text"
            id="city"
            name="city"
            onChange={cityChangeHandler}
            onBlur={cityBlurHandler} //pokkrece se kada god  nput izgubi fokus
            value={enteredCity}
          />
          {nameInputHasError && (
            <p className={style.errortext}>City can't be empty.</p>
          )}
        </div>
        <div
          className={
            ZIPHasError
              ? `${style.formcontrol} ${style.invalid}`
              : style.formcontrol
          }
        >
          <label htmlFor="zip">Postal Code</label>
          <input
            type="number"
            id="zip"
            name="zip"
            minLength={5}
            onChange={ZIPChangeHandler}
            onBlur={ZIPBlurHandler} //pokkrece se kada god  nput izgubi fokus
            value={enteredZIP}
          />
          {nameInputHasError && (
            <p className={style.errortext}>Postal code can't be empty.</p>
          )}
        </div>
        <div
          className={
            phoneHasError
              ? `${style.formcontrol} ${style.invalid}`
              : style.formcontrol
          }
        >
          <label htmlFor="phone">Phone number</label>
          <input
            type="number"
            required
            minLength={6}
            id="phone"
            name="phone"
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler} //pokkrece se kada god  nput izgubi fokus
            value={enteredPhone}
          />
          {nameInputHasError && (
            <p className={style.errortext}>Phone number can't be empty.</p>
          )}
        </div>
        <div className={style.formactions}>
          <div className={style.back} onClick={props.back}>
            <p>Edit Shopping bag</p>
            <Image src={edit} alt="back" width={30} height={30}></Image>
          </div>
          <button
            className={style.continue}
            disabled={!formIsValid}
            //onSubmit={console.log("cio")}
          >
            <p>Continue</p>
            <Image
              src={!formIsValid ? blacArrow : whiteArrow}
              alt="continue"
              width={30}
              height={30}
            ></Image>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShipingForm;
