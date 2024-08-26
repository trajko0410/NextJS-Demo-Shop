import { storage } from "../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  updateMetadata,
  listAll,
  deleteObject,
  getStorage,
  getMetadata,
} from "firebase/storage";

import { v4 } from "uuid";

export async function uploadImagetoFirebaseStorage(
  file,
  id,
  type,
  color,
  photoKey
) {
  if (file === null || file === "" || file === undefined) {
    return;
  }

  if (type === "mainPhoto") {
    // Create a reference to the file in Firebase Storage
    const imageRef = ref(storage, `images/${id}/mainPhoto/${file.name + v4()}`);

    // Upload the file to Firebase Storage
    const response = await uploadBytes(imageRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(response.ref);

    return downloadURL; // Return the download URL
  }

  if (type === "colorsPhotos") {
    // Create a reference to the file in Firebase Storage
    const imageRef = ref(
      storage,
      `images/${id}/colors/${color}/${photoKey}/${file.name + v4()}`
    );

    // Upload the file to Firebase Storage
    const response = await uploadBytes(imageRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(response.ref);

    return downloadURL; // Return the download URL
  }
}

export async function deletePhotoFromFirebaseStorage(imageUrl) {
  const storage = getStorage();
  const photoRef = ref(storage, imageUrl);

  try {
    await deleteObject(photoRef);
    console.log("Main photo deleted successfully");
  } catch (error) {
    console.error("Error deleting main photo:", error);
  }
}

export async function deleteColorPhotosFromFirebaseStorage(photoUrls) {
  const storage = getStorage();
  if (!Array.isArray(photoUrls)) {
    console.error(
      "Expected photoUrls to be an array, but received:",
      photoUrls
    );
    return;
  }
  if (photoUrls.length === 0) {
    console.warn("No photos to delete");
    return;
  }
  try {
    await Promise.all(
      photoUrls.map(async (photoUrl) => {
        if (typeof photoUrl !== "string") {
          console.error("Invalid photoUrl:", photoUrl);
          return;
        }
        const photoRef = ref(storage, photoUrl);
        await deleteObject(photoRef);
        console.log(`Successfully deleted: ${photoUrl}`);
      })
    );
    console.log("Color photos deleted successfully");
  } catch (error) {
    console.error("Error deleting color photos:", error);
  }
}

export async function deleteFolderImagesFromFirebaseStorage(folderName) {
  const storage = getStorage();
  const folderRef = ref(storage, folderName);

  try {
    console.log(
      `Attempting to delete all files and subfolders in: ${folderName}`
    );

    // List all items (files) in the folder
    const listResult = await listAll(folderRef);

    if (listResult.items.length === 0 && listResult.prefixes.length === 0) {
      console.log(`Folder ${folderName} is empty or does not exist.`);
      return;
    }

    // Delete each file in the folder
    const deletePromises = listResult.items.map((fileRef) =>
      deleteObject(fileRef).catch((error) => {
        console.error(`Failed to delete file ${fileRef.fullPath}:`, error);
        // Optionally, you can continue deleting other files if you want
      })
    );
    await Promise.all(deletePromises);

    console.log(`All files in the folder ${folderName} deleted successfully.`);

    // Recursively delete subfolders
    const deleteSubfolderPromises = listResult.prefixes.map((subfolderRef) =>
      deleteFolderImagesFromFirebaseStorage(subfolderRef.fullPath).catch(
        (error) => {
          console.error(
            `Failed to delete subfolder ${subfolderRef.fullPath}:`,
            error
          );
        }
      )
    );
    await Promise.all(deleteSubfolderPromises);

    console.log(
      `All files and subfolders in the folder ${folderName} deleted successfully.`
    );
  } catch (error) {
    console.error(`Failed to delete folder ${folderName}:`, error);
    throw new Error(`Failed to delete folder ${folderName}`);
  }
}
