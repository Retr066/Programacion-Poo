export default class Controller {
    constructor(model) {
        this._model = model;
    }
    saveTodo(todo) {
        this._model.addData({
            id: this.currentId(),
            name: todo.name,
            description: todo.description,
            done: false,
        });
        this._model.saveLocalStorage();
    }
    currentId() {
        const data = this._model.getData();
        return data.length > 0 ? data[data.length - 1].id + 1 : 1;
    }
    getTodoById(id) {
        return this._model.findData(id);
    }
    editTodo(id, values) {
        const data = this._model.findData(id);
        if (data) {
            this._model.editData(id, Object.assign({}, values));
            this._model.saveLocalStorage();
        }
    }
    deleteTodo(id) {
        this._model.deleteData(id);
        this._model.saveLocalStorage();
    }
    checkTodo(id, checked) {
        const data = this._model.findData(id);
        if (data) {
            data.done = checked;
            this._model.editData(id, Object.assign({}, data));
            this._model.saveLocalStorage();
        }
    }
    filterTodos(search) {
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
