class FormInputMezoLeiro
{
    #label;
    #inputMezoLeiro;

    constructor(label, inputMezoLeiro)
    {
        this.#label = label;
        this.#inputMezoLeiro = inputMezoLeiro;
    }

    get label()
    {
        return this.#label;
    }

    get placeholder()
    {
        return this.#inputMezoLeiro.placeholder;
    }

    get title()
    {
        return this.#inputMezoLeiro.title;
    }

    get type()
    {
        return this.#inputMezoLeiro.type;
    }

    get pattern()
    {
        return this.#inputMezoLeiro.pattern;
    }
}

export default FormInputMezoLeiro;