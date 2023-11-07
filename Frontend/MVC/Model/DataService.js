class DataService
{
    constructor()
    {

    }

    getData(vegpont, callbackFuggveny)
    {
        axios
            .get(vegpont)
            .then(response => {
                callbackFuggveny(response.data);
            })
            .catch(console.error);
    }

    postData(vegpont, data)
    {
        axios
            .post(vegpont, data)
            .then(console.log)
            .catch(console.error);
    }
}

export default DataService;