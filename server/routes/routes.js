import { Router } from "express";
import { v4 } from "uuid";
import bodyParser from "body-parser";

const __dirname = "../client/upload/";
const router = Router();

import {
  foodModel,
  menuModel,
  localMenuModel,
  orderModel,
} from "../models/models.js";
import { getTimeNow, getDateNow } from "../functions/time.js";

export default router;

const handleError = (error, res) => {
  console.log(error);
  res.status(400).json({ message: error.message });
};

const lastIntance = (arr) => arr[arr.length - 1];

// MENU -> 2 MEAL -> 2 COURSE -> 3 FOOD
class Food {
  constructor({ title = "", description = "", image = "" }) {
    this.title = title;
    this.description = description;
    this.image = image;
  }
}
class Course {
  constructor({ options }) {
    this.options = [];
    options.map((el) => this.options.push(new Food(el)));
  }
}
class Meal {
  constructor({ primo, secondo }) {
    this.primo = new Course(primo);
    this.secondo = new Course(secondo);
  }
}
class Menu {
  constructor({ pranzo, cena }) {
    this.pranzo = new Meal(pranzo);
    this.cena = new Meal(cena);
  }
}
class Order {
  constructor({ room, order, menuId }) {
    this.date = getDateNow();
    this.time = getTimeNow();
    this.room = room;
    this.order = order;
    this.menuId = menuId;
  }
}

// --- MISCELLANEOUS ROUTES ---
router.post("/post/food", async ({ body }, res) => {
  const data = new foodModel(new Food(body));
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    handleError(error);
  }
});

router.post("/post/files", (req, res) => {
  const uploadFile = (image, path) => {
    image.mv(__dirname + path);
  };

  const imageLinkTemplate = (oldName, newName) => {
    const nameArr = oldName.split(".");
    const extension = nameArr[nameArr.length - 1];
    // nameArr.pop();
    // const clearName = nameArr.join(".");
    return `${newName}.${extension}`;
  };

  try {
    const files = req.files;
    if (files == null || files == undefined) {
      res.sendStatus(400);
      return;
    }
    let { images } = files;

    if (!Array.isArray(images)) images = [images];

    const imagePaths = images.map((el, i) => imageLinkTemplate(el.name, v4()));

    images.map((image, i) => uploadFile(image, imagePaths[i]));

    return res.status(200).json(imagePaths);
  } catch (error) {
    handleError(error, res);
  }
});

// --- MENU ROUTES ---
router.post("/post/menu", async ({ body }, res) => {
  const data = new menuModel(new Menu(body));
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    handleError(error, res);
  }
});

router.get("/get/menu/last", async ({ body }, res) => {
  const menus = await menuModel.find();
  const lastMenu = lastIntance(menus);
  try {
    // const dataToSave = await data.save();
    res.status(200).json(lastMenu);
  } catch (error) {
    handleError(error, res);
  }
});

router.get("/get/menu/current", async ({ body }, res) => {
  const menus = await menuModel.find();
  const lastMenu = lastIntance(menus);
  try {
    // const dataToSave = await data.save();
    res.status(200).json(lastMenu);
  } catch (error) {
    handleError(error, res);
  }
});

router.get("/get/menu/all", async ({ body }, res) => {
  const menus = await menuModel.find();
  try {
    // const dataToSave = await data.save();
    res.status(200).json(menus);
  } catch (error) {
    handleError(error, res);
  }
});

// --- LOCAL MENU ROUTES ---
router.post("/post/menu-local", async ({ body }, res) => {
  const data = new localMenuModel(new Menu(body));
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    handleError(error, res);
  }
});

router.get("/get/menu-local/last", async ({ body }, res) => {
  const menus = await localMenuModel.find();
  const lastMenu = lastIntance(menus);
  try {
    // const dataToSave = await data.save();
    res.status(200).json(lastMenu);
  } catch (error) {
    handleError(error, res);
  }
});

// --- ORDER ROUTES ---
router.post("/post/order", async ({ body }, res) => {
  const data = new orderModel(new Order(body));
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    handleError(error, res);
  }
});

