import { tagLst, tagTwo } from "../../htmlUtils.js";
import TablaSorView from "./TablaSorView.js";

class TablaView
{
    constructor(szuloElem, adatLista, primaryKey)
    {
        szuloElem.append(
            tagTwo("table", { class: "table table-bordered" }, [
                tagTwo("thead", {}, [
                    tagTwo("tr", {}, [
                        tagLst(Object.keys(adatLista[0]), ertek => tagTwo("th", {}, [ertek])),
                        tagTwo("td", {}, ["Törlés"])
                    ])
                ]),
                tagTwo("tbody")
            ])
        );
        const SOR_SZULO_ELEM = szuloElem.children("table").children("tbody");
        adatLista.forEach(adat => {
            new TablaSorView(SOR_SZULO_ELEM, adat, primaryKey);
        });
    }
}

export default TablaView;