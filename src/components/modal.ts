import { Data } from '../model';

interface IModal {
  openModal(): void;
  closeModal(): void;
}

type options = {
  keyboard?: boolean | "static";
  backdrop?: string;
  focus?: boolean;
};


export default class Modal implements IModal {
  private _modal: any;
  private _name: HTMLInputElement | null;
  private _description: HTMLInputElement | null;
  private _done: HTMLInputElement | null;
  public _btnEdit: HTMLButtonElement | null;
  private id :number | null;

  constructor(modalId: string, options: options) {
    //@ts-ignore
    this._modal = new bootstrap.Modal(document.getElementById(modalId), options) as any;
    this._name = document.querySelector("#txt-name-edit");
    this._description = document.querySelector("#txt-description-edit");
    this._done = document.querySelector("#txt-done-edit");
    this._btnEdit = document.querySelector("#btn-edit");
    this.id = null;
  }

  setValues(data: Data) {
    this.id = data.id;
    this._name!.value = data.name;
    this._description!.value = data.description;
    this._done!.checked = data.done;
  }

  onClickedEdit(callback: (id: number, data: Data) => void) {
    this._btnEdit?.addEventListener("click", () => {
      if (this.id) {
        const data = {
          id: this.id,
          name: this._name!.value,
          description: this._description!.value,
          done: this._done!.checked,
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
