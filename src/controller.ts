import { Data, IModel } from './model';

type valuesInputs = {
  name: string;
  description: string;
};

export interface IController {
  saveTodo(todo: valuesInputs): void;
  editTodo(id: number, values: Data): void;
  deleteTodo(id: number): void;
  getAllTodos(): Data[];
  getTodoById(id: number): Data | undefined;
  checkTodo(id: number, checked: boolean): void;
  currentId(): number;
  filterTodos(search: string): Data[];
}

export default class Controller implements IController {
  private _model: IModel;

  constructor(model: IModel) {
    this._model = model;
  }

  saveTodo(todo: valuesInputs): void {
    this._model.addData({
      id: this.currentId(),
      name: todo.name,
      description: todo.description,
      done: false,
    });
    this._model.saveLocalStorage();
  }
  currentId(): number {
    const data = this._model.getData();
    return data.length > 0 ? data[data.length - 1].id + 1 : 1;
  }
  getTodoById(id: number): Data | undefined {
    return this._model.findData(id);
  }
  editTodo(id: number, values: Data): void {
    const data = this._model.findData(id);
    if (data) {
      this._model.editData(id, { ...values });
      this._model.saveLocalStorage();
    }
  }
  deleteTodo(id: number): void {
    this._model.deleteData(id);
    this._model.saveLocalStorage();
  }
  checkTodo(id: number, checked: boolean): void {
    const data = this._model.findData(id);
    if (data) {
      data.done = checked;
      this._model.editData(id, { ...data });
      this._model.saveLocalStorage();
    }
  }

  filterTodos(search: string): Data[] {
    const data = this._model.getData();
    return data.filter((todo) => {
      if (todo.name.toLowerCase().includes(search.toLowerCase()) || todo.description.toLowerCase().includes(search.toLowerCase())) {
        return todo;
      }
    });
  }
  getAllTodos() {
    this._model.getLocalStorage();
    return this._model.getData();
  }
}
