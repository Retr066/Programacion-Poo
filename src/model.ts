export type Data = {
  id: number;
  name: string;
  description: string;
  done: boolean;
};

export interface IModel {
  getData: () => Data[];
  addData: (data: Data) => void;
  deleteData: (id: number) => void;
  editData: (id: number, data: Data) => void;
  findData: (id: number) => Data | undefined;
  saveLocalStorage: () => void;
  getLocalStorage: () => void;
}

export default class Model implements IModel {
  private _data: Data[];

  constructor() {
    this._data = [];
  }
  getData() {
    return [...this._data]
  }
  addData(data: Data) {
    this._data.push({ ...data });
  }
  deleteData(id: number) {
    this._data = this._data.filter((data) => data.id !== id);
  }
  editData(id: number, data: Data) {
    const index = this._data.findIndex((data) => data.id === id);
    this._data[index] = data;
  }
  findData(id: number) {
    return this._data.find((data) => data.id === id);
  }
  saveLocalStorage() {
    localStorage.setItem("data", JSON.stringify(this._data));
  }
  getLocalStorage() {
    const data = localStorage.getItem("data");
    if (data) {
      this._data = JSON.parse(data);
    }
  }
}
