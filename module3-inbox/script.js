const name = document.write("Name");
const message = document.write("message");
const time = document.write("time");




document.addEventListener('DOMContentLoaded', function () {
    // Get the table element by its class
    var table = document.getElementById('inbox-table');

    // Create a new row and cell
    var newRow = table.insertRow();
    var newCell = newRow.insertCell();

    // Set the cell content
    newCell.textContent = 'New Row Content';
});
