const formContainer = document.getElementById("formContainer");
const tableContainer = document.getElementById("tableContainer");

const conf = {
    "singola": 10,
    "doppia": 5,
    "suite": 3
}

const componenteFetch = fetchComponent(conf) ;
const reservationTable = generateReservationTable(tableContainer);
const reservationForm = generateReservationForm(formContainer);

reservationTable.build(conf);
reservationForm.build(conf);
componenteFetch.build(reservationTable);

reservationForm.onsubmit(reservation => {
    console.log("reservation\n" + JSON.stringify(reservation)) ;
    componenteFetch.add(reservation, conf) ;
    reservationTable.build(conf);
    reservationTable.updateData(componenteFetch.getAll());
    reservationTable.render();
});

reservationForm.render();
reservationTable.updateData(componenteFetch.getAll());
reservationTable.render();
