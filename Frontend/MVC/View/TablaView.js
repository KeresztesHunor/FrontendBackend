import { tagLst, tagTwo } from "../../htmlUtils.js";
import TablaSorView from "./TablaSorView.js";

class TablaView
{
    constructor(szuloElem, adatLista, tablaFejlecNevek)
    {
        szuloElem.append(
            tagTwo("table", { class: "table table-bordered" }, [
                tagTwo("thead", {}, [
                    tagTwo("tr", {}, [
                        tagLst(tablaFejlecNevek, fejlecNev => tagTwo("th", {}, [fejlecNev]))
                    ])
                ]),
                tagTwo("tbody")
            ])
        );
        const SOR_SZULO_ELEM = szuloElem.children("table").children("tbody");
        adatLista.forEach(adat => {
            new TablaSorView(SOR_SZULO_ELEM, adat);
        });
    }
}

export default TablaView;