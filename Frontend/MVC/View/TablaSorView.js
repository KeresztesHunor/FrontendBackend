import KikapcsolhatoGombView from "./KikapcsolhatoGombView.js";
import { tagDct, tagLst, tagOne, tagTwo } from "../../htmlUtils.js";

class TablaSorView
{
    #tablaSorElem;
    #szerkesztesGomb;
    #torlesGomb;
    #fillableLeirok;
    #fillableElemek;
    #fillableAdatok;

    constructor(szuloElem, adatObjektum, elsodlegesKulcs, fillableLeirok, sorIndex)
    {
        this.#fillableLeirok = fillableLeirok;
        szuloElem.append(
            tagTwo("tr", {}, [
                tagDct(adatObjektum, (kulcs, ertek) => tagTwo("td", { class: kulcs }, [ertek]))
            ])
        );
        this.#tablaSorElem = szuloElem.children("tr:last-child");
        this.#tablaSorElem.append(
            tagLst([
                tagTwo("td", { class: "szerkesztes-gomb text-center" }),
                tagTwo("td", { class: "torles-gomb text-center" })
            ])
        );
        this.#szerkesztesGomb = new KikapcsolhatoGombView(this.#tablaSorElem.find(".szerkesztes-gomb"), { class: "btn border" }, ["✏"]);
        this.#torlesGomb = new KikapcsolhatoGombView(this.#tablaSorElem.find(".torles-gomb"), { class: "btn border" }, ["❌"]);
        this.#fillableElemek = {};
        this.#fillableAdatok = {};
        for (const KULCS in fillableLeirok)
        {
            this.#fillableElemek[KULCS] = {
                sorElem: this.#tablaSorElem.find("." + KULCS),
                type: fillableLeirok[KULCS].type
            };
            this.#fillableAdatok[KULCS] = adatObjektum[KULCS];
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
            const FILLABLE_LEIRO = this.#fillableLeirok[KULCS];
            FILLABLE_ELEM.sorElem.html(
                tagOne("input", { type: FILLABLE_ELEM.type, name: KULCS, placeholder: FILLABLE_LEIRO.placeholder, value: this.#fillableAdatok[KULCS], title: FILLABLE_LEIRO.title, class: "form-control" })
            );
        }
        this.#tablaSorElem.find("input").toArray().forEach(inputMezoElem => {
            const INPUT_MEZO_ELEM = $(inputMezoElem);
            const INPUT_MEZO_LEIRO_PATTERN = this.#fillableLeirok[INPUT_MEZO_ELEM.attr("name")].pattern;
            switch (INPUT_MEZO_ELEM.attr("type"))
            {
                case "text":
                    INPUT_MEZO_ELEM.attr("pattern", INPUT_MEZO_LEIRO_PATTERN);
                    break;
                case "number":
                    INPUT_MEZO_ELEM.attr("min", INPUT_MEZO_LEIRO_PATTERN.min);
                    INPUT_MEZO_ELEM.attr("max", INPUT_MEZO_LEIRO_PATTERN.max);
                    break;
            }
            INPUT_MEZO_ELEM.prop("required", true);
        });
    }
}

export default TablaSorView;