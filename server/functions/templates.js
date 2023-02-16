const blankOrderTemplate = () => ({
  pranzo: {
    primo: { options: [], allergeni: null },
    secondo: { options: [], allergeni: null },
  },
  cena: {
    primo: { options: [], allergeni: null },
    secondo: { options: [], allergeni: null },
  },
});
const plainOrderTemplate = () => ({
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
});
const unplainPropertyTemplate = (time, type, i) => `${time}_${type}_${i}`;

export { blankOrderTemplate, unplainPropertyTemplate, plainOrderTemplate };
