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