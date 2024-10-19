const generateReservationTable = (parentElement) => {
    let configuration;
    //Generate data array
    let data = [];

    return {
        build: (inputConfiguration) => {
            configuration = inputConfiguration;
        },
        overrideData: (newData) => {
            data = newData;
        },
        updateData: (newConfig) => {
            let today = new Date(Date.now());
            for (let i = 0; i < data.length; i++) {
                if (i != 0) {
                    today.setDate(today.getDate() + 1)
                }
                data[i].data = today.toDateString();
                let headers = Object.keys(configuration);
                for (let j = 0; j < newConfig.length; j++) {
                    data[i][headers[j]] = newConfig[i][[headers[j]]];
                }
            }
        },
        render: () => {
            let htmlTable = "<table class='table'><tr>";
            //Headers
            let headers = Object.keys(configuration);
            headers.unshift("data");
            for (let i = 0; i < headers.length; i++) {
                htmlTable += "<th>" + headers[i] + "</th>"
            }
            htmlTable += "</tr>"
            //Body
            data.map((current) => {
                
                htmlTable += "<tr>"
                for (let i = 0; i < headers.length; i++) {
                    htmlTable += "<td>" + current[headers[i]]+ "</td>";
                }
                htmlTable += "</tr>"
            });
            parentElement.innerHTML = htmlTable;
        },
    }
};