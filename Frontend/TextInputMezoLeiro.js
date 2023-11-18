import InputMezoLeiro from "./InputMezoLeiro.js";

class TextInputMezoLeiro extends InputMezoLeiro
{
    constructor(megj, placeholder, title, regex)
    {
        super(megj, placeholder, title);
        this._type = "text";
        this._pattern = regex;
    }
}

export default TextInputMezoLeiro;