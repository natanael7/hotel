import { foodModel } from "../models/models.js";
import { Food } from "../classes/classes.js";

import errorHandler from "../functions/errorHandler.js";
import sendResult from "../functions/sendResult.js";

async function dishNew({ body }, res) {
  try {
    const data = new foodModel(new Food(body));
    const dataToSave = await data.save();
    sendResult(dataToSave, res);
  } catch (error) {
    errorHandler(error, res);
  }
}

async function dishEdit({ body }, res) {
  try {
    // To update a record in a database first of all we will destructure the body to get the id
    const { _id } = body;
    // And finally we will find the order by id and the new order will be the unplain replica of the body
    // Back we will get the new updated record from the database and we will send it as an response to the client
    const data = await foodModel.findOneAndUpdate({ _id }, body, {
      returnDocument: "after",
    });

    sendResult(data, res);
  } catch (error) {
    errorHandler(error, res);
  }
}

async function dishDelete({ body }, res) {
  console.log("deleting");
  try {
    const { _id } = body;
    const data = await foodModel.findOneAndDelete({ _id }).lean();
    sendResult(data, res);
  } catch (error) {
    errorHandler(error, res);
  }
}

async function dishGet(req, res) {
  try {
    const filter = req.body || {};

    // The lean method allows us to recieve a pure JS object instead of a mongoose object
    // Without the lean method we wouldn't be able to mutate the object
    const dishes = await foodModel.find(filter).lean();

    // Using the summary function we will create and send a summary to the client
    sendResult(dishes, res);
  } catch (error) {
    errorHandler(error, res);
  }
}

export { dishNew, dishGet, dishDelete, dishEdit };
