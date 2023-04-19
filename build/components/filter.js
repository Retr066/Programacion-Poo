export class Filter {
    constructor() {
        this._search = document.querySelector("#txt-search");
        this._formSearch = document.querySelector("#form-search");
    }
    filter(callback) {
        var _a;
        (_a = this._formSearch) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (e) => {
            e.preventDefault();
            if (this._search) {
                callback(this._search.value);
            }
        });
    }
}
