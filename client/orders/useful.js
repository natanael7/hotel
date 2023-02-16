const fullGrid = {
  name: "gridPranzo",
  show: {
    toolbar: true,
    toolbarDelete: true,
  },
  columnGroups: [
    { span: 1, text: "", main: true },
    { span: 1, text: "", main: true },
    { span: 4, text: "Pranzo - Primo" },
    { span: 4, text: "Pranzo - Secondo" },
    { span: 4, text: "Cena - Primo" },
    { span: 4, text: "Cena - Secondo" },
  ],

  columns: [
    {
      field: "recid",
      text: "ID",
      size: "50px",
      sortable: true,
      searchable: true,
    },
    { field: "room", text: "Camera", sortable: true, searchable: true },
    { field: "pranzo_primo_0", text: "0" },
    { field: "pranzo_primo_1", text: "1" },
    { field: "pranzo_primo_2", text: "2" },
    { field: "pranzo_primo_allergeni", text: "allergeni" },
    { field: "pranzo_secondo_0", text: "0" },
    { field: "pranzo_secondo_1", text: "1" },
    { field: "pranzo_secondo_2", text: "2" },
    { field: "pranzo_secondo_allergeni", text: "allergeni" },
    { field: "cena_primo_0", text: "0" },
    { field: "cena_primo_1", text: "1" },
    { field: "cena_primo_2", text: "2" },
    { field: "cena_primo_allergeni", text: "allergeni" },
    { field: "cena_secondo_0", text: "0" },
    { field: "cena_secondo_1", text: "1" },
    { field: "cena_secondo_2", text: "2" },
    { field: "cena_secondo_allergeni", text: "allergeni" },
  ],
  records: data,
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
};
