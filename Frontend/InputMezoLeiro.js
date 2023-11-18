class InputMezoLeiro
{
    #megj;
    #placeholder;
    #title;
    #type;
    #pattern;

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
        return this.#type;
    }

    set _type(type)
    {
        this.#type = type;
    }

    get pattern()
    {
        return this.#pattern;
    }

    set _pattern(pattern)
    {
        this.#pattern = pattern;
    }
}

export default InputMezoLeiro;