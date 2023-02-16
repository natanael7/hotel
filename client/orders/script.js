const ROOM_IS_EDITABLE = false;

const deleteUrl = "http://127.0.0.1:3000/api/delete/order";
const updateUrl = "http://127.0.0.1:3000/api/edit/order";
const dataUrl = "http://127.0.0.1:3000/api/get/order/all/plain";
const menuUrl = "http://127.0.0.1:3000/api/get/menu/all";
import {
  w2layout,
  w2sidebar,
  w2grid,
  w2form,
  w2utils,
  w2alert,
  w2confirm,
  query,
} from "https://rawgit.com/vitmalina/w2ui/master/dist/w2ui.es6.min.js";

class Order {
  constructor({ _id }) {
    this._id = _id;
    console.log(this._id);
  }
  async delete() {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this),
    };
    const res = await fetch(deleteUrl, options);
    const json = await res.json();
    console.log(json);
  }
}

window.showConfirm = function (record) {
  if (typeof record == "undefined") return;
  if (typeof record._id == "undefined") return;
  w2confirm(`Are you sure you want to delete order for room #${record.room}`)
    .yes(() => {
      const order = new Order(record);
      order.delete();
      refresh();
    })
    .no(() => {});
};
async function main() {
  window.refresh = () => {
    gridCena.refresh();
    gridPranzo.refresh();
  };
  async function getData() {
    const menus = await (await fetch(menuUrl)).json();
    const orders = await (await fetch(dataUrl)).json();
    return { menus, orders };
  }
  const selectCorrectMenu = (menus) => menus[menus.length - 1];
  const mealNamesFromMenu = (menu) => {
    const names = {
      pranzo_primo: [],
      pranzo_secondo: [],
      cena_primo: [],
      cena_secondo: [],
    };
    for (const property in names) {
      const meal = property.split("_");
      const mealTime = meal[0];
      const mealType = meal[1];
      names[property] = menu[mealTime][mealType].options.map(
        ({ title }) => title
      );
    }
    return names;
  };
  const { menus, orders } = await getData();

  const actualMenu = selectCorrectMenu(menus);
  const mealNames = mealNamesFromMenu(actualMenu);

  const masterField = ({
    id,
    group,
    label,
    type = "int",
    attr = 'style="width: 40px"',
  }) => ({
    field: id,
    type: type,
    html: {
      group,
      label:
        typeof label == "undefined"
          ? mealNames[id.split("_")[0] + "_" + id.split("_")[1]][
              id.split("_")[2]
            ]
          : label,
      attr,
    },
    required: true,
    options: { arrows: true, min: 0, max: 50 },
  });

  function renderTable() {
    layout.render("#main");
    layout.html("left", sidebar);
    layout.html("main", gridPranzo);
    layout.html("right", form);
  }
  const getOrders = () => {
    const actualMenuId = actualMenu._id;

    const filteredByMenu = orders.filter(
      ({ menuId }) => menuId == actualMenuId
    );
    return filteredByMenu;
  };
  const config = {
    layout: {
      name: "layout",
      padding: 4,
      panels: [
        { type: "left", size: 110, resizable: true, minSize: 35 },
        { type: "main", size: "50%", resizable: true, minSize: 300 },
        { type: "right", minSize: 300, style: "overflow: hidden" },
      ],
    },
    sidebar: {
      name: "sidebar",
      flatButton: true,
      nodes: [
        {
          id: "general",
          text: "General",
          group: true,
          expanded: true,
          groupShowHide: false,
          nodes: [
            {
              id: "gridPranzo",
              text: "Pranzo",
              icon: "fa fa-list-alt",
              selected: true,
            },
            { id: "gridCena", text: "Cena", icon: "fa fa-list-alt" },
          ],
          onCollapse(event) {
            event.preventDefault();
          },
        },
      ],
      onFlat(event) {
        layout.sizeTo("left", event.detail.goFlat ? 35 : 200, true);
      },
      onClick(event) {
        switch (event.target) {
          case "gridPranzo":
            layout.html("main", gridPranzo);
            break;
          case "gridCena":
            layout.html("main", gridCena);
            break;
        }
      },
    },
    form: {
      header: "Edit Record",
      name: "form",
      flatButton: true,
      fields: [
        {
          field: "room",
          type: "text",
          html: { label: "Camera", attr: 'size="10" readonly' },
          required: true,
        },
        masterField({
          id: "pranzo_primo_0",
          group: "Pranzo - Primo",
        }),
        masterField({
          id: "pranzo_primo_1",
          group: "Pranzo - Primo",
        }),
        masterField({
          id: "pranzo_primo_2",
          group: "Pranzo - Primo",
        }),

        {
          field: "pranzo_primo_allergeni",
          type: "textarea",
          html: {
            label: "Allergeni ",
            span: -1,
            attr: `contenteditable
                   onchange="()=>{console.log(1)}" style=" width:105%; height: 60px;padding: 5px; border: 1px solid silver; border-radius: 3px; background-color: white;"`,
          },
        },
        masterField({
          id: "pranzo_secondo_0",
          group: "Pranzo - Secondo",
        }),
        masterField({
          id: "pranzo_secondo_1",
          group: "Pranzo - Secondo",
        }),
        masterField({
          id: "pranzo_secondo_2",
          group: "Pranzo - Secondo",
        }),
        {
          field: "pranzo_secondo_allergeni",
          type: "textarea",
          html: {
            label: "Allergeni ",
            span: -1,
            attr: `contenteditable
                   onchange="()=>{console.log(1)}" style=" width:105%; height: 60px;padding: 5px; border: 1px solid silver; border-radius: 3px; background-color: white;"`,
          },
        },
        masterField({ id: "cena_primo_0", group: "Cena - Primo" }),
        masterField({ id: "cena_primo_1", group: "Cena - Primo" }),
        masterField({ id: "cena_primo_2", group: "Cena - Primo" }),
        {
          field: "cena_primo_allergeni",
          type: "textarea",
          html: {
            label: "Allergeni ",
            span: -1,
            attr: `contenteditable
                   onchange="()=>{console.log(1)}" style=" width:105%; height: 60px;padding: 5px; border: 1px solid silver; border-radius: 3px; background-color: white;"`,
          },
        },
        masterField({
          id: "cena_secondo_0",
          group: "Cena - Secondo",
        }),
        masterField({
          id: "cena_secondo_1",
          group: "Cena - Secondo",
        }),
        masterField({
          id: "cena_secondo_2",
          group: "Cena - Secondo",
        }),
        {
          field: "cena_secondo_allergeni",
          type: "textarea",
          html: {
            label: "Allergeni ",
            span: -1,
            attr: `contenteditable
                   onchange="()=>{console.log(1)}" style=" width:105%; height: 60px;padding: 5px; border: 1px solid silver; border-radius: 3px; background-color: white;"`,
          },
        },
      ],
      actions: {
        Reset() {
          this.clear();
        },
        async Save() {
          let errors = this.validate();
          if (errors.length > 0) return;
          const options = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.record),
          };
          await fetch(updateUrl, options);
          gridPranzo.set(this.recid, this.record);
          gridPranzo.selectNone();
          gridCena.set(this.recid, this.record);
          gridCena.selectNone();
          this.clear();
        },
        custom: {
          text: "Delete",
          class: "w2ui-btn-red",
          onClick(event) {
            window.showConfirm(this.record);
          },
        },
      },
    },
    gridPranzo: {
      name: "gridPranzo",
      show: {
        toolbar: true,
        lineNumbers: true,
      },
      columnGroups: [
        { span: 1, text: "", main: true },
        { span: 4, text: "Primo" },
        { span: 4, text: "Secondo" },
      ],

      columns: [
        {
          field: "room",
          text: "Camera",
          sortable: true,
          searchable: true,
          width: "40px",
        },
        { field: "pranzo_primo_0", text: mealNames.pranzo_primo[0] },
        { field: "pranzo_primo_1", text: mealNames.pranzo_primo[1] },
        { field: "pranzo_primo_2", text: mealNames.pranzo_primo[2] },
        { field: "pranzo_primo_allergeni", text: "allergeni", sortable: true },
        { field: "pranzo_secondo_0", text: mealNames.pranzo_secondo[0] },
        { field: "pranzo_secondo_1", text: mealNames.pranzo_secondo[1] },
        { field: "pranzo_secondo_2", text: mealNames.pranzo_secondo[2] },
        {
          field: "pranzo_secondo_allergeni",
          text: "allergeni",
          sortable: true,
        },
      ],
      records: getOrders(),
      onClick(event) {
        console.log(event);
        event.done(() => {
          var sel = this.getSelection();
          if (sel.length == 1) {
            form.recid = sel[0];
            form.record = w2utils.extend({}, this.get(sel[0]));
            form.refresh();
          } else {
            form.clear();
          }
        });
      },
    },
    gridCena: {
      name: "gridCena",
      show: {
        toolbar: true,
        lineNumbers: true,
      },
      columnGroups: [
        { span: 1, text: "", main: true },
        { span: 4, text: "Primo" },
        { span: 4, text: "Secondo" },
      ],

      columns: [
        {
          field: "room",
          text: "Camera",
          sortable: true,
          searchable: true,
          width: "40px",
        },
        { field: "cena_primo_0", text: mealNames.cena_primo[0] },
        { field: "cena_primo_1", text: mealNames.cena_primo[1] },
        { field: "cena_primo_2", text: mealNames.cena_primo[2] },
        { field: "cena_primo_allergeni", text: "allergeni", sortable: true },
        { field: "cena_secondo_0", text: mealNames.cena_secondo[0] },
        { field: "cena_secondo_1", text: mealNames.cena_secondo[1] },
        { field: "cena_secondo_2", text: mealNames.cena_secondo[2] },
        { field: "cena_secondo_allergeni", text: "allergeni", sortable: true },
      ],
      records: getOrders(),
      onClick(event) {
        console.log(event);
        event.done(() => {
          var sel = this.getSelection();
          if (sel.length == 1) {
            form.recid = sel[0];
            form.record = w2utils.extend({}, this.get(sel[0]));
            form.refresh();
          } else {
            form.clear();
          }
        });
      },
    },
  };

  const layout = new w2layout(config.layout);
  const sidebar = new w2sidebar(config.sidebar);
  const form = new w2form(config.form);

  const gridPranzo = new w2grid(config.gridPranzo);
  const gridCena = new w2grid(config.gridCena);

  renderTable();
}
main();
