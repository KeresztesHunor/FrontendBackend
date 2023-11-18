class DataService
{
    #urlBase;

    constructor(urlBase)
    {
        this.#urlBase = urlBase;
    }

    get(vegpont, callback, error)
    {
        axios
            .get(this.#vegpontURL(vegpont))
            .then(response => {
                callback(response.data);
            })
            .catch(error)
        ;
    }

    post(vegpont, data, callback, error)
    {
        axios
            .post(this.#vegpontURL(vegpont), data)
            .then(callback)
            .catch(error)
        ;
    }

    put(vegpont, data, callback, error)
    {
        axios
            .put(this.#vegpontURL(vegpont + this.#primaryKey(data.kulcs)), data)
            .then(callback)
            .catch(error)
        ;
    }

    delete(vegpont, kulcs, callback, error)
    {
        axios
            .delete(this.#vegpontURL(vegpont + this.#primaryKey(kulcs)))
            .then(callback)
            .catch(error)
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