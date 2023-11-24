import KikapcsolhatoGombView from "./KikapcsolhatoGombView.js";
import { tagDct, tagLst, tagOne, tagTwo } from "../../htmlUtils.js";

class TablaSorView
{
    #tablaSorElem;
    #sorIndex;
    #szerkesztesGomb;
    #torlesGombView;
    #fillableLeirok;
    #fillableElemek;
    #fillableAdatok;
    #szerkesztestJovahagyPopover;
    #kulcs;
    #detailSorIndexObj;

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
        this.#szerkesztesGomb = new KikapcsolhatoGombView(this.#tablaSorElem.find(".szerkesztes-gomb"), { class: "btn border", "data-bs-toggle": "popover", "data-bs-content": "sus" }, ["✏"]);
        this.#szerkesztesGomb.gombElem.popover({ html: true });
        this.#torlesGombView = new KikapcsolhatoGombView(this.#tablaSorElem.find(".torles-gomb"), { class: "btn border" }, ["❌"]);
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
        this.#sorIndex = sorIndex;
        this.#detailSorIndexObj = {
            detail: {
                sorIndex: this.#sorIndex
            }
        };
        const SZERKESZTES_GOMBRA_KATTINTOTT_EVENT = new CustomEvent("szerkesztesGombraKattintottEvent", this.#detailSorIndexObj);
        this.#szerkesztesGomb.onClick = event => {
            window.dispatchEvent(SZERKESZTES_GOMBRA_KATTINTOTT_EVENT);
        };
        const SZERKESZTES_GOMB_DISABLED_POPOVER_ACTION_TRIGGER_EVENT = event => {
            if (this.#szerkesztesGomb.disabled)
            {
                event.preventDefault();
            }
        };
        this.#szerkesztesGomb.gombElem.on("hide.bs.popover", SZERKESZTES_GOMB_DISABLED_POPOVER_ACTION_TRIGGER_EVENT);
        this.#szerkesztesGomb.gombElem.on("show.bs.popover", SZERKESZTES_GOMB_DISABLED_POPOVER_ACTION_TRIGGER_EVENT);
        this.#szerkesztestJovahagyPopover = new bootstrap.Popover(this.#szerkesztesGomb.gombElem[0]); // Ez csak [0]-val működik
        this.#szerkesztesGomb.gombElem.on("shown.bs.popover", () => {
            window.dispatchEvent(new CustomEvent("szerkesztestJovahagyPopoverMegjelentEvent", this.#detailSorIndexObj));
        });
        this.#kulcs = (() => {
            const LISTA = [];
            elsodlegesKulcs.forEach(adat => {
                LISTA.push(adatObjektum[adat]);
            });
            return LISTA;
        })();
        const TORLES_GOMBRA_KATTINTOTT_EVENT = new CustomEvent("torlesGombraKattintottEvent", {
            detail: {
                kulcs: this.#kulcs
            }
        });
        this.#torlesGombView.onClick = event => {
            window.dispatchEvent(TORLES_GOMBRA_KATTINTOTT_EVENT);
        };
    }

    toggleGombokDisabled()
    {
        this.#szerkesztesGomb.toggle();
        this.#szerkesztesGomb.gombElem.prop("disabled", this.#szerkesztesGomb.disabled);
        this.#torlesGombView.toggle();
        this.#torlesGombView.gombElem.prop("disabled", this.#szerkesztesGomb.disabled);
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
        return new Promise(resolve => {
            const SHOW_POPOVER_EVENT_CALLBACK = event => {
                this.#szerkesztesGomb.gombElem.off("show.bs.popover", SHOW_POPOVER_EVENT_CALLBACK);
                resolve();
            };
            this.#szerkesztesGomb.gombElem.on("show.bs.popover", SHOW_POPOVER_EVENT_CALLBACK);
        });
    }

    szerkesztesModotKikapcsol()
    {
        for (const KULCS in this.#fillableElemek)
        {
            this.#fillableElemek[KULCS].sorElem.html(this.#fillableAdatok[KULCS]);
        }
    }

    szerkesztesJovahagyasaPopoverTartalmatMegjelenit()
    {
        const POPOVER_ELEM = $("#" + this.#szerkesztesGomb.gombElem.attr("aria-describedby")).find(".popover-body");
        POPOVER_ELEM.html(
            tagLst([
                tagTwo("button", { class: "szerkesztes-ok-gomb btn btn-success border me-1" }, ["✔"]),
                tagTwo("button", { class: "szerkesztes-megse-gomb btn btn-danger border ms-1" }, ["❌"])
            ])
        );
        const FILLABLE_INPUT_MEZO_ELEMEK = (() => {
            const LISTA = [];
            this.#tablaSorElem.find("input").toArray().forEach(inputMezoElem => {
                const INPUT_MEZO_ELEM = $(inputMezoElem);
                LISTA.push({
                    name: INPUT_MEZO_ELEM.attr("name"),
                    inputMezoElem:INPUT_MEZO_ELEM
                });
            });
            return LISTA;
        })();
        POPOVER_ELEM.children(".szerkesztes-ok-gomb").on("click", () => {
            let i = 0;
            while (i < FILLABLE_INPUT_MEZO_ELEMEK.length && FILLABLE_INPUT_MEZO_ELEMEK[i].inputMezoElem[0].reportValidity())
            {
                i++;
            }
            if (i >= FILLABLE_INPUT_MEZO_ELEMEK.length)
            {
                window.dispatchEvent(new CustomEvent("validSzerkesztestJovahagyottEvent", {
                    detail: {
                        kulcs: this.#kulcs,
                        data: (() => {
                            const OBJ = {};
                            FILLABLE_INPUT_MEZO_ELEMEK.forEach(inputMezoElem => {
                                OBJ[inputMezoElem.name] = inputMezoElem.inputMezoElem.val();
                            });
                            return OBJ;
                        })(),
                        sorIndex: this.#sorIndex
                    }
                }));
                this.#szerkesztestJovahagyPopover.hide();
            }
        });
        POPOVER_ELEM.children(".szerkesztes-megse-gomb").on("click", () => {
            window.dispatchEvent(new CustomEvent("szerkesztestLemondtaEvent", this.#detailSorIndexObj));
            this.#szerkesztestJovahagyPopover.hide();
        });
    }
}

export default TablaSorView;