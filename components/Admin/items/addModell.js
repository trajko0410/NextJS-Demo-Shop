import { useState, useEffect } from "react";

import style from "./addModell.module.css";

export default function AddModell(props) {
  const [memory, setMemory] = useState({ m1: { Memory: "", Price: "" } });
  const [errors, setErrors] = useState({});

  const [hasError, setHasError] = useState(false);

  const reset = props.resetModels;

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [errors]);

  useEffect(() => {
    if (reset === true) {
      setMemory({ m1: { Memory: "", Price: "" } });
      setErrors({}); // Clear errors on reset
      props.resetModelsFromChild(false);
      setHasError(false);
    }
  }, [reset, props]);

  const handleMemoryChange = (memoryKey, newValue, type) => {
    // Validate if the Price field is not empty and is not a valid number
    if (type === "Price" && newValue !== "" && isNaN(newValue)) {
      setErrors({
        ...errors,
        [memoryKey]: "Price must be a valid number or left empty.",
      });
      return;
    }

    if (type === "Memory" && newValue.length > 6) {
      setErrors({
        ...errors,
        [memoryKey]: "Memory cannot be longer than 6 characters.",
      });
      return;
    }

    // Update memory state
    setMemory({
      ...memory,
      [memoryKey]: { ...memory[memoryKey], [type]: newValue },
    });

    // Validate if one field is filled but the other is not
    const otherType = type === "Memory" ? "Price" : "Memory";
    const otherValue = memory[memoryKey][otherType];

    if (
      (newValue !== "" && otherValue === "") ||
      (newValue === "" && otherValue !== "")
    ) {
      setErrors({
        ...errors,
        [memoryKey]: "Both Memory and Price must be filled if one is filled.",
      });
    } else {
      const { [memoryKey]: removedError, ...remainingErrors } = errors;
      setErrors(remainingErrors);
    }
  };

  const addMemory = () => {
    const newMemoryKey = `m${Object.keys(memory).length + 1}`;
    setMemory({
      ...memory,
      [newMemoryKey]: { Memory: "", Price: "" },
    });
  };

  const removeMemory = (memoryKey) => {
    const { [memoryKey]: _, ...newMemory } = memory;
    const { [memoryKey]: __, ...remainingErrors } = errors;
    setMemory(newMemory);
    setErrors(remainingErrors); // Remove the error for the deleted memory
  };

  useEffect(() => {
    props.inputModels(memory);
    props.modelsError(hasError);
  }, [memory, hasError, props]);

  return (
    <div>
      {Object.keys(memory).map((memoryKey, index, array) => (
        <div key={memoryKey} className={style.memoryContainer}>
          <div
            className={
              hasError
                ? `${style.formcontrol} ${style.invalid}`
                : style.formcontrol
            }
          >
            <label>
              Memory:
              <input
                type="text"
                value={memory[memoryKey].Memory}
                onChange={(e) =>
                  handleMemoryChange(memoryKey, e.target.value, "Memory")
                }
              />
            </label>
            {hasError === true && (
              <p className={style.errortext}>{errors[memoryKey]}</p>
            )}
          </div>
          <div
            className={
              hasError
                ? `${style.formcontrol} ${style.invalid}`
                : style.formcontrol
            }
          >
            <div>
              <label>
                Price:
                <input
                  type="number"
                  value={memory[memoryKey].Price}
                  onChange={(e) =>
                    handleMemoryChange(memoryKey, e.target.value, "Price")
                  }
                />
              </label>
            </div>
          </div>
          <div className={style.buttonControl}>
            {index === array.length - 1 && Object.keys(memory).length > 1 && (
              <button type="button" onClick={() => removeMemory(memoryKey)}>
                Remove
              </button>
            )}
          </div>
        </div>
      ))}
      <p className={style.objasnjenje}>
        If you leave price or memory input empty program will render item name
        and price insted of empty values. If your item has only one model, you
        can use a short name in the Memory field. However, this name must not
        exceed 6 characters in length.
      </p>

      <div className={style.addNewModel}>
        <button type="button" onClick={addMemory}>
          Add New Model
        </button>
      </div>
    </div>
  );
}
