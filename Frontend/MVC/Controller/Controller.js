import { VEGPONT_ALAP } from "../../data.js";
import DataService from "../Model/DataService.js";
import TablaView from "../View/TablaView.js";
import UrlapView from "../View/UrlapView.js";

class Controller
{
    #dataService;

    constructor()
    {
        this.#dataService = new DataService();
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
        this.#dataService.getData(VEGPONT_ALAP + "/writers", data => {
            const TABLA_VIEW = new TablaView($("#tabla"), data);
        });
        $(window).on("validFormSubmitEvent", event => {
            console.log(event.detail);
            this.#dataService.postData(VEGPONT_ALAP + "/writers", event.detail);
        });
    }
}

export default Controller;