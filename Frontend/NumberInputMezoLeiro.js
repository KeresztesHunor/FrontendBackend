import InputMezoLeiro from "./InputMezoLeiro.js";

class NumberInputMezoLeiro extends InputMezoLeiro
{
    constructor(placeholder, title, min, max)
    {
        super(placeholder, title, "number", {
            min: min,
            max: max
        });
    }
}

export default NumberInputMezoLeiro;