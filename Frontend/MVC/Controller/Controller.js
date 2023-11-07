import { VEGPONT_ALAP } from "../../data.js";
import DataService from "../Model/DataService.js";

class Controller
{
    #dataService;

    constructor()
    {
        this.#dataService = new DataService();
        this.#dataService.getData(VEGPONT_ALAP + "writers", this.#megjelenit, this.#hiba);
    }

    #megjelenit(data)
    {
        console.log(data);
    }

    #hiba(error)
    {
        console.error(error);
    }
}

export default Controller;