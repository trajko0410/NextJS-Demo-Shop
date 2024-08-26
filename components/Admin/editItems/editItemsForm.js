import AddCollors from "./addCollorsEdit";
import AddModell from "./addModellEdit";

import Modal from "../../Modals/Modal";
import Loading from "../../Modals/Loading";
import PhotoModal from "../../Modals/PhotoModal";

import useInput from "../../Hooks/use-InputForm";

import { useEffect, useState, useCallback, Suspense, useContext } from "react";
import Image from "next/image";
import style from "./editItemsForm.module.css";

//import uploadImage from "../../../helpers/firebaseStorage";

import {
  deleteColorPhotosFromFirebaseStorage,
  uploadImagetoFirebaseStorage,
} from "../../../helpers/firebaseStorage";

import { deleteMainPhotoFromFirebase } from "../../../helpers/db-util";

//import { v4 } from "uuid";
import _ from "lodash";
import PhotoModalContext from "../../../context/photoModalContext";

export default function ItemsForm(props) {
  const photoModalCTX = useContext(PhotoModalContext);

  const itemData = props.itemData;
  const [existingPhotoUrl, setExistingPhotoUrl] = useState(itemData.MainPhoto);

  const id = itemData.id;
  const [initialCategory, setInitialCategoru] = useState(itemData.Category);

  const [colors, setColors] = useState();
  const [resetColors, setResetColors] = useState(false);
  const [colorHasError, setColorHasError] = useState();

  const [models, setModels] = useState();
  const [modelsHasError, setModelsHasError] = useState(false);
  const [resetModels, setResetModels] = useState(false);

  const [available, setAvailable] = useState(itemData.Available);
  const [recomend, setRecomend] = useState(itemData.Recomend);

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

  const [mainPhotoError, setMainPhotoError] = useState(false);

  useEffect(() => {
    //console.log(existingPhotoUrl, "url");
    if (selectedFile === null && existingPhotoUrl === null) {
      setMainPhotoError(true);
    } else {
      setMainPhotoError(false);
    }
  }, [selectedFile, existingPhotoUrl]);

  const {
    value: itemName,
    isValid: enteredItemNameIsValid,
    hasError: itemNameInputHasError,
    enteredValueChangeHandler: itemNameChangeHandler,
    inputBlurHandler: itemNameBlurHandler,
    resetValue: resetItemNameInput,
  } = useInput(
    (value) => value.trim() !== "" && value.length > 2 && value.length < 25,
    itemData.Name,
    "text"
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
    itemData.ShortDescription,
    "text"
  );

  const {
    value: description,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    enteredValueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    resetValue: resetDescriptionInput,
  } = useInput((value) => value.length < 300, itemData.Description, "text");

  const {
    value: price,
    isValid: priceIsValid,
    hasError: priceHasError,
    enteredValueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    resetValue: resetPriceInput,
  } = useInput(
    (value) => !isNaN(value) && value > 0, // Adjusted validation logic to ensure the price is a positive number
    itemData.Price,
    "text"
  );

  useEffect(() => {
    if (initialCategory === undefined || initialCategory === "")
      setInitialCategoru("iPhones");
  }, [initialCategory]);

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
    !mainPhotoError &&
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
      !enteredItemNameIsValid ||
      !enteredItemCategoryIsValid ||
      !shortDescriptionIsValid ||
      !descriptionIsValid ||
      !priceIsValid ||
      (!fileIsValid && existingPhotoUrl === null)
    ) {
      return;
    } else {
      const formData = new FormData(event.target);
      const formDataCustom = Object.fromEntries(formData.entries());

      formDataCustom.id = id;
      formDataCustom.available = available;
      formDataCustom.recomend = recomend;

      if (!formDataCustom.itemCategory || formDataCustom.itemCategory === "") {
        formDataCustom.itemCategory = "iPhones";
        setInitialCategoru("iPhones");
      }

      formDataCustom.colors = colors;
      formDataCustom.models = models;

      // Upload a new photo only if a new file is selected

      let imageUrl = existingPhotoUrl;

      if (selectedFile) {
        // Upload the new image
        if (existingPhotoUrl) {
          await deleteMainPhotoFromFirebase(existingPhotoUrl); // Delete the old image
          setExistingPhotoUrl(null); // Update state to reflect that the old image has been deleted
        }
        imageUrl = await uploadImagetoFirebaseStorage(
          selectedFile,
          id,
          "mainPhoto"
        );
      }

      formDataCustom.mainPhoto = imageUrl;

      //formDataCustom.mainPhoto = imageUrl;

      //formDataCustom.selectedFile = selectedFile;
      // Handle color photos

      // Handle color photos
      const newColors = { ...colors }; // Make a copy of colors to modify

      // Iterate over new colors to process old and new photos
      for (const colorKey in newColors) {
        if (newColors.hasOwnProperty(colorKey)) {
          const newPhotos = newColors[colorKey]?.Photos || {};
          const oldPhotos = itemData.Color?.[colorKey]?.Photos || {};

          // Extract old photo URLs
          const oldPhotoUrls = Object.values(oldPhotos).filter((url) => url); // Ensure there are no null/undefined values

          // Determine which old photos should be deleted
          const photosToDelete = oldPhotoUrls.filter(
            (photoUrl) => !Object.values(newPhotos).includes(photoUrl)
          );

          //console.log(photosToDelete, "photostodelet");

          await deleteColorPhotosFromFirebaseStorage(photosToDelete);

          // Upload new photos and update the color entry
          for (const photoKey in newPhotos) {
            if (newPhotos.hasOwnProperty(photoKey)) {
              const file = newPhotos[photoKey];
              if (file instanceof File) {
                const colorName = newColors[colorKey].Color || "defaultColor";
                newColors[colorKey].Photos[photoKey] =
                  await uploadImagetoFirebaseStorage(
                    file,
                    id,
                    "colorsPhotos",
                    colorName,
                    photoKey
                  );
              }
            }
          }
        }
      }
      formDataCustom.colors = newColors;

      //console.log(colors, "formDatacustom");
      setIsLoading(true);
      setNewsletterNotification(true);

      const response = await fetch("/api/admin/editItems", {
        method: "PATCH",
        body: JSON.stringify(formDataCustom),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data, "response dATA");

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
    setAvailable(false);
    setRecomend(false);
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

  const modalStateFromModal = (modalState) => {
    setNewsletterNotification(modalState);
  }; //getting modalstate(false) from child when clicked on button

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
                <p className={style.errortext}>Plese select one of options.</p>
              )}
            </div>
            <div className={style.containerCheckBox}>
              <div className={style.checkboxWrapper}>
                <label htmlFor="available">Item Available</label>
                <input
                  name="available"
                  type="checkbox"
                  checked={available}
                  className={
                    available === true
                      ? ` ${style.ikxBAC} ${style.scgJwTLC} `
                      : `${style.ikxBAC} `
                  }
                  onChange={() => setAvailable(!available)}
                ></input>
              </div>
              <div className={style.checkboxWrapper}>
                <label htmlFor="recomend">Item Recomended</label>
                <input
                  name="recomend"
                  checked={recomend}
                  type="checkbox"
                  className={
                    recomend === true
                      ? ` ${style.ikxBAC} ${style.scgJwTLC} `
                      : `${style.ikxBAC} `
                  }
                  onChange={() => setRecomend(!recomend)}
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

          <div className={`${style.formcontrol}`}>
            <label htmlFor="filelnput">Main Photo:</label>
            <div className={style.mainPhoto}>
              <input
                key={resetKey}
                type="file"
                id="fileInput"
                accept="image/png, image/jpeg"
                required={!existingPhotoUrl}
                file={selectedFile}
                onChange={fileChangeHandler}
                onBlur={fileBlurHandler}
              />

              {existingPhotoUrl && !selectedFile && (
                <div className={style.imageContainer}>
                  <Image
                    src={existingPhotoUrl}
                    alt="Existing Photo"
                    width={40}
                    height={40}
                    onClick={() => {
                      photoModalCTX.oppenModal(itemData.MainPhoto);
                    }}
                  />
                </div>
              )}
            </div>

            {fileInputHasError && (
              <p className={style.errortext}>File has to be jpeg or png.</p>
            )}
          </div>
          <p className={style.objasnjenje}>
            If you dont upload a new file old photo will be displayed.
          </p>

          <AddCollors
            resetColors={resetColors}
            inputColors={handleInputColors}
            resetColorsFromChild={handleResetColorsFromChild}
            id={id}
            colorsError={handleHasErrorColors}
            itemDataColors={itemData.Color}
            photoModalCTX={photoModalCTX}
          />
          <AddModell
            inputModels={handleInputModels}
            resetModels={resetModels}
            resetModelsFromChild={handleResetModelsFromChild}
            modelsError={handleHasErrorModels}
            itemDataModel={itemData.Memory}
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
        <p className={style.objasnjenje}>
          Please note that any changes made to an item will take up to 360
          seconds to render, as the revalidation for individual items is set to
          this duration.
        </p>
      </div>
      <Suspense fallback={<Loading />}>
        {newsletterNotification && (
          <Modal
            sucessText={"Item has been created succesfuly!"}
            failedText={"Failed to create new item!"}
            responseData={responseData}
            modalStateFromChild={modalStateFromModal}
            modalState={newsletterNotification}
            typeofmodal={"CreateItem"}
            isLoading={isLoading}
          />
        )}
      </Suspense>
      <Suspense>
        {photoModalCTX.photoModalIsOpen && (
          <PhotoModal photoModalCTX={photoModalCTX} />
        )}
      </Suspense>
    </>
  );
}
