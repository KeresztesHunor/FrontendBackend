import { tagTwo } from "../../htmlUtils.js";

class HibaView
{
    constructor(szuloElem, error)
    {
        szuloElem.html(
            tagTwo("div", { class: "text-danger" }, [error.message])
        );
    }
}

export default HibaView;