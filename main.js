const formContainer = document.getElementById("formContainer");
const tableContainer = document.getElementById("tableContainer");

const conf = {
    "singola": 10,
    "doppia": 5,
    "suite": 3
}


const reservationForm = generateReservationForm(formContainer);
reservationForm.build(conf);
reservationForm.onsubmit(reservation => console.log(reservation));
reservationForm.render();

const reservationTable = generateReservationTable(tableContainer);
reservationTable.build(conf);
reservationTable.render();