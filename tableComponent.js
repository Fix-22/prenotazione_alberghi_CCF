const generateReservationTable = (parentElement) => {
    let configuration;
    let data = [];

    return {
        build: (inputConfiguration) => {
            configuration = inputConfiguration;
        },
        updateData: (newData) => {
            data = newData;
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
                    console.log(headers[i]);
                    console.log(current[headers[i]]);
                    htmlTable += "<td>" + current[headers[i]]+ "</td>";
                    console.log(htmlTable);
                }
                htmlTable += "</tr>"
            });
            parentElement.innerHTML = htmlTable;
        },
    }
};