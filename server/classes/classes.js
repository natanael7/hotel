import { getDateNow, getTimeNow } from "../functions/time.js";
class Food {
  constructor({ title = "", description = "", image = "" }) {
    this.title = title;
    this.description = description;
    this.image = image;
  }
}
class Course {
  constructor({ options }) {
    this.options = [];
    options.map((el) => this.options.push(new Food(el)));
  }
}
class Meal {
  constructor({ primo, secondo }) {
    this.primo = new Course(primo);
    this.secondo = new Course(secondo);
  }
}
class Menu {
  constructor({ pranzo, cena }) {
    this.pranzo = new Meal(pranzo);
    this.cena = new Meal(cena);
  }
}
class Order {
  constructor({ room, order, menuId }) {
    this.date = getDateNow();
    this.time = getTimeNow();
    this.room = room;
    this.order = order;
    this.menuId = menuId;
  }
}

export { Food, Course, Meal, Menu, Order };
