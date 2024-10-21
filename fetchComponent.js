/*
    fetchComponent - Davide Cicoria
*/


/*
prendo la data di oggi da cache remota

se dataOggi è presente nell'array di dizionari di disponibilità:
	elimino tutti i dati presenti prima di quella data dall'array -> la data di oggi sarà il primo elemento
	carico le altre date (in base alla lunghezza corrente dopo l'eliminazione degli elementi dell'array) con relative disponibilità
altrimenti:
	creo nuovo array e genero per i prossimi 30 gg tutte le disponibilità
*/

const cacheKey = "7d7caf2b-29eb-4ba0-a68c-e2b1ede19f3c" ;

const fetchComponent = (configuration) => {
    let data = [] ;

    const set = (cacheKey, data) => {
        const newFetch = fetchCacheSet(cacheKey, data)
        .then(r => console.log(r.result)) ;
    } ;

    const get = (cacheKey) => {
        return new Promise((resolve, reject) => {
            let hold = [];
            const newFetch = fetchCacheGet(cacheKey)
                .then(r => {
                    resolve(r);
                })
                .catch((err) => reject(err));
        })
    };

    return {
        add: function(reservation, conf) {
            headers = Object.keys(reservation);
            let check = [];
            for (let i = 1; i < headers.length; i++) {
                if (reservation[headers[i]] <= conf[headers[i]]) {
                    check.push(true);
                } else {
                    check.push(false);
                }   
            }
            console.log(check);
            let ok = true;
            for(let k = 0; k < check.length; k++) {
                if (check[k] == false) {
                    ok = false;
                }
            }
            if (ok) {
                data.push(reservation);
                set(cacheKey, data);
                return;
            }
            console.log("Error");
            return -1;
        },
        build: function(table) {
            get(cacheKey, "disponibilitaStanze").then((response) => {
                let oldData = JSON.parse(response.result);
                table.updateData(oldData);
                table.render();
                data = oldData;
            });
        },
        getAll: function() {
            console.log(JSON.stringify(data)) ;
            return data ;
        }
    }
}