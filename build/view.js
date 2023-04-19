import { Filter } from './components/filter.js';
import Modal from './components/modal.js';
export default class View {
    constructor(_controller) {
        var _a;
        this._controller = _controller;
        this._elementsOfTable = [];
        this._tbody = document.querySelector("#tbody");
        this._name = document.querySelector("#txt-name");
        this._description = document.querySelector("#txt-description");
        this._btnAdd = document.querySelector("#btn-guardar");
        this._modal = new Modal("todo-modal", {
            keyboard: false,
            backdrop: "static",
            focus: true,
        });
        this._filter = new Filter();
        this._filter.filter((search) => {
            const todo = this._controller.filterTodos(search);
            this.filterTable(todo);
        });
        (_a = this._btnAdd) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            if (!this.validateInputs())
                return;
            this._controller.saveTodo(this.getTodoInputs());
            this.render();
            this.clearInputs();
        });
        this._modal.onClickedEdit((id, data) => {
            this._controller.editTodo(id, data);
            this.render();
        });
    }
    createRow(data) {
        var _a;
        const tr = document.createElement("tr");
        const inputDone = document.createElement("input");
        Object.keys(data).forEach((key) => {
            const td = document.createElement("td");
            if (key === "done") {
                inputDone.type = "checkbox";
                inputDone.classList.add("form-check-input");
                inputDone.name = "done";
                inputDone.checked = data[key];
                td.classList.add("text-center");
                inputDone.addEventListener("change", (e) => {
                    const checked = e.target.checked;
                    this._controller.checkTodo(data.id, checked);
                    this.render();
                });
                td.appendChild(inputDone);
            }
            else {
                td.textContent = data[key].toString();
            }
            tr.appendChild(td);
        });
        const td = document.createElement("td");
        td.classList.add("text-center");
        const btnEdit = document.createElement("button");
        btnEdit.classList.add("btn", "btn-warning", "btn-sm", "me-2");
        btnEdit.textContent = "Editar";
        btnEdit.addEventListener("click", this.editTodo.bind(this, data.id));
        td.appendChild(btnEdit);
        const btnDelete = document.createElement("button");
        btnDelete.classList.add("btn", "btn-danger", "btn-sm");
        btnDelete.textContent = "Eliminar";
        btnDelete.addEventListener("click", this.deleteTodo.bind(this, data.id));
        td.appendChild(btnDelete);
        tr.appendChild(td);
        (_a = this._tbody) === null || _a === void 0 ? void 0 : _a.appendChild(tr);
        this._elementsOfTable.push({
            id: data.id,
            btnEdit,
            btnDelete,
            inputDone,
            tr,
        });
    }
    editTodo(id) {
        const todo = this._controller.getTodoById(id);
        if (todo) {
            this._modal.setValues({
                id: todo.id,
                name: todo.name,
                description: todo.description,
                done: todo.done,
            });
        }
        this._modal.openModal();
    }
    deleteTodo(id) {
        this._controller.deleteTodo(id);
        const elements = this._elementsOfTable.findIndex((e) => {
            if (e.id === id) {
                e.tr.remove();
                return true;
            }
        });
        this._elementsOfTable.splice(elements, 1);
    }
    getTodoInputs() {
        return {
            name: this._name.value,
            description: this._description.value,
        };
    }
    validateInputs() {
        var _a, _b;
        if (((_a = this._name) === null || _a === void 0 ? void 0 : _a.value) === "" && ((_b = this._description) === null || _b === void 0 ? void 0 : _b.value) === "") {
            this._name.classList.add("is-invalid");
            this._description.classList.add("is-invalid");
            return false;
        }
        if (this._name.value === "") {
            this._name.classList.add("is-invalid");
            return false;
        }
        else {
            this._name.classList.remove("is-invalid");
        }
        if (this._description.value === "") {
            this._description.classList.add("is-invalid");
            return false;
        }
        else {
            this._description.classList.remove("is-invalid");
        }
        return true;
    }
    clearInputs() {
        this._name.value = "";
        this._description.value = "";
    }
    filterTable(data) {
        this._elementsOfTable.forEach((e) => {
            e.tr.classList.add("d-none");
        });
        data.forEach((todo) => {
            const element = this._elementsOfTable.find((e) => e.id === todo.id);
            if (element) {
                element.tr.classList.remove("d-none");
            }
        });
    }
    render() {
        this._tbody.innerHTML = "";
        const data = this._controller.getAllTodos();
        this._elementsOfTable = [];
        data === null || data === void 0 ? void 0 : data.forEach((todo) => {
            this.createRow(todo);
        });
    }
}
