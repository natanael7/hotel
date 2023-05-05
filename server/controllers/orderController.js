import { orderModel, deletedOrderModel } from "../models/models.js";
import { Order } from "../classes/classes.js";
import { unplain, plain } from "../functions/plain.js";
import { getTimeNow, getDateNow } from "../functions/time.js";
import summary from "../functions/summary.js";
import errorHandler from "../functions/errorHandler.js";
import sendResult from "../functions/sendResult.js";

const plainArray = (orders) => orders.map((order) => plain(order));

async function backupOrder(data) {
  data.timestamp = Date.now();
  data.date = getDateNow();
  data.time = getTimeNow();

  const backup = new deletedOrderModel(data);
  await backup.save();
}

async function orderNew({ body }, res) {
  try {
    const data = new orderModel(new Order(body));
    const dataToSave = await data.save();
    sendResult(dataToSave, res);
  } catch (error) {
    errorHandler(error, res);
  }
}

async function orderAll(req, res) {
  try {
    const orders = await orderModel.find();
    sendResult(orders, res);
  } catch (error) {
    errorHandler(error, res);
  }
}
async function orderFiltered(req, res) {
  try {
    const orders = await orderModel.find();
    sendResult(orders, res);
  } catch (error) {
    errorHandler(error, res);
  }
}
async function orderFilteredPlain({ body }, res) {
  try {
    // The lean method allows us to recieve a pure JS object instead of a mongoose object
    // Without the lean method we wouldn't be able to mutate the object
    const orders = await orderModel.find(body).lean();

    // In this function we map the orders to their plain replica, and add them a recid that's requiered for the UI framework
    const plainOrders = orders.map(plain).map((order, i) => {
      order.recid = i;
      return order;
    });
    sendResult(plainOrders, res);
  } catch (error) {
    errorHandler(error, res);
  }
}

async function orderDelete({ body }, res) {
  try {
    const { _id } = body;
    const data = await orderModel.findOneAndDelete({ _id }).lean();
    await backupOrder(data);
    sendResult(data, res);
  } catch (error) {
    errorHandler(error, res);
  }
}

async function orderEdit({ body }, res) {
  // This function will get the body as an plain UPDATED order
  try {
    // To update a record in a database first of all we will destructure the body to get the id
    const { _id } = body;
    // After that we will remove all the unnecessary properties of the order
    delete body.recid;
    delete body._id;
    delete body.__v;

    // And finally we will find the order by id and the new order will be the unplain replica of the body
    // Back we will get the new updated record from the database and we will send it as an response to the client
    const data = await orderModel.findOneAndUpdate({ _id }, unplain(body), {
      returnDocument: "after",
    });

    sendResult(data, res);
  } catch (error) {
    errorHandler(error, res);
  }
}

async function orderAllPlain(req, res) {
  try {
    // The lean method allows us to recieve a pure JS object instead of a mongoose object
    // Without the lean method we wouldn't be able to mutate the object
    const orders = await orderModel.find().lean();

    // In this function we map the orders to their plain replica, and add them a recid that's requiered for the UI framework
    const plainOrders = orders.map(plain).map((order, i) => {
      order.recid = i;
      return order;
    });
    sendResult(plainOrders, res);
  } catch (error) {
    errorHandler(error, res);
  }
}
async function orderAllSummary(req, res) {
  try {
    // The lean method allows us to recieve a pure JS object instead of a mongoose object
    // Without the lean method we wouldn't be able to mutate the object
    const orders = await orderModel.find().lean();

    // Using the summary function we will create and send a summary to the client
    sendResult(summary(orders), res);
  } catch (error) {
    errorHandler(error, res);
  }
}

async function orderGet(req, res) {
  try {
    const filter = req.body || {};
    const { mode = "default" } = req.params;
    // The lean method allows us to recieve a pure JS object instead of a mongoose object
    // Without the lean method we wouldn't be able to mutate the object
    console.log(filter);
    const orders = await orderModel.find(filter).lean();

    let result;
    switch (mode) {
      case "plain":
        result = plainArray(orders).map((order, i) => {
          order.recid = i;
          return order;
        });
        break;
      case "summary":
        result = summary(orders);
        break;
      default:
        result = orders;
    }

    // Using the summary function we will create and send a summary to the client
    sendResult(result, res);
  } catch (error) {
    errorHandler(error, res);
  }
}

export {
  orderGet,
  orderNew,
  orderEdit,
  orderDelete,
  orderAll,
  orderFiltered,
  orderFilteredPlain,
  orderAllPlain,
  orderAllSummary,
};
