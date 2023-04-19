export class Filter {
  private _search: HTMLInputElement | null;
  private _formSearch: HTMLButtonElement | null;

  constructor() {
    this._search = document.querySelector("#txt-search");
    this._formSearch = document.querySelector("#form-search");
  }

  filter(callback: (search: string) => void) {
    this._formSearch?.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this._search) {
        callback(this._search.value);
      }
    });
  }
}
