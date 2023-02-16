function summary() {
  const plain = (order) => {
    const data = order.order;

    delete order.order;

    for (const mealTime in data)
      for (const mealType in data[mealTime]) {
        const options = data[mealTime][mealType].options;
        for (let i = 0; i < options.length; i++) {
          const prop = `${mealTime}_${mealType}_${i}`;
          const value = options[i];
          order[prop] = value;
        }
        const prop = `${mealTime}_${mealType}_allergeni`;
        const value = data[mealTime][mealType].allergies;
        order[prop] = value;
      }
    return order;
  };
  const unplain = (order) => {
    const clone = {
      order: {
        pranzo: {
          primo: { options: [], allergeni: null },
          secondo: { options: [], allergeni: null },
        },
        cena: {
          primo: { options: [], allergeni: null },
          secondo: { options: [], allergeni: null },
        },
      },
    };

    const properties = Object.getOwnPropertyNames(order);
    properties
      .map((el) => el.split("_"))
      .map(([time, type, i], index) => {
        if (isNaN(parseInt(i)))
          clone.order[time][type].allergeni = order[properties[index]];
        else {
          clone.order[time][type]["options"][i] = order[properties[index]];
        }
      });
    return clone;
  };

  const plainOrders = data.map(plain);
  const accumulator = {
    pranzo_primo_0: 0,
    pranzo_primo_1: 0,
    pranzo_primo_2: 0,
    pranzo_primo_allergeni: "",
    pranzo_secondo_0: 0,
    pranzo_secondo_1: 0,
    pranzo_secondo_2: 0,
    pranzo_secondo_allergeni: "",
    cena_primo_0: 0,
    cena_primo_1: 0,
    cena_primo_2: 0,
    cena_primo_allergeni: "",
    cena_secondo_0: 0,
    cena_secondo_1: 0,
    cena_secondo_2: 0,
    cena_secondo_allergeni: "",
  };
  const addToAcc = (order) => {
    // Handle allergeni and Options
    for (const prop in accumulator)
      if (isNaN(parseInt(prop[prop.length - 1]))) {
        // Allergeni
        accumulator[prop] += order[prop] + "\n";
      } else {
        // Options
        accumulator[prop] += parseInt(order[prop]);
      }
  };
  plainOrders.map(addToAcc);

  return unplain(accumulator);
}

console.log(summary());
