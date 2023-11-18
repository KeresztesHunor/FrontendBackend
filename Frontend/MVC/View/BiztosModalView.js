import { tagLst, tagTwo } from "../../htmlUtils.js";
import LoadingBar from "./LoadingBar.js";
import ModalView from "./ModalView.js";

class BiztosModalView extends ModalView
{
    #igenGombElem;
    #igenGombraKattintottCallback;
    #modalBezarhatoElem;

    constructor(szuloElem, id, modalSzoveg, igenGombrakattintottCallback)
    {
        super(szuloElem, id, "Biztos?", modalSzoveg);
        this.#igenGombraKattintottCallback = igenGombrakattintottCallback;
        this.reset();
        this.#igenGombElem = this._modalFooter.children(".igen-gomb");
        this.#modalBezarhatoElem = $(new bootstrap.Modal(this._modalElem)._element);
    }

    igenGombrakattint()
    {
        return new Promise((resolve, reject) => {
            const OFF = () => {
                this.#igenGombElem.off("click", IGEN_CALLBACK);
                this.#modalBezarhatoElem.off("hidden.bs.modal", BEZAR_CALLBACK);
            };
            const IGEN_CALLBACK = () => {
                OFF();
                resolve(this.#igenGombraKattintottCallback);
            };
            const BEZAR_CALLBACK = () => {
                OFF();
                reject();
            };
            this.#igenGombElem.on("click", IGEN_CALLBACK);
            this.#modalBezarhatoElem.on("hidden.bs.modal", BEZAR_CALLBACK);
        });
    }

    toltestJelez()
    {
        this._modalFooter.html("");
        new LoadingBar(this._modalFooter);
    }

    eltuntet()
    {
        this._modalElem.modal("hide");
    }

    reset()
    {
        this._modalFooter.html(
            tagLst([
                tagTwo("button", { class: "igen-gomb btn btn-primary" }, ["Igen"]),
                tagTwo("button", { type: "button", class: "btn btn-primary", "data-bs-dismiss": "modal" }, ["Nem"])
            ])
        );
    }
}

export default BiztosModalView;