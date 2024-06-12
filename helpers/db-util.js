export async function getAllItems() {
  const firebaseCredentials = process.env.FIREBASECREDENTIALS;
  console.log(firebaseCredentials);
  const response = await fetch(firebaseCredentials);
  console.log(response);

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
