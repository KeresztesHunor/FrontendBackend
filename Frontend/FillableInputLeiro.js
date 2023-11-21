class FillableInputLeiro
{
    #adatNev;
    #type;

    constructor(adatNev, type)
    {
        this.#adatNev = adatNev;
        this.#type = type;
    }

    get adatNev()
    {
        return this.#adatNev;
    }

    get type()
    {
        return this.#type;
    }
}

export default FillableInputLeiro;