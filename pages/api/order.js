import {
  connectToMongoDbDatabase,
  insertDataInDatabase,
} from "../../helpers/mongoDbConnection";

async function handler(req, res) {
  let shippingInfo;
  let orderInfo;
  let timeOfOrder;

  if (req.method === "POST") {
    timeOfOrder = req.body.timeStamp;
    orderInfo = req.body.orderedItems;
    shippingInfo = req.body.shippingInfo;

    const customerName = shippingInfo.name;
    const customerEmail = shippingInfo.email;
    const customerAdress = shippingInfo.address;
    const customerCity = shippingInfo.city;
    const customerZip = shippingInfo.zip;
    const customerPhone = shippingInfo.phone;

    console.log(shippingInfo);

    if (!customerEmail || !customerEmail.includes("@")) {
      res.status(422).json({
        message: "Invalid email address. Plese check your shipping info.",
        status: 422,
      });
      return;
    }

    if (
      !customerName.trim() ||
      !customerAdress.trim() ||
      !customerCity.trim() ||
      !customerZip.trim() ||
      !customerPhone.trim()
    ) {
      res.status(422).json({
        message:
          "Shipping info is invalid. Plese check if you entered all the required fileds!",
        status: 422,
      });
      return;
    }
  }

  if (orderInfo.length <= 0) {
    res.status(404).json({
      message:
        "It seams your order was empty. Please add item to a cart before subbmitting an order.",
      status: 404,
    });
    return;
  }

  if (orderInfo.itemAvailable === true) {
    res.status(404).json({
      message: "Item is not available",
      status: 404,
    });
    return;
  }

  orderInfo.forEach((order, index) => {
    if (order.itemAvailable === false) {
      res.status(404).json({
        message: `${orderInfo[index].itemName} is curently unavailable`,
        status: 404,
      });

      //console.log("Order with index", orderInfo[index].itemName, "is available");
    }
    return;
  });

  //console.log("POSTING", body, name, email);

  let client;

  try {
    client = await connectToMongoDbDatabase();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Connecting to the database failed!", status: 500 });
    return;
  }

  try {
    await insertDataInDatabase(client, "Orders", {
      shippingInfo: shippingInfo,
      order: orderInfo,
      timeOfOrder: timeOfOrder,
    });
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Inserting data failed!", status: 500 });
    return;
  }

  res.status(201).json({
    message: "Your order has been successfully submitred",
    status: 201,
  });
}

export default handler;
