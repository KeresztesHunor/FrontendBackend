import { tagTwo } from "../../htmlUtils.js";

class ModalView
{
    #szuloElem;
    #modalElem;
    #modalBody;
    #modalFooter;

    constructor(szuloElem, id, headerSzoveg, modalSzoveg)
    {
        this.#szuloElem = szuloElem;
        this.#szuloElem.append(
            tagTwo("div", { id: id, class: "modal", "data-bs-backdrop": "static", style: "display: none;" }, [
                tagTwo("div", { class: "modal-dialog" }, [
                    tagTwo("div", { class: "modal-content" }, [
                        tagTwo("div", { class: "modal-header" }, [
                            tagTwo("h4", { class: "modal-title" }, [headerSzoveg])
                        ]),
                        tagTwo("div", { class: "modal-body" }, [modalSzoveg]),
                        tagTwo("div", { class: "modal-footer" })
                    ])
                ])
            ])
        );
        this.#modalElem = $("#" + id);
        this.#modalBody = this.#modalElem.find(".modal-body");
        this.#modalFooter = this.#modalElem.find(".modal-footer");
    }

    get _modalElem()
    {
        return this.#modalElem;
    }

    get _modalBody()
    {
        return this.#modalBody;
    }

    get _modalFooter()
    {
        return this.#modalFooter;
    }

    get _szuloElem()
    {
        return this.#szuloElem;
    }

    megjelenit()
    {
        this.#modalElem.modal("show");
    }
}

export default ModalView;