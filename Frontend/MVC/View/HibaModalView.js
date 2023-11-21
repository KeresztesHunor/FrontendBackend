import { tagTwo } from "../../htmlUtils.js";
import ModalView from "./ModalView.js";

class HibaModalView extends ModalView
{
    constructor(szuloElem, id)
    {
        super(szuloElem, id, "Hiba!", "");
        this._modalFooter.append(
            tagTwo("button", { type: "button", class: "btn btn-primary", "data-bs-dismiss": "modal" }, ["OK"])
        );
        const HIBA_MODAL_OK_GOMBRA_KATTINTOTT_EVENT = new CustomEvent("hibaModalOkGombraKattintottEvent", {
            detail: {
                source: this
            }
        });
        this._modalFooter.children("button").on("click", () => {
            window.dispatchEvent(HIBA_MODAL_OK_GOMBRA_KATTINTOTT_EVENT);
        });
    }

    modalText(text)
    {
        this._modalBody.html(text);
    }
}

export default HibaModalView;