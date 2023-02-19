import { menuModel } from "../models/models.js";
import { Menu } from "../classes/classes.js";
import errorHandler from "../functions/errorHandler.js";
import sendResult from "../functions/sendResult.js";

const lastIntance = (arr) => arr[arr.length - 1];

async function menuNew({ body }, res) {
  try {
    const data = new menuModel(new Menu(body));
    const dataToSave = await data.save();
    sendResult(dataToSave, res);
  } catch (error) {
    errorHandler(error, res);
  }
}

async function menuEdit({ body }, res) {
  // This function will get the body as an plain UPDATED order
  try {
    // To update a record in a database first of all we will destructure the body to get the id
    const { _id } = body;
    // After that we will remove all the unnecessary properties of the order

    // And finally we will find the order by id and the new order will be the unplain replica of the body
    // Back we will get the new updated record from the database and we will send it as an response to the client
    const data = await menuModel.findOneAndUpdate({ _id }, body, {
      returnDocument: "after",
    });

    sendResult(data, res);
  } catch (error) {
    errorHandler(error, res);
  }
}

async function menuLast(req, res) {
  try {
    const menus = await menuModel.find();
    const lastMenu = lastIntance(menus);
    sendResult(lastMenu, res);
  } catch (error) {
    errorHandler(error, res);
  }
}

async function menuCurrent(req, res) {
  try {
    const menus = await menuModel.find();
    const lastMenu = lastIntance(menus);
    sendResult(lastMenu, res);
  } catch (error) {
    errorHandler(error, res);
  }
}

async function menuAll(req, res) {
  try {
    const menus = await menuModel.find();
    sendResult(menus, res);
  } catch (error) {
    errorHandler(error, res);
  }
}

export { menuNew, menuAll, menuCurrent, menuLast, menuEdit };
