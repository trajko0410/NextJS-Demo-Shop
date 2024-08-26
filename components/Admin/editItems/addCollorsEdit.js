import { useEffect, useState } from "react";
import style from "./addCollorsEdit.module.css";
import deleteImage from "../../../public/images/icons/failed.png";
import Image from "next/image";

export default function AddCollors(props) {
  const initialColors = props.itemDataColors;

  const photoModalCTX = props.photoModalCTX;

  const [colors, setColors] = useState({
    c1: { Color: "", ColorCode: "#000000", Photos: { p1: "" } },
  });
  const [resetKey, setResetKey] = useState(0);
  const [hasError, setError] = useState(false);

  const id = props.id;
  const reset = props.resetColors;

  useEffect(() => {
    // Set initial COLORS values when component mounts or initialMemory changes
    if (initialColors) {
      setColors(initialColors);
    }
  }, [initialColors]);

  useEffect(() => {
    if (reset === true) {
      setColors({
        c1: { Color: "", ColorCode: "#000000", Photos: { p1: "" } },
      });
      setResetKey((prevKey) => prevKey + 1); // Update resetKey to force remount
      props.resetColorsFromChild(false);
    }
  }, [reset, props]);

  const validateInputs = (updatedColors) => {
    for (const colorKey of Object.keys(updatedColors)) {
      const color = updatedColors[colorKey];
      const photoValues = Object.values(color.Photos);

      // If there are photos but no color name, set an error
      if (photoValues.some((photo) => photo !== "") && !color.Color) {
        setError(true);
        return;
      }
    }
    setError(false);
  };

  const handleColorChange = (colorKey, newColor, type) => {
    // Validate hex code format
    if (type === "ColorCode" && !/^#[0-9A-Fa-f]{6}$/.test(newColor)) {
      alert("Please enter a valid hex code (e.g., #000000)");
      return;
    }

    const updatedColors = {
      ...colors,
      [colorKey]: { ...colors[colorKey], [type]: newColor || "" },
    };

    setColors(updatedColors);
    validateInputs(updatedColors);
  };

  const handlePhotoChange = async (colorKey, photoKey, event) => {
    const fileInput = event.target;
    const file = fileInput.files && fileInput.files[0];

    if (file) {
      const updatedColors = {
        ...colors,
        [colorKey]: {
          ...colors[colorKey],
          Photos: { ...colors[colorKey].Photos, [photoKey]: file },
        },
      };

      setColors(updatedColors);
      validateInputs(updatedColors);
    }
  };

  const addPhoto = (colorKey) => {
    const photoKeys = Object.keys(colors[colorKey].Photos);
    if (photoKeys.length < 4) {
      const newPhotoKey = `p${photoKeys.length + 1}`;
      const updatedColors = {
        ...colors,
        [colorKey]: {
          ...colors[colorKey],
          Photos: { ...colors[colorKey].Photos, [newPhotoKey]: "" },
        },
      };

      setColors(updatedColors);
      validateInputs(updatedColors);
    } else {
      alert("Cannot add more than 4 photos");
    }
  };

  const removePhoto = async (colorKey, photoKey) => {
    const newPhotos = { ...colors[colorKey].Photos };
    delete newPhotos[photoKey];

    const remainingPhotoKeys = Object.keys(newPhotos).sort();
    const updatedPhotos = {};
    remainingPhotoKeys.forEach((key, index) => {
      const newKey = `p${index + 1}`;
      updatedPhotos[newKey] = newPhotos[key];
    });

    const updatedColors = {
      ...colors,
      [colorKey]: {
        ...colors[colorKey],
        Photos: updatedPhotos,
      },
    };

    setColors(updatedColors);
    validateInputs(updatedColors);
  };

  const addColor = () => {
    const newColorKey = `c${Object.keys(colors).length + 1}`;
    const updatedColors = {
      ...colors,
      [newColorKey]: {
        Color: "",
        ColorCode: "#000000",
        Photos: { p1: "" },
      },
    };

    setColors(updatedColors);
  };

  const removeColor = (colorKey) => {
    const { [colorKey]: _, ...newColors } = colors;
    setColors(newColors);
    validateInputs(newColors);
  };

  useEffect(() => {
    props.inputColors(colors);
    props.colorsError(hasError);
  }, [colors, props, hasError]);

  return (
    <>
      <div>
        {Object.keys(colors).map((colorKey, index, array) => (
          <div key={colorKey} className={style.colorsContainer}>
            <div className={style.hexColorContainer}>
              <div
                className={
                  hasError
                    ? `${style.formcontrol} ${style.nameInput} ${style.invalid}`
                    : `${style.formcontrol} ${style.nameInput}`
                }
              >
                <label htmlFor={`Color-${colorKey}`}>Color Name:</label>
                <input
                  type="text"
                  id={`Color-${colorKey}`}
                  value={colors[colorKey].Color}
                  onChange={(e) =>
                    handleColorChange(colorKey, e.target.value, "Color")
                  }
                />
                {hasError && (
                  <p className={style.errortext}>Plese enter a color name.</p>
                )}
              </div>

              <div className={`${style.formcontrol} ${style.hex}`}>
                <label htmlFor={`ColorCode-${colorKey}`}>Hex Code:</label>
                <input
                  type="color"
                  id={`ColorCode-${colorKey}`}
                  value={colors[colorKey].ColorCode}
                  onChange={(e) =>
                    handleColorChange(colorKey, e.target.value, "ColorCode")
                  }
                  required
                />
              </div>

              <div className={style.buttonControl}>
                {index === array.length - 1 &&
                  Object.keys(colors).length > 1 && (
                    <button type="button" onClick={() => removeColor(colorKey)}>
                      Remove
                    </button>
                  )}
              </div>
            </div>
            {Object.keys(colors[colorKey].Photos).map(
              (photoKey, index, photoKeys) => (
                <div key={photoKey} className={style.photoContainer}>
                  <div className={`${style.imageAdd}`}>
                    <label htmlFor={`${photoKey}-${colorKey}`}>
                      Photo {photoKey.toUpperCase()}:
                    </label>
                    <div className={style.colorInput}>
                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        id={`${photoKey}-${colorKey}`}
                        onChange={(e) =>
                          handlePhotoChange(colorKey, photoKey, e)
                        }
                        key={`${resetKey}-${photoKey}-${colorKey}`}
                      />
                      {colors[colorKey].Photos[photoKey] &&
                        typeof colors[colorKey].Photos[photoKey] === "string" &&
                        colors[colorKey].Photos[photoKey].startsWith(
                          "http"
                        ) && (
                          <div className={style.imageContainer}>
                            <Image
                              src={colors[colorKey].Photos[photoKey]}
                              alt="Uploaded Photo"
                              width={40}
                              height={40}
                              onClick={() => {
                                photoModalCTX.oppenModal(
                                  colors[colorKey].Photos[photoKey]
                                );
                              }}
                            />
                          </div>
                        )}
                    </div>
                  </div>

                  {photoKey !== "p1" &&
                    photoKey === photoKeys[photoKeys.length - 1] && (
                      <Image
                        onClick={() => removePhoto(colorKey, photoKey)}
                        src={deleteImage}
                        alt="deleteImage"
                        width={30}
                        height={30}
                      />
                    )}
                </div>
              )
            )}
            <div className={` ${style.newPhoto}`}>
              <p onClick={() => addPhoto(colorKey)}>Add Another Photo</p>
            </div>
          </div>
        ))}
      </div>
      <div className={style.addNewModel}>
        <button type="button" onClick={addColor}>
          Add Another Color
        </button>
      </div>
    </>
  );
}
