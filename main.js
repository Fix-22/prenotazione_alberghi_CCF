const formContainer = document.getElementById("formContainer");
const tableContainer = document.getElementById("tableContainer");

const conf = {
    "singola": 10,
    "doppia": 5,
    "suite": 3
}

const reservationTable = generateReservationTable(tableContainer);
const reservationForm = generateReservationForm(formContainer);
const fetchComponent = generateFetchComponent();

reservationTable.build(conf);
reservationForm.build(conf);
fetchComponent.build("3d5d7cd6-d187-401b-9142-a6167ea6a150");

reservationTable.setData({})

reservationForm.onsubmit(reservation => {
    console.log(reservation)
    if (reservationTable.add(reservation)) {
        reservationTable.setData(reservationTable.getData())
        reservationTable.render();
        fetchComponent.setData("CCF", reservationTable.getData()).then(d => console.log(d));
    }
});

reservationForm.render();
fetchComponent.getData("CCF").then(d => {
    reservationTable.setData(JSON.parse(d))
    reservationTable.render();
});
