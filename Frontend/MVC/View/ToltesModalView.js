import LoadingBar from "./LoadingBar.js";
import ModalView from "./ModalView.js";

class ToltesModalView extends ModalView
{
    constructor(szuloElem, id, modalSzoveg)
    {
        super(szuloElem, id, "Töltés...", modalSzoveg);
        new LoadingBar(this._modalFooter);
    }
}

export default ToltesModalView;