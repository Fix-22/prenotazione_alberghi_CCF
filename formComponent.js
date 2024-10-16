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
                const reservation = {"data": document.querySelector("#dateInput").value};
                
                Object.keys(configuration).map(e => {
                    reservation[e] = parseInt(document.querySelector("#" + e).value);
                });
                
                callback(reservation);
            };
        }
    };
};