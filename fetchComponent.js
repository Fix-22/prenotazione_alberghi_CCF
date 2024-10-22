const generateFetchComponent = () => {
    let token;

    return {
        build: (inputToken) => {
            token = inputToken;
        },
        setData: (key, data) => {
            return new Promise((resolve, reject) => {
                fetch("https://ws.progettimolinari.it/cache/set", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "key": token
                    },
                    body: JSON.stringify({
                        key: key,
                        value: JSON.stringify(data)
                    })
                })
                .then(r => r.json())
                .then(data => resolve(data.result))
                .catch(err => reject(err.result));
            });
        },
        getData: (key) => {
            return new Promise((resolve, reject) => {
                fetch("https://ws.progettimolinari.it/cache/get", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "key": token
                    },
                    body: JSON.stringify({
                        key: key
                    })
                })
                .then(r => r.json())
                .then(data => resolve(data.result))
                .catch(err => reject(err.result));
            })
        }
    };
}