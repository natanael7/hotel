const BASE_URL = "http://127.0.0.1:3000";
const FOOD_URL = BASE_URL + "/api/dish";
const MENU_CURRENT_URL = BASE_URL + "/api/get/menu/current";
const ORDER_URL = BASE_URL + "/api/order";

import { IFoodServer, IMenuServer } from "./types";

// ----   MENU   ----
export async function POST_ORDER(item: IFoodServer) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  };
  const res = await fetch(ORDER_URL, options);
  if (!res.ok) throw "Error posting new order";
}

// ----   MENU   ----
export async function GET_MENU_CURRENT(): Promise<IMenuServer> {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(MENU_CURRENT_URL, options);
  const data: IMenuServer = await response.json();
  return data;
}

// ----   FOOD   ----
export async function UPDATE_FOOD(item: IFoodServer): Promise<IFoodServer> {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  };
  const response = await fetch(FOOD_URL, options);
  const data: IFoodServer = await response.json();
  return data;
}
export async function DELETE_FOOD(item: IFoodServer): Promise<IFoodServer> {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  };
  const response = await fetch(FOOD_URL, options);
  const data: IFoodServer = await response.json();
  return data;
}
export async function GET_FOOD(): Promise<IFoodServer[]> {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(FOOD_URL, options);
  const data: IFoodServer[] = await response.json();
  return data;
}
export async function POST_FOOD(item: IFoodServer) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  };
  const res = await fetch(FOOD_URL, options);
  if (!res.ok) throw "Error posting new food";
}
