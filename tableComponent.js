const generateReservationTable = (parentElement) => {
    let configuration;
    //Dati effettivi della cache.
    let data = {};
    //Dati del mese
    let dataMonth = {};

    return {
        build: (inputConfiguration) => {
            configuration = inputConfiguration;
        },
        render: () => {
            let html = '<table class="table"><thead><td>Data</td>';
            //Headers della tabella
            html += Object.keys(configuration).map(element => '<td>' + element.substring(0, 1).toUpperCase() + element.substring(1, element.length)).join("")
                    + '</thead>';
            //Dati della tabella
            Object.keys(dataMonth).forEach(k => {
                html += '<tr>' + '<td>' + k + '</td>' + Object.values(dataMonth[k]).map(v => '<td>' + v + '</td>').join("") + '</tr>';
            });
            //Applichiamo le modifiche
            parentElement.innerHTML = html;
        },
        getData: () => {
            return data;
        },
        setData: (inputData) => {
            data = inputData;

            let newDate = new Date(Date.now());

            for (let i = 0; i < 30; i++) {
                //Format Date
                let formattedDate = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
                
                if (data[formattedDate]) { //Se la data Esiste
                    dataMonth[formattedDate] = data[formattedDate];
                }
                else { //Se non Esiste
                    dataMonth[formattedDate] = configuration;
                }

                newDate.setDate(newDate.getDate() + 1);
            }
        },
        add: (reservation) => {
            const date = reservation["data"];
            const keys = Object.keys(reservation);
            let newAvailability = {};

            if (data[date]) { //Se è presente la data, sottraggo in base alla data presente
                for (let i = 1; i < keys.length; i++) {
                    if (data[date][keys[i]] - reservation[keys[i]] >= 0) { 
                        newAvailability[keys[i]] = data[date][keys[i]] - reservation[keys[i]];
                    }
                    else {
                        return false;
                    }
                }
            }
            else { //Altrimenti sottraggo dalla configurazione direttamente
                for (let i = 1; i < keys.length; i++) {
                    if (configuration[keys[i]] - reservation[keys[i]] >= 0) {
                        newAvailability[keys[i]] = configuration[keys[i]] - reservation[keys[i]];
                    }
                    else {
                        return false;
                    }
                }
            }

            data[date] = newAvailability;
            return true;
        }
    };
};