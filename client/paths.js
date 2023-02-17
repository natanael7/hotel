const baseUrl = "http://127.0.0.1:3000";
const url = {
  uploadFiles: baseUrl + "/api/post/files",
  getLocalMenuLast: baseUrl + "/api/get/menu-local/last",
  postLocalMenu: baseUrl + "/api/post/menu-local",
  getMenuLast: baseUrl + "/api/get/menu/last",
  postOrder: baseUrl + "/api/post/order",
  deleteOrder: baseUrl + "/api/delete/order",
  updateOrder: baseUrl + "/api/edit/order",
  getOrderAllPlain: baseUrl + "/api/get/order/all/plain",
  getMenuAll: baseUrl + "/api/get/menu/all",
  getOrderAllSummary: baseUrl + "/api/get/order/all/summary",
  getMenuCurrent: baseUrl + "/api/get/menu/current",
};

async function fetchUrl(url, options) {
  const res = await fetch(url, options);
  const json = await res.json();
  return json;
}

const uploadFiles = async (options) => await fetchUrl(url.uploadFiles, options);

const getLocalMenuLast = async (options) =>
  await fetchUrl(url.getLocalMenuLast, options);

const postLocalMenu = async (options) =>
  await fetchUrl(url.postLocalMenu, options);

const getMenuLast = async (options) => await fetchUrl(url.getMenuLast, options);

const postOrder = async (options) => await fetchUrl(url.postOrder, options);

const deleteOrder = async (options) => await fetchUrl(url.deleteOrder, options);

const updateOrder = async (options) => await fetchUrl(url.updateOrder, options);

const getOrderAllPlain = async (options) =>
  await fetchUrl(url.getOrderAllPlain, options);

const getMenuAll = async (options) => await fetchUrl(url.getMenuAll, options);

const getOrderAllSummary = async (options) =>
  await fetchUrl(url.getOrderAllSummary, options);

const getMenuCurrent = async (options) =>
  await fetchUrl(url.getMenuCurrent, options);
