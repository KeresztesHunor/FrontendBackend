class DataService
{
    #urlBase;

    constructor(urlBase)
    {
        this.#urlBase = urlBase;
    }

    getData(vegpont, callbackFuggveny)
    {
        axios
            .get(this.#urlBase + vegpont)
            .then(response => {
                callbackFuggveny(response.data);
            })
            .catch(console.error);
    }

    postData(vegpont, data)
    {
        axios
            .post(this.#urlBase + vegpont, data)
            .then(console.log)
            .catch(console.error);
    }

    deleteData(vegpont, kulcs)
    {
        let osszetettKulcs = "";
        kulcs.forEach(adat => {
            osszetettKulcs += "/" + adat;
        });
        axios
            .delete(this.#urlBase + vegpont + osszetettKulcs)
            .then(console.log)
            .catch(console.error);
    }
}

export default DataService;