router.put("/edit/order", async ({ body }, res) => {
  const unplain = (order) => {
    const clone = {
      room: order.room,
      date: order.date,
      time: order.time,
      menuId: order.menuId,
      order: {
        pranzo: {
          primo: { options: [], allergeni: null },
          secondo: { options: [], allergeni: null },
        },
        cena: {
          primo: { options: [], allergeni: null },
          secondo: { options: [], allergeni: null },
        },
      },
    };
    delete order.room;
    delete order.date;
    delete order.time;
    delete order.menuId;

    const properties = Object.getOwnPropertyNames(order);
    properties
      .map((el) => el.split("_"))
      .map(([time, type, i], index) => {
        if (isNaN(parseInt(i)))
          clone.order[time][type].allergeni = order[properties[index]];
        else {
          clone.order[time][type]["options"][i] = order[properties[index]];
        }
      });
    return clone;
  };

  const { _id } = body;
  delete body.recid;
  delete body._id;
  delete body.__v;

  try {
    const data = await orderModel.findOneAndUpdate({ _id }, unplain(body), {
      returnDocument: "after",
    });
    res.status(200).json(data);
  } catch (error) {
    handleError(error, res);
  }
});

router.delete("/delete/order", async ({ body }, res) => {
  try {
    const { _id } = body;
    const data = await orderModel.findOneAndDelete({ _id });
    res.status(200).json(data);
  } catch (error) {
    handleError(error, res);
  }
});

router.get("/get/order/all", async ({ body }, res) => {
  const orders = await orderModel.find();
  try {
    res.status(200).json(orders);
  } catch (error) {
    handleError(error, res);
  }
});

router.get("/get/order/all/plain", async ({ body }, res) => {
  const orders = await orderModel.find().lean();
  const plain = (order) => {
    const data = order.order;

    delete order.order;

    for (const mealTime in data)
      for (const mealType in data[mealTime]) {
        const options = data[mealTime][mealType].options;
        for (let i = 0; i < options.length; i++) {
          const prop = `${mealTime}_${mealType}_${i}`;
          const value = options[i];
          order[prop] = value;
        }
        const prop = `${mealTime}_${mealType}_allergeni`;
        const value = data[mealTime][mealType].allergies;
        order[prop] = value;
      }
    return order;
  };

  const plainOrders = orders.map(plain).map((order, i) => {
    order.recid = i;
    return order;
  });
  try {
    res.status(200).json(plainOrders);
  } catch (error) {
    handleError(error, res);
  }
});
router.get("/get/order/all/summary", async ({ body }, res) => {
  const orders = await orderModel.find().lean();
  function summary(data) {
    const plain = (order) => {
      const data = order.order;

      delete order.order;

      for (const mealTime in data)
        for (const mealType in data[mealTime]) {
          const options = data[mealTime][mealType].options;
          for (let i = 0; i < options.length; i++) {
            const prop = `${mealTime}_${mealType}_${i}`;
            const value = options[i];
            order[prop] = value;
          }
          const prop = `${mealTime}_${mealType}_allergeni`;
          const value = data[mealTime][mealType].allergies;
          order[prop] = value;
        }
      return order;
    };
    const unplain = (order) => {
      const clone = {
        order: {
          pranzo: {
            primo: { options: [], allergeni: null },
            secondo: { options: [], allergeni: null },
          },
          cena: {
            primo: { options: [], allergeni: null },
            secondo: { options: [], allergeni: null },
          },
        },
      };

      const properties = Object.getOwnPropertyNames(order);
      properties
        .map((el) => el.split("_"))
        .map(([time, type, i], index) => {
          if (isNaN(parseInt(i)))
            clone.order[time][type].allergeni = order[properties[index]];
          else {
            clone.order[time][type]["options"][i] = order[properties[index]];
          }
        });
      return clone;
    };

    const plainOrders = data.map(plain);
    const accumulator = {
      pranzo_primo_0: 0,
      pranzo_primo_1: 0,
      pranzo_primo_2: 0,
      pranzo_primo_allergeni: "",
      pranzo_secondo_0: 0,
      pranzo_secondo_1: 0,
      pranzo_secondo_2: 0,
      pranzo_secondo_allergeni: "",
      cena_primo_0: 0,
      cena_primo_1: 0,
      cena_primo_2: 0,
      cena_primo_allergeni: "",
      cena_secondo_0: 0,
      cena_secondo_1: 0,
      cena_secondo_2: 0,
      cena_secondo_allergeni: "",
    };
    const addToAcc = (order) => {
      // Handle allergeni and Options
      for (const prop in accumulator)
        if (isNaN(parseInt(prop[prop.length - 1]))) {
          // Allergeni
          accumulator[prop] += order[prop] + "\n";
        } else {
          // Options
          accumulator[prop] += parseInt(order[prop]);
        }
    };
    plainOrders.map(addToAcc);

    return unplain(accumulator);
  }
  try {
    res.status(200).json(summary(orders));
  } catch (error) {
    handleError(error, res);
  }
});
