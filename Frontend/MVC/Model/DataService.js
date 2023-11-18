class DataService
{
    #urlBase;

    constructor(urlBase)
    {
        this.#urlBase = urlBase;
    }

    get(vegpont, callback)
    {
        axios
            .get(this.#vegpontURL(vegpont))
            .then(response => {
                callback(response.data);
            })
            .catch(console.error)
        ;
    }

    post(vegpont, data)
    {
        axios
            .post(this.#vegpontURL(vegpont), data)
            .then(console.log)
            .catch(console.error)
        ;
    }

    put(vegpont, data)
    {
        axios
            .put(this.#vegpontURL(vegpont + this.#primaryKey(data.kulcs)), data)
            .then(console.log)
            .catch(console.error)
        ;
    }

    delete(vegpont, kulcs)
    {
        axios
            .delete(this.#vegpontURL(vegpont + this.#primaryKey(kulcs)))
            .then(console.log)
            .catch(console.error)
        ;
    }

    #vegpontURL(vegpont)
    {
        return this.#urlBase + vegpont;
    }

    #primaryKey(adatLista)
    {
        let kulcs = "";
        adatLista.forEach(adat => {
            kulcs += "/" + adat;
        });
        return kulcs;
    }
}

export default DataService;