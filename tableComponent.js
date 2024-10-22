const generateReservationTable = (parentElement) => {
    let configuration;
    //Generate data array
    let data = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];

    return {
        build: (inputConfiguration) => {
            configuration = inputConfiguration;
            let today = new Date(Date.now());
            for (let i = 0; i < 30; i++) {
                if (i != 0) {
                    today.setDate(today.getDate() + 1)
                }
                //Modifico la stringa
                let hold = today.toLocaleDateString().split("/");
                data[i].data = hold[2] + "-" + hold[0] + "-" +hold[1];
                let headers = Object.keys(configuration);
                for (let j = 0; j < headers.length; j++) {
                    data[i][headers[j]] = configuration[headers[j]];
                }
            }today.toLocaleDateString().replaceAll("/","-");
        },
        overrideData: (newData) => {
            data = newData;
        },
        updateData: (newConfig) => {
            let today = new Date(Date.now());
            for (let i = 0; i < data.length; i++) {
                //console.log(data[i]);
                if (i != 0) {
                    today.setDate(today.getDate() + 1)
                }
                let headers = Object.keys(configuration);
                for (let j = 0; j < newConfig.length; j++) {
                    //console.log(data[i].data + " " + newConfig[j].data);
                    /*
                    console.log(data[i]);
                    console.log(newConfig[j]);
                    console.log("-----------------------------");
                    console.log(parseInt(data[i][headers[k]]) + " - " + parseInt(newConfig[j][headers[k]]) + " = " + parseInt(data[i][headers[k]]-newConfig[j][headers[k]]));
                    console.log("-----------------------------");
                    console.log(data[i]);
                    console.log(newConfig[j]);
                    */
                    if (data[i].data == newConfig[j].data) {
                        let check = [];
                        for (let k = 0; k < headers.length; k++) {
                            if (parseInt(data[i][headers[k]]) - parseInt(newConfig[j][headers[k]]) >= 0) {
                                check.push(true);
                            } else {
                                check.push(false);
                            }
                        }
                        let ok = true;
                        for(let k = 0; k < check.length; k++) {
                            if (!check[k]) {
                                ok = false;
                            }
                        }
                        if (ok) {
                            for (let k = 0; k < headers.length; k++) {
                                if (parseInt(data[i][headers[k]]) - parseInt(newConfig[j][headers[k]]) >= 0) {
                                    data[i][headers[k]] = parseInt(data[i][headers[k]])-parseInt(newConfig[j][headers[k]]);
                                } else {
                                    continue;
                                }
                            }
                        }
                        
                    }
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