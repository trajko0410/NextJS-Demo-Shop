import AddCollors from "./addCollors";
import AddModell from "./addModell";

import Modal from "../../Modals/Modal";
import Loading from "../../Modals/Loading";

import useInput from "../../Hooks/use-InputForm";

import { useEffect, useRef, useState, useCallback, Suspense } from "react";

import style from "./itemsForm.module.css";
import { uploadImagetoFirebaseStorage } from "../../../helpers/firebaseStorage";

import { v4 } from "uuid";
import _ from "lodash";

export default function ItemsForm(props) {
  //const [itemData, setItemData] = useState({});
  //const [ok, setOk] = useState(false);

  const [id, setId] = useState();
  const [initialCategory, setInitialCategoru] = useState("");

  const [colors, setColors] = useState();
  const [resetColors, setResetColors] = useState(false);
  const [colorHasError, setColorHasError] = useState();
  //console.log(colorHasError, "colorhaserror");

  const [models, setModels] = useState();
  const [modelsHasError, setModelsHasError] = useState();
  const [resetModels, setResetModels] = useState(false);

  const available = useRef(false);
  const recomended = useRef(false);

  const [responseData, setResponseData] = useState();
  const [newsletterNotification, setNewsletterNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    value: selectedFile,
    isValid: fileIsValid,
    hasError: fileInputHasError,
    enteredValueChangeHandler: fileChangeHandler,
    inputBlurHandler: fileBlurHandler,
    resetValue: resetFile,
    resetKey,
  } = useInput(
    (value) =>
      value instanceof File &&
      value.size < 5000000 &&
      ["image/jpeg", "image/png"].includes(value.type),
    null,
    "file"
  );

  const {
    value: itemName,
    isValid: enteredItemNameIsValid,
    hasError: itemNameInputHasError,
    enteredValueChangeHandler: itemNameChangeHandler,
    inputBlurHandler: itemNameBlurHandler,
    resetValue: resetItemNameInput,
  } = useInput(
    (value) => value.trim() !== "" && value.length > 2 && value.length < 25,
    ""
  );

  const {
    value: itemCategory,
    isValid: enteredItemCategoryIsValid,
    hasError: itemCategoryHasError,
    enteredValueChangeHandler: itemCategoryChangeHandler,
    inputBlurHandler: itemCategoryBlurHandler,
    resetValue: resetItemCategoryInput,
  } = useInput(
    (value) =>
      value.trim() === "iPhones" ||
      value.trim() === "iPad" ||
      value.trim() === "Mac" ||
      value.trim() === "Accessories",
    initialCategory,
    "text"
  );

  const {
    value: shortDescription,
    isValid: shortDescriptionIsValid,
    hasError: shortDescriptionHasError,
    enteredValueChangeHandler: shortDescriptionChangeHandler,
    inputBlurHandler: shortDescriptionBlurHandler,
    resetValue: resetShortDescriptionInput,
  } = useInput(
    (value) => value.trim() !== "" && value.length > 2 && value.length < 25,
    "",
    "text"
  );

  const {
    value: description,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    enteredValueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    resetValue: resetDescriptionInput,
  } = useInput((value) => value.length < 300, "", "text");

  const {
    value: price,
    isValid: priceIsValid,
    hasError: priceHasError,
    enteredValueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    resetValue: resetPriceInput,
  } = useInput((value) => !isNaN(value) && value > 0, "", "number");

  useEffect(() => {
    if (initialCategory === undefined || initialCategory === "")
      setInitialCategoru("iPhones");
  }, [initialCategory]);

  useEffect(() => {
    setId(`i-${itemName + v4()}`);
  }, [itemName]); //creatin random id

  //console.log(id);
  const handleInputColors = (inputColors) => {
    setColors(inputColors);
  }; //podigli smo

  const handleResetColorsFromChild = (resetColorsFromChild) => {
    setResetColors(resetColorsFromChild);
  };

  const handleInputModels = (inputModels) => {
    setModels(inputModels);
  };

  const handleHasErrorModels = (errorModel) => {
    setModelsHasError(errorModel);
  };

  const handleHasErrorColors = (errorColor) => {
    setColorHasError(errorColor);
  };

  const handleResetModelsFromChild = (resetModelsFromChild) => {
    setResetModels(resetModelsFromChild);
  };

  let formIsValid = false;

  if (
    enteredItemNameIsValid &&
    enteredItemCategoryIsValid &&
    shortDescriptionIsValid &&
    descriptionIsValid &&
    priceIsValid &&
    fileIsValid &&
    !modelsHasError &&
    !colorHasError
  ) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  async function formSubmitionHandler(event) {
    event.preventDefault();
    if (
      !enteredItemNameIsValid &&
      !enteredItemCategoryIsValid &&
      !shortDescriptionIsValid &&
      !descriptionIsValid &&
      !priceIsValid &&
      !fileIsValid
    ) {
      return;
    } else {
      const formData = new FormData(event.target);
      const formDataCustom = Object.fromEntries(formData.entries());

      formDataCustom.id = id;
      formDataCustom.available = available.current.checked;
      formDataCustom.recomended = recomended.current.checked;

      if (!formDataCustom.itemCategory || formDataCustom.itemCategory === "") {
        formDataCustom.itemCategory = "iPhones";
        setInitialCategoru("iPhones");
      }

      formDataCustom.colors = colors;
      formDataCustom.models = models;

      setIsLoading(true);
      setNewsletterNotification(true);

      const imageUrl = await uploadImagetoFirebaseStorage(
        selectedFile,
        id,
        "mainPhoto"
      );
      //console.log(imageUrl);

      const colorKeys = Object.keys(colors);

      for (const colorKey of colorKeys) {
        const photoKeys = Object.keys(colors[colorKey].Photos);

        for (const photoKey of photoKeys) {
          const file = colors[colorKey].Photos[photoKey];

          if (file instanceof File) {
            const colorName = colors[colorKey].Color || "defaultColor";
            const imageUrl = await uploadImagetoFirebaseStorage(
              file,
              id,
              "colorsPhotos",
              colorName,
              photoKey
            );
            colors[colorKey].Photos[photoKey] = imageUrl;
          }
        }
      }

      formDataCustom.mainPhoto = imageUrl;

      //formDataCustom.selectedFile = selectedFile;

      //console.log(formDataCustom, "Dfdsa");

      const response = await fetch("/api/admin/addNewItems", {
        method: "POST",
        body: JSON.stringify(formDataCustom),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      //console.log(data, "dATA");

      setResponseData(data);

      setIsLoading(false);
    }

    //setOk(true);
    resetItemNameInput();
    resetItemCategoryInput();
    resetShortDescriptionInput();
    resetDescriptionInput();
    resetPriceInput();
    resetFile();
    setResetColors(true);
    setResetModels(true);

    available.current.checked = false;
    recomended.current.checked = false;
  }

  function clickButton() {
    //console.log("click");
    formSubmitionHandler();
  }

  const debounceOrderToServer = useCallback(
    _.debounce(() => {
      clickButton();
    }, 500), // Adjust the delay as needed
    [clickButton]
  );

  const modalStateFromChild = (modalState) => {
    setNewsletterNotification(modalState);
  }; //getting modalstate(false) from child when clicked on button
  //console.log(responseData);
  //console.log(reset, "reset");

  //console.log(formIsValid, "ok");
  //console.log(itemData);
  return (
    <>
      <div className={style.container}>
        <h2>{props.title}</h2>
        <form onSubmit={formSubmitionHandler}>
          <div
            className={
              itemNameInputHasError
                ? `${style.formcontrol} ${style.invalid}`
                : style.formcontrol
            }
          >
            <label htmlFor="itemName">Item Name</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={itemName}
              onChange={itemNameChangeHandler}
              onBlur={itemNameBlurHandler}
            ></input>
            {itemNameInputHasError && (
              <p className={style.errortext}>
                Ensure item name is not empty, not shorter than 2 characters,
                and not longer than 25 characters.
              </p>
            )}
          </div>
          <div className={style.wrapperAroundCategoryAndBox}>
            <div
              className={
                itemNameInputHasError
                  ? `${style.formcontrol} ${style.invalid}`
                  : style.formcontrol
              }
            >
              <label htmlFor="itemCategory">Item Category</label>
              <select
                id="itemCategory"
                name="itemCategory"
                onBlur={itemCategoryBlurHandler}
                onChange={itemCategoryChangeHandler}
                value={itemCategory}
              >
                <option className={style.dropdown}>iPhones</option>
                <option className={style.dropdown}>Mac</option>
                <option className={style.dropdown}>iPad</option>
                <option className={style.dropdown}>Accessories</option>
              </select>
              {itemCategoryHasError && (
                <p className={style.errortext}>Please select one of options.</p>
              )}
            </div>
            <div className={style.containerCheckBox}>
              <div className={style.checkboxWrapper}>
                <label htmlFor="available">Item Available</label>
                <input
                  name="available"
                  ref={available}
                  type="checkbox"
                  className={`${style.scgJwTLC} ${style.ikxBAC}`}
                ></input>
              </div>
              <div className={style.checkboxWrapper}>
                <label htmlFor="recomended">Item Recommended</label>
                <input
                  name="recomended"
                  ref={recomended}
                  type="checkbox"
                  className={`${style.scgJwTLC} ${style.ikxBAC}`}
                ></input>
              </div>
            </div>
          </div>

          <div
            className={
              itemNameInputHasError
                ? `${style.formcontrol} ${style.invalid}`
                : style.formcontrol
            }
          >
            <label htmlFor="itemShortDescription">Item Short Description</label>
            <input
              type="text"
              id="itemShortDescription"
              name="itemShortDescription"
              value={shortDescription}
              onBlur={shortDescriptionBlurHandler}
              onChange={shortDescriptionChangeHandler}
            ></input>
            {shortDescriptionHasError && (
              <p className={style.errortext}>
                Ensure short description is not empty, not shorter than 2
                characters, and not longer than 25 characters.
              </p>
            )}
          </div>
          <div
            className={
              itemNameInputHasError
                ? `${style.formcontrol} ${style.invalid}`
                : style.formcontrol
            }
          >
            <label htmlFor="itemDescription">Item Description</label>
            <textarea
              type="text"
              id="itemDescription"
              name="itemDescription"
              value={description}
              onBlur={descriptionBlurHandler}
              onChange={descriptionChangeHandler}
            ></textarea>
            {descriptionHasError && (
              <p className={style.errortext}>
                Ensure description is not longer than 300 characters.
              </p>
            )}
          </div>
          <div
            className={
              itemNameInputHasError
                ? `${style.formcontrol} ${style.invalid}`
                : style.formcontrol
            }
          >
            <label htmlFor="price">Item Price</label>
            <input
              onBlur={priceBlurHandler}
              onChange={priceChangeHandler}
              value={price}
              type="number"
              id="itemPrice"
              name="itemPrice"
            ></input>
            {priceHasError && (
              <p className={style.errortext}>Ensure price is not empty..</p>
            )}
          </div>

          <div className={style.formcontrol}>
            <label htmlFor="filelnput">Main Photo:</label>
            <input
              key={resetKey}
              type="file"
              id="fileInput"
              accept="image/png, image/jpeg"
              required
              file={selectedFile}
              onChange={fileChangeHandler}
              onBlur={fileBlurHandler}
            />
            {fileInputHasError && (
              <p className={style.errortext}>File has to be jpeg or png.</p>
            )}
          </div>

          <AddCollors
            resetColors={resetColors}
            inputColors={handleInputColors}
            resetColorsFromChild={handleResetColorsFromChild}
            id={id}
            colorsError={handleHasErrorColors}
          />
          <AddModell
            inputModels={handleInputModels}
            resetModels={resetModels}
            resetModelsFromChild={handleResetModelsFromChild}
            modelsError={handleHasErrorModels}
          />
          <div className={formIsValid ? style.submit : style.submitDisabled}>
            <button
              disabled={formIsValid === false}
              type="submit"
              onSubmit={() => {
                debounceOrderToServer();
              }}
            >
              Submit a form!
            </button>
          </div>
        </form>
      </div>
      <Suspense fallback={<Loading />}>
        {newsletterNotification && (
          <Modal
            sucessText={"Item has been created succesfuly!"}
            failedText={"Failed to create new item!"}
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
/**     */
