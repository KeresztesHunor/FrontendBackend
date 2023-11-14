import { VEGPONT_ALAP } from "../../data.js";
import DataService from "../Model/DataService.js";
import TablaView from "../View/TablaView.js";
import UrlapView from "../View/UrlapView.js";

class Controller
{
    #dataService;

    constructor()
    {
        this.#dataService = new DataService(VEGPONT_ALAP);
        const URLAP_VIEW = new UrlapView($("#urlap"), {
            nev: {
                megj: "Név",
                type: "text",
                placeholder: "Név",
                pattern: "[A-Z][a-z]{2,15}",
                title: "1 nagybetűvel kezdődik, legalább 3 karakter, legfeljebb 15"
            },
            szul: {
                megj: "Születési év",
                type: "number",
                placeholder: "2023",
                pattern: {
                    min: 1900,
                    max: 2023
                },
                title: "[1900-2023]"
            }
        });
        this.#dataService.getData("/api/writers", data => {
            const TABLA_VIEW = new TablaView($("#tabla"), data, ["id"]);
        });
        $(window).on("validFormSubmitEvent", event => {
            this.#dataService.postData("/api/writers", event.detail);
        });
        $(window).on("torlesGombraKattintottEvent", event => {
            this.#dataService.deleteData("/api/writers", event.detail.primaryKey);
        });
    }
}

export default Controller;