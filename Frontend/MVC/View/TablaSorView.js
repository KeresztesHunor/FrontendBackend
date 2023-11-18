import { tagDct, tagTwo } from "../../htmlUtils.js";

class TablaSorView
{
    constructor(szuloElem, adatObjektum, kulcs)
    {
        szuloElem.append(
            tagTwo("tr", {}, [
                tagDct(adatObjektum, (kulcs, ertek) => tagTwo("td", {}, [ertek]))
            ])
        );
        const TABLA_SOR_ELEM = szuloElem.children("tr:last-child");
        TABLA_SOR_ELEM.append(
            tagTwo("td", {}, [
                tagTwo("button", { class: "btn", "data-bs-toggle": "modal", "data-bs-target": "#biztos-torli-modal" }, ["❌"])
            ])
        );
        const TORLES_GOMB = TABLA_SOR_ELEM.children("td:last-child").children("button");
        TORLES_GOMB.on("click", () => {
            window.dispatchEvent(new CustomEvent("torlesGombraKattintottEvent", {
                detail:{
                    data: {
                        kulcs: (() => {
                            const LISTA = [];
                            kulcs.forEach(adat => {
                                LISTA.push(adatObjektum[adat]);
                            });
                            return LISTA;
                        })()
                    }
                }
            }));
        });
    }
}

export default TablaSorView;