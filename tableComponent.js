const generateReservationTable = (parentElement) => {
    let configuration;
    let data = {};
    let dataMonth = {};

    return {
        build: (inputConfiguration) => {
            configuration = inputConfiguration;
        },
        render: () => {
            let html = '<table class="table"><thead><td>Data</td>';
            html += Object.keys(configuration).map(e => '<td>' + e.substring(0, 1).toUpperCase() + e.substring(1, e.length)).join("")
                    + '</thead>';
            
            Object.keys(dataMonth).forEach(k => {
                html += '<tr>' + '<td>' + k + '</td>' + Object.values(dataMonth[k]).map(v => '<td>' + v + '</td>').join("") + '</tr>';
            });
            parentElement.innerHTML = html;
        },
        getData: () => {
            return data;
        },
        setData: (inputData) => {
            data = inputData;

            let newDate = new Date(Date.now());

            for (let i = 0; i < 30; i++) {
                let formattedDate = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();

                if (data[formattedDate]) {
                    dataMonth[formattedDate] = data[formattedDate];
                }
                else {
                    dataMonth[formattedDate] = configuration;
                }

                newDate.setDate(newDate.getDate() + 1);
            }
        },
        add: (reservation) => {
            const date = reservation["data"];
            const keys = Object.keys(reservation);
            let newAvailability = {};

            if (data[date]) {
                for (let i = 1; i < keys.length; i++) {
                    if (data[date][keys[i]] - reservation[keys[i]] >= 0) {
                        newAvailability[keys[i]] = data[date][keys[i]] - reservation[keys[i]];
                    }
                    else {
                        return false;
                    }
                }
            }
            else {
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