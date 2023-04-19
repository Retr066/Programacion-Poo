import Controller from './controller.js';
import Model from './model.js';
import View from './view.js';


document.addEventListener("DOMContentLoaded", () => {
  const model = new Model();
  const controller = new Controller(model);
  const view = new View(controller);

  view.render();
});
