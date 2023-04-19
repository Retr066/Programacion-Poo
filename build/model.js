export default class Model {
    constructor() {
        this._data = [];
    }
    getData() {
        return [...this._data];
    }
    addData(data) {
        this._data.push(Object.assign({}, data));
    }
    deleteData(id) {
        this._data = this._data.filter((data) => data.id !== id);
    }
    editData(id, data) {
        const index = this._data.findIndex((data) => data.id === id);
        this._data[index] = data;
    }
    findData(id) {
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
