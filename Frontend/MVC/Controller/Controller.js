import FormTextInputMezoLeiro from "../../FormTextInputMezoLeiro.js"
import FormNumberInputMezoLeiro from "../../FormNumberInputMezoLeiro.js"
import NumberInputMezoLeiro from "../../NumberInputMezoLeiro.js";
import TextInputMezoLeiro from "../../TextInputMezoLeiro.js";
import { VEGPONT_ALAP } from "../../data.js";
import { tagDct, tagLst, tagTwo } from "../../htmlUtils.js";
import DataService from "../Model/DataService.js";
import BiztosModalView from "../View/BiztosModalView.js";
import HibaModalView from "../View/HibaModalView.js";
import TablaView from "../View/TablaView.js";
import ToltesModalView from "../View/ToltesModalView.js";
import UrlapView from "../View/UrlapView.js";

class Controller
{
    #dataService;
    #urlapView;
    #toltesModalView;
    #biztosTorliModalView;
    #hibaModalView;
    #tablaView;

    constructor()
    {
        this.#dataService = new DataService(VEGPONT_ALAP);
        const NEV_INPUT_MEZO_LEIRO = new TextInputMezoLeiro("Név", "1 nagybetűvel kezdődik, legalább 3 karakter, legfeljebb 15", "[A-Z][a-z]{2,15}");
        const SZUL_INPUT_MEZO_LEIRO = new NumberInputMezoLeiro("2023", "[1900-2023]", 1900, 2023);
        this.#urlapView = new UrlapView($("#urlap"), {
            nev: new FormTextInputMezoLeiro("Név", NEV_INPUT_MEZO_LEIRO),
            szul: new FormNumberInputMezoLeiro("Születési év", SZUL_INPUT_MEZO_LEIRO)
        });
        const MODALOK_ELEM = $("#modalok");
        this.#toltesModalView = new ToltesModalView(MODALOK_ELEM, "toltes-modal", "Egy pillanat");
        this.#biztosTorliModalView = new BiztosModalView(MODALOK_ELEM, "biztos-torli-modal", "Biztos törli az adatot?", kulcs => {
            this.#biztosTorliModalView.toltestJelez();
            this.#dataService.delete("/api/writers", kulcs,
                response => {
                    location.reload();
                },
                error => {
                    this.#biztosTorliModalView.eltuntet();
                    this.#biztosTorliModalView.reset();
                    this.#hibaModalView.modalText(this.#hibaUzenetObjektumText(error));
                    this.#hibaModalView.megjelenit();
                    console.error(error);
                }
            );
        });
        this.#hibaModalView = new HibaModalView(MODALOK_ELEM, "hiba-modal");
        this.#tablaView = new TablaView($("#tabla"));
        this.#dataService.get("/api/writers",
            data => {
                this.#tablaView.adatBetolt(data, ["id"], {
                    nev: NEV_INPUT_MEZO_LEIRO,
                    szul: SZUL_INPUT_MEZO_LEIRO
                });
            },
            error => {
                this.#tablaView.hibaKiir(this.#hibaUzenetObjektumText(error));
                console.error(error);
            }
        );
        $(window).on("hibaModalOkGombraKattintottEvent", event => {
            this.#hibaModalView.modalText("");
            location.reload();
        });
        $(window).on("validFormSubmitEvent", event => {
            this.#toltesModalView.megjelenit();
            this.#dataService.post("/api/writers", event.detail.kulcs, event.detail.data,
                response => {
                    location.reload();
                },
                error => {
                    this.#hibaModalView.modalText(this.#hibaUzenetObjektumText(error));
                    this.#hibaModalView.megjelenit();
                    console.log(error);
                }
            );
        });
        $(window).on("szerkesztesGombraKattintottEvent", event => {
            this.#tablaView.szerkeszt(event.detail.sorIndex);
        });
        $(window).on("torlesGombraKattintottEvent", event => {
            this.#biztosTorliModalView.megjelenit();
            this.#biztosTorliModalView.igenGombrakattint()
                .then(callback => {
                    callback(event.detail.kulcs);
                })
                .catch(() => {})
            ;
        });
        $(window).on("szerkesztestJovahagyPopoverMegjelentEvent", event => {
            this.#tablaView.szerkesztesJovahagyasaPopoverTartalmatMegjelenit(event.detail.sorIndex);
        });
        $(window).on("validSzerkesztestJovahagyottEvent", event => {
            this.#toltesModalView.megjelenit();
            this.#dataService.put("/api/writers", event.detail.kulcs, event.detail.data,
                response => {
                    location.reload();
                },
                error => {
                    this.#hibaModalView.modalText(this.#hibaUzenetObjektumText(error));
                    this.#hibaModalView.megjelenit();
                    console.log(error);
                }
            );
        });
        $(window).on("szerkesztestLemondtaEvent", event => {
            this.#tablaView.szerkesztesModotKikapcsol(event.detail.sorIndex);
        });
    }

    #hibaUzenetObjektumText(errorObject)
    {
        return tagDct(errorObject, (kulcs, ertek) => typeof ertek === "object" ? "" : tagLst([
            tagTwo("h6", {}, [kulcs]),
            tagTwo("p", {}, [ertek])
        ]));
    }
}

export default Controller;