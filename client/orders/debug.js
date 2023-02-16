async function main() {
  const getAllorders = await (
    await fetch("http://127.0.0.1:3000/api/get/order/all")
  ).json();
}
const data = [
  {
    _id: "63e284f614250eb5721fe17a",
    room: "212",
    date: "07.02.2023",
    time: "19:05:58",
    menuId: "63e14e972e06253ff2b3ada3",
    order: {
      pranzo: {
        primo: { options: ["3", "1", "1"], allergies: "" },
        secondo: {
          options: ["1", "1", "3"],
          allergies:
            "3x risotto con panna senza lattosio\n1x pasta con pesto \n1x canneloni con tonno senza lattosio",
        },
      },
      cena: {
        primo: {
          options: ["1", "1", "3"],
          allergies:
            "1x pasta con panna vegano\n3x pasta con panna vegano\n1x risotto con pesto per celiaco",
        },
        secondo: { options: ["3", "0", "2"], allergies: "" },
      },
    },
    __v: 0,
  },
  {
    _id: "63e2854814250eb5721fe17c",
    room: "539",
    date: "07.02.2023",
    time: "19:07:20",
    menuId: "63e14e972e06253ff2b3ada3",
    order: {
      pranzo: {
        primo: {
          options: ["5", "0", "0"],
          allergies: "2x pasta con pesto per celiaco",
        },
        secondo: { options: ["2", "2", "1"], allergies: "" },
      },
      cena: {
        primo: {
          options: ["5", "0", "0"],
          allergies:
            "1x canneloni con tonno \n2x canneloni con tonno \n1x risotto con tonno ",
        },
        secondo: {
          options: ["0", "3", "2"],
          allergies:
            "2x pasta con panna \n2x pasta con tonno \n1x risotto con pesto ",
        },
      },
    },
    __v: 0,
  },
  {
    _id: "63e2889514250eb5721fe17e",
    room: "101",
    date: "07.02.2023",
    time: "19:21:25",
    menuId: "63e14e972e06253ff2b3ada3",
    order: {
      pranzo: {
        primo: { options: ["4", "0", "1"], allergies: "" },
        secondo: {
          options: ["1", "3", "1"],
          allergies: "2x risotto con tonno senza lattosio",
        },
      },
      cena: {
        primo: {
          options: ["3", "1", "1"],
          allergies: "2x canneloni con panna senza lattosio",
        },
        secondo: {
          options: ["0", "2", "3"],
          allergies: "3x risotto con tonno senza lattosio",
        },
      },
    },
    __v: 0,
  },
  {
    _id: "63e288f914250eb5721fe180",
    room: "101",
    date: "07.02.2023",
    time: "19:23:05",
    menuId: "63e14e972e06253ff2b3ada3",
    order: {
      pranzo: {
        primo: {
          options: ["1", "3", "1"],
          allergies:
            "1x risotto con panna senza lattosio\n2x canneloni con tonno per celiaco\n1x pasta con tonno vegano",
        },
        secondo: { options: ["4", "0", "1"], allergies: "" },
      },
      cena: {
        primo: {
          options: ["1", "2", "2"],
          allergies:
            "3x canneloni con pomodoro vegano\n1x canneloni con pesto ",
        },
        secondo: {
          options: ["2", "3", "0"],
          allergies:
            "2x pasta con pesto per celiaco\n1x canneloni con panna vegano",
        },
      },
    },
    __v: 0,
  },
  {
    _id: "63e288fd14250eb5721fe182",
    room: "585",
    date: "07.02.2023",
    time: "19:23:09",
    menuId: "63e14e972e06253ff2b3ada3",
    order: {
      pranzo: {
        primo: {
          options: ["1", "2", "2"],
          allergies:
            "1x pasta con pesto senza lattosio\n1x risotto con panna \n2x canneloni con pesto ",
        },
        secondo: {
          options: ["1", "1", "3"],
          allergies: "1x canneloni con panna vegano",
        },
      },
      cena: {
        primo: {
          options: ["4", "1", "0"],
          allergies:
            "1x risotto con pomodoro vegano\n3x canneloni con pomodoro senza lattosio",
        },
        secondo: {
          options: ["1", "0", "4"],
          allergies: "2x pasta con pesto \n1x risotto con pomodoro ",
        },
      },
    },
    __v: 0,
  },
  {
    _id: "63e2890014250eb5721fe184",
    room: "246",
    date: "07.02.2023",
    time: "19:23:12",
    menuId: "63e14e972e06253ff2b3ada3",
    order: {
      pranzo: {
        primo: {
          options: ["0", "5", "0"],
          allergies: "2x pasta con pomodoro \n1x canneloni con tonno ",
        },
        secondo: {
          options: ["3", "2", "0"],
          allergies: "1x pasta con pesto vegano",
        },
      },
      cena: {
        primo: {
          options: ["2", "1", "2"],
          allergies: "1x pasta con pomodoro ",
        },
        secondo: { options: ["1", "3", "1"], allergies: "" },
      },
    },
    __v: 0,
  },
  {
    _id: "63e2890514250eb5721fe186",
    room: "123",
    date: "07.02.2023",
    time: "19:23:17",
    menuId: "63e14e972e06253ff2b3ada3",
    order: {
      pranzo: {
        primo: {
          options: ["0", "0", "5"],
          allergies:
            "1x pasta con panna vegano\n1x pasta con tonno \n2x pasta con pesto per celiaco",
        },
        secondo: {
          options: ["4", "1", "0"],
          allergies: "1x canneloni con pesto ",
        },
      },
      cena: {
        primo: { options: ["0", "5", "0"], allergies: "" },
        secondo: {
          options: ["4", "1", "0"],
          allergies:
            "1x pasta con panna \n1x canneloni con panna senza lattosio",
        },
      },
    },
    __v: 0,
  },
  {
    _id: "63e2890914250eb5721fe188",
    room: "248",
    date: "07.02.2023",
    time: "19:23:21",
    menuId: "63e14e972e06253ff2b3ada3",
    order: {
      pranzo: {
        primo: {
          options: ["1", "0", "4"],
          allergies: "1x risotto con pesto \n2x canneloni con pesto vegano",
        },
        secondo: {
          options: ["5", "0", "0"],
          allergies:
            "1x risotto con pesto per celiaco\n1x canneloni con panna senza lattosio",
        },
      },
      cena: {
        primo: {
          options: ["5", "0", "0"],
          allergies:
            "3x risotto con pomodoro vegano\n2x canneloni con pomodoro ",
        },
        secondo: {
          options: ["3", "2", "0"],
          allergies:
            "3x canneloni con pesto per celiaco\n1x canneloni con pesto senza lattosio\n1x pasta con pomodoro ",
        },
      },
    },
    __v: 0,
  },
  {
    _id: "63e3eccc02339ec1e8fe4c00",
    room: "169",
    date: "08.02.2023",
    time: "20:41:16",
    menuId: "63e14e972e06253ff2b3ada3",
    order: {
      pranzo: {
        primo: { options: ["2", "1", "1"], allergies: "" },
        secondo: { options: ["1", "1", "2"], allergies: "" },
      },
      cena: {
        primo: { options: ["1", "0", "3"], allergies: "" },
        secondo: { options: ["1", "1", "2"], allergies: "" },
      },
    },
    __v: 0,
  },
  {
    _id: "63e3ed9502339ec1e8fe4c0b",
    room: "232",
    date: "08.02.2023",
    time: "20:44:37",
    menuId: "63e14e972e06253ff2b3ada3",
    order: {
      pranzo: {
        primo: {
          options: ["4", "1", "0"],
          allergies: "2x pasta con pesto per celiaco",
        },
        secondo: { options: ["1", "3", "1"], allergies: "" },
      },
      cena: {
        primo: {
          options: ["5", "0", "0"],
          allergies:
            "3x pasta con panna per celiaco\n1x pasta con pesto \n1x pasta con panna ",
        },
        secondo: {
          options: ["2", "0", "3"],
          allergies: "2x risotto con pomodoro vegano\n1x risotto con pesto ",
        },
      },
    },
    __v: 0,
  },
  {
    _id: "63e41d2f02339ec1e8fe4de5",
    room: "478",
    date: "09.02.2023",
    time: "00:07:43",
    menuId: "63e14e972e06253ff2b3ada3",
    order: {
      pranzo: {
        primo: { options: ["2", "0", "3"], allergies: "" },
        secondo: {
          options: ["2", "2", "1"],
          allergies: "3x pasta con pomodoro vegano",
        },
      },
      cena: {
        primo: { options: ["3", "2", "0"], allergies: "3x pasta con pesto " },
        secondo: { options: ["4", "1", "0"], allergies: "" },
      },
    },
    __v: 0,
  },
  {
    _id: "63e50f2d02339ec1e8fe5065",
    room: "251",
    date: "09.02.2023",
    time: "17:20:13",
    menuId: "63e14e972e06253ff2b3ada3",
    order: {
      pranzo: {
        primo: { options: ["3", "1", "1"], allergies: "1x risotto con tonno " },
        secondo: {
          options: ["3", "0", "2"],
          allergies:
            "3x canneloni con pomodoro per celiaco\n1x pasta con tonno vegano\n1x pasta con pomodoro per celiaco",
        },
      },
      cena: {
        primo: {
          options: ["5", "0", "0"],
          allergies: "5x pasta con tonno vegano",
        },
        secondo: {
          options: ["2", "3", "0"],
          allergies: "3x canneloni con panna \n1x pasta con panna ",
        },
      },
    },
    __v: 0,
  },
  {
    _id: "63e5100702339ec1e8fe507d",
    room: "152",
    date: "09.02.2023",
    time: "17:23:51",
    menuId: "63e14e972e06253ff2b3ada3",
    order: {
      pranzo: {
        primo: {
          options: ["2", "1", "2"],
          allergies: "1x pasta con pesto vegano",
        },
        secondo: {
          options: ["2", "1", "2"],
          allergies: "1x risotto con pomodoro ",
        },
      },
      cena: {
        primo: {
          options: ["3", "1", "1"],
          allergies:
            "1x risotto con pomodoro senza lattosio\n3x pasta con pomodoro \n1x canneloni con panna ",
        },
        secondo: { options: ["2", "0", "3"], allergies: "" },
      },
    },
    __v: 0,
  },
];
const plain = (order) => {
  const data = order.order;

  delete order.order;

  const res = {};
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

const plainOrders = data.map(plain).map((order, i) => {
  order.recid = i;
  return order;
});

// console.log(JSON.stringify(plainOrders));
