import KikapcsolhatoGomb from "../../KikapcsolhatoGomb.js";
import { tagDct, tagLst, tagTwo } from "../../htmlUtils.js";

class TablaSorView
{
    #szerkesztesGomb;
    #torlesGomb;

    constructor(szuloElem, adatObjektum, kulcs, sorIndex)
    {
        szuloElem.append(
            tagTwo("tr", {}, [
                tagDct(adatObjektum, (kulcs, ertek) => tagTwo("td", {}, [ertek]))
            ])
        );
        const TABLA_SOR_ELEM = szuloElem.children("tr:last-child");
        TABLA_SOR_ELEM.append(
            tagLst([
                tagTwo("td", { class: "text-center" }, [
                    tagTwo("button", { class: "szerkesztes-gomb btn border" }, ["✏"])
                ]),
                tagTwo("td", { class: "text-center" }, [
                    tagTwo("button", { class: "torles-gomb btn border" }, ["❌"])
                ])
            ])
        );
        this.#szerkesztesGomb = new KikapcsolhatoGomb(TABLA_SOR_ELEM.find(".szerkesztes-gomb"));
        this.#torlesGomb = new KikapcsolhatoGomb(TABLA_SOR_ELEM.find(".torles-gomb"));
        const SZERKESZTES_GOMBRA_KATTINTOTT_EVENT = new CustomEvent("szerkesztesGombraKattintottEvent", {
            detail: {
                sorIndex: sorIndex
            }
        });
        this.#szerkesztesGomb.onClick = event => {
            window.dispatchEvent(SZERKESZTES_GOMBRA_KATTINTOTT_EVENT);
        };
        const TORLES_GOMBRA_KATTINTOTT_EVENT = new CustomEvent("torlesGombraKattintottEvent", {
            detail: {
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
        });
        this.#torlesGomb.onClick = event => {
            window.dispatchEvent(TORLES_GOMBRA_KATTINTOTT_EVENT);
        };
    }

    toggleGombokDisabled()
    {
        this.#szerkesztesGomb.toggle();
        this.#szerkesztesGomb.gombElem.prop("disabled", this.#szerkesztesGomb.disabled);
        this.#torlesGomb.toggle();
        this.#torlesGomb.gombElem.prop("disabled", this.#szerkesztesGomb.disabled);
    }

    szerkeszt()
    {
        
    }
}

export default TablaSorView;