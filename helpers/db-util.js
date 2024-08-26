const firebaseCredentials = process.env.FIREBASECREDENTIALS;

export async function getAllItems() {
  //console.log(firebaseCredentials);
  const response = await fetch(`${firebaseCredentials}/items.json`);
  //console.log(response);

  const data = await response.json();
  //console.log(data);

  const items = [];

  for (const key in data) {
    items.push({
      id: key,
      ...data[key],
    });
  }
  return items;
}

export async function getItemById(id) {
  const allEvents = await getAllItems();
  return allEvents.find((event) => event.id === id);
}

export async function getFeaturedItems() {
  const allEvents = await getAllItems();
  return allEvents.filter((event) => event.Recomend);
}

export async function writeItemInFirebase(itemData, itemId) {
  const response = await fetch(`${firebaseCredentials}/items/${itemId}.json`, {
    method: "PUT",
    body: JSON.stringify(itemData), // Use a single argument with the full object
    headers: {
      "Content-Type": "application/json", // Corrected content type
    },
  });

  return response;
}

export async function deleteItemFromFirebase(itemId) {
  const response = await fetch(`${firebaseCredentials}/items/${itemId}.json`, {
    method: "DELETE",
  });

  return response;
}

export async function deleteMainPhotoFromFirebase(imageUrl) {
  const response = await fetch(`${imageUrl}`, {
    method: "DELETE",
  });

  return response;
}
