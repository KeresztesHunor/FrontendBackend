import KikapcsolhatoGombView from "./KikapcsolhatoGombView.js";
import { tagDct, tagLst, tagOne, tagTwo } from "../../htmlUtils.js";

class TablaSorView
{
    #szerkesztesGomb;
    #torlesGomb;
    #fillableElemek;

    constructor(szuloElem, adatObjektum, elsodlegesKulcs, fillableLeirok, sorIndex)
    {
        szuloElem.append(
            tagTwo("tr", {}, [
                tagDct(adatObjektum, (kulcs, ertek) => tagTwo("td", { class: kulcs }, [ertek]))
            ])
        );
        const TABLA_SOR_ELEM = szuloElem.children("tr:last-child");
        TABLA_SOR_ELEM.append(
            tagLst([
                tagTwo("td", { class: "szerkesztes-gomb text-center" }),
                tagTwo("td", { class: "torles-gomb text-center" })
            ])
        );
        this.#szerkesztesGomb = new KikapcsolhatoGombView(TABLA_SOR_ELEM.find(".szerkesztes-gomb"), { class: "btn border" }, ["✏"]);
        this.#torlesGomb = new KikapcsolhatoGombView(TABLA_SOR_ELEM.find(".torles-gomb"), { class: "btn border" }, ["❌"]);
        this.#fillableElemek = {};
        for (const KULCS in fillableLeirok)
        {
            this.#fillableElemek[KULCS] = {
                sorElem: TABLA_SOR_ELEM.find("." + KULCS),
                type: fillableLeirok[KULCS].type
            };
        }
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
                        elsodlegesKulcs.forEach(adat => {
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
        for (const KULCS in this.#fillableElemek)
        {
            const FILLABLE_ELEM = this.#fillableElemek[KULCS];
            FILLABLE_ELEM.sorElem.html(
                tagOne("input", { type: FILLABLE_ELEM.type, class: "form-control" })
            );
        }
    }
}

export default TablaSorView;