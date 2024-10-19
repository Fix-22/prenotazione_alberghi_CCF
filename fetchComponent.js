/*
    fetchComponent - Davide Cicoria
*/

const cacheKey = "7d7caf2b-29eb-4ba0-a68c-e2b1ede19f3c" ;

const fetchCache = (token, method, data) => { // promise che esegue sia set che get su cache remota
    return new Promise((resolve, reject) => {
        fetch("https://ws.cipiaceinfo.it/cache/" + method, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "key": token,
            },
            body: JSON.stringify(data)
        })
        .then(r => r.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
};

const fetchComponent = () => {
    let data = [] ;

    const set = () => {
        const newFetch = fetchCache(cacheKey, "set", data)
        .then(r => console.log) ;
    } ;
    const get = () => {
        const newFetch = fetchCache(cacheKey, "get", data)
        .then(r => console.log) ;
    } ;

    return {
        add: function(reservation) {
            
            

            
        },
        build: function() {
            
        }
    }
}