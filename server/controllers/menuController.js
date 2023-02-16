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

export { menuNew, menuAll, menuCurrent, menuLast };
