import NumberInputMezoLeiro from "../../NumberInputMezoLeiro.js";
import TextInputMezoLeiro from "../../TextInputMezoLeiro.js";
import { VEGPONT_ALAP } from "../../data.js";
import DataService from "../Model/DataService.js";
import TablaView from "../View/TablaView.js";
import UrlapView from "../View/UrlapView.js";

class Controller
{
    #dataService;
    #urlapView;

    constructor()
    {
        this.#dataService = new DataService(VEGPONT_ALAP);
        this.#urlapView = new UrlapView($("#urlap"), {
            nev: new TextInputMezoLeiro("Név", "Név", "1 nagybetűvel kezdődik, legalább 3 karakter, legfeljebb 15", "[A-Z][a-z]{2,15}"),
            szul: new NumberInputMezoLeiro("Születési év", "2023", "[1900-2023]", 1900, 2023)
        });
        this.#dataService.get("/api/writers", data => {
            const TABLA_VIEW = new TablaView($("#tabla"), data, ["id"]);
        });
        $(window).on("validFormSubmitEvent", event => {
            this.#dataService.post("/api/writers", event.detail.data);
        });
        $(window).on("torlesGombraKattintottEvent", event => {
            this.#dataService.delete("/api/writers", event.detail.data.kulcs);
        });
    }
}

export default Controller;