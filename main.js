const formContainer = document.getElementById("formContainer");
const tableContainer = document.getElementById("tableContainer");

const conf = {
    "singola": 10,
    "doppia": 5,
    "suite": 3
}

const testData = [
    {
        "data": "",
        "singola": 10,
        "doppia": 5,
        "suite": 3
    },
    {
        "data": "",
        "singola": 10,
        "doppia": 3,
        "suite": 2
    },
    {
        "data": "",
        "singola": 5,
        "doppia": 2,
        "suite": 1
    },
]

const testConfig = [
    {
        "data": "",
        "singola": 12,
        "doppia": 32,
        "suite": 3
    },
    {
        "data": "",
        "singola": 14,
        "doppia": 3,
        "suite": 123
    },
    {
        "data": "",
        "singola": 621,
        "doppia": 43,
        "suite": 1
    },
]

const componenteFetch = fetchComponent(conf) ;
const reservationTable = generateReservationTable(tableContainer);
const reservationForm = generateReservationForm(formContainer);

reservationTable.build(conf);
reservationForm.build(conf);
componenteFetch.build(reservationTable);

reservationForm.onsubmit(reservation => {
    console.log("reservation\n" + JSON.stringify(reservation)) ;
    componenteFetch.add(reservation, conf) ;
    reservationTable.updateData(componenteFetch.getAll());
    reservationTable.render();
});

reservationForm.render();
reservationTable.updateData(componenteFetch.getAll());
reservationTable.render();
