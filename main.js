const formContainer = document.getElementById("formContainer");
const tableContainer = document.getElementById("tableContainer");

const conf = {
    "singola": 10,
    "doppia": 5,
    "suite": 3
}

const testData = [
    {
        "data": "10/3/2024",
        "singola": 10,
        "doppia": 5,
        "suite": 3
    },
    {
        "data": "23/3/2028",
        "singola": 10,
        "doppia": 3,
        "suite": 2
    },
    {
        "data": "31/12/2020",
        "singola": 5,
        "doppia": 2,
        "suite": 1
    },
]

const reservationForm = generateReservationForm(formContainer);
reservationForm.build(conf);
reservationForm.onsubmit(reservation => console.log(reservation));
reservationForm.render();

const reservationTable = generateReservationTable(tableContainer);
reservationTable.build(conf);
reservationTable.updateData(testData);
reservationTable.render();