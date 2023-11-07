class DataService
{
    constructor()
    {

    }

    getData(vegpont, callbackFuggveny, hibaCallback)
    {
        axios
            .get(vegpont)
            .then(response => {
                callbackFuggveny(response.data);
            })
            .catch(hibaCallback);
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