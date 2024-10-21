/*
    fetchCache - Simone Cecire
*/

const fetchCacheGet = (token) => { // promise che esegue sia set che get su cache remota
    return new Promise((resolve, reject) => {
        fetch("https://ws.progettimolinari.it/cache/get", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "key": token,
            },
            body: JSON.stringify({
                key : "disponibilitaStanze"
            })
        })
        .then(r => r.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
};

const fetchCacheSet = (token, data) => { // promise che esegue sia set che get su cache remota
    return new Promise((resolve, reject) => {
        fetch("https://ws.progettimolinari.it/cache/set", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "key": token,
            },
            body: JSON.stringify({
                key : "disponibilitaStanze",
                value : JSON.stringify(data)
            })
        })
        .then(r => r.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
};