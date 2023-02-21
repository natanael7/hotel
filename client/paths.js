// -----   CONFIG   -----
const THANK_YOU_URL = "/order/thank-you.html";
const PROBLEM_URL = "/order/problem.html";

const baseUrl = "http://127.0.0.1:3000";

const url = {
  uploadFiles: baseUrl + "/api/post/files",

  localMenu: {
    post: baseUrl + "/api/post/menu-local",
    get: {
      last: baseUrl + "/api/get/menu-local/last",
    },
  },
  menu: {
    post: baseUrl + "/api/post/menu",
    edit: baseUrl + "/api/edit/menu",
    get: {
      last: baseUrl + "/api/get/menu/last",
      all: baseUrl + "/api/get/menu/all",
      current: baseUrl + "/api/get/menu/current",
    },
  },
  order: {
    post: baseUrl + "/api/post/order",
    edit: baseUrl + "/api/edit/order",
    delete: baseUrl + "/api/delete/order",
    get: {
      default: baseUrl + "/api/get/order",
      plain: baseUrl + "/api/get/order/plain",
      summary: baseUrl + "/api/get/order/summary",
    },
  },
};

async function fetchUrl(url, options, returnResponse = false) {
  const res = await fetch(url, options);

  if (returnResponse) return res;

  if (res.ok) {
    const json = await res.json();
    return json;
  } else {
    console.log(res);
    return { error: true, res };
  }
}

// ----   MISC   ----
const uploadFiles = async (options) => await fetchUrl(url.uploadFiles, options);

// ----   LOCAL-MENU   ----
const getLocalMenuLast = async (options) =>
  await fetchUrl(url.localMenu.get.last, options);

const postLocalMenu = async (options) =>
  await fetchUrl(url.localMenu.post, options);

// ----   MENU   ----
const getMenuLast = async (options) =>
  await fetchUrl(url.menu.get.last, options);

const getMenuCurrent = async (options) =>
  await fetchUrl(url.menu.get.current, options);

const editMenu = async (options) => await fetchUrl(url.menu.edit, options);
const postMenu = async (options) => await fetchUrl(url.menu.post, options);

// ----   ORDERS   ----
const postOrder = async (options, res) =>
  await fetchUrl(url.order.post, options, res);

const deleteOrder = async (options) =>
  await fetchUrl(url.order.delete, options);

const editOrder = async (options) => await fetchUrl(url.order.edit, options);

const getOrdersSummary = async (options) =>
  await fetchUrl(url.order.get.summary, options);

const getOrdersPlain = async (options) =>
  await fetchUrl(url.order.get.plain, options);
