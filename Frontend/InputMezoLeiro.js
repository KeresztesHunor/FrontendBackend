class InputMezoLeiro
{
    #megj;
    #placeholder;
    #title;
    _type;
    _pattern;

    constructor(megj, placeholder, title)
    {
        this.#megj = megj;
        this.#placeholder = placeholder;
        this.#title = title;
    }

    get megj()
    {
        return this.#megj;
    }

    get placeholder()
    {
        return this.#placeholder;
    }

    get title()
    {
        return this.#title;
    }

    get type()
    {
        return this._type;
    }

    get pattern()
    {
        return this._pattern;
    }
}

export default InputMezoLeiro;