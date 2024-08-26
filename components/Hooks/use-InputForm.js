import { useState, useEffect } from "react";

const useInput = (validatedValue, initialValue = "", inputType = "text") => {
  const [enteredValue, setEnteredValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);
  const [resetKey, setResetKey] = useState(0); // Key for resetting file input

  useEffect(() => {
    setEnteredValue(initialValue);
  }, [initialValue]);

  const valueIsValid = validatedValue(enteredValue);
  const hasError = valueIsValid === false && isTouched;

  function enteredValueChangeHandler(event) {
    const { type, value, files } = event.target;

    if (type === "file") {
      setEnteredValue(files[0]);
      // setExistingPhotoUrl(null); // Assuming single file upload
    } else {
      setEnteredValue(value);
    }
  }

  function inputBlurHandler() {
    setIsTouched(true);
  }

  function resetValue() {
    if (inputType === "file") {
      setEnteredValue(null);
      setResetKey((prevKey) => prevKey + 1); // Force re-render
    } else if (initialValue === "iPhones") {
      // Specific case for itemCategory
      setEnteredValue("iPhones");
    } else {
      setEnteredValue("");
    }
    setIsTouched(false);
  }

  return {
    value: enteredValue,
    hasError: hasError,
    isValid: valueIsValid,
    enteredValueChangeHandler,
    inputBlurHandler,
    resetValue,
    resetKey, // Return key for file input
  };
};

export default useInput;
