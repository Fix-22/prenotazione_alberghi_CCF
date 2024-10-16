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
            let html = '<form id="reservationForm" class="container"><label>Data</label><input type="date" id="dateInput">';
            
            html += Object.keys(configuration).map(e => '<label>' + e.substring(0, 1).toUpperCase() + e.substring(1, e.length) + '</label>' + '<input type="number" id="' + e + '">').join("") 
                    + '<button type="button" id="submitButton">Invia</button>'
                    + '<label id="resultLabel"></label>'
                    + '</form>';
            
            parentElement.innerHTML = html;

            const submitButton = document.querySelector("#submitButton");
            
            submitButton.onclick = () => {
                const reservationValues = configuration.map(e => document.querySelector("#" + e).value);
                console.log(reservationValues)
                callback(reservationValues);
            };
        }
    };
};