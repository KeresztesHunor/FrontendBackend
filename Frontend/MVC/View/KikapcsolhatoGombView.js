import { tagTwo } from "../../htmlUtils.js";

class KikapcsolhatoGombView
{
    #gombElem;
    #disabled;

    constructor(szuloElem, parameterek = {}, tartalom = [], disabled = false)
    {
        szuloElem.append(
            tagTwo("button", parameterek, tartalom)
        );
        this.#gombElem = szuloElem.children("button");
        this.#disabled = disabled;
    }

    get gombElem()
    {
        return this.#gombElem;
    }

    set onClick(callback)
    {
        this.#gombElem.on("click", event => {
            if (!this.#disabled)
            {
                callback(event);
            }
        });
    }

    get disabled()
    {
        return this.#disabled;
    }

    toggle()
    {
        this.#disabled = !this.#disabled;
    }
}

export default KikapcsolhatoGombView;
