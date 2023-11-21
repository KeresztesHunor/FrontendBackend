class InputMezoLeiro
{
    #placeholder;
    #title;
    #type;
    #pattern;

    constructor(placeholder, title, type, pattern)
    {
        this.#placeholder = placeholder;
        this.#title = title;
        this.#type = type;
        this.#pattern = pattern;
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

    get pattern()
    {
        return this.#pattern;
    }
}

export default InputMezoLeiro;