export async function getAllItems() {
  const response = await fetch(
    "THIS IS WHERE YOU NEED TO ENTER YOUR FIREBASE DATABASE. YOU CAN CHECK A PHOTO HOW DATABASE SHOULD LOOK LIKE"
  );

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
