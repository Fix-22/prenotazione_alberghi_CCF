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

const fetchComponent = () => {
    let data = [] ;

    const set = (cacheKey, data) => {
        const newFetch = fetchCache(cacheKey, "set", data)
        .then(r => data = r) ;
    } ;
    const get = (cacheKey, data) => {
        const newFetch = fetchCache(cacheKey, "get", data)
        .then(r => data = r) ;
    } ;

    return {
        add: function(reservation) {
            /*
            let dataPrenotazione = reservation.data.split("-") ;
            reservation.data = dataPrenotazione[2] + "/" + dataPrenotazione[1] + "/" + dataPrenotazione[0] ;
            console.log(reservation.data) ;
            */

            let today = new Date(Date.now());
            let dataS = today.toLocaleDateString() ;
            console.log(today) ;
            console.log("Datas " + dataS) ;

            if (data.length === 0) {
                data.push(reservation) ;
            }

            console.log(data) ;
            
        },
        build: function() {
            get(cacheKey, "disponibilitaStanze") ;
            console.log(data) ;

            data.forEach((element) => console.log(element));

            let newData = data.filter((element) => {Date.parse(element.data) >= today }) ;

            console.log(newData) ;
            set(cacheKey, newData) ;


            
        }
    }
}