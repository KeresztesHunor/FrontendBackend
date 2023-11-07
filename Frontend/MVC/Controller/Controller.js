import { VEGPONT_ALAP } from "../../data.js";
import DataService from "../Model/DataService.js";
import TablaView from "../View/TablaView.js";

class Controller
{
    #dataService;

    constructor()
    {
        this.#dataService = new DataService();
        this.#dataService.getData(VEGPONT_ALAP + "/writers", this.#megjelenit, this.#hiba);
    }

    #megjelenit(data)
    {
        const LEIRO = [];
        for (const KEY in data[0])
        {
            LEIRO.push(KEY);
        }
        const TABLA_VIEW = new TablaView($("#tabla"), data, LEIRO);
    }

    #hiba(error)
    {
        console.error(error);
    }
}

export default Controller;