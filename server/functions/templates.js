const blankOrderTemplate = () => ({
  pranzo: {
    primo: { options: [], allergies: null },
    secondo: { options: [], allergies: null },
  },
  cena: {
    primo: { options: [], allergies: null },
    secondo: { options: [], allergies: null },
  },
});
const plainOrderTemplate = () => ({
  pranzo_primo_0: 0,
  pranzo_primo_1: 0,
  pranzo_primo_2: 0,
  pranzo_primo_allergies: "",
  pranzo_secondo_0: 0,
  pranzo_secondo_1: 0,
  pranzo_secondo_2: 0,
  pranzo_secondo_allergies: "",
  cena_primo_0: 0,
  cena_primo_1: 0,
  cena_primo_2: 0,
  cena_primo_allergies: "",
  cena_secondo_0: 0,
  cena_secondo_1: 0,
  cena_secondo_2: 0,
  cena_secondo_allergies: "",
});
const unplainPropertyTemplate = (time, type, i) => `${time}_${type}_${i}`;

export { blankOrderTemplate, unplainPropertyTemplate, plainOrderTemplate };
