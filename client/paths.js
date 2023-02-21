// -----   CONFIG   -----
const THANK_YOU_URL = "/order/thank-you.html";
const PROBLEM_URL = "/order/problem.html";

const baseUrl = "http://127.0.0.1:3000";

const url = {
  uploadFiles: baseUrl + "/api/post/files",
  getLocalMenuLast: baseUrl + "/api/get/menu-local/last",
  postLocalMenu: baseUrl + "/api/post/menu-local",
  getMenuLast: baseUrl + "/api/get/menu/last",
  editMenu: baseUrl + "/api/edit/menu",
  postMenu: baseUrl + "/api/post/menu",
  postOrder: baseUrl + "/api/post/order",
  deleteOrder: baseUrl + "/api/delete/order",
  updateOrder: baseUrl + "/api/edit/order",
  getOrderAllPlain: baseUrl + "/api/get/order/all/plain",
  getMenuAll: baseUrl + "/api/get/menu/all",
  getOrderAllSummary: baseUrl + "/api/get/order/all/summary",
  getMenuCurrent: baseUrl + "/api/get/menu/current",
  getOrderFiltered: baseUrl + "/api/get/order/filtered",
  getOrderFilteredPlain: baseUrl + "/api/get/order/filtered/plain",
};

async function fetchUrl(url, options, returnResponse = false) {
  const res = await fetch(url, options);

  if (returnResponse) return res;

  if (res.ok) {
    const json = await res.json();
    return json;
  } else {
    return { error: true, res };
  }
}

const uploadFiles = async (options) => await fetchUrl(url.uploadFiles, options);

const getLocalMenuLast = async (options) =>
  await fetchUrl(url.getLocalMenuLast, options);

const postLocalMenu = async (options) =>
  await fetchUrl(url.postLocalMenu, options);

const getMenuLast = async (options) => await fetchUrl(url.getMenuLast, options);

const postOrder = async (options, res) =>
  await fetchUrl(url.postOrder, options, res);

const deleteOrder = async (options) => await fetchUrl(url.deleteOrder, options);

const updateOrder = async (options) => await fetchUrl(url.updateOrder, options);

const getOrderAllPlain = async (options) =>
  await fetchUrl(url.getOrderAllPlain, options);

const getMenuAll = async (options) => await fetchUrl(url.getMenuAll, options);

const getOrderAllSummary = async (options) =>
  await fetchUrl(url.getOrderAllSummary, options);

const getMenuCurrent = async (options) =>
  await fetchUrl(url.getMenuCurrent, options);

const editMenu = async (options) => await fetchUrl(url.editMenu, options);
const postMenu = async (options) => await fetchUrl(url.postMenu, options);
const getOrderFiltered = async (options) =>
  await fetchUrl(url.getOrderFiltered, options);
const getOrderFilteredPlain = async (options) =>
  await fetchUrl(url.getOrderFilteredPlain, options);
