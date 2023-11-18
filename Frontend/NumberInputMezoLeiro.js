import InputMezoLeiro from "./InputMezoLeiro.js";

class NumberInputMezoLeiro extends InputMezoLeiro
{
    constructor(megj, placeholder, title, min, max)
    {
        super(megj, placeholder, title);
        this._type = "number";
        this._pattern = {
            min: min,
            max: max
        };
    }
}

export default NumberInputMezoLeiro;