class KikapcsolhatoGomb
{
    #gombElem;
    #disabled;

    constructor(gombElem, disabled = false)
    {
        this.#gombElem = gombElem;
        this.#disabled = disabled;
    }

    get gombElem()
    {
        return this.#gombElem;
    }

    set onClick(callback)
    {
        this.#gombElem.on("click", event => {
            if (!this.#disabled)
            {
                callback(event);
            }
        });
    }

    get disabled()
    {
        return this.#disabled;
    }

    toggle()
    {
        this.#disabled = !this.#disabled;
    }
}

export default KikapcsolhatoGomb;
