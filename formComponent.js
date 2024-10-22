const generateReservationForm = (parentElement) => {
    let configuration;
    let callback;

    return {
        build: (inputConfiguration) => {
            configuration = inputConfiguration;
        },
        onsubmit: (inputCallback) => {
            callback = inputCallback;
        },
        render: () => {
            let html = '<form id="reservationForm" class="container"><label>Data</label><input type="date" id="dateInput" class="form-control">';
            
            html += Object.keys(configuration).map(e => '<label>' + e.substring(0, 1).toUpperCase() + e.substring(1, e.length) + '</label>' + '<input class="form-control" type="number" id="' + e + '">').join("") 
                    + '<button type="button" id="submitButton" class="btn btn-primary">Invia</button>'
                    + '<label id="resultLabel"></label>'
                    + '</form>';
            
            parentElement.innerHTML = html;

            const submitButton = document.querySelector("#submitButton");
            
            submitButton.onclick = () => {
                // struttura dati con i valori della form
                let dateValSplit = document.querySelector("#dateInput").value.split("-");
                const reservation = {"data": dateValSplit[0] + "-" + parseInt(dateValSplit[1]) + "-" + parseInt(dateValSplit[2])};
                
                Object.keys(configuration).map(e => { // aggiunge alla struttura il valore di ogni input e il corrispettivo nome
                    reservation[e] = parseInt(document.querySelector("#" + e).value) >= 0 ? parseInt(document.querySelector("#" + e).value) : NaN;
                });
                
                callback(reservation);
            };
        },
        setStatus: (status) => {
            if (status) {
                document.getElementById("resultLabel").innerText = "OK";
            }
            else {
                document.getElementById("resultLabel").innerText = "KO";
            }
        },
        clear: () => {
            document.querySelectorAll(".form-control").forEach(e => e.value = "");
        }
    };
};