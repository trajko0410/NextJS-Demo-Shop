import { deleteItemFromFirebase } from "../../../../helpers/db-util";

import { deleteFolderImagesFromFirebaseStorage } from "../../../../helpers/firebaseStorage";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      // Delete item from the database
      const dbResponse = await deleteItemFromFirebase(id);

      if (!dbResponse) {
        // Check if dbResponse exists
        return res.status(500).json({
          message: "Failed to delete item from database!",
          status: 500,
        });
      }

      // Delete folder from storage
      try {
        await deleteFolderImagesFromFirebaseStorage(`/images/${id}`);
      } catch (error) {
        return res.status(500).json({
          message: "Failed to delete images folder!",
          status: 500,
        });
      }

      // Successful deletion response
      return res.status(200).json({
        message: "Item and images deleted successfully",
        status: 200,
      });
    } catch (error) {
      console.error("Error during deletion:", error);
      return res.status(500).json({
        message: "Failed to delete item or image.",
        status: 500,
      });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
