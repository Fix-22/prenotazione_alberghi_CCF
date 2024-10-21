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
                    //console.log("response\n:" + JSON.stringify(r));
                    console.log(r);
                    resolve(r);
                })
                .catch((err) => reject(err));
        })
    };

    return {
        add: function(reservation) {
            console.log("data\n" + JSON.stringify(data)) ;
            
            if (data.length === 0) {
                console.log("length 0") ;
                data.push(reservation) ;
                set(cacheKey, data) ;
            } else {
                console.log("length X") ;
                let found = false ;
                let foundIndex = -1 ;
                
                data.forEach((element, index) => {
                    if (element.data === reservation.data) {
                        found = true ;
                        foundIndex = index ;
                    }
                })
                

                if (!found) { //fare una push del dizionario e basta
                    data.push(reservation) ;
                    console.log("not found") ;
                    console.log("dataSetNotFound:\n" + JSON.stringify(data)) ;
                    set(cacheKey, data) ;
                } else { //controllare che ci sia spazio per le stanze
                    console.log("found, index: " + foundIndex) ;

                    let oldReservation = data[foundIndex] ;
                    console.log("oldReserv\n" + JSON.stringify(oldReservation)) ;
    
                    if (oldReservation.singola + reservation.singola <= configuration.singola && oldReservation.doppia + reservation.doppia <= configuration.doppia && oldReservation.suite + reservation.suite <= configuration.suite) {
                        reservation.singola += oldReservation.singola ;
                        reservation.doppia += oldReservation.doppia ;
                        reservation.suite += oldReservation.suite ;

                        console.log("nuoveSingole: " + reservation.singola) ;
                        console.log("nuoveDoppie: " + reservation.doppia) ;
                        console.log("nuoveSuite: " + reservation.suite) ;

                        console.log("C'è abbastanza spazio per le stanze richieste") ;
                        data[foundIndex] = reservation ;
                        set(cacheKey, data) ;
                    } else {
                        alert("Non c'è abbastanza spazio per tutte le camere richieste, eseguire nuovamente la prenotazione") ;
                    }
                }
            }

            console.log("data\n" + JSON.stringify(      )) ;
            
        },
        build: function() {
            /*
            get(cacheKey, "disponibilitaStanze")
            .then((dataR) => {
                data = dataR;

                if (data.length !== 0) {
                    console.log("build length X") ;
                    //elimino le prenotazioni dei giorni precedenti alla data odierna
                    let today = new Date(Date.now());
                    let dataS = today.toLocaleDateString() ;
                    console.log(today) ;
                    console.log("Datas " + dataS) ;
    
                    //data.forEach((element) => console.log(element));
    
                    //let newData = data.filter((element) => {Date.parse(element.data) >= today }) ;
    
                    let newData = data ;
    
                    //newData.sort((a, b) => a.data - b.data) ;
                    //console.log("newDataSort\n" + JSON.stringify(newData)) ;
    
                    //salvo sulla cache remota la nuova lista
                    newData = JSON.stringify(newData) ;
                    console.log(newData);
                    set(cacheKey, newData);
                } else {
                    console.log("build length 0") ;
                }
             
                table.overrideData(data);
                table.render();

            }) ;
            */

            
            get(cacheKey, "disponibilitaStanze") ;
            console.log(data) ;

            data.forEach((element) => console.log(element));

            //let newData = data.filter((element) => {Date.parse(element.data) >= today }) ;

            console.log(newData) ;
            set(cacheKey) ;
            
            
        },
        getAll: function() {
            console.log("allData\n" + JSON.stringify(data)) ;
            return data ;
        }
    }
}