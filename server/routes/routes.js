import { Router } from "express";
const router = Router();

import { foodNew, filesUpload } from "../controllers/miscController.js";

import {
  menuNew,
  menuEdit,
  menuAll,
  menuLast,
  menuCurrent,
} from "../controllers/menuController.js";

import {
  menuLocalLast,
  menuLocalNew,
} from "../controllers/localMenuController.js";

import {
  orderNew,
  orderEdit,
  orderDelete,
  orderAll,
  orderAllPlain,
  orderAllSummary,
} from "../controllers/orderController.js";


// --- MISCELLANEOUS ROUTES ---
router.post("/post/food", foodNew);

router.post("/post/files", filesUpload);

// --- MENU ROUTES ---
router.post("/post/menu", menuNew);

router.post("/edit/menu", menuEdit);

router.get("/get/menu/last", menuLast);

router.get("/get/menu/current", menuCurrent);

router.get("/get/menu/all", menuAll);

// --- LOCAL MENU ROUTES ---
router.post("/post/menu-local", menuLocalNew);

router.get("/get/menu-local/last", menuLocalLast);

// --- ORDER ROUTES ---
router.post("/post/order", orderNew);

router.put("/edit/order", orderEdit);

router.delete("/delete/order", orderDelete);

router.get("/get/order/all", orderAll);

router.get("/get/order/all/plain", orderAllPlain);

router.get("/get/order/all/summary", orderAllSummary);

export default router;
