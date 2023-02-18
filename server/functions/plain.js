import {
  blankOrderTemplate,
  unplainPropertyTemplate,
} from "../functions/templates.js";

const unplain = (order = {}) => {
  // we create a clone to which we give some properties that further we'll delete
  const clone = {
    room: order.room,
    date: order.date,
    time: order.time,
    menuId: order.menuId,
    order: blankOrderTemplate(),
  };

  // we delete the properties because they won't allow us to loop through the order
  delete order.room;
  delete order.date;
  delete order.time;
  delete order.menuId;

  const properties = Object.getOwnPropertyNames(order);

  // first of all we split the array properties using the saparator _
  // ex: "pranzo_primo_0" -> ["pranzo","primo","0"]
  // secondly we loop again through the properties
  // when looping we destructure every elemeny into an array of time, type, i
  // ex: ["pranzo", "primo", "0"] -> time:"pranzo", type:"primo", i:"0"
  // or: ["pranzo", "primo", "allergies"] -> time:"pranzo", type:"primo", i:"allergies"
  properties
    .map((el) => el.split("_"))
    .map(([time, type, i], index) => {
      if (isNaN(parseInt(i)))
        // Handle when i = "allergies"
        // time:"pranzo", type:"primo", i:"allergies" -->
        // --> clone.order.pranzo.primo.allergies = order.pranzo_primo_allergies
        clone.order[time][type].allergies = order[properties[index]];
      else {
        // Handle when i = "0"
        // time:"pranzo", type:"primo", i:"0" -->
        // --> clone.order.pranzo.primo.options[0] = order.pranzo_primo_0
        clone.order[time][type]["options"][i] = order[properties[index]];
      }
    });
  return clone;
};
const plain = (order = {}) => {
  // the data we get is in the next forma order: {order:pranzo:{}, ...}
  // for us is important only the order property from the main object
  // that's why we'll destructure it into a constant named data
  const { order: data } = order;

  // the order also has other valuable properties as room, id, etc. that we don't want to lose
  // that's why we will delete the order property from the main object
  // and will assign to the main object new properties further
  delete order.order;

  // we loop throuhght the order
  for (const time in data)
    for (const type in data[time]) {
      //
      const options = data[time][type].options;
      for (let i = 0; i < options.length; i++) {
        // we create the property name using the template unplainPropertyTemplate
        const prop = unplainPropertyTemplate(time, type, i);
        // we use as value the value of the option
        const value = options[i];
        // we assign to the order a new property that will have the value of the option
        // ex: time="pranzo" type="primo" , options = ["0", "3", "1"] --->
        // ---> order.pranzo_primo_0 = "0"
        // ---> order.pranzo_primo_1 = "3"
        // ---> order.pranzo_primo_2 = "1"
        order[prop] = value;
      }
      // we do the same steps for the allergies but outside the options loop
      const prop = unplainPropertyTemplate(time, type, "allergies");
      const value = data[time][type].allergies;
      order[prop] = value;
    }
  return order;
};
export { unplain, plain };
