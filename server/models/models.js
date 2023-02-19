import { Schema, model } from "mongoose";

const foodScheme = new Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: false,
    type: String,
  },
});
const menuScheme = new Schema({
  pranzo: {
    primo: Object,
    secondo: Object,
  },
  cena: {
    primo: Object,
    secondo: Object,
  },
});
const orderScheme = new Schema({
  room: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: String,
  },
  time: {
    required: true,
    type: String,
  },
  menuId: {
    required: true,
    type: String,
  },
  order: Object,
});
const auditSchema = new Schema({
  timestamp: {},
  date: {},
  time: {},
  headers: {},
  httpVersion: {},
  method: {},
  remoteAddress: {},
  remoteFamily: {},
  url: {},
  body: {},
});
const errorSchema = new Schema({
  timestamp: {},
  date: {},
  time: {},
  error: {},
});

const foodModel = model("Food", foodScheme);
const menuModel = model("Menu", menuScheme);
const localMenuModel = model("Local-Menu", menuScheme);
const orderModel = model("Order", orderScheme);
const auditModel = model("Audit", auditSchema);
const errorModel = model("Errors", errorSchema);

export {
  foodModel,
  menuModel,
  localMenuModel,
  orderModel,
  auditModel,
  errorModel,
};
