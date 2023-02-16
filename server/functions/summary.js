import { plain, unplain } from "./plain.js";

import { plainOrderTemplate } from "../functions/templates.js";

export default (data = []) => {
  // close guard for non-array data
  if (!Array.isArray(data)) throw `Instead of array of orders recieved ${data}`;

  // data is a collection of orders
  // we map the orders to their plain clones
  const plainOrders = data.map(plain);

  // we created an accumulator that will store all the totals and also will be returned in the end as a result
  const accumulator = plainOrderTemplate();

  // this function loops through all the properties of the accumulator
  // and adds to the accumulator.property the value of the unplain property of the order
  // for example it adds to accumualtor.pranzo_primo_0 the value of order.pranzo.primo.0
  const addToAcc = (order) => {
    // Handle allergeni and Options
    for (const prop in accumulator)
      if (isNaN(parseInt(prop[prop.length - 1]))) {
        // Allergeni -> concatenates to the accumulator the current value
        // concatenate also a new line
        accumulator[prop] += order[prop] + "\n";
      } else {
        // Options -> adds to the accumulator the value
        // But if the value of the property is not a nuber it will throw an error
        if (isNaN(parseInt(order[prop])))
          throw `Can't add NaN to accumulator, but adding ${order[prop]}`;
        else accumulator[prop] += parseInt(order[prop]);
      }
  };

  // here we loop through the orders execute addToAcc on each of them
  plainOrders.map(addToAcc);

  // as the accumulator has a plain form, but the client requieres an unplain we will return the unplain of the accumulator
  return unplain(accumulator);
};
