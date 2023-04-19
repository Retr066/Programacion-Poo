export default class Modal {
    constructor(modalId, options) {
        //@ts-ignore
        this._modal = new bootstrap.Modal(document.getElementById(modalId), options);
        this._name = document.querySelector("#txt-name-edit");
        this._description = document.querySelector("#txt-description-edit");
        this._done = document.querySelector("#txt-done-edit");
        this._btnEdit = document.querySelector("#btn-edit");
        this.id = null;
    }
    setValues(data) {
        this.id = data.id;
        this._name.value = data.name;
        this._description.value = data.description;
        this._done.checked = data.done;
    }
    onClickedEdit(callback) {
        var _a;
        (_a = this._btnEdit) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            if (this.id) {
                const data = {
                    id: this.id,
                    name: this._name.value,
                    description: this._description.value,
                    done: this._done.checked,
                };
                callback(this.id, data);
                this.closeModal();
            }
        });
    }
    openModal() {
        this._modal.show();
    }
    closeModal() {
        this._modal.hide();
    }
}
