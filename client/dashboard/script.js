import { w2toolbar } from "https://rawgit.com/vitmalina/w2ui/master/dist/w2ui.es6.min.js";
const links = [
  "/dashboard",
  "/add-menu",
  "/edit-menu",
  "/orders",
  "/summary",
  "/order",
];
const createToolbar = (index) => {
  const items = [
    {
      type: "radio",
      id: "settings",
      text: "Settings",
      icon: "w2ui-icon-settings",
      link: "/dashboard",
    },
    {
      type: "radio",
      id: "add-menu",
      text: "Add menu",
      icon: "w2ui-icon-plus",
      link: "/add-menu",
    },
    {
      type: "radio",
      id: "edit-menu",
      text: "Edit menu",
      icon: "w2ui-icon-pencil",
      link: "/edit-menu",
    },
    {
      type: "radio",
      id: "orders",
      text: "Orders",
      icon: "w2ui-icon-columns",
      link: "/table",
    },
    {
      type: "radio",
      id: "summary",
      text: "Summary",
      icon: "w2ui-icon-info",
      link: "/summary",
    },
    {
      type: "radio",
      id: "add-order",
      text: "Add order",
      icon: "w2ui-icon-paste",
      link: "/order",
    },
  ];
  items[index].checked = true;
  const container = document.createElement("div");
  container.id = "toolbar";
  document.querySelector("body").prepend(container);
  return new w2toolbar({
    box: "#toolbar",
    name: "toolbar",
    items,
    onClick(event) {
      window.location = event.object.link;
    },
  });
};

createToolbar(0);
