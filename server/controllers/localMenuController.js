import { localMenuModel } from "../models/models.js";
import { Menu } from "../classes/classes.js";
import errorHandler from "../functions/errorHandler.js";
import sendResult from "../functions/sendResult.js";

const lastIntance = (arr) => arr[arr.length - 1];

async function menuLocalNew({ body }, res) {
  try {
    const data = new localMenuModel(new Menu(body));
    const dataToSave = await data.save();
    sendResult(dataToSave, res);
  } catch (error) {
    errorHandler(error, res);
  }
}

async function menuLocalLast({ body }, res) {
  try {
    const menus = await localMenuModel.find();
    const lastMenu = lastIntance(menus);
    sendResult(lastMenu, res);
  } catch (error) {
    errorHandler(error, res);
  }
}

export { menuLocalLast, menuLocalNew };
