import { writeItemInFirebase, getItemById } from "../../../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "PATCH") {
    const data = req.body;

    // Validate ID
    if (!data.id || data.id.trim() === "") {
      return res.status(422).json({
        message: "Invalid id. Please check input fields.",
        status: 422,
      });
    }

    const id = data.id;

    // Fetch the existing item from Firebase to check if it exists

    const existingItem = await getItemById(id);

    if (!existingItem) {
      return res.status(404).json({
        message: "Item not found. Cannot update non-existing item.",
        status: 404,
      });
    }

    if (existingItem) {
      // Default shell structure for models and colors
      const defaultColor = {
        Color: "",
        ColorCode: "#000000",
        Photos: { p1: "" },
      };
      const defaultModel = { m1: { Memory: "", Price: "" } };

      // Validate Item Name

      if (
        data.itemName &&
        (data.itemName.trim().length <= 2 || data.itemName.length > 25)
      ) {
        return res.status(422).json({
          message:
            "Item name can't be shorter than 2 characters or longer than 25 characters.",
          status: 422,
        });
      }
      // Validate Item Category

      const allowedCategories = ["iPhones", "Mac", "iPad", "Accessories"];
      if (data.itemCategory && !allowedCategories.includes(data.itemCategory)) {
        return res.status(422).json({
          message: "Choose one of the displayed categories.",
          status: 422,
        });
      }

      // Validate Short Description
      if (
        data.itemShortDescription &&
        (data.itemShortDescription.trim().length <= 2 ||
          data.itemShortDescription.length > 300)
      ) {
        return res.status(422).json({
          message:
            "Item short description can't be shorter than 2 characters or longer than 300 characters.",
          status: 422,
        });
      }

      // Validate Item Price
      if (data.itemPrice !== undefined) {
        if (data.itemPrice === "" || isNaN(Number(data.itemPrice))) {
          return res.status(422).json({
            message:
              "Item price must be a valid number and cannot be an empty string.",
            status: 422,
          });
        }

        const itemPrice = Number(data.itemPrice);
        if (itemPrice <= 0) {
          return res.status(422).json({
            message: "Item price must be a positive number.",
            status: 422,
          });
        }
      }

      console.log(data, "dat");

      // Validate Memory Models
      const validateMemoryModels = (models) => {
        const errors = {};
        for (const modelKey in models) {
          if (models.hasOwnProperty(modelKey)) {
            const model = models[modelKey];
            const memory = model.Memory?.trim() || "";
            const price = model.Price?.trim() || "";

            if ((memory && !price) || (!memory && price)) {
              errors[modelKey] =
                "Both Memory and Price must be filled if one is filled.";
            }

            if (memory.length > 6) {
              errors[modelKey] = "Memory cannot exceed 6 characters.";
            }

            if (price && isNaN(Number(price))) {
              errors[modelKey] = "Price must be a valid number.";
            }
          }
        }
        return errors;
      };

      const memoryErrors = validateMemoryModels(data.models);
      if (Object.keys(memoryErrors).length > 0) {
        return res.status(422).json({
          message: "Validation errors in memory models.",
          errors: memoryErrors,
          status: 422,
        });
      }

      // Validate Main Photo URL
      const isValidUrl = (url) => {
        try {
          return (
            url.startsWith("https://firebasestorage") ||
            url.startsWith("http://firebasestorage")
          );
        } catch {
          return false;
        }
      };

      if (data.mainPhoto && !isValidUrl(data.mainPhoto)) {
        return res.status(422).json({
          message: "Main photo must be a valid URL.",
          status: 422,
        });
      }

      // Validate Color Photos
      const validateColorPhotos = (colors) => {
        const missingColorNames = [];
        const invalidUrls = [];

        for (const colorKey in colors) {
          if (colors.hasOwnProperty(colorKey)) {
            const colorObj = colors[colorKey];
            const photos = colorObj.Photos || {};
            const colorName = colorObj.Color || "";

            const hasNonEmptyPhoto = Object.values(photos).some(
              (photo) => photo.trim() !== ""
            );
            if (hasNonEmptyPhoto && colorName.trim() === "") {
              missingColorNames.push(colorKey);
            }

            for (const photoKey in photos) {
              if (photos.hasOwnProperty(photoKey)) {
                const photoUrl = photos[photoKey].trim();

                if (photoUrl !== "" && !isValidUrl(photoUrl)) {
                  invalidUrls.push(`${colorKey}.${photoKey}: ${photoUrl}`);
                }
              }
            }
          }
        }

        if (invalidUrls.length > 0) {
          return {
            status: 422,
            message: `Invalid photo URLs found: ${invalidUrls.join(", ")}`,
          };
        }

        if (missingColorNames.length > 0) {
          return {
            status: 422,
            message: `Missing color names for colors with photos: ${missingColorNames.join(
              ", "
            )}`,
          };
        }

        return { status: 200 };
      };

      const colorValidationResult = validateColorPhotos(data.colors);
      if (colorValidationResult.status !== 200) {
        return res.status(colorValidationResult.status).json({
          message: colorValidationResult.message,
          status: colorValidationResult.status,
        });
      }

      // If data.models or data.colors is not provided, fallback to existingItem or defaults
      const updatedItemInformation = {
        ...existingItem, // Merge existing data
        Name: data.itemName || existingItem.Name,
        Category: data.itemCategory || existingItem.Category,
        Description: data.itemDescription || existingItem.Description,
        ShortDescription:
          data.itemShortDescription || existingItem.ShortDescription,
        Price: data.itemPrice || existingItem.Price,
        MainPhoto: data.mainPhoto || existingItem.MainPhoto,
        Available:
          data.available !== undefined
            ? data.available
            : existingItem.Available,
        Recomend:
          data.recomend !== undefined ? data.recomend : existingItem.Recomend,
        Color: data.colors || existingItem.Color || defaultColor,
        Memory: data.models || existingItem.Memory || defaultModel,
      };

      try {
        const response = await writeItemInFirebase(updatedItemInformation, id);

        if (!response.ok) {
          return res.status(500).json({
            message: "Updating database failed!",
            status: 500,
          });
        }

        return res.status(200).json({
          message: "Data updated successfully",
          status: 200,
        });
      } catch (error) {
        console.error("Error while updating the database:", error);
        return res.status(error.status || 500).json({
          message: error.message || "An error occurred!",
          status: error.status || 500,
        });
      }
    } else {
      // If the item does not exist, return an error
      return res.status(404).json({
        message: "Item not found. Cannot update non-existing item.",
        status: 404,
      });
    }
  } else {
    return res
      .status(422)
      .json({ message: "Method not allowed!", status: 422 });
  }
}

export default handler;
