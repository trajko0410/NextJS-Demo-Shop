import { useState } from "react";

const useInput = (validatedValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validatedValue(enteredValue); // validatedvalue dobijamo iy imputa kda prosledio ovaj hook. Tamo gde koristimo ovaj hook proveravamo da li je validno i setujemo funkcije

  const hasError = !valueIsValid && isTouched;

  function enteredValueChangeHandler(event) {
    setEnteredValue(event.target.value);
  }
  function inputBlurHandler() {
    setIsTouched(true);
  }
  function resetValue() {
    setEnteredValue("");
    setIsTouched(false);
  }

  return {
    value: enteredValue,
    hasError: hasError,
    isValid: valueIsValid,
    enteredValueChangeHandler,
    inputBlurHandler,
    resetValue,
  };
};

export default useInput;
