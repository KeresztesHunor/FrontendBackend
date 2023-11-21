import InputMezoLeiro from "./InputMezoLeiro.js";

class TextInputMezoLeiro extends InputMezoLeiro
{
    constructor(placeholder, title, regex)
    {
        super(placeholder, title, "text", regex);
    }
}

export default TextInputMezoLeiro